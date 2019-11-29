// 1.导入需要的插件
let gulp = require('gulp'),
    rename = require('gulp-rename'),
    ugify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin');
// 2.发布任务
// 测试任务
gulp.task('test',function(){
    console.log('hello gulp');
})
//将js文件夹下的es5文件夹下的都有文件压缩，以.min 为后缀，放在目标目录dist/js
gulp.task('js',()=>{
    gulp.src('./src/js/ES5/*.js')
    .pipe(concat('main.min.js'))//合并后生成新的文件，文件名后缀是main.min，所以就不用再重命名
    .pipe(ugify())
    // .pipe(rename({suffix : '.min'}))
    .pipe(gulp.dest('./dist/js'))
})
// 压缩图片
gulp.task('img',()=>{
    gulp.src('./src/img/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
})
// ES6-->ES5
gulp.task('es6',()=>{
    gulp.src('./src/js/ES6/*.js').pipe(babel({
        presets: ['@babel/env']
    })).pipe(gulp.dest('./src/js/ES5'));
})
// 监听
gulp.task('default',()=>{
    gulp.watch(['./src/js/ES5/*.js'],['js']);
    gulp.watch('./src/img/*.*',['img']);
    gulp.watch('./src/js/ES6/*.js',['es6']);
})
