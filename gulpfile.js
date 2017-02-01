var gulp = require('gulp');
var webserver = require('gulp-webserver');
var gls = require('gulp-live-server');
var port = 8000;
var localhost = '127.0.0.1'

gulp.task('start-server',function(){
	gulp.src('./')
        .pipe(webserver({
            open: 'http://' + localhost + ':' + port + '/#/'
        }));
    var server = gls.new('server.js');
		server.start();
});

gulp.task('default', ['start-server']);
