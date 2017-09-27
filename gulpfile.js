var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var watch       = require('gulp-watch');
var gutil       = require('gulp-util');
var browserify  = require('browserify');
var babel       = require('gulp-babel');


//---------- Server ---------------------------------------------
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

//---------- JS ---------------------------------------------
gulp.task('transform', function() {
    return gulp.src('./app/src/**/*.jsx')
        .pipe(babel({
            presets: ["react", "es2015"]
        }))
        .pipe(gulp.dest('./app/dist'));
})

gulp.task('js', ['transform'], function() {
    return browserify('./app/dist/main.js')
        .bundle()
        .on('error', gutil.log)
        .pipe(source('final.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public'))
});

//---------- HTML ---------------------------------------------
gulp.task('html', function() {
  return gulp
        .src(['./app/src/**/*.html'])
        .pipe(gulp.dest('./public'));
});
gulp.task('html-reload', ['html'], function (done) {
    reload();
    done();
});

//---------- default ---------------------------------------------
gulp.task('default', ['js','html','serve'], function() {
    gulp.watch('./app/**/*.jsx', ['js']);
    gulp.watch('./app/**/*.html', ['html-reload']);
});
