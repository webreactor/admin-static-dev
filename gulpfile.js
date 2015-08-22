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
    gulpJade    = require('gulp-jade'),
    browserSync = require('browser-sync').create();

var handleError = function (error) {
    console.log(error.toString());

    this.emit('end');
};

var getJsonData = function (file, callback) {
    var jsonFiles = [];

    if (typeof config.data.core !== 'undefined') {
        jsonFiles = jsonFiles.concat(config.data.core);
    }

    var filename = path.basename(file.path, '.jade');

    if (typeof config.data[filename] !== 'undefined') {
        jsonFiles = jsonFiles.concat(config.data[filename]);
    }

    jsonFiles = jsonFiles.filter(function (item, pos) {
        return jsonFiles.indexOf(item) == pos;
    });

    var jsonData = {};

    for (var i = 0, l = jsonFiles.length; i < l; i++) {
        var exist = fs.existsSync(jsonFiles[i]);

        if (!exist) {
            continue;
        }

        var json = JSON.parse(fs.readFileSync(jsonFiles[i], { encoding: 'utf8' }));

        for (var attr in json) {
            if (json.hasOwnProperty(attr)) {
                jsonData[attr] = json[attr];
            }
        }
    }

    return callback(null, jsonData);
};

gulp.task('css-app', function () {
    return gulp.src(config.build.src.css.app)
        .pipe(gulpLess())
        .on('error', handleError)
        .pipe(gulpCsso())
        .pipe(gulpWrapper({ header: '\n/* ${filename} */\n\n' }))
        .pipe(gulpConcat('app.css'))
        .pipe(gulp.dest(config.build.dest.css))
        .pipe(browserSync.stream());
});

gulp.task('css', ['css-app']);

gulp.task('templates', function () {
    return gulp.src(config.build.src.templates)
        .pipe(gulpData(getJsonData))
        .pipe(gulpJade({
            jade:   jade,
            pretty: true
        }))
        .on('error', handleError)
        .pipe(gulp.dest(config.build.dest.templates))
        .pipe(browserSync.stream());
});

gulp.task('js-app', function () {
    return gulp.src(config.build.src.js.app)
        .pipe(gulpUglify())
        .pipe(gulpWrapper({ header: '\n// ${filename}\n\n' }))
        .pipe(gulpConcat('app.js'))
        .pipe(gulp.dest(config.build.dest.js))
        .pipe(browserSync.stream());
});

gulp.task('js', ['js-app']);

gulp.task('img', function () {
    return gulp.src(config.build.src.img)
        .pipe(gulpNewer(config.build.dest.img))
        .pipe(gulp.dest(config.build.dest.img))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src(config.build.src.fonts)
        .pipe(gulpNewer(config.build.dest.fonts))
        .pipe(gulp.dest(config.build.dest.fonts))
        .pipe(browserSync.stream());
});

gulp.task('build', ['img', 'fonts'], function () {
    gulp.start(['templates', 'css', 'js']);
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

gulp.task('watch', function () {
    browserSync.init({
        server: './web'
    });

    gulp.watch(config.watch.templates, ['templates']);
    gulp.watch(config.watch.css.app, ['css-app']);
    gulp.watch(config.watch.js.app, ['js-app']);
    gulp.watch(config.watch.img, ['img']);
    gulp.watch(config.watch.fonts, ['fonts']);
});

gulp.task('default', ['build']);