import Tool from '3d/THREEJS/Tool'

let TweenMax = window.TweenMax
class CatJSON {
  constructor() {
    this.cat = null
    this.t = 0
    this.timer = 0
    this.animation = false
  }
  destroyed() {
    clearInterval(this.timer)
  }

  setAnimotion(falg) {
    this.animation = falg
  }

  init(_cat) {
    if(!_cat) return

    this.cat = _cat
    let that = this
    this.timer = setInterval(() => {
      that.blink()
      that.updataHead()
    }, 2000);
  }

  blink() {
    if(!this.cat)return 
    let head = Tool.findMesh(this.cat, 'head')
    let rightEye = Tool.findMesh(head, 'rightEye')
    let leftEye = Tool.findMesh(head, 'leftEye')

    switch(this.randomNum(1,3)) {
      case 1:
        TweenMax.to(rightEye.scale, 0.07, {y: 0, 'yoyo': true, 'repeat': 1})
      break

      case 2:
        TweenMax.to(leftEye.scale, 0.07, {y: 0, 'yoyo': true, 'repeat': 1})
      break
      
      case 3:
        TweenMax.to(rightEye.scale, 0.07, {y: 0, 'yoyo': true, 'repeat': 1})
        TweenMax.to(leftEye.scale, 0.07, {y: 0, 'yoyo': true, 'repeat': 1})
      break
    }
  }

  updateTail (data) {
    if(!this.cat || !this.animation)return 
    // 0.05
    this.t += data
    let tails = []
    let p = Tool.findMesh(this.cat, 'tail')
    // 已经事先知道是7节尾巴
    for(let i = 0; i < 7;i++) {
      let c = Tool.findMesh(p, `t${i}`)
      tails.push(c)
      p = c
    }

    for (var i = 0; i < tails.length; i++) {
      var angleAmp = Math.pow(0.8,i);// 幂函数
      var rotZ = Math.sin(this.t) * (angleAmp/2) 
      tails[i].rotation.z = rotZ
    }
  }

  updataHead() {
    if(!this.cat || !this.animation)return 
    let head = Tool.findMesh(this.cat, 'head')
    TweenMax.to(head.rotation, 1, {z: -0.5})
    setTimeout(()=>{
      TweenMax.to(head.rotation, 1, {z: 0.5})
    },1000)
  }
  
  randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
      case 1: 
          return parseInt(Math.random()*minNum+1,10); 
      break; 
      case 2: 
          return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
          default: 
              return 0; 
          break; 
    } 
} 
}
export default CatJSON