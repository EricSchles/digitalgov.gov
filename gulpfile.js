var gulp         = require("gulp"),
    sass         = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    hash         = require("gulp-hash"),
    del          = require("del"),
    concat    = require('gulp-concat'),
    cleanCSS     = require('gulp-clean-css')


// Compile SCSS files to CSS
gulp.task("scss", function () {
  
  //Delete our old css files
  del(["themes/digital.gov/static/css/**/*"])

  //take care of the CSS files
  gulp.src('themes/digital.gov/src/css/**/*.css')
    .pipe(concat("style.min.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('themes/digital.gov/static/css'))
    .pipe(hash.manifest("css.json"))
    .pipe(gulp.dest("data/css"))

  gulp.src("themes/digital.gov/src/scss/**/*.scss")
    .pipe(sass({
      outputStyle : "compressed"
    }))
    .pipe(autoprefixer({
      browsers : ["last 20 versions"]
    }))
    .pipe(hash())
    .pipe(gulp.dest("themes/digital.gov/static/css"))
    .pipe(hash.manifest("sass.json"))
    .pipe(gulp.dest("data/css"))
})

// Hash javascript
gulp.task("js", function () {
  del(["themes/digital.gov/static/js/**/*"])
  gulp.src("themes/digital.gov/src/js/**/*")
    .pipe(concat('all.js'))
    .pipe(hash())
    .pipe(gulp.dest("themes/digital.gov/static/js"))
    .pipe(hash.manifest("hash.json"))
    .pipe(gulp.dest("data/js"))
})

// Hash images
gulp.task("images", function () {
  del(["static/images/**/*"])
  gulp.src("src/images/**/*")
      .pipe(hash())
      .pipe(gulp.dest("static/images"))
})

// ================
// Watch asset folder for changes
gulp.task("watch", ["scss", "images", "js"], function () {
  gulp.watch("themes/digital.gov/src/scss/**/*", ["scss"])
  gulp.watch("themes/digital.gov/src/images/**/*", ["images"])
  gulp.watch("themes/digital.gov/src/js/**/*", ["js"])
})

// Set watch as default task
gulp.task("default", ["watch"])