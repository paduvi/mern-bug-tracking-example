/**
 * Created by Cho To Xau Tinh on 03-Oct-16.
 */
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
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
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('static/'))
            .on('end', function () {
                console.log("Bundle updated, success");
            });
    };

    bundler.on('update', makeBundle);
    return makeBundle();
}

// Default Task
gulp.task('default', ['watch']);