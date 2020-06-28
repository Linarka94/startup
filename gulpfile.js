const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const del = require("del");
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const cssnano = require("cssnano");

function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./public/"
      },
      port: 3000
    });
    done();
  }

  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }

  function clean() {
    return del(["./public"]);
  }

  function styles() {
    return gulp
      .src("./src/styles/*.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(gulp.dest("./public/styles/"))
      .pipe(browsersync.stream());
  }

function copyJs() {
  return gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./public/js'));
};
  

function copyImg() {
  return gulp.src('./src/img/*')
    .pipe(gulp.dest('./public/img'));
};
  
function copyHtml() {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./public'));
};

function watchFiles() {
  gulp.watch("src/styles/**/*.scss", gulp.series('styles'));
  gulp.watch("src/js/**/*.js").on("change", browserSyncReload);
  gulp.watch("src/img/**/*").on("change", browserSyncReload);
  gulp.watch("src/*.html").on("change", browserSyncReload);
};

const build = gulp.series(
  clean,
  gulp.parallel(styles, copyImg, copyHtml, copyJs)
 );
const watch = gulp.parallel(watchFiles, browserSync);

exports.styles = styles;
exports.copyImg = copyImg;
exports.copyHtml = copyHtml;
exports.copyJs = copyJs;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;