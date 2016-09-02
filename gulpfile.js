// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var order = require("gulp-order");
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('./sass/*.scss')
        .pipe(order([
          "reset.scss",
          "base.scss",
          "main.scss",
          "extend.scss"
        ]))
        .pipe(sass())
        .pipe(concat('css.css'))
        .pipe(gulp.dest('./css'))
        .pipe(rename('css3.0.css'))
        .pipe(minifyCss({
          advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
          compatibility: 'ie7',//类型：String 默认：''or'*' [启用兼容模式；'ie7'：IE7兼容模式]
          keepBreaks: false//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./scripts/*.js')
        .pipe(concat('js.js'))
        .pipe(gulp.dest('./js'))
        .pipe(rename('home.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./scripts/*.js', function(){
        gulp.run('lint', 'scripts');
    });
    // 监听文件变化
    gulp.watch('./sass/*.scss', function(){
        gulp.run('sass');
    });
});