// サイト全体で使う事業者情報。
// 公開前に TODO の値を必ず実値へ差し替える（README「公開前チェック」参照）。
export const site = {
  name: 'SunConnect',
  nameJa: 'サンコネクト',
  tagline: '口コミはいいのに、ホームページがないお店へ。',
  description:
    '宇都宮でホームページを作っているSunConnectです。Googleの口コミは良いのにホームページがないお店に、税抜198,000円からホームページを作り、Googleマップの登録情報も整えます。',
  // TODO: 番地までの住所が決まったら address を追加し、特商法ページに反映
  city: '栃木県宇都宮市',
  email: 'contact@sunconnect.jp',
  // 空文字にすると電話番号を表示しない
  tel: '080-9824-5804',
  hours: '平日 9:00〜18:00（土日祝休）',
  // TODO: LINE公式アカウントのURL。空文字なら非表示
  line: '',
};

export const plans = [
  {
    id: 'card',
    name: '名刺サイト',
    price: 150000,
    monthly: 3000,
    summary: '仕事の内容、連絡先、地図を1ページにまとめます。まずは名刺がわりに。',
    features: ['1ページ完結', 'スマホ最適化', '独自ドメイン・SSL'],
  },
  {
    id: 'start',
    name: '集客スタートパック',
    price: 198000,
    monthly: 5000,
    featured: true,
    summary:
      'ホームページとGoogleマップの登録情報を、まとめて整えます。',
    features: [
      '3〜5ページ構成',
      'Googleビジネスプロフィール整備',
      '口コミ紹介ページ＋口コミ依頼カード（QR付き）',
      '訪問撮影（スマホ・10カット程度）',
      '初月アクセスレポート',
      '修正2回まで・素材が揃ってから10営業日で公開',
    ],
  },
  {
    id: 'grow',
    name: '集客サイト',
    price: 350000,
    monthly: 8000,
    summary: '施工事例やメニュー、よくある質問、お知らせまで載せたい方に。検索から来る人を増やしたい場合はこちら。',
    features: ['5〜10ページ', 'SEO設計', 'お問い合わせフォーム', '更新サポート'],
  },
  {
    id: 'renew',
    name: 'リニューアル',
    price: 250000,
    monthly: 5000,
    from: true,
    summary: 'スマホで崩れる、「保護されていない通信」と出る。そんな古いホームページを作り直します。',
    features: ['HTTPS化', 'スマホ対応', '表示速度改善', '既存コンテンツ整理'],
  },
] as const;

export const yen = (n: number) => `¥${n.toLocaleString('ja-JP')}`;
