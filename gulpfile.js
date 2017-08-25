/**
 * @file
 *
 * Gulp tasks for evolution.
 *
 * Table of contents:
 *   1. Styles
 *   2. Scripts
 *   3. Images
 *   4. Fonts
 *   5. Jekyll
 *   6. Misc.
 */

// Define variables.
var appendPrepend  = require('gulp-append-prepend');
var autoprefixer   = require('autoprefixer');
var browserSync    = require('browser-sync').create();
var cache          = require('gulp-cache');
var cleancss       = require('gulp-clean-css');
var concat         = require('gulp-concat');
var del            = require('del');
var gulp           = require('gulp');
var gutil          = require('gulp-util');
var imagemin       = require('gulp-imagemin');
var jpegRecompress = require('imagemin-jpeg-recompress');
var notify         = require('gulp-notify');
var postcss        = require('gulp-postcss');
var rename         = require('gulp-rename');
var run            = require('gulp-run');
var runSequence    = require('run-sequence');
var sass           = require('gulp-ruby-sass');
var uglify         = require('gulp-uglify');

// Include paths.
var paths          = require('./_assets/gulp_config/paths');

// -----------------------------------------------------------------------------
//   1: Styles
// -----------------------------------------------------------------------------

/**
 * Task: build:styles:main
 *
 * Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
 * outputs file to the appropriate location.
 */
