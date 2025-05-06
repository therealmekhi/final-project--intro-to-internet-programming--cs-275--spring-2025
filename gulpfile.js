// Gulp File
const { src, dest, parallel, series, watch } = require(`gulp`);
const browserSync = require(`browser-sync`).create();
const htmlValidator = require(`gulp-html-validator`);
const stylelint = require(`gulp-stylelint`);
const eslint = require(`gulp-eslint`);
const htmlmin = require(`gulp-htmlmin`);
const cleanCSS = require(`gulp-clean-css`);
const terser = require(`gulp-terser`);
const babel = require(`gulp-babel`);

// Development Tasks
const validateHTML = () =>
    src(`app/html/*.html`)
        .pipe(htmlValidator());

const validateCSS = () =>
    src(`app/css/*.css`)
        .pipe(stylelint({ reporters: [{ formatter: `string`, console: true }] }));

const validateJS = () =>
    src(`app/js/*.js`)
        .pipe(eslint()).pipe(eslint.format());

const transpileJSForDev = () =>
    src(`app/js/*.js`)
        .pipe(babel({ presets: [`@babel/preset-env`] }))
        .pipe(dest(`dist/js`));

const devServe = () => {
    browserSync.init({
        server: {
            baseDir: `./`,
            index: `app/html/index.html`
        },
    });

    watch(`app/html/*.html`, series(validateHTML)).on(`change`, browserSync.reload);
    watch(`app/css/*.css`, series(validateCSS)).on(`change`, browserSync.reload);
    watch(`app/js/*.js`, series(validateJS, transpileJSForDev))
        .on(`change`, browserSync.reload);
};

// Production Tasks
const compressHTML = () =>
    src(`app/html/*.html`)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest(`prod/html`));

const compressCSS = () =>
    src(`app/css/*.css`)
        .pipe(cleanCSS())
        .pipe(dest(`prod/css`));

const compressJS = () =>
    src(`app/js/*.js`)
        .pipe(terser())
        .pipe(dest(`prod/js`));

const transpileJSForProd = () =>
    src(`app/js/*.js`)
        .pipe(babel({ presets: [`@babel/preset-env`] }))
        .pipe(terser())
        .pipe(dest(`prod/js`));

const build = series(
    parallel(compressHTML, compressCSS, transpileJSForProd)
);

// Exports
exports.validateHTML = validateHTML;
exports.validateCSS = validateCSS;
exports.validateJS = validateJS;
exports.transpileJSForDev = transpileJSForDev;
exports.transpileJSForProd = transpileJSForProd;
exports.compressHTML = compressHTML;
exports.compressCSS = compressCSS;
exports.compressJS = compressJS;
exports.build = build;
exports.default = devServe;
