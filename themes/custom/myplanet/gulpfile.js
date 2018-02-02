'use strict';

const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const browserify = require('browserify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const lint = require('gulp-eslint');
const browserSync = require('browser-sync').create('Spress');
const reload = browserSync.reload;


gulp.task('clean:all', () => {
  return del([
    'build/**/*.*'
  ]);
});

gulp.task('sync:site', () => {
  var serverConf = {
    serve : {
      baseDir: './build',
    },
    open: false,
    injectChanges: true
  }
  browserSync.init(serverConf);
});

gulp.task('styles', () =>
  gulp.src('source/css/**/*.scss')
    .pipe(sass({outputStyle: 'uncompressed', includePaths: require('node-normalize-scss').includePaths}).on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(reload({stream:true}))
);
// <----- change the outputstyle:compressed for production

gulp.task('scripts', () =>
  browserify('source/js/main.js')
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    //.pipe(uglify()) // now gulp-uglify works 
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream:true}))
);

gulp.task('vendor', () =>
  gulp.src('source/js/vendor/*.js')
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream:true}))
);

gulp.task('lint', () =>
   gulp.src('source/js/**/*.js')
  .pipe(lint({configFile:'eslint.config.json'}))
  .pipe(lint.format())
);

gulp.task('fonts', () => 
  gulp.src('source/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'))
    .pipe(reload({stream:true}))
);

gulp.task('images', () =>
    gulp.src('source/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images/'))
        .pipe(reload({stream:true}))
);

// Build
gulp.task('build', ['clean:all', 'styles', 'scripts', 'vendor', 'fonts', 'images']);

// Sync
gulp.task('sync', ['sync:site']);

//Watch
gulp.task('watch', () => {
    gulp.watch('source/css/**/*.scss',['styles']);
    gulp.watch('source/js/**/*.js',['scripts','lint','vendor']);
    gulp.watch('source/fonts/**/*.*',['fonts']);
    gulp.watch('source/img/**/*.*',['images']);

});

gulp.task('default', ['lint', 'build', 'sync','watch']);