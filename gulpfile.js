const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')        // Source folder for Sass files
      .pipe(sass().on('error', sass.logError)) // Compile Sass to CSS
      .pipe(cleanCSS())                        // Minify the compiled CSS
      .pipe(rename({ suffix: '.min' }))        // Rename the output file to .min.css
      .pipe(gulp.dest('./css'));               // Destination folder for the output
  });

//compile  scss into css

function style(){
    //where is scss
    return gulp.src('./scss/**/*.scss')
    //take and pass to sass compilr 
    .pipe(sass().on('error', sass.logError))
    // where to save the compiled css
    .pipe(gulp.dest('./css'))
    //browser-sync
    .pipe(browserSync.stream());

}

function watch(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch("./js/**/*.js").on("change", browserSync.reload);
}





exports.style = style;
exports.watch = watch;