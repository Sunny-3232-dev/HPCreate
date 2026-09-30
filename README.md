# SunConnect 自社サイト

宇都宮のWeb制作スタジオ SunConnect のコーポレートサイト。Astro（静的出力）＋ Cloudflare Pages。

事業計画は [`docs/PLAN.md`](docs/PLAN.md)、営業候補の一次リストは [`docs/CANDIDATES.md`](docs/CANDIDATES.md)。

## コマンド

| コマンド | 役割 |
|---|---|
| `npm install` | 依存関係のインストール |
| `npm run dev` | 開発サーバー（http://localhost:4321） |
| `npm run check` | 型チェック（astro check） |
| `npm run build` | `dist/` に静的サイトを出力 |
| `npx wrangler pages deploy dist --project-name sunconnect` | Cloudflare Pages へデプロイ（`functions/` も同時に配信） |

## 構成

```
src/
  data/site.ts        事業者情報・料金プラン（公開前に TODO を実値へ）
  data/samples.ts     提案サンプル（すべて架空の店舗）
  layouts/            Base（head・OGP・構造化データ）/ Legal
  components/         トップページの各セクション
  pages/              / ・ /samples/[slug]/ ・ /legal/*
  scripts/motion.ts   GSAP・Lenis によるモーション
  scripts/sun.ts      ヒーローの WebGL シェーダ（OGL）
  styles/global.css   デザイントークン・CSS scroll-driven animations・View Transitions
functions/api/contact.js  お問い合わせフォームの受け口（Pages Function）
```

## モーションで使っている技術

| 演出 | 技術 |
|---|---|
| ヒーローの朝陽（揺らぎ・ポインタ追従・スクロールで昇る） | WebGL フラグメントシェーダ（OGL） |
| 見出しが1文字ずつ立ち上がる | GSAP SplitText |
| Google検索結果の Before/After（画面固定で切り替え）、サンプルの横スクロール | GSAP ScrollTrigger |
| 慣性スクロール | Lenis |
| 要素のフェードイン、読了プログレスバー、線画モチーフが描かれる、流れのタイムラインが伸びる | CSS Scroll-driven Animations（`animation-timeline: view()` / `scroll()`） |
| サンプル一覧から詳細ページへの遷移 | Cross-document View Transitions（`@view-transition`） |
| モバイルメニュー開閉 | Popover API ＋ `@starting-style` |
| FAQ の開閉 | `::details-content` ＋ `interpolate-size` |
| 日本語見出しの自然な改行 | `word-break: auto-phrase` |

- `prefers-reduced-motion: reduce` の環境では、WebGL・慣性スクロール・文字アニメーションを止め、すべて静止した状態で表示する
- WebGL が使えない環境では CSS の太陽（静止版）にフォールバックする
- CSS Scroll-driven Animations 非対応ブラウザでは IntersectionObserver で代替する

## 公開前チェック

- [ ] `src/data/site.ts` の `email`・`tel`・`line` を実値に（`tel` が空のあいだは電話番号を表示しない）
- [ ] `astro.config.mjs` の `site` を本番ドメインに
- [ ] Cloudflare Pages の環境変数（Secret）に `CONTACT_WEBHOOK_URL` を設定（Slack Incoming Webhook や Google Apps Script など、JSON を POST で受けられるURL）。未設定のあいだ、フォームは「準備中」を返す
- [ ] OGP 画像 `public/og.png`（1200×630）を用意
- [ ] 実在事業者の制作事例は、成約と掲載の承諾を得てから追加する（現在のサンプルはすべて架空の店舗）
- [ ] 提案レターは `studio.sunconnect.jp/sites/<slug>/` を案内している。このサイトで同じドメインを使う場合は、限定公開のサンプル（`utsunomiya-sales/public/sites/`）を別サブドメインに移すか、このサイトでも配信する
