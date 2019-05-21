import LMThree from '3d/THREEJS/LMThree'

class Common extends LMThree{
  constructor(){
    super()
  }

  initCamera() {
    super.initCamera()
    this.camera.position.set(0, 25, -250)
    this.camera.rotation.set(-3, 0,  -179.08)
  }

  initLight() {
    let hemisphereLight = new THREE.HemisphereLight(0xffffff,0xffffff, 2.5)
    hemisphereLight.name = 'hemisphereLight'
    hemisphereLight.position.set(0, 0, 0);
    this.scene.add(hemisphereLight)
    this.render.setClearColor('#6ecccc', 1)
  }
  
}
export default new Common()