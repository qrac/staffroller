# Staffroller

## Site

https://staffroller.qranoko.jp

## About

Staffroller（スタッフローラー）は Web サイトにスタッフロールを追加する簡単な JavaScript (+CSS) ライブラリです。

## How To Use

```json
[
  {
    "role": "デザイナー",
    "name": ["クラク", "まいのこ"]
  },
  {
    "role": ["コーダー", "フロントエンド"],
    "name": "クラク"
  },
  {
    "role": "スペシャルサンクス",
    "name": "マロ"
  }
]
```

1. JSON ファイルに表示したい項目を書き込み設置

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Example</title>

    <!-- 2. Import CSS File -->
    <link rel="stylesheet" href="path/to/staffroller.min.css" />
  </head>
  <body>
    <!-- 3. Setting Trigger -->
    <button type="button" data-staffroller-show="staff-1">
      View Staff
    </button>

    <!-- 4. Import JavaScript File -->
    <script src="path/to/staffroller.min.js"></script>

    <!-- 5. Init JavaScript -->
    <script>
      const Staff1 = new StaffRoller({
        id: "staff-1",
        title: "STAFF",
        dataFile: "./staff.json"
      })
    </script>
  </body>
</html>
```

2. `staffroller.min.css` を読み込む
3. 表示させるトリガー（ボタンなど）に `data-staffroller-show="オプションで設定したid"` を付与
4. `staffroller.min.js` を読み込む
5. オプション `dataFile` に JSON ファイルへのパスを書いて StaffRoller を呼び出し

- トリガーをクリックするとスタッフロールが表示
- スタッフロールを非表示にする場合は右上の × ボタンもしくは `esc` キー

## Install

### [CDN](https://www.jsdelivr.com/package/npm/staffroller)

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/staffroller@0.3.0/dist/staffroller.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/staffroller@0.3.0/dist/staffroller.min.js"></script>
```

### [npm](https://www.npmjs.com/package/staffroller)

```bash
$ yarn add staffroller
```

## Option

### JavaScript

| Option      | Default       | Note                                       |
| ----------- | ------------- | ------------------------------------------ |
| `id`        | `staff`       | モーダルを特定する ID                      |
| `title`     | `STAFF`       | スタッフロールのタイトル                   |
| `data`      | `null`        | 表示する役割と名前を渡す配列               |
| `dataFile`  | `null`        | 表示する項目を書いた JSON ファイルへのパス |
| `nameSpace` | `staffroller` | 属性名の設定                               |

### CSS

色やサイズなどは、[SCSS 変数](https://github.com/qrac/staffroller/blob/master/src/index.scss)または[CSS](https://github.com/qrac/staffroller/blob/master/dist/staffroller.css)で上書きできます。

## License

- MIT

## Credit

- Author: [Qrac](https://qrac.jp)
- Organization: [QRANOKO](https://qranoko.jp)
