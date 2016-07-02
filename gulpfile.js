var gulp        = require( 'gulp' ),
    prefix      = require( 'gulp-autoprefixer' ),
    concat      = require( 'gulp-concat' ),
    bulkSass    = require( 'gulp-cssimport' ),
    jade        = require( 'gulp-jade' ),
    annotate    = require( 'gulp-ng-annotate' ),
    plumber     = require( 'gulp-plumber' ),
    sass        = require( 'gulp-sass' ),
    compressCss = require( 'gulp-uglifycss' ),
    uglify      = require( 'gulp-uglify' ),
    watch       = require( 'gulp-watch' ),
    rename      = require( 'gulp-rename' ),
    paths = {
        jade: ['public/**/*.jade'],
        sass: ['public/styles/**/*.sass', 'public/styles/**/*.scss', '!./public/styles/main.sass'],
        scripts: ['public/app/**/*.js', '!./public/app/scripts.min.js']
    };

gulp.task('jade', function(done) {
    gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .on('end', done);
});

gulp.task('sass', function(done) {
    gulp.src('public/styles/main.sass')
        .pipe(plumber())
        .pipe(bulkSass())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('./public/styles/'))
        .pipe(compressCss({
            expandVars: true,
            uglyComments: true
        }))
        .pipe(rename(function (path) {
            path.extname = "-min.css";
        }))
        .pipe(gulp.dest('public/styles/'))
        .on('end', done);
});

gulp.task('minifyJS', function(done) {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(annotate())
        .pipe(concat('scripts.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('public/app'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scripts, ['minifyJS']);
    gulp.watch('public/index.html');
});

gulp.task('default', ['jade', 'sass', 'minifyJS', 'watch']);
