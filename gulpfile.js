var config      = require('./gulp-config.json'),
    del         = require('del'),
    fs          = require('fs'),
    path        = require('path'),
    jade        = require('jade'),
    gulp        = require('gulp'),
    gulpNewer   = require('gulp-newer'),
    gulpConcat  = require('gulp-concat'),
    gulpUglify  = require('gulp-uglify'),
    gulpWrapper = require('gulp-wrapper'),
    gulpData    = require('gulp-data'),
    gulpCsso    = require('gulp-csso'),
    gulpLess    = require('gulp-less'),
    gulpJade    = require('gulp-jade');

gulp.task('css-app', function () {
    return gulp.src(config.build.src.css.app)
        .pipe(gulpLess())
        .pipe(gulpCsso())
        .pipe(gulpWrapper({header: '\n/* ${filename} */\n\n'}))
        .pipe(gulpConcat('app.css'))
        .pipe(gulp.dest(config.build.dest.css));
});

gulp.task('css', ['css-app']);

gulp.task('html', function () {
    return gulp.src(config.build.src.html)
        .pipe(gulpData(function (file, cb) {
            var filename = path.basename(file.path, '.jade');

            if (filename == 'index' || filename == 'product') {
                filename = 'categories';
            }

            var jsonPath = './assets/html/data/' + filename + '.json';

            fs.exists(jsonPath, function (exists) {
                if (exists) {
                    fs.readFile(jsonPath, {encoding: 'utf8'}, function (err, data) {
                        var json;
                        if (err) return cb(err);
                        try {
                            json = JSON.parse(data);
                        } catch (e) {
                            return cb(e);
                        }
                        cb(null, json);
                    });
                } else
                    cb(null, {});
            });
        }))
        .pipe(gulpJade({
            jade:   jade,
            pretty: true
        }))
        .pipe(gulp.dest(config.build.dest.html));
});

gulp.task('js-app', function () {
    return gulp.src(config.build.src.js.app)
        .pipe(gulpUglify())
        .pipe(gulpWrapper({header: '\n// ${filename}\n\n'}))
        .pipe(gulpConcat('app.js'))
        .pipe(gulp.dest(config.build.dest.js));
});

gulp.task('js-catalog', function () {
    return gulp.src(config.build.src.js.catalog)
        .pipe(gulpUglify())
        .pipe(gulpWrapper({header: '\n// ${filename}\n\n'}))
        .pipe(gulpConcat('catalog.js'))
        .pipe(gulp.dest(config.build.dest.js));
});

gulp.task('js-product-view', function () {
    return gulp.src(config.build.src.js.product_view)
        .pipe(gulpUglify())
        .pipe(gulpWrapper({header: '\n// ${filename}\n\n'}))
        .pipe(gulpConcat('product-view.js'))
        .pipe(gulp.dest(config.build.dest.js));
});

gulp.task('js', ['js-app', 'js-catalog', 'js-product-view']);

gulp.task('img', function () {
    return gulp.src(config.build.src.img)
        .pipe(gulpNewer(config.build.dest.img))
        .pipe(gulp.dest(config.build.dest.img));
});

gulp.task('fonts', function () {
    return gulp.src(config.build.src.fonts)
        .pipe(gulpNewer(config.build.dest.fonts))
        .pipe(gulp.dest(config.build.dest.fonts));
});

gulp.task('build', ['img', 'fonts'], function () {
    gulp.start(['html', 'css', 'js']);
});

gulp.task('clean', function () {
    del([
        'web/*.html',
        'web/css/**/*',
        'web/js/**/*',
        'web/img/**/*',
        'web/fonts/**/*'
    ], function () {
        console.log('Files deleted');
    });
});

gulp.task('default', ['build']);