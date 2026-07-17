# 三国志バトル ボタン登録ページ

## 目的

三国志バトル専用ブラウザへ、固定データのURLを指定した登録先へ登録する静的ページです。カードの「登録する」を押すと、ユーザー操作を起点に `sanbato://apply` Deep Linkを起動します。

## GitHub Pagesで公開する

GitHubのリポジトリ画面で **Settings → Pages** を開き、次のように設定します。

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/ (root)**

GitHub Actionsの追加設定は不要です。

## Deep Linkのindex対応表

| 表示 | index |
| --- | ---: |
| 左1〜左20 | 1〜20 |
| 右1〜右20 | 21〜40 |
| 下1〜下16 | 41〜56 |

下ボタンは下1〜下16のみです。下17以降は存在しません。

## 項目を追加する

`script.js` の `buttonItems` 配列に、`id`、`label`、`url`、`defaultIndex` を持つオブジェクトを追加してください。カードと登録先選択肢は配列から自動生成されます。

## 実機確認

1. GitHub PagesのURLをAndroid Chromeで開く。
2. 各カードで登録先を選び、`登録する` を押す。
3. アプリの確認画面で登録内容を確認する。
4. ページへ戻り、別のカードも利用できることを確認する。

アプリ未インストール端末では登録できません。アプリ側で `sanbato` スキームへの対応が必要です。

Deep Linkは `index`、URL全体、ラベルをJavaScriptでそれぞれ適切にエンコードして生成します。ページ表示時の自動起動は行いません。
