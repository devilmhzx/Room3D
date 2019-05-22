import LMThree from 'src/3d/THREEJS/LMThree'
let THREE = window.THREE
export default class JSONTest extends LMThree{
  constructor() {
    super()
    let options = {
      renderOption: {
        canvasFatherId: 'canvasFather',
        height: document.querySelector('#canvasFather').clientHeight,
        width: document.querySelector('#canvasFather').clientWidth
      }
    }
    this.init(options)

    this.load('./cat.json')
    this.run()
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
