var gulp = require("gulp");
var webserver = require('gulp-webserver');
var urlTool = require('url');
var miniCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
//压缩css
gulp.task('minicss', function() {
    gulp.src('./src/css/*.css')
        .pipe(miniCss('style.min.css')) //设置压缩后的文件名
        .pipe(gulp.dest('./dist/'));
});
//压缩js
gulp.task('uglify', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

//起服务
gulp.task('server', function() {
    gulp.src('dist')
        .pipe(webserver({
            host: 'localhost',
            port: 8080,
            livereload: true, //实时更新
            open: true,
            middleware: function(req, res, next) {
                next() //拦截请求
            }
        }))
});
gulp.task("default", ["uglify", "minicss", "server"])