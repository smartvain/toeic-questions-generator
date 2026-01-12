---
description: ステージングされた変更をプリフィックス付きでコミット
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git commit:*)
---

## Context

- Staged changes: !`git diff --cached --stat`
- Staged diff: !`git diff --cached`
- Recent commits: !`git log --oneline -5`

## Task

ステージングされている変更を確認し、適切なコミットメッセージを作成してコミットしてください。

### コミットメッセージのルール

1. プリフィックスは以下から選択:
   - `feat:` - 新機能
   - `fix:` - バグ修正
   - `docs:` - ドキュメントのみの変更
   - `style:` - コードの意味に影響しない変更（空白、フォーマット等）
   - `refactor:` - バグ修正や機能追加を伴わないコード変更
   - `test:` - テストの追加・修正
   - `chore:` - ビルドプロセスや補助ツールの変更

2. メッセージは日本語で簡潔に記述

3. 形式: `プリフィックス: メッセージ`

### 例
- `feat: 回答・採点機能を追加`
- `fix: API エンドポイントの404エラーを修正`
- `refactor: コンポーネントの型定義を整理`

ステージングされた変更の内容を分析し、最適なプリフィックスとメッセージでコミットしてください。
