import LMThree from '3d/THREEJS/LMThree'
let TweenMax = window.TweenMax

class Common extends LMThree{
  constructor(){
    super()
    this.object = {}
  }

  initCamera() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 400000)
    camera.position.z = 550000;
    camera.position.y =10000;
    camera.lookAt( new THREE.Vector3(0,6000,0) );
    this.setObject({name: 'camera', value: camera})
  }
  initScene() {
    super.initScene()
    this.scene.fog = new THREE.Fog( 0x000000, 1, 300000 )
  }
  initLight() {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( 0, 10000, this.camera.position.z +4000 );
    spotLight.name="spotLight"
    this.scene.add(spotLight)
  }

  initObjects() {
    // 增加平面
    var planeDefinition = 100;
    var planeSize = 1245000;
    var totalObjects = 100000;
    var	plane = new THREE.Mesh( new THREE.PlaneGeometry( planeSize, planeSize, planeDefinition, planeDefinition ), new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } ) );
    plane.name="plane"
    plane.rotation.x = -Math.PI*.5;
    // this.scene.add( plane );
    this.object.plane = plane

    //增加粒子
    var totalObjects = 100000;
    var geometry = new THREE.Geometry();
    for (let i = 0; i < totalObjects; i ++) 
    { 
      var vertex = new THREE.Vector3();
      vertex.x = Math.random()*planeSize-(planeSize*.5);
      vertex.y = Math.random()*50000-5000*0.5;
      vertex.z = Math.random()*planeSize-(planeSize*.5);
      geometry.vertices.push( vertex );
    }
    var scrite = new THREE.TextureLoader().load( 'static/textures/disc.png' )
    var material = new THREE.PointsMaterial( { size: 2000,map:scrite,transparent: true});
    material.color.setHSL( 1.0, 0.3, 0.7 );
    this.object.material = material
    var particles = new THREE.Points(geometry, material)
    particles.geometry.verticesNeedUpdate = true
    particles.name = 'particles'
    this.scene.add( particles );
  }
  initControl() {
    super.initControl()
    this.control.enabled = false
  }

  update(speed) { 
    var time = Date.now() * 0.00005;
    var vertexHeight = 20000;
    let plane = this.object.plane
    for (var i = 0; i < plane.geometry.vertices.length; i++) { 
      plane.geometry.vertices[i].z += Math.random()*vertexHeight -vertexHeight; 
    } 
    this.camera.position.z -= speed; // 150
    if(this.camera.position.z < 100000) {
      TweenMax.to(this.camera.position, 0, {z: 550000})
    }
    var h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    this.object.material.color.setHSL( h, 0.5, 0.5 );
    this.camera.lookAt(this.scene.position)
  }
}
export default new Common()