var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mongodbData = require('gulp-mongodb-data');

gulp.task('default', function(){
    nodemon({
        script:'app.js',
        ext:'js',
        env:{
            PORT:8000
        },
        ignore:['./node_modules/**']
    })
    .on('restart', function(){
        console.log('the Server has been restarted ');
    });
});

gulp.task('metadata', function() {
  gulp.src('./metadata/*.json')
    .pipe(mongodbData({ mongoUrl: 'mongodb://localhost/ecommerce' }));
});