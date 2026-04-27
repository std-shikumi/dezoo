# Dezoo デプロイ手順

GitHub + Vercel + Basic認証 でホスティングする手順です。

## 1. このフォルダに HTML を入れる

`Dezoo-dev.html` を **コピー**して、このフォルダに `index.html` という名前で保存してください。

```
deploy/
  index.html         ← Dezoo-dev.html をリネームコピー
  middleware.js
  package.json
  .gitignore
  README.md
```

## 2. GitHub リポジトリを作成

1. https://github.com/new で新しいリポジトリを作成（名前: `dezoo` 等。Privateを推奨）
2. ローカルでこの `deploy/` フォルダを git 初期化:

```bash
cd deploy
git init
git add .
git commit -m "Initial deploy"
git branch -M main
git remote add origin https://github.com/<your-account>/dezoo.git
git push -u origin main
```

## 3. Vercel に接続

1. https://vercel.com にログイン (GitHub アカウントで)
2. "Add New Project" → 作った GitHub リポジトリを選択
3. 設定はそのまま (Framework Preset: "Other") → Deploy

## 4. Basic 認証の環境変数を設定

Vercel ダッシュボード → Project → Settings → Environment Variables で以下を追加:

| Name | Value |
|---|---|
| `AUTH_USER` | 好きなユーザー名 (例: `hanawa`) |
| `AUTH_PASSWORD` | 好きなパスワード (推測されにくいもの) |

設定後、**再デプロイ** が必要です:
- Project → Deployments → 最新のデプロイの「⋯」メニュー → Redeploy

## 5. アクセス確認

`https://<your-project>.vercel.app/` を開く → Basic 認証ダイアログ
→ 上記のユーザー名/パスワードを入力 → アプリが表示

旦那様にはこの URL と認証情報を共有してください。
旦那様はブラウザに認証情報を保存させれば、次回以降は自動入力されます。

## 6. アップデート手順 (バグ修正・機能追加時)

ローカルで `Dezoo-dev.html` を編集 → `deploy/index.html` にコピー → push:

```bash
cp ../Dezoo-dev.html ./index.html   # またはエクスプローラーでコピー
git add index.html
git commit -m "Update: 修正内容"
git push
```

push すると Vercel が自動的に再デプロイします (1-2分程度)。
旦那様はブラウザでリロードするだけで最新版が反映されます。

## トラブル時

- **Basic 認証が出ない**: 環境変数を設定後に Redeploy したか確認
- **ログインできない**: 環境変数のスペル確認、Production 環境にチェックが入っているか確認
- **デプロイ失敗**: Vercel の Deployments タブでログを確認
