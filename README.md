# SunConnect 自社サイト

宇都宮のWeb制作スタジオ SunConnect のコーポレートサイト。Astro（静的出力）＋ Cloudflare Pages。

デザインの評価と一新の方針は [`docs/REVIEW.md`](docs/REVIEW.md)。事業計画は [`docs/PLAN.md`](docs/PLAN.md)、営業候補の一次リストは [`docs/CANDIDATES.md`](docs/CANDIDATES.md)。

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
  styles/global.css   デザイントークン・CSS scroll-driven animations・View Transitions
functions/api/contact.js  お問い合わせフォームの受け口（Pages Function）
```

## モーションで使っている技術

| 演出 | 技術 |
|---|---|
| ヒーローの地図（道が描かれ、ピンが落ち、お店が「ウェブサイトなし→あり」に変わる） | SVG ＋ GSAP タイムライン |
| 見出しが1文字ずつ立ち上がる | GSAP SplitText |
| Google検索結果の Before/After（画面固定で切り替え）、サンプルの横スクロール | GSAP ScrollTrigger |
| 慣性スクロール | Lenis |
| 地図がスクロールで奥へ下がる、進め方の道が伸びる | CSS Scroll-driven Animations |
| 要素のフェードイン、読了プログレスバー、線画モチーフが描かれる、流れのタイムラインが伸びる | CSS Scroll-driven Animations（`animation-timeline: view()` / `scroll()`） |
| サンプル一覧から詳細ページへの遷移 | Cross-document View Transitions（`@view-transition`） |
| モバイルメニュー開閉 | Popover API ＋ `@starting-style` |
| FAQ の開閉 | `::details-content` ＋ `interpolate-size` |
| 日本語見出しの自然な改行 | `word-break: auto-phrase` |

- `prefers-reduced-motion: reduce` の環境では、地図の演出・慣性スクロール・文字アニメーションを止め、すべて完成した状態で表示する
- CSS Scroll-driven Animations 非対応ブラウザでは IntersectionObserver で代替する

## 公開前チェック

- [x] 電話番号（080-9824-5804）・ドメイン（sunconnect.jp）を反映
- [ ] 番地までの住所（特商法ページ）、LINE公式アカウントURL（`src/data/site.ts`）
- [ ] `contact@sunconnect.jp` でメールを受信できるか確認（Cloudflare Email Routing 等）
- [ ] Cloudflare Pages の環境変数（Secret）に `CONTACT_WEBHOOK_URL` を設定（Slack Incoming Webhook や Google Apps Script など、JSON を POST で受けられるURL）。未設定のあいだ、フォームは「準備中」を返す
- [ ] OGP 画像 `public/og.png`（1200×630）を用意
- [ ] 実在事業者の制作事例は、成約と掲載の承諾を得てから追加する（現在のサンプルはすべて架空の店舗）
- [ ] このサイトは `sunconnect.jp`、限定公開の提案サンプルは従来どおり `studio.sunconnect.jp/sites/<slug>/`（utsunomiya-sales）で配信。`studio.sunconnect.jp/` のトップは `sunconnect.jp` へリダイレクトするのがおすすめ
