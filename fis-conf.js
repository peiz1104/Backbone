// Css要压缩，打包，指纹
// Js要压缩，分组打包，部分模块化，指纹
//设置模块化规范
// fis.hook('commonjs');
// //压缩打包css
// fis.match('**.css',{
// 	optimizer:'clean-css',
// 	packTo:'static/pakg/css/app.css',
// 	useHash:true
// })
// //压缩所有的js
// fis.match('**.js',{
//    optimizer:'uglify-js',
//    useHash:true
// })
// //打包库文件
// fis.match('static/lib/**.js',{
// 	packTo:'static/pakg/js/lib.js'
// })
// //对逻辑业务js进行打包以及模块化
// fis.match('static/modules/**.js',{
// 	packTo:'static/pakg/js/app.js',
// 	isMod:true
// })
// fis.match("::packager",{
// 	postpackager:'loader'
// })
// // Css要压缩，打包，指纹
// // Js要压缩，分组打包，部分模块化，指纹

// 设置模块化规范
fis.hook('commonjs')

// Css要压缩，打包，指纹
fis.match('**.css', {
	optimizer: 'clean-css',
	packTo: 'static/pakg/css/app.css',
	useHash: true
})

// Js要压缩，分组打包，部分模块化，指纹
// 所有js
fis.match('**.js', {
	optimizer: 'uglify-js',
	useHash: true
})
// 处理库文件
fis.match('static/lib/**.js', {
	packTo: 'static/pakg/js/lib.js'
})
// 处理业务逻辑文件
fis.match('static/modules/**.js', {
	packTo: 'static/pakg/js/app.js',
	// 模块化
	isMod: true
})

// 配置打包插件
fis.match('::package', {
	postpackager: 'loader'
})