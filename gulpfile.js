var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var merge = require('merge2');
var git = require('gulp-git');

gulp.task('commit', function(){
  return gulp.src(['./src/*','./bundles/*','./ng2-commons.js'])
    .pipe(git.commit('gulp commit'));
});

gulp.task('push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('bundles/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {

    var tsResult = gulp.src('src/**/*.ts')
    .pipe(typescript(tscConfig.compilerOptions));
    return merge([
        tsResult.dts.pipe(gulp.dest('./')),
        tsResult.js.pipe(gulp.dest('bundles'))
    ]);

});

gulp.task('default', ['clean','compile','commit','push']);
