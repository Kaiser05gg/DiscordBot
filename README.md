# discordbot で投票システムを作ります

## discordbot 制作

### 要求：投票を作る時毎度窓書くのを楽にしたい

### 要件（要求を満たすために何が必要か）：投票システムをテンプレート化する、特定の時間で自動的に発射したい

### 仕様・機能（要件を満たすために何が必要か）：毎日正午に〜８、８〜９、９、１０〜、時間未定という５つの項目の投票を発射する。

### 基本設計：TS、discord API

---

### やることリスト：

- DEVELOPER PORTAL  を使い discordbot アカウントの作成&初期設定{1}
  →  トークンの取得
- テストサーバーに bot を入れる。工数 2h
- discordAPI を用いる必要があるかの調査。工数 10h

- TS を用いて投票する項目を指定できるようにする(poc)。10h
- TS を用いて項目数を５つまで追加できるようにする。1h
- TS を用いて指定した時間に投票が締め切られるようにする(poc)。10h
- TS を用いて指定した時間に発射されるようにする(poc)。5h
  ＊逐一テストサーバーで試す。
  ↓
- 拠点サーバーで使う 1h

### {1}https://qiita.com/1ntegrale9/items/cb285053f2fa5d0cccdf

## 締日：６末
