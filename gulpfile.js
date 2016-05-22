var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mongodbData = require('gulp-mongodb-data');

gulp.task('default', function(){
    nodemon({
        script:'server.js',
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
    //.pipe(mongodbData({ mongoUrl: 'mongodb://localhost/E-com' }));
    //to work with the remote db use this one
    .pipe(mongodbData({ mongoUrl: 'mongodb://hamza:hamza@ds025742.mlab.com:25742/e-commerce' }));
});