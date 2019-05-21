<template>
  <div>
      <div id="canvasFather"></div>
      <div class="windmill">
        <div class="stick"></div>
        <div class="wind" ref="wind">
            <div class="wind1"></div>
            <div class="wind2"></div>
            <div class="wind3"></div>
            <div class="wind4"></div>
        </div>
      </div>
  </div>
</template>

<script>
import musicVisual from '3d/MusicVisual'

let angle = 0
let wind = null
let that = null
let oldv = 0
window.angle = angle
export default {
  destroyed() {
     musicVisual.stopAnimationFrame()
  },
  mounted() {
    that = this
    wind = this.$refs['wind']
    musicVisual.registAnimationFrame(this.loop)
  },
  methods: {
    loop() {
      if(musicVisual.lmaudio.subject.playing) {
        let v = musicVisual.lmaudio.getAverageFrequency()
        angle += Number.parseInt(v*0.5)
        if (angle>10000) angle = 0
        wind.style.webkitTransform=`rotate(${-angle}deg)`
        oldv = v
      }
    }
  }
}
</script>

<style>
 .windmill{
      width:100px;
      height:100px;
      position:relative;
      margin:100px auto;
    }
    .stick{
      width:6px;
      height:200px;
      position:absolute;
      background:#a86;
      top:50px;
      left:47px;
    }
    .stick:before{
      content:"";
      position:absolute;
      width:50px;height:10px;
      top:195px;left:-22px;
      background:#ddd;
      border-radius:50%;
      z-index:-1;
    }
    .wind{
      width:100px;
      height:100px;
      position:absolute;
    }
    .wind:after{
      content:"";
      position:absolute;
      top:45px;
      left:45px;
      width:10px;height:10px;
      background:#eee;
      border-radius:50%;
    }
    .wind1,.wind2,.wind3,.wind4{
      width:90px;
      height:40px;
      position:absolute;
      margin:13px 0 0 -41px;
      background:#cef;
      border-bottom-left-radius:40% 100%;
    }
    .wind1:after,.wind2:after,.wind3:after,.wind4:after{
      content:"";
      position:absolute;
      right:0px;
      width:65px;
      height:40px;
    }
    .wind1{
      transform:rotate(45deg);
      -moz-transform:rotate(45deg);
      -webkit-transform:rotate(45deg);
      -o-transform:rotate(45deg);
      background:#f39c12;
    }.wind1:after{background-image:radial-gradient(circle at 0px 0px, rgba(241, 196, 15,0) 40px, #f1c40f 41px);}
    .wind2{
      left:63px;
      top:-28px;
      transform:rotate(135deg);
      -moz-transform:rotate(135deg);
      -webkit-transform:rotate(135deg);
      -o-transform:rotate(135deg);
      background:#e74c3c;
    }.wind2:after{background-image:radial-gradient(circle at 0px 0px, rgba(255, 4, 4,0) 40px, #d33 41px);}
    .wind3{
      left:92px;
      top:35px;
      transform:rotate(225deg);
      -moz-transform:rotate(225deg);
      -webkit-transform:rotate(225deg);
      -o-transform:rotate(225deg);
      background:#27ae60;
    }.wind3:after{background-image:radial-gradient(circle at 0px 0px, rgba(241, 196, 15,0) 40px, #2ecc71 41px);}
    .wind4{
      left:29px;
      top:63px;
      transform:rotate(315deg);
      -moz-transform:rotate(315deg);
      -webkit-transform:rotate(315deg);
      -o-transform:rotate(315deg);
      background:#2980b9;
    }.wind4:after{background-image:radial-gradient(circle at 0px 0px, rgba(52, 152, 219,0) 40px, #3498db 41px);}
</style>
