//----------------------------------------------------
// gulp: Setting
//----------------------------------------------------

const gulp = require("gulp")
const fs = require("fs")
const notify = require("gulp-notify")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const header = require("gulp-header")
const gulpif = require("gulp-if")
const nunjucks = require("gulp-nunjucks-render")
const data = require("gulp-data")
const htmlBeautify = require("gulp-html-beautify")
const sass = require("gulp-sass")
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const flexibility = require("postcss-flexibility")
const flexBugsFixes = require("postcss-flexbugs-fixes")
const gcmq = require("gulp-group-css-media-queries")
const cleanCSS = require("gulp-clean-css")
const babel = require("gulp-babel")
const uglify = require("gulp-uglify")
const browserSync = require("browser-sync")

// Read File
const files = {
  pkg: "./package.json",
  pjt: "./project.json"
}
const pkg = JSON.parse(fs.readFileSync(files.pkg))
const pjt = JSON.parse(fs.readFileSync(files.pjt))

// Banner
const banner = {
  basic: [
    "/*! <%= pjt.setting.name %> v<%= pkg.version %> <%= pkg.license %> by <%= pkg.author.name %> */",
    "",
    ""
  ].join("\n"),
  visible: pjt.setting.banner
}

// Paths
const paths = {
  dist: {
    dir: pjt.setting.dist + "/",
    html: pjt.setting.dist + "/",
    css: pjt.setting.dist + "/",
    js: pjt.setting.dist + "/"
  },
  test: {
    dir: pjt.setting.test + "/",
    html: pjt.setting.test + "/",
    css: pjt.setting.test + "/",
    js: pjt.setting.test + "/"
  },
  src: {
    dir: pjt.setting.src + "/",
    scss: pjt.setting.src + "/",
    js: pjt.setting.src + "/"
  }
}

// htmlBeautify Options
const htmlBeautifyOptions = {
  indent_size: 2,
  max_preserve_newlines: 0,
  indent_inner_html: true,
  extra_liners: []
}

// Sass Options
const sassOptions = {
  outputStyle: "expanded",
  includePaths: "./node_modules/"
}

// Autoprefixer Options
const autoprefixerOptions = {
  grid: true
}

// PostCSS Options
const postcssOptions = [
  flexBugsFixes,
  autoprefixer(autoprefixerOptions),
  flexibility
]

// Uglify Options
const uglifyOptions = {
  output: { comments: /^!/ }
}

// BrowserSync Options
const browserSyncOptions = {
  server: {
    baseDir: paths.test.html
  },
  startPath: "index.html",
  open: false,
  notify: false
}

//----------------------------------------------------
// gulp: Task
//----------------------------------------------------

// Nunjucks > HTML (test)
function htmlTest() {
  return gulp
    .src("./index.njk")
    .pipe(
      data(function() {
        return { pkg, pjt }
      })
    )
    .pipe(nunjucks())
    .pipe(htmlBeautify(htmlBeautifyOptions))
    .pipe(gulp.dest(paths.test.html))
}

// SCSS > CSS (Test)
function scssTest() {
  return gulp
    .src(paths.src.scss + "index.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssOptions))
    .pipe(gcmq())
    .pipe(rename(pkg.name + ".css"))
    .pipe(gulp.dest(paths.test.css))
}

// SCSS > CSS (Build)
function scssBuild() {
  return gulp
    .src(paths.src.scss + "index.scss")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssOptions))
    .pipe(gcmq())
    .pipe(gulpif(banner.visible, header(banner.basic, { pkg, pjt })))
    .pipe(rename(pkg.name + ".css"))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.css))
}

// Javascript (Test)
function jsTest() {
  return gulp
    .src(paths.src.js + "index.js")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(rename(pkg.name + ".js"))
    .pipe(gulp.dest(paths.test.js))
}

// Javascript (Build)
function jsBuild() {
  return gulp
    .src(paths.src.js + "index.js")
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(gulpif(banner.visible, header(banner.basic, { pkg, pjt })))
    .pipe(rename(pkg.name + ".js"))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(uglify(uglifyOptions))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.dist.js))
}

// BrowserSync Init
function browserSyncInit(done) {
  browserSync.init(browserSyncOptions)
  done()
}

// BrowserSync Reload
function browserSyncReload(done) {
  browserSync.reload()
  done()
}

// Watch
function watchFiles() {
  gulp.watch("./index.njk", gulp.series(htmlTest, browserSyncReload))
  gulp.watch(
    paths.src.scss + "index.scss",
    gulp.series(scssTest, browserSyncReload)
  )
  gulp.watch(paths.src.js + "index.js", gulp.series(jsTest, browserSyncReload))
}

//----------------------------------------------------
// gulp: Default
//----------------------------------------------------

gulp.task(
  "default",
  gulp.series(
    gulp.parallel(htmlTest, scssTest, jsTest),
    gulp.parallel(browserSyncInit, watchFiles)
  )
)

//----------------------------------------------------
// gulp: Test
//----------------------------------------------------

gulp.task("test", gulp.parallel(htmlTest, scssTest, jsTest))

//----------------------------------------------------
// gulp: Build
//----------------------------------------------------

gulp.task("build", scssBuild, jsBuild)
