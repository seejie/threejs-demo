/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
/**
 * 创建网格模型
 */
// var geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
var material = new THREE.MeshLambertMaterial({
  color: 0x0000ff
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中
/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
// console.log(scene)
// console.log(scene.children)
/**
 * 相机设置
 */
var width = window.innerWidth; //窗口宽度
var height = window.innerHeight; //窗口高度
var k = width / height; //窗口宽高比
var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
//执行渲染操作   指定场景、相机作为参数
// renderer.render(scene, camera);

// 渲染函数
// function render() {
//   renderer.render(scene,camera);//执行渲染操作
//   mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
// }
// //间隔20ms周期性调用函数fun,20ms也就是刷新频率是50FPS(1s/20ms)，每秒渲染50次
// setInterval("render()", 20);

// requestAnimationFrame
// function render() {
//   renderer.render(scene,camera);//执行渲染操作
//   mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
//   requestAnimationFrame(render);//请求再次执行渲染函数render
// }
// render();

// 均匀旋转
// 在实际执行程序的时候，可能requestAnimationFrame(render)请求的函数并不一定能按照理想的60FPS频率执行，
// 两次执行渲染函数的时间间隔也不一定相同，如果执行旋转命令的rotateY的时间间隔不同，旋转运动就不均匀，
// 为了解决这个问题需要记录两次执行绘制函数的时间间隔。
// 使用下面的渲染函数替换原来的渲染函数即可，rotateY()的参数是0.001*t，
// 也意味着两次调用渲染函数执行渲染操作的间隔t毫秒时间内，立方体旋转了0.001*t弧度，
// 很显然立方体的角速度是0.001弧度每毫秒(0.0001 rad/ms = 1 rad/s = 180度/s)。
// CPU和GPU执行一条指令时间是纳秒ns级，相比毫秒ms低了6个数量级，
// 所以一般不用考虑渲染函数中几个计时语句占用的时间，除非你编写的是要精确到纳秒ns的级别的标准时钟程序。
let T0 = new Date();//上次时间
function render() {
  let T1 = new Date();//本次时间
  let t = T1-T0;//时间差
  T0 = T1;//把本次时间赋值给上次时间
  requestAnimationFrame(render);
  renderer.render(scene,camera);//执行渲染操作
  mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
}
render();