gulp.task('build:styles:main', function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

/**
 * Task: build:styles:critical
 *
 * Processes critical CSS, to be included in head.html.
 */
gulp.task('build:styles:critical', function() {
    return sass(paths.sassFiles + '/critical*.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest('_includes/css'))
        .on('error', gutil.log);
});

/**
 * Task: build:styles:css
 *
 * Copies any other CSS files to the assets directory, to be used by pages/posts
 * that specify custom CSS files.
 */
gulp.task('build:styles:css', function() {
    return gulp.src([paths.sassFiles + '/*.css'])
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
      .pipe(cleancss())
      .pipe(gulp.dest(paths.jekyllCssFiles))
      .pipe(gulp.dest(paths.siteCssFiles))
      .on('error', gutil.log);
});

/**
 * Task: build:styles
 *
 * Builds all site styles.
 */
gulp.task('build:styles', [
    'build:styles:main',
    'build:styles:critical',
    'build:styles:css'
]);

/**
 * Task: clean:styles
 *
 * Deletes all processed site styles.
 */
gulp.task('clean:styles', function(callback) {
    del([paths.jekyllCssFiles, paths.siteCssFiles, '_includes/critical.css']);
    callback();
});

// -----------------------------------------------------------------------------
//   2: Scripts
// -----------------------------------------------------------------------------

/**
 * Task: build:scripts:global
 *
 * Concatenates and uglifies global JS files and outputs result to the
 * appropriate location.
 */
gulp.task('build:scripts:global', function() {
    return gulp.src([
        paths.jsFiles + '/global/lib/jquery-2.1.3.min.js',
        paths.jsFiles + '/global/lib/modernizr-custom.js',
        paths.jsFiles + '/global/bootstrap/tether.min.js',
        paths.jsFiles + '/global/bootstrap/bootstrap.min.js',
        paths.jsFiles + '/global/forms' + paths.jsPattern, 
        paths.jsFiles + '/global/extras' + paths.jsPattern, 
        paths.jsFiles + '/global/main.js'
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())

        // We need to add front matter so Jekyll will process variables.
        .pipe(appendPrepend.prependFile('./_assets/gulp_config/front-matter.txt'))

        // Only place in `assets` because Jekyll needs to process the file.
        .pipe(gulp.dest(paths.jekyllJsFiles))
        .on('error', gutil.log);
});


/**
 * Task: build:scripts
 *
 * Builds all scripts.
 */
gulp.task('build:scripts', ['build:scripts:global']);

/**
 * Task: clean:scripts
 *
 * Deletes all processed scripts.
 */
gulp.task('clean:scripts', function(callback) {
    del([paths.jekyllJsFiles, paths.siteJsFiles]);
    callback();
});

// -----------------------------------------------------------------------------
//   3: Images
// -----------------------------------------------------------------------------

/**
 * Task: build:images
 *
 * Optimizes and copies image files.
 *
 * We're including imagemin options because we're overriding the default JPEG
 * optimization plugin.
 */
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(cache(imagemin([
            imagemin.gifsicle(),
            jpegRecompress(),
            imagemin.optipng(),
            imagemin.svgo()
        ])))
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

/**
 * Task: clean:images
 *
 * Deletes all processed images.
 */
gulp.task('clean:images', function(callback) {
    del([paths.jekyllImageFiles, paths.siteImageFiles]);
    callback();
});

// -----------------------------------------------------------------------------
//   4: Fonts
// -----------------------------------------------------------------------------

/**
 * Task: build:fonts
 *
 * Copies fonts.
 */
gulp.task('build:fonts', ['fontawesome']);

/**
 * Task: fontawesome
 *
 * Places Font Awesome fonts in the proper location.
 */
gulp.task('fontawesome', function() {
    return gulp.src([
        paths.fontFiles + '/**.*',
        paths.fontFiles + '/font-awesome/**.*'
        ])
        .pipe(rename(function(path) {path.dirname = '';}))
        .pipe(gulp.dest(paths.jekyllFontFiles))
        .pipe(gulp.dest(paths.siteFontFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

/**
 * Task: clean:fonts
 *
 * Deletes all processed fonts.
 */
gulp.task('clean:fonts', function(callback) {
    del([paths.jekyllFontFiles, paths.siteFontFiles]);
    callback();
});

// -----------------------------------------------------------------------------
//   5: Jekyll
// -----------------------------------------------------------------------------

/**
 * Task: build:jekyll
 *
 * Runs the jekyll build command.
 */
gulp.task('build:jekyll', function() {
    var shellCommand = 'bundle exec jekyll build --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});


/**
 * Task: build:jekyll:local
 *
 * Runs the jekyll build command using the test and local config files.
 */
gulp.task('build:jekyll:local', function() {
    var shellCommand = 'bundle exec jekyll build --destination docs/ --future --config _config.yml,_config.dev.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

/**
 * Task: clean:jekyll
 *
 * Deletes the entire _site directory.
 */
gulp.task('clean:jekyll', function(callback) {
    del(['docs']);
    callback();
});

/**
 * Task: clean
 *
 * Runs all the clean commands.
 */
gulp.task('clean', ['clean:jekyll',
    'clean:fonts',
    'clean:images',
    'clean:scripts',
    'clean:styles']);

/**
 * Task: build
 *
 * Build the site anew.
 */
gulp.task('build', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles', 'build:fonts'],
        'build:jekyll',
        callback);
});

/**
 * Task: build:test
 *
 * Builds the site anew using test config.
 */
gulp.task('build:test', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles', 'build:fonts'],
        'build:jekyll:test',
        callback);
});

/**
 * Task: build:test
 *
 * Builds the site anew using test and local config.
 */
gulp.task('build:local', function(callback) {
    runSequence('clean',
        ['build:scripts', 'build:images', 'build:styles', 'build:fonts'],
        'build:jekyll:local',
      callback);
});

/**
 * Task: default
 *
 * Builds the site anew.
 */
gulp.task('default', ['build']);

/**
 * Task: build:jekyll:watch
 *
 * Special task for building the site then reloading via BrowserSync.
 */
gulp.task('build:jekyll:watch', ['build:jekyll:local'], function(callback) {
    browserSync.reload();
    callback();
});

/**
 * Task: build:scripts:watch
 *
 * Special task for building scripts then reloading via BrowserSync.
 */
gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
    runSequence('build:jekyll:local');
    browserSync.reload();
    callback();
});

/**
 * Task: serve
 *
 * Static Server + watching files.
 *
 * Note: passing anything besides hard-coded literal paths with globs doesn't
 * seem to work with gulp.watch().
 */
gulp.task('serve', ['build:local'], function() {

    browserSync.init({
        server: paths.siteDir,
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        logLevel: 'debug',
        open: true        // Toggle to automatically open page when starting.
    });

    // Watch site settings.
    gulp.watch(['_config*.yml'], ['build:jekyll:watch']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch(
      ['_assets/styles/**/*.scss'],
      ['build:styles']
    );

    // Watch .js files.
    gulp.watch('_assets/js/**/*.js', ['build:scripts:watch']);

    // Watch image files; changes are piped to browserSync.
    gulp.watch('_assets/img/**/*', ['build:images']);

    // Watch posts.
    gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);

    // Watch drafts if --drafts flag was passed.
    if (module.exports.drafts) {
        gulp.watch('_drafts/*.+(md|markdown|MD)', ['build:jekyll:watch']);
    }

    // Watch HTML and markdown files.
    gulp.watch(
      ['**/*.+(html|md|markdown|MD)', '!docs/**/*.*', '!_styleguide_assets/**/*.*', '!_assets/styles/*.md'],
      ['build:jekyll:watch']);

    // Watch RSS feed XML files.
    gulp.watch('**.xml', ['build:jekyll:watch']);

    // Watch data files.
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);

    // Watch favicon.png.
    gulp.watch('favicon.png', ['build:jekyll:watch']);
    gulp.src('')
        .pipe(run('bundle exec jekyll serve --detach'))
        .on('error', gutil.log);
});


// -----------------------------------------------------------------------------
//   6: Misc.
// -----------------------------------------------------------------------------

/**
 * Task: update:gems
 *
 * Updates Ruby gems.
 */
gulp.task('update:gems', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});

/**
 * Task: cache-clear
 *
 * Clears the gulp cache. Currently this just holds processed images.
 */
gulp.task('cache-clear', function(done) {
    return cache.clearAll(done);
});