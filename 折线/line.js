const scene = new THREE.Scene();
const ww = window.innerWidth
const wh = window.innerHeight

const renderer = new THREE.WebGLRenderer()
renderer.setSize(ww, wh)
document.body.append(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 500)
camera.position.set(0,0,100)
camera.lookAt(0,0,0)
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } )

const points = [
  new THREE.Vector3(-10,0,0),
  new THREE.Vector3(0,10,0),
  new THREE.Vector3(10,0,0),
]

const geometry = new THREE.BufferGeometry().setFromPoints( points )
const line = new THREE.Line(geometry, material)
scene.add(line)
renderer.render(scene, camera)