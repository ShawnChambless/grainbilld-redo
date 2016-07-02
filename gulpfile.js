var gulp        = require( 'gulp' ),
    prefix      = require( 'gulp-autoprefixer' ),
    concat      = require( 'gulp-concat' ),
    bulkSass    = require( 'gulp-cssimport' ),
    annotate    = require( 'gulp-ng-annotate' ),
    plumber     = require( 'gulp-plumber' ),
    sass        = require( 'gulp-sass' ),
    compressCss = require( 'gulp-uglifycss' ),
    uglify      = require( 'gulp-uglify' ),
    watch       = require( 'gulp-watch' ),
    rename      = require( 'gulp-rename' ),
    paths = {
        sass: ['public/node_modules/bootstrap/dist/css/bootstrap-theme.css', 'public/styles/**/*.scss'],
        scripts: [
          'public/node_modules/jquery/dist/jquery.js',
          'public/node_modules/bootstrap/dist/js/bootstrap.js',
          'public/node_modules/angular/angular.js',
          'public/node_modules/angular-ui-router/release/angular-ui-router.js',
          'public/app/**/*.js'
        ]
    };

gulp.task('sass', function(done) {
    gulp.src('public/styles/main.sass')
        .pipe(plumber())
        .pipe(bulkSass())
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(prefix())
        .pipe(gulp.dest('./public/src/styles/'))
        .pipe(compressCss())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest('./public/dist/styles/'))
        .on('end', done);
});

gulp.task('minifyJS', function(done) {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(annotate())
        .pipe(gulp.dest('./public/src/app/'))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = ".min.js";
        }))
        .pipe(gulp.dest('./public/dist/app'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.scripts, ['minifyJS']);
});

gulp.task('default', ['sass', 'minifyJS', 'watch']);
