// ヒーローの「朝陽」WebGL シェーダ（OGL）。
// WebGL 非対応・動きを減らす設定・タブ非表示時は描画しない（CSS の静止版が見える）。
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uPointer;
uniform float uScroll;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  // 太陽の位置：右上から、スクロールでゆっくり昇る／ポインタで少し寄る
  vec2 sunPos = vec2(aspect * (aspect > 1.0 ? 0.22 : 0.12), 0.05 + uScroll * 0.25);
  sunPos += (uPointer - 0.5) * vec2(0.06, 0.04);
  vec2 d = p - sunPos;
  float r = length(d);

  // 空：夜明け（下）→ 生成り（上）
  vec3 sky = mix(vec3(0.949, 0.918, 0.847), vec3(0.980, 0.965, 0.925), smoothstep(-0.5, 0.6, p.y));
  sky = mix(sky, vec3(0.86, 0.80, 0.86), smoothstep(0.2, -0.7, p.y) * 0.35);

  // 雲のような揺らぎ
  float n = fbm(p * 2.2 + vec2(uTime * 0.02, -uTime * 0.015));
  sky = mix(sky, vec3(1.0, 0.93, 0.84), n * 0.25);

  // 光条
  float ang = atan(d.y, d.x);
  float rays = pow(max(0.0, sin(ang * 14.0 + uTime * 0.08) * 0.5 + 0.5), 6.0);
  rays *= smoothstep(1.2, 0.2, r) * 0.06;

  // コロナとディスク
  float corona = exp(-r * 3.6) * 0.7;
  float disc = smoothstep(0.205, 0.19, r + (fbm(d * 6.0 + uTime * 0.1) - 0.5) * 0.012);

  vec3 amber = vec3(0.910, 0.573, 0.235);
  vec3 pale = vec3(1.0, 0.886, 0.737);
  vec3 col = sky;
  col = mix(col, amber, corona * 0.55 + rays);
  col = mix(col, mix(pale, amber, smoothstep(0.0, 0.2, r)), disc);

  // 粒状感
  col += (hash(uv * uRes + uTime) - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function mountSun(host: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let renderer: Renderer;
  try {
    renderer = new Renderer({ dpr: Math.min(devicePixelRatio, 1.5), alpha: false, antialias: false });
  } catch {
    return;
  }
  const gl = renderer.gl;
  if (!gl) return;
  gl.canvas.setAttribute('aria-hidden', 'true');
  host.appendChild(gl.canvas);

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      uTime: { value: 0 },
      uRes: { value: [1, 1] },
      uPointer: { value: [0.5, 0.5] },
      uScroll: { value: 0 },
    },
  });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height);
    program.uniforms.uRes.value = [width, height];
  };
  new ResizeObserver(resize).observe(host);
  resize();

  const target = [0.5, 0.5];
  addEventListener(
    'pointermove',
    (e) => {
      target[0] = e.clientX / innerWidth;
      target[1] = 1 - e.clientY / innerHeight;
    },
    { passive: true },
  );

  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(host);

  const start = performance.now();
  const loop = (now: number) => {
    requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const u = program.uniforms;
    u.uTime.value = (now - start) / 1000;
    u.uPointer.value[0] += (target[0] - u.uPointer.value[0]) * 0.04;
    u.uPointer.value[1] += (target[1] - u.uPointer.value[1]) * 0.04;
    u.uScroll.value = Math.min(1, scrollY / innerHeight);
    renderer.render({ scene: mesh });
  };
  requestAnimationFrame(loop);
  host.classList.add('has-webgl');
}
