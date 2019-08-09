# Staffroller

## Site

https://staffroller.qranoko.jp

## About

Staffroller（スタッフローラー）は Web サイトにスタッフロールを追加する簡単な JavaScript ライブラリです。

## Example

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example</title>
  </head>
  <body>
    <button type="button" data-staffroller-show="staffroller-modal">
      View Staff
    </button>

    <script src="https://cdn.jsdelivr.net/npm/staffroller@0.1.0/dist/staffroller.min.js"></script>
    <script>
      const staffroller = new Staffroller({
        id: "staffroller-modal",
        title: "STAFF",
        data: [
          {
            role: "デザイナー",
            name: ["クラク", "まいのこ"]
          },
          {
            role: ["コーダー", "フロントエンド"],
            name: "クラク"
          },
          {
            role: "スペシャルサンクス",
            name: "マロ"
          }
        ]
      })
    </script>
  </body>
</html>
```

`staffroller.min.js` を読み込み、スタッフロールで表示したい役割 `role` と名前 `name` を配列 `data` に設定しつつ呼び出します。役割と名前は複数記載に対応。

スタッフロールを非表示にする場合は、右上の × ボタンもしくは `esc` キーを押します。

## Install

### [CDN](https://www.jsdelivr.com/package/npm/staffroller)

```html
<script src="https://cdn.jsdelivr.net/npm/staffroller@0.1.0/dist/staffroller.min.js"></script>
```

### [npm](https://www.npmjs.com/package/staffroller)

```bash
$ yarn add staffroller
```

## Option

| Option      | Default             | Note                         |
| ----------- | ------------------- | ---------------------------- |
| `id`        | `staffroller-modal` | モーダルを特定する ID        |
| `title`     | `STAFF`             | スタッフロールのタイトル     |
| `data`      | `""`                | 表示する役割と名前を渡す配列 |
| `nameSpace` | `staffroller`       | 属性名の設定                 |

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
