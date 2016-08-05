var changed = require('gulp-changed');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var typings = require("gulp-typings");

var paths = {
	scss: "./src/**/*.scss",
	html: "./src/**/*.html",
	source: "./src/**/*.ts",
	output: "./dist",
	dtsSrc: [
		'typings/**/*.d.ts'
	]
};

gulp.task('build', ['build-system', 'build-html', 'build-scss']);

gulp.task('build-system', ['install-typings'], function() {
	typescriptCompiler = typescript.createProject('tsconfig.json', {
		typescript: require('typescript')
	});

	return gulp.src(paths.dtsSrc.concat(paths.source))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(typescript(typescriptCompiler))
			.pipe(sourcemaps.write({includeContent: true}))
			.pipe(gulp.dest(paths.output));
});

gulp.task('install-typings', function() {
	return gulp.src("./typings.json")
			.pipe(typings());
});

gulp.task('build-html', function() {
	return gulp.src(paths.html)
			.pipe(changed(paths.output, {extension: '.html'}))
			.pipe(gulp.dest(paths.output));
});

gulp.task('build-scss', function() {
	return gulp.src(paths.scss)
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(paths.output));
});

gulp.task('build-watch', ['build'], function() {
	gulp.watch(paths.source, ['build-system']);
	gulp.watch(paths.html, ['build-html']);
	gulp.watch(paths.scss, ['build-scss']);
});
