# Staffroller

## Site

https://staffroller.qranoko.jp

## About

Staffroller（スタッフローラー）は Web サイトにスタッフロールを追加する簡単な JavaScript (+CSS) ライブラリです。

## Example

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example</title>

    <!-- 1. Import CSS File -->
    <link rel="stylesheet" href="path/to/staffroller.min.css" />
  </head>
  <body>
    <!-- 4. Setting Trigger -->
    <button type="button" data-staffroller-show="staff-1">
      View Staff
    </button>

    <!-- 2. Import JavaScript File -->
    <script src="path/to/staffroller.min.js"></script>

    <!-- 3. Init JavaScript -->
    <script>
      const Staff1 = new StaffRoller({
        id: "staff-1",
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

1. `staffroller.min.css` を読み込む
2. `staffroller.min.js` を読み込む
3. 表示したい役割 `role` と名前 `name` を配列 `data` に設定（複数記載 OK）
4. 表示させるトリガー（ボタンなど）に `data-staffroller-show="オプションで設定したid"` を付与

- トリガーをクリックするとスタッフロールが表示
- スタッフロールを非表示にする場合は右上の × ボタンもしくは `esc` キー

## Install

### [CDN](https://www.jsdelivr.com/package/npm/staffroller)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/staffroller@0.2.2/dist/staffroller.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/staffroller@0.2.2/dist/staffroller.min.js"></script>
```

### [npm](https://www.npmjs.com/package/staffroller)

```bash
$ yarn add staffroller
```

## Option

### JavaScript

| Option      | Default       | Note                         |
| ----------- | ------------- | ---------------------------- |
| `id`        | `staff`       | モーダルを特定する ID        |
| `title`     | `STAFF`       | スタッフロールのタイトル     |
| `data`      | `""`          | 表示する役割と名前を渡す配列 |
| `nameSpace` | `staffroller` | 属性名の設定                 |

### CSS

色やサイズなどは、[SCSS 変数](https://github.com/qrac/staffroller/blob/master/src/index.scss)または[CSS](https://github.com/qrac/staffroller/blob/master/dist/staffroller.css)で上書きできます。

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
