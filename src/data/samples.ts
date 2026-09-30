// 提案サンプル。すべて架空の店舗（実在の事業者名・口コミは使わない）。
export type Sample = {
  slug: string;
  name: string;
  kind: string;
  area: string;
  catch: string;
  lead: string;
  palette: { bg: string; ink: string; accent: string; soft: string };
  font: 'serif' | 'sans';
  motif: 'roof' | 'wave' | 'gear' | 'lens' | 'leaf' | 'box';
  services: { title: string; text: string }[];
  voices: { text: string; who: string }[];
  rating: number;
  reviews: number;
};

export const samples: Sample[] = [
  {
    slug: 'koumuten',
    name: '石蔵工務店',
    kind: '工務店・リフォーム',
    area: '宇都宮市東部',
    catch: '大谷石のまちで、\n百年もつ家を。',
    lead: '新築から水まわりの小さな修繕まで。地元の職人が、図面から現場まで一貫して担当します。',
    palette: { bg: '#F1EEE6', ink: '#23211C', accent: '#8A7A5C', soft: '#DCD5C3' },
    font: 'serif',
    motif: 'roof',
    services: [
      { title: '新築・注文住宅', text: '土地探しからご相談ください。大谷石を使った外構も得意です。' },
      { title: 'リフォーム', text: 'キッチン・浴室・外壁まで。住みながらの工事にも対応します。' },
      { title: '小さな修繕', text: '網戸1枚、雨どい1本からでもお気軽に。' },
    ],
    voices: [
      { text: '見積もりが明快で、追加費用の説明も丁寧でした。', who: '40代・ご夫婦' },
      { text: '工事後の点検にも来てくれて安心です。', who: '60代・男性' },
    ],
    rating: 4.8,
    reviews: 42,
  },
  {
    slug: 'kappo',
    name: '割烹 ささめ',
    kind: '割烹・会席',
    area: '宇都宮市中心部',
    catch: '季節を、\nひと皿ずつ。',
    lead: '栃木の旬を、カウンターと個室で。ご法事・顔合わせ・接待のご予約を承ります。',
    palette: { bg: '#161513', ink: '#EFE8DA', accent: '#C29B5A', soft: '#2A2723' },
    font: 'serif',
    motif: 'wave',
    services: [
      { title: 'おまかせ会席', text: '旬の食材で組み立てるコース。苦手な食材は事前に伺います。' },
      { title: 'ご法事・顔合わせ', text: '個室で落ち着いたお席を。送迎のご相談も承ります。' },
      { title: '仕出し', text: 'ご自宅や会館へお届けします（10名様〜）。' },
    ],
    voices: [
      { text: '両家の顔合わせで利用。心配りが行き届いていました。', who: '30代・女性' },
      { text: '法事の人数変更にも柔軟に対応していただけました。', who: '50代・男性' },
    ],
    rating: 4.7,
    reviews: 88,
  },
  {
    slug: 'motors',
    name: 'ひばりモータース',
    kind: '自動車整備・板金塗装',
    area: '宇都宮市北部',
    catch: '車検も、キズも、\n相談しやすい工場で。',
    lead: '国家資格整備士が点検から見積もりまで同席。交換が必要な部品は、実物を見せてご説明します。',
    palette: { bg: '#EEF1F3', ink: '#141A20', accent: '#D2482B', soft: '#D5DCE2' },
    font: 'sans',
    motif: 'gear',
    services: [
      { title: '車検・点検', text: '立ち会い車検で、その場で見積もり。代車も無料です。' },
      { title: '板金・塗装', text: '小さなキズ・へこみから事故修理まで。保険対応も。' },
      { title: 'タイヤ・オイル', text: 'ご予約で待ち時間なし。保管サービスもあります。' },
    ],
    voices: [
      { text: '不要な整備は勧めず、必要な理由をきちんと説明してくれる。', who: '40代・男性' },
      { text: '代車がきれいで助かりました。', who: '30代・女性' },
    ],
    rating: 4.6,
    reviews: 57,
  },
  {
    slug: 'photo',
    name: '写真室 ひなた',
    kind: '写真館',
    area: '宇都宮市西部',
    catch: '家族の「いま」を、\n光ごと残す。',
    lead: '七五三・成人式・家族写真。自然光のスタジオで、お子さまのペースに合わせて撮影します。',
    palette: { bg: '#FBF5EE', ink: '#2E2622', accent: '#D98E73', soft: '#F1E2D3' },
    font: 'serif',
    motif: 'lens',
    services: [
      { title: '七五三', text: '衣装・着付け・ヘアセット込み。お参り当日の出張撮影も。' },
      { title: '成人式・卒業', text: '前撮りで、当日を身軽に。ご家族との一枚もどうぞ。' },
      { title: '家族写真', text: '年に一度の記念に。ペットと一緒の撮影もできます。' },
    ],
    voices: [
      { text: '人見知りの娘が、最後は笑顔に。写真の仕上がりも最高です。', who: '30代・母' },
      { text: '祖父母も一緒に撮れて、良い記念になりました。', who: '40代・父' },
    ],
    rating: 4.9,
    reviews: 36,
  },
  {
    slug: 'seitai',
    name: 'からだ整え処 ゆい',
    kind: '整体・接骨院',
    area: '宇都宮市南部',
    catch: 'その痛み、\n原因から見直します。',
    lead: '丁寧な問診と姿勢チェックから。通院の目安と、ご自宅でできるケアもお伝えします。',
    palette: { bg: '#EFF4EF', ink: '#1C2620', accent: '#4F8A6B', soft: '#D7E5DA' },
    font: 'sans',
    motif: 'leaf',
    services: [
      { title: '肩こり・腰痛', text: '筋肉と骨格の両面からアプローチします。' },
      { title: '産後骨盤ケア', text: 'お子さま連れでも安心の個室で施術します。' },
      { title: 'スポーツ障害', text: '学生アスリートの早期復帰をサポート。' },
    ],
    voices: [
      { text: '説明がわかりやすく、通う回数も明確で安心できた。', who: '50代・女性' },
      { text: '部活の怪我から早く復帰できました。', who: '10代・高校生' },
    ],
    rating: 4.8,
    reviews: 64,
  },
  {
    slug: 'shidashi',
    name: '仕出し 松風',
    kind: '仕出し・弁当',
    area: '宇都宮市全域配達',
    catch: '集まりの日の、\nいちばんの支度を。',
    lead: '法事・会議・運動会。人数とご予算に合わせて、手づくりのお膳とお弁当をお届けします。',
    palette: { bg: '#F7F2E7', ink: '#26211A', accent: '#A8432F', soft: '#EADFC8' },
    font: 'serif',
    motif: 'box',
    services: [
      { title: 'ご法事のお膳', text: 'お寺・会館・ご自宅へ。器の回収まで承ります。' },
      { title: '会議弁当', text: '10食から配達無料。請求書払いに対応します。' },
      { title: '行楽・オードブル', text: '運動会や集まりに。アレルギー対応もご相談ください。' },
    ],
    voices: [
      { text: '急な人数追加にも対応してもらえて助かりました。', who: '総務担当・法人' },
      { text: '味付けがやさしく、年配の親戚にも好評でした。', who: '60代・女性' },
    ],
    rating: 4.7,
    reviews: 29,
  },
];
