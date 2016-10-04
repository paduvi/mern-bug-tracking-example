/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');

var production = process.env.NODE_ENV === 'production';

gulp.task('bundle', function () {
    return bundleFile(false);
});

gulp.task('watch', function () {
    return bundleFile(true);
});

function bundleFile(watch) {
    var bundler = browserify({
        entries: ['src/App.js'],
        debug: !production,
        cache: {},
        packageCache: {},
        fullPaths: watch
    });
    if (watch) {
        bundler = watchify(bundler)
    }

    function makeBundle() {
        return bundler
            .transform('babelify', {presets: ["es2015", "react"]})
            .bundle()
            .on('error', function (err) {
                console.error(err.message);
                console.error(err.codeFrame);
                this.emit('end');
            })
            .pipe(source('bundle.js')) // gives streaming vinyl file object
            .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
            .pipe(uglify()) // now gulp-uglify works
            .pipe(gulp.dest('static/'))
            .on('finish', function () {
                console.log("Bundle updated successfully at " + new Date());
            });
    };

    bundler.on('update', makeBundle);
    return makeBundle();
}

// Default Task
gulp.task('default', ['watch']);