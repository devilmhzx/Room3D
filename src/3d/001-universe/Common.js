import LMThree from '3d/THREEJS/LMThree'
import Robot from './Robot'
import SkyBox from './SkyBox'
import DustStream from './DustStream'

let THREE = window.THREE

class Common extends LMThree{
  constructor(){
    super()
    this.object = {}
  }

  initLight() {
    let hemisphereLight = new THREE.HemisphereLight(0xffffff,0xffffff, 0.5)
    hemisphereLight.name = 'hemisphereLight'
    hemisphereLight.position.set(0, 0, 0);

    let shadowLight = new THREE.DirectionalLight(0xffffff, 0.8);
    shadowLight.name = 'shadowLight'
    shadowLight.position.set(100, 100, 100);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400; // 产生阴影距离位置的最左边位置
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1; // 产生阴影的最近距离
    shadowLight.shadow.camera.far = 1000; // 产生阴影的最远距离
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    let backLight = new THREE.DirectionalLight(0xffffff, 0.8)
    backLight.position.set(-100, 100, 100)
    backLight.castShadow = true
    backLight.shadowDarkness = 0.1
    backLight.shadowMapWidth =  1024
    backLight.name = 'backLight'

    this.scene.add(hemisphereLight)
    this.scene.add(shadowLight)
    this.scene.add(backLight)
    super.setObject({name: 'light', value: {hemisphereLight, shadowLight, backLight}})
  }

  initCamera() {
    super.initCamera()
    this.camera.position.set(0,0,300)
  }

  initObjects() {
    // 增加人物
    let robot = new Robot()
    robot.mesh.scale.set(0.5, 0.5, 0.5);
    robot.mesh.position.y = 0
    robot.mesh.rotation.z = Math.PI/20
    robot.mesh.rotation.x = Math.PI/10
    robot.mesh.name = 'robot'
    this.scene.add(robot.mesh)
    this.object.robot = robot

    // 增加流星
    let duststream = new DustStream()
    duststream.mesh.rotation.z = Math.PI/20;
    duststream.mesh.rotation.x = Math.PI/10;
    duststream.mesh.name = 'duststream'
    this.scene.add(duststream.mesh)
    this.object.duststream = duststream

    // 增加环境
    let skybox = new SkyBox()
    skybox.mesh.name = 'skybox'
    this.scene.add(skybox.mesh)
    this.object.skybox = skybox
  }
}

export default new Common()
