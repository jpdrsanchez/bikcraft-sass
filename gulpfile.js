// Importing Gulp
const { src, dest, watch, parallel, series } = require('gulp');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const cmq = require('postcss-combine-media-query');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');

function css() {
  return src('./css/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cmq(),
      cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./css'))
}

function watchTask() {
  watch('./css/scss/**/*.scss', series(css));
}

exports.css = css;
exports.watch = watchTask;
exports.default = parallel(css, watchTask);