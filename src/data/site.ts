// サイト全体で使う事業者情報。
// 公開前に TODO の値を必ず実値へ差し替える（README「公開前チェック」参照）。
export const site = {
  name: 'SunConnect',
  nameJa: 'サンコネクト',
  tagline: '朝陽が差し込むように、地方の仕事に光を。',
  description:
    '栃木県宇都宮市のWeb制作スタジオ SunConnect。Googleの口コミは良いのにホームページがない——そんな地域のお店に、20万円前後で「見つかる・選ばれる」ホームページとGoogleビジネスプロフィール整備をお届けします。',
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
    summary: '事業内容・連絡先・アクセスをまとめた1ページ。まずはWeb上に「お店の顔」を。',
    features: ['1ページ完結', 'スマホ最適化', '独自ドメイン・SSL'],
  },
  {
    id: 'start',
    name: '集客スタートパック',
    price: 198000,
    monthly: 5000,
    featured: true,
    summary:
      '口コミの良さを、そのまま来店と問い合わせにつなげる主力プラン。ホームページとGoogleマップの両方を整えます。',
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
    summary: '施工事例・メニュー・FAQ・ブログまで備えた本格構成。検索からの集客を育てたい方に。',
    features: ['5〜10ページ', 'SEO設計', 'お問い合わせフォーム', '更新サポート'],
  },
  {
    id: 'renew',
    name: 'リニューアル',
    price: 250000,
    monthly: 5000,
    from: true,
    summary: '古いサイトをスマホ対応・HTTPS化・高速化。既存の情報を活かしながら現代の基準へ。',
    features: ['HTTPS化', 'スマホ対応', '表示速度改善', '既存コンテンツ整理'],
  },
] as const;

export const yen = (n: number) => `¥${n.toLocaleString('ja-JP')}`;
