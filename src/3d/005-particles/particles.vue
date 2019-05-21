<template>
 <div id="canvasFather"></div>
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
    musicVisual.registAnimationFrame(this.loop,'particles')
  },
  destroyed() {
    musicVisual.stopAnimationFrame()
    common.uninstall()
  },
  methods: {
    loop() {
      common.rendering()
      if(musicVisual.lmaudio.subject.playing) {
        let degree = musicVisual.lmaudio.getAverageFrequency()
        common.update(degree*15)
      }
    }
  }
}
</script>

<style>
#canvasFather {
  background-color: #000;
      background-image: radial-gradient(ellipse farthest-corner at center top, #003466 0%, #000000 80%);
}
</style>
