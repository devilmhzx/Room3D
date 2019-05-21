import LMAudio from '3d/THREEJS/LMAudio'

let that = null
class MusicVisual {
  constructor() {
    that = this
    this.lmaudio = new LMAudio()

    this.animateCallback = null
    this.callbackName = 'default'
    this.animateId = 0
    this.initStats()
  }

  loop() {
    that.stats.update()
    that.animateCallback && that.animateCallback()
    that.animateId = requestAnimationFrame(that.loop)
  }

  // 注册动画
  registAnimationFrame(callback, name) {
    this.animateCallback = callback
    this.callbackName = name
  }

  // 停止动画
  stopAnimationFrame() {
    cancelAnimationFrame(this.animateId)
  }

  // 开始动画
  startAnimationFrame() {
    this.loop()
  }
  
  // 性能监控
  initStats() {
    this.stats = new Stats()
    this.stats.domElement.style.position = 'absolute'; //绝对坐标  
    this.stats.domElement.style.left = '10px';// (0,0)px,左上角  
    this.stats.domElement.style.top = '10px';  
    document.body.appendChild(this.stats.domElement);  
  }
}

let musicObj = new MusicVisual()
window.lmmusic = musicObj
export default musicObj

