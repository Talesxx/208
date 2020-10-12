const gulp=require("gulp");//gulp
const connect=require("gulp-connect");//server
const sass=require("gulp-sass");//gulp-sass
const sourcemaps=require("gulp-sourcemaps");//让其一一对应 
const babel=require("gulp-babel");

gulp.task('copyFont',done=>{
    gulp.src("font/**").pipe(connect.reload()).pipe(gulp.dest("dist/font"));
    done();
});//拷贝font文件夹

gulp.task('copyCss',done=>{
    gulp.src("css/*.css").pipe(connect.reload()).pipe(gulp.dest("dist/css"));
    done();
});//拷贝css

gulp.task('copySass',done=>{
    gulp.src("sass/*.scss").pipe(connect.reload()).pipe(sourcemaps.init()).pipe(sass()).pipe(gulp.dest("dist/css"));
    done();
});//拷贝并转换sass

gulp.task('copyImg',done=>{
    gulp.src("img/**").pipe(gulp.dest("dist/img"));
    done();
});//拷贝img

gulp.task('copyHtml',done=>{
    gulp.src("html/**").pipe(connect.reload()).pipe(gulp.dest("dist/html"));
    done();
});//拷贝html
gulp.task("copyIndex",done=>{
    gulp.src("index.html").pipe(gulp.dest("dist"));//将index.html拷贝到dist目录下 (没有这个目录则创建这个目录)
    done();
});//拷贝主页

gulp.task("copydata",done=>{
    gulp.src("json/**").pipe(gulp.dest("dist/json"));//将index.html拷贝到dist目录下 (没有这个目录则创建这个目录)
    done();
});
gulp.task("copyJavaScript",done=>{
    gulp.src('js/*.js')
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(gulp.dest('dist/js'))
    done();
});//拷贝js并转化为es5


gulp.task('watch',done=>{
    gulp.watch('index.html',gulp.series("copyIndex")); 
    gulp.watch('js/**',gulp.series("copyJavaScript")); 
    gulp.watch('img/**',gulp.series('copyImg'));
    gulp.watch('css/**',gulp.series("copyCss"));
    gulp.watch('sass/**',gulp.series("copySass"));
    gulp.watch('font/**',gulp.series("copyFont"));
    gulp.watch('html/**',gulp.series("copyHtml"));
    gulp.watch('json/**',gulp.series("copydata"));
    done();
 }) //添加监听




gulp.task("server", done => {
    connect.server({
        root: "dist",
        port: 8000,//端口号
        livereload: true//自动刷新
    })
    done();
});



gulp.task("default",gulp.series("copydata","copyJavaScript","copyIndex","copyHtml","copyFont","copySass","copyCss",'copyImg',"watch","server"));