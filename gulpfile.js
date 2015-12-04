var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');

gulp.task('siamhtml', function() {
console.log('SiamHTML');
});

gulp.task('sass', function () {
    // ให้คอมไพล์ .scss ทุกไฟล์ที่อยู่ในโฟลเดอร์ scss
    return gulp.src(['scss/**/*.scss'])
        .pipe(sass({
         compass: true, // ใช้ Compass 
         style: 'compressed', // เลือก output แบบ compressed
        }))
        .on('error', function (err) { 
         console.log(err.message); 
        })
        .pipe(gulp.dest('css')) // เก็บไฟล์ css ไว้ที่โฟลเดอร์ css
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

var paths = {
 scripts: ['app/scripts/**/*.js'],
 html: ['app/index.html', '!app/test.html'], 
 dist: ['dist/']
};

gulp.task('default', function(){
 gulp.src(paths.scripts.concat(paths.html))
 .pipe(gulp.dest(paths.dist));
});

gulp.task('defaults', ['siamhtml','browser-sync'], function() {
    //gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch(['**/*.html'], browserSync.reload);
    gulp.watch(['css/**/*.css'], browserSync.reload);
});