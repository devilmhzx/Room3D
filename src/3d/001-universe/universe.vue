<template>
  <div class="box">
    	<div id="canvasFather"></div>
  </div>
</template>

<script>
import musicVisual from '3d/MusicVisual'
import common from './Common'
window.lmthree = common
let that = null
export default {
  mounted() {
    that = this
    let options = {
      renderOption: {
        canvasFatherId: 'canvasFather'
      }
    }
    common.init(options)
    musicVisual.registAnimationFrame(this.loop)
  },
  destroyed() {
    common.uninstall()
  },
  methods: {
    loop() {
      common.rendering()
      if(musicVisual.lmaudio.subject.playing) {
        let degree = musicVisual.lmaudio.getAverageFrequency()
        common.object.duststream.speed(parseInt(degree))
        common.object.robot.blinkLoop();
        common.object.robot.idleAnimation()
      }
    }
  }
}
</script>

<style lang="scss">
.box {
  width: 100%;
	height: 100%;

  #container {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background:#000000;
  }
}
</style>
