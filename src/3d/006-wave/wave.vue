<template>
     <div>
        <input v-if="showOffline" class="localFile" type="file" id="files" @change="fileImport" />
        <div id="canvasFather"></div>
     </div>
</template>

<script>
import musicVisual from '3d/MusicVisual'
import common from './Common'
window.lmthree = common

let that = null

export default {
  data() {
    return {
      showOffline: musicVisual.lmaudio.mode === 'dev' // 离线开发
    }
  },
  mounted() {
    that = this
    let options = {
      renderOption: {
        canvasFatherId: 'canvasFather'
      }
    }
    common.init(options)
    musicVisual.registAnimationFrame(this.loop,'wave')
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
        common.drawWave(degree)
      }
    },
    fileImport() {
        var file = document.getElementById('files').files[0];
        musicVisual.lmaudio.loadAudioLocal(file);
    }
  }
}
</script>

<style>
#canvasFather {
  background-color: #000;
      background-image: radial-gradient(ellipse farthest-corner at center top, #003466 0%, #000000 80%);
}

.localFile {
  position: absolute;
  top: 10%;
}

.download {
  position: absolute;
  top: 10%;
  right: 5%;
}

</style>
