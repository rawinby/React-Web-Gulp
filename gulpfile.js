var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var watch       = require('gulp-watch');
var gutil       = require('gulp-util');
// var browserify  = require('gulp-browserify');
var browserify  = require('browserify');
var babel       = require('gulp-babel');
var sass        = require('gulp-sass');
var rename      = require("gulp-rename");
var cleanCSS    = require('gulp-clean-css');

//---------- Server ---------------------------------------------
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
});

//---------- Scss ---------------------------------------------
gulp.task('scss', function() {
    return gulp.src([
                './app/src/**/*.scss'             
           ])
          .pipe(sass().on('error', sass.logError))
          .pipe(rename("bundle.css"))
          .pipe(gulp.dest('./app/dist/css'));          
});

gulp.task('css', ['scss'], function() {
    return gulp.src([
        './app/dist/css/bundle.css',
        './node_modules/onsenui/css/onsenui.css',
        './node_modules/onsenui/css/onsen-css-components.min.css',
    ])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename("final.css"))    
    .pipe(gulp.dest('./public/css'))
    .pipe(reload({ stream:true }));
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
        .pipe(gulp.dest('./public/js'))
});

//---------- HTML ---------------------------------------------
gulp.task('html', function() {
  return gulp
        .src(['./app/src/**/*.html'])
        .pipe(gulp.dest('./public'));
});

gulp.task('web-reload', ['html', 'js'], function (done) {
    reload();
    done();
});

//---------- default ---------------------------------------------
gulp.task('default', ['js','css','html','serve'], function() {
    gulp.watch('./app/src/**/*.scss', ['css']);
    gulp.watch('./app/src/**/*.jsx', ['web-reload']);
    gulp.watch('./app/src/**/*.html', ['web-reload']);
});
