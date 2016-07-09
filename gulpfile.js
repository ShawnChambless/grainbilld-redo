var gulp        = require( 'gulp' ),
    prefix      = require( 'gulp-autoprefixer' ),
    concat      = require( 'gulp-concat' ),
    annotate    = require( 'gulp-ng-annotate' ),
    plumber     = require( 'gulp-plumber' ),
    sass        = require( 'gulp-sass' ),
    compressCss = require( 'gulp-uglifycss' ),
    uglify      = require( 'gulp-uglify' ),
    watch       = require( 'gulp-watch' ),
    rename      = require( 'gulp-rename' ),
    sourceMaps  = require( 'gulp-sourcemaps' ),
    paths = {
        scss: ['public/app/styles/**/*.scss'],
        scripts: [
          'public/node_modules/jquery/dist/jquery.js',
          'public/node_modules/bootstrap/dist/js/bootstrap.js',
          'public/node_modules/fastclick/lib/fastclick.js',
          'public/node_modules/angular/angular.js',
          'public/node_modules/angular-animate/angular-animate.js',
          'public/node_modules/angular-aria/angular-aria.js',
          'public/node_modules/angular-material/angular-material.js',
          'public/node_modules/angular-ui-router/release/angular-ui-router.js',
          'public/node_modules/angular-material-icons/angular-material-icons.js',
          'public/app/**/*.js'
        ]
    };

gulp.task('scss', function(done) {
    gulp.src('public/app/styles/Main.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(prefix())
        .pipe(gulp.dest('public/dist/styles'))
        .on('end', done);
});

gulp.task('minifyJS', function(done) {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(concat('scripts.min.js'))
        .pipe(sourceMaps.init())    
        .pipe(annotate())
        // .pipe(uglify())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./public/dist/app'))
        .on('end', done);
});

gulp.task('watch', function() {
    gulp.watch(paths.scss, ['scss']);
    gulp.watch(paths.scripts, ['minifyJS']);
});

gulp.task('default', ['scss', 'minifyJS', 'watch']);
