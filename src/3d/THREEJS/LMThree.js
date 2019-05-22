let THREE = window.THREE
let that = null
class LMThree {
  constructor() {
    // 场景
    this.scene = null
    // 相机
    this.camera = null
    // 渲染器
    this.render = null
    // 控制器
    this.control = null
    // 模型加载器
    this.loader = null
    this.canvasFatherId = ''
    this.size = {
      w: 0,
      h: 0,
    }
    that = this
  }

  initScene() {
    this.scene = new THREE.Scene()
    this.scene.name = 'scene'
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // this.size.w = window.innerWidth;
    // this.size.h = window.innerHeight;
    this.camera.name="2camera"
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  initLight() {
  }

  initRender(renderOption) {
    this.canvasFatherId = renderOption.canvasFatherId
    this.render = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.render.shadowMap.enabled = true;
    this.render.shadowMap.type = THREE.PCFSoftShadowMap;
    this.size.w = renderOption.width
    this.size.h = renderOption.height
    this.render.setSize(this.size.w, this.size.h);
    let container = document.getElementById(renderOption.canvasFatherId)
    container.appendChild(this.render.domElement)
    this.render.setPixelRatio( window.devicePixelRatio )
  }

  initControl() {
    this.control = new THREE.OrbitControls(this.camera, this.render.domElement)
    this.control.autoRotate = false;
    this.control.enabled = true;
  }

  initObjects() {}

  setObject(object) {
    switch(object.name) {
      case 'camera':
        this.camera = object.value
        break
    }
  }

  rendering() {
    this.render.render(this.scene, this.camera)
    this.control.update()
  }

  // 模板方法,子类实现后调用
  init(options) {
    let {sceneOption, renderOption, cameraOption} = options
    this.initScene()
    this.initRender(renderOption)
    this.initCamera()
    this.initLight()
    this.initControl()
    this.initObjects()
    
    this.scene.add(this.camera)
    // 开发工具使用
    window.camera = this.camera
    window.scene = this.scene

    window.addEventListener('resize', this.onWindowResize, false)
  }

  onWindowResize() {
    that.render.setSize(that.size.w, that.size.h);
  }
  uninstall() {
    // 卸载场景中所有内容
    let sceneObjs = this.scene.children
    for(let i = 0; i < sceneObjs.length; i++) {
      this.scene.remove(sceneObjs[i])
    }
  }

  load(name) {
    let that = this
    let loader = new THREE.ObjectLoader()
    // loader.setPath(path);
    loader.load(name, (json)=>{
      console.error(json)
      that.scene.add(json);
    }, undefined, (e)=>{
      console.error( e );
    } );
  }

  run() {
    that.rendering()
    requestAnimationFrame(that.run)
  }
}

export default LMThree