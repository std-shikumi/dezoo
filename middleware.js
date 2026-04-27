// Vercel Edge Middleware: Basic 認証
// 環境変数 AUTH_USER と AUTH_PASSWORD を Vercel 側で設定してください

export const config = {
  matcher: '/:path*',
};

export default function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1] || '';
    try {
      const [user, pwd] = atob(authValue).split(':');
      if (user === process.env.AUTH_USER && pwd === process.env.AUTH_PASSWORD) {
        return; // 認証OK → そのまま通す
      }
    } catch (e) {
      // base64 デコード失敗 → 401 を返す
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Dezoo", charset="UTF-8"',
    },
  });
}
