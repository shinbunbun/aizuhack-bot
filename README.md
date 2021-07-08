# AizuHack LINEBot勉強会

こんにちは、会津大学学部一年のしんぶんぶんです。

本リポジトリはAizuHackのLINEBot勉強会のソースコードになります。

本リポジトリのサンプルコードは個人利用で一般的に使われるLINE Messaging APIの機能をだいたいカバーしており、サンプルコードを書き換えるだけでLINE Messaging APIのだいたいの機能が使えるようになっています。

LINEBotの入門記事やサンプルはたくさんありますが、その多くがオウム返しbotを作るだけやngrokで動かすだけの拡張性が低いものになっています。
[AWS](https://aws.amazon.com/jp/)などにデプロイする記事などもありますが、初心者には若干ハードルが高くとっつきにくいかと思います。
今回の資料では、初心者でも理解できるということを念頭におきつつ、たとえば[Vercel](https://vercel.com/)でデプロイして永続化する、ソースコードはできるだけ拡張性が高いように書くなどできるだけ拡張性が高いように作成しました。
コピペだけで簡単に機能拡張できるようなサンプルコードになっています。

また、本リポジトリに掲載している解説の多くは公式リファレンスを参考に作成しています。
このリファレンスは非常にわかりやすいため、作っていて何かわからないことがあったら[リファレンス](https://developers.line.biz/ja/reference/messaging-api/)を参考にしましょう。

## 講義資料

上から順番にお読みいただくことで、手順を追って理解していただくことができます。

1. [LINEBotとは](https://docs.google.com/presentation/d/1wizsJ9P8IQZnIknm1FX98IxT35ezP4QsFO2yT673GDU)
2. [AizuHack LINEBot勉強会 Vol.1](https://qiita.com/shinbunbun_/items/7efef6db31514831143d)
3. [AizuHack LINEBot勉強会 Vol.2](https://qiita.com/shinbunbun_/items/4034e9c2c7553ed3107e)
4. [AizuHack LINEBot勉強会 Extra](https://qiita.com/shinbunbun_/items/0dfc42584518dc60e3e7)

## ハンズオン資料のコントリビュートについて

本リポジトリは、みなさんのコントリビュートによって成り立っております。
まずはお手元にForkしていただき、ブランチを切って開発を行い、PRを投げてください。

## コントリビュートをする際の注意

こちらのリポジトリは初学者の理解を効率よく学ぶために基本的にはフレームワークやライブラリを使わず実装を行っております。
また、できるだけコメントを多く書き込んでいただけると幸いです。
