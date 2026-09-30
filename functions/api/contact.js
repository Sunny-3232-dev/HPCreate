// Cloudflare Pages Function: POST /api/contact
// フォーム内容を検証し、環境変数 CONTACT_WEBHOOK_URL へ JSON で転送する。
// 転送先の例：Slack Incoming Webhook / Google Apps Script（メール送信）/ Make・Zapier など。
// CONTACT_WEBHOOK_URL は Cloudflare Pages の環境変数（Secret）で設定し、コードに書かない。

const LIMITS = { name: 80, shop: 120, email: 160, tel: 30, message: 4000 };
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });

export async function onRequestPost({ request, env }) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ error: '送信内容を読み取れませんでした。' }, 400);
  }

  // スパム対策（ハニーポット）：人間には見えない欄に入力があれば成功扱いで破棄
  if (String(form.get('website') || '').trim()) return json({ ok: true });

  const data = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    data[key] = String(form.get(key) || '').trim().slice(0, max);
  }
  if (!data.name || !data.email || !data.message) {
    return json({ error: 'お名前・メールアドレス・ご相談内容は必須です。' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ error: 'メールアドレスの形式をご確認ください。' }, 400);
  }

  if (!env.CONTACT_WEBHOOK_URL) {
    return json({ error: '現在フォームを準備中です。' }, 503);
  }

  const text = [
    '【SunConnect お問い合わせ】',
    `お名前：${data.name}`,
    `屋号：${data.shop || '-'}`,
    `メール：${data.email}`,
    `電話：${data.tel || '-'}`,
    '',
    data.message,
  ].join('\n');

  const res = await fetch(env.CONTACT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, ...data, receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) return json({ error: '送信に失敗しました。' }, 502);
  return json({ ok: true });
}
