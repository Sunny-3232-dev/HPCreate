// サイト共通のモーション。
// - Lenis：慣性スクロール（GSAP ScrollTrigger と同期）
// - GSAP SplitText：見出しの文字単位リビール
// - GSAP ScrollTrigger：Before/After の固定スクロール、横スクロールギャラリー
// - CSS scroll-driven 非対応ブラウザ向けの .reveal フォールバック
// - ヘッダーの出し入れ、数字カウントアップ
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function smoothScroll() {
  if (reduce) return;
  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function revealFallback() {
  if (CSS.supports('animation-timeline: view()')) return;
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -10% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

function splitHeadings() {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const hero = el.dataset.split === 'hero';
    const split = SplitText.create(el, { type: 'chars', charsClass: 'char' });
    gsap.from(split.chars, {
      yPercent: hero ? 110 : 60,
      rotate: hero ? 6 : 0,
      opacity: 0,
      duration: hero ? 1.1 : 0.8,
      ease: 'expo.out',
      stagger: hero ? 0.035 : 0.018,
      delay: hero ? 0.15 : 0,
      scrollTrigger: hero ? undefined : { trigger: el, start: 'top 85%', once: true },
      onComplete: () => split.revert(),
    });
  });
}

function header() {
  const el = document.querySelector<HTMLElement>('.site-header');
  if (!el) return;
  let last = 0;
  addEventListener(
    'scroll',
    () => {
      const y = scrollY;
      el.classList.toggle('is-scrolled', y > 24);
      el.classList.toggle('is-hidden', y > 400 && y > last && !el.matches(':focus-within'));
      last = y;
    },
    { passive: true },
  );
}

function countUp() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const to = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals ?? 0);
    if (reduce) return;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () =>
        (el.textContent = obj.v.toLocaleString('ja-JP', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })),
    });
  });
}

// 「Googleで検索したとき」Before → After（スクロールで固定し、段階的に切り替え）
function searchStory() {
  const root = document.querySelector<HTMLElement>('[data-search-story]');
  if (!root) return;
  const steps = root.querySelectorAll<HTMLElement>('[data-step]');
  const layers = root.querySelectorAll<HTMLElement>('[data-layer]');
  const set = (i: number) => {
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    layers.forEach((l) => l.classList.toggle('is-on', Number(l.dataset.layer) <= i));
  };
  set(0);
  if (reduce) {
    steps.forEach((s) => s.classList.add('is-active'));
    layers.forEach((l) => l.classList.add('is-on'));
    return;
  }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: () => `+=${innerHeight * 2.2}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => set(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
    });
  });
  // スマホ：手順は全部表示し、スマホ画面のモックが通過する間にレイヤーを切り替える
  mm.add('(max-width: 899px)', () => {
    steps.forEach((s) => s.classList.add('is-active'));
    const phone = root.querySelector<HTMLElement>('.phone');
    if (!phone) return;
    ScrollTrigger.create({
      trigger: phone,
      start: 'top 75%',
      end: 'bottom 35%',
      onUpdate: (self) => {
        const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        layers.forEach((l) => l.classList.toggle('is-on', Number(l.dataset.layer) <= i));
      },
    });
  });
}

// 提案サンプルの横スクロール（PCのみ。スマホはネイティブのスワイプ＋scroll-snap）
function horizontalGallery() {
  const wrap = document.querySelector<HTMLElement>('[data-hscroll]');
  const track = wrap?.querySelector<HTMLElement>('[data-hscroll-track]');
  if (!wrap || !track || reduce) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    const distance = () => track.scrollWidth - wrap.clientWidth;
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'center center',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
  });
}

function parallax() {
  if (reduce) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax) || -20,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}


// ヒーローの地図：道が描かれ、ピンが落ち、注目のお店が「ウェブサイトなし→あり」に変わる
function heroMap() {
  const map = document.querySelector<HTMLElement>('[data-hero-map]');
  if (!map) return;
  if (reduce) {
    map.classList.add('is-done');
    return;
  }
  const lines = map.querySelectorAll('.streets path:not(.rail)');
  const pins = map.querySelectorAll('[data-pin]');
  const card = map.querySelector('[data-card]');
  const tl = gsap.timeline({ delay: 0.2 });
  tl.from(lines, { strokeDashoffset: 1, duration: 1.4, ease: 'power2.inOut', stagger: 0.012 })
    .from(pins, { y: -60, opacity: 0, duration: 0.7, ease: 'bounce.out', stagger: 0.08 }, '-=0.9')
    .from(card, { scale: 0.4, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, '-=0.2')
    .add(() => map.classList.add('is-done'), '+=0.9')
    .fromTo(card, { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 1, ease: 'power1.out' }, '<');
}

export function initMotion() {
  smoothScroll();
  revealFallback();
  header();
  heroMap();
  document.fonts.ready.then(() => {
    splitHeadings();
    countUp();
    searchStory();
    horizontalGallery();
    parallax();
    ScrollTrigger.refresh();
  });
}
