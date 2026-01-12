# TOEIC Question Generator

AIを活用してTOEIC形式の問題を自動生成するWebアプリケーションです。

## 概要

Dify AIを使用して、指定したレベルに応じたTOEIC形式の問題を生成します。生成された問題に回答し、正誤判定と解説を確認することができます。

## 機能

- **レベル選択**: 500〜900点の5段階から難易度を選択
- **問題生成**: AIによるTOEIC形式の問題を自動生成
- **回答・採点**: 4択から回答を選択し、正誤を即座に判定
- **解説表示**: 正解と詳細な解説を日本語で表示

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **UI**: React 19 + Material UI (MUI) 6
- **言語**: TypeScript
- **AI**: Dify API
- **スタイリング**: Emotion + Tailwind CSS

## セットアップ

### 前提条件

- Node.js 18以上
- Dify APIキー

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/your-username/toeic-questions-generator.git
cd toeic-questions-generator

# 依存関係をインストール
npm install
```

### 環境変数の設定

`.env.local`ファイルをプロジェクトルートに作成し、以下を設定:

```env
DIFY_API_KEY=your-dify-api-key
DIFY_API_BASE_URL=https://api.dify.ai/v1
```

### 開発サーバーの起動

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | プロダクションビルドを作成 |
| `npm run start` | プロダクションサーバーを起動 |
| `npm run lint` | ESLintでコードをチェック |
