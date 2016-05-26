var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    prefix       = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    cssnano      = require('gulp-cssnano'),
    gulpif       = require('gulp-if'),
    deploy       = require("gulp-gh-pages"),
    sourcemaps   = require('gulp-sourcemaps'),
    cp           = require('child_process'),
    browserSync  = require('browser-sync'),
    runSequence  = require('run-sequence'),
    argv         = require('yargs').argv,
    del          = require('del'),
    bourbon      = require('node-bourbon').includePaths,
    pngquant     = require('imagemin-pngquant'),
    environments = require('gulp-environments'),
    development  = environments.development,
    production   = environments.production;

/**
 * General Build Site
 */
gulp.task('build', function(done) {
  environments.current(production);
  runSequence('clean', ['sass', 'scripts', 'imagemin'], 'jekyll-build', function() {
    console.log("Build Successful!");
    done();
  });
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function(done) {
  return cp.exec('bundle exec jekyll build', function(error, stdout, stderr) {
    if (error) {
      process.stderr.write(String(error));
      return; }
    process.stdout.write(String(stdout));
    process.stderr.write(String(stderr));
  }).on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Clean the Jekyll Site
 */
gulp.task('clean', function(done) {
  del('assets');
  return cp.exec('bundle exec jekyll clean', function(error, stdout, stderr) {
    if (error) {
      process.stderr.write(String(error));
      return; }
    process.stdout.write(String(stdout));
    process.stderr.write(String(stderr));
  }).on('close', done);
});

/**
* github pages deploy
*/
gulp.task("deploy", ["build"], function () {
  return gulp.src("./_site/**/*")
    .pipe(deploy({
      branch: "master",
      message: argv.m
    }));
});

/**
 * Wait for build, then launch the Server
 */
gulp.task('browser-sync', function(done) {
  runSequence(['sass', 'scripts', 'imagemin'], 'jekyll-build', function() {
    browserSync.init({
      notify: false,
      server: {
          baseDir: "./_site"
      }
    });
    done();
  });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and css (for future jekyll builds)
 */
gulp.task('sass', function () {
  return gulp.src('_sass/main.sass')
    .pipe(development(sourcemaps.init()))
    .pipe(sass({
        includePaths: [bourbon],
        onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(development(sourcemaps.write()))
    .pipe(production(cssnano()))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'));
});

/**
 * minify files from _js/ into _js/min for scripts
 */
gulp.task('minify', function() {
  return gulp.src('_js/*.js')
    .pipe(production(uglify()))
    .pipe(gulp.dest('_js/min'));
});

/**
 * concat main files from _js/min into /js for rebuild
 */
gulp.task('scripts-main', ['minify'], function() {
  return gulp.src(['_js/min/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('assets/js'));
});

/**
 * concat search files from _js/min into /js for rebuild
 */
gulp.task('scripts-search', ['minify'], function() {
  return gulp.src(['_js/min/lunr.js', '_js/min/search.js'])
    .pipe(concat('search.min.js'))
    .pipe(gulp.dest('assets/js'));
});

/**
 * merge scripts tasks
 */
gulp.task('scripts', ['scripts-main', 'scripts-search']);

/**
 * minify images from _img/ into assets/img
 */
gulp.task('imagemin', function () {
  return gulp.src('_img/*')
    .pipe(production(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('assets/img'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch('_img/**/*', ['imagemin', 'rebuild']);
  gulp.watch('_sass/**/*', ['sass']);
  gulp.watch('_js/*.js', ['scripts', 'rebuild']);
  gulp.watch(['*.html', '_layouts/*.html', '_posts/*', '_includes/*'], ['rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', function (done) {
  runSequence('clean', 'browser-sync', 'watch', function () {
    done();
  });
});
