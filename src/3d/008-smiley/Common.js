import LMThree from '3d/THREEJS/LMThree'
let TweenMax = window.TweenMax

let vertex = require('./vertex.vs')
let frag = require('./fragment.fs')

class Common extends LMThree{
  constructor(){
    super()
    this.object = {}
    this.uniforms= {
      resolution: {
        value: new THREE.Vector2()
      },
      iTime: {
        type: "f",
        value: 1.0
      },
      iResolution: {
        type: "v2",
        value: new THREE.Vector2()
      }};
  }

  initObjects() {
    this.uniforms.resolution.value = new THREE.Vector2(this.render.getSize().width, this.render.getSize().hieght)
    this.uniforms.iResolution.value.x = this.render.getSize().width;
    this.uniforms.iResolution.value.y = this.render.getSize().height;
    var geometry = new THREE.PlaneBufferGeometry(2, 2);
    var material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: frag
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.name="shaderTest";
    this.scene.add(mesh);
  }
  initControl() {
    super.initControl()
    this.control.enabled = true
  }

  updata(degree) {
    degree = degree/800;
    this.uniforms.iTime.value += degree;
  }
}
export default new Common()