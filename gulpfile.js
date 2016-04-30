var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var tscConfig = require('./tsconfig.json');
var merge = require('merge2');

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

gulp.task('scripts', function() {
    var tsResult = gulp.src('src/**/*.ts')
                    .pipe(ts(tsProject));

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release/js'))
    ]);
});


gulp.task('default', ['clean','compile']);
