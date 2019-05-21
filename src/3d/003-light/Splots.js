// 参考自: https://codepen.io/tmrDevelops/pen/rVNxVQ
let that = null
class Splots {
  constructor(canvasId) {
    that = this
    let canvas = document.getElementById(canvasId)
    this.$ = canvas.getContext('2d');
    this.w = canvas.width = window.innerWidth;
    this.h = canvas.height = window.innerHeight;
    this._w = this.w * 0.5;
    this._h = this.h * 0.5;
    this.arr = [];
    this.cnt = 0;
  }

  disappear() {
    that.$.clearRect(0, 0, that.w, that.h);
    for (var i = 0; i < that.arr.length; i++) {
      let splot = that.arr[i];;
      that.$.fillStyle = that.rndCol();
      that.$.beginPath();
      that.$.arc(splot.x, splot.y, splot.r, 0, Math.PI * 2, true);
      that.$.shadowBlur = 80;
      that.$.shadowOffsetX = 2;
      that.$.shadowOffsetY = 2;
      that.$.shadowColor = that.rndCol();
      that.$.globalCompositeOperation = 'lighter';
      that.$.fill();
  
      // 将该点移动同时半径减小
      splot.x = splot.x + splot.spX;
      splot.y = splot.y + splot.spY;
      splot.r = splot.r * 0.96;
      
      if(splot.r < 5) {
        that.arr.splice(splot)
      }
    }
  }
  draw(count) {
    let addCount = count - that.arr.length
    for(let i = 0; i < addCount; i++) {
      let splot = {
        x: that.rng(that._w - 900, that._w + 900),
        y: that.rng(that._h - 900, that._h + 900),
        r: that.rng(20, 80),
        spX: that.rng(-1, 1),
        spY: that.rng(-1, 1)
      };
      that.arr.push(splot);
    }
  }

  anim(number) {
    that.cnt = Number.parseInt(number)
    that.draw(that.cnt)
    that.disappear()
  }
  
  rndCol() {
    var r = Math.floor(Math.random() * 180);
    var g = Math.floor(Math.random() * 60);
    var b = Math.floor(Math.random() * 100);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  
  rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
export default Splots
