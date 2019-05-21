<template>
  <div>
    <div id="canvasFather"></div>
  </div>
</template>

<script>
import musicVisual from '3d/MusicVisual'
import Tool from '3d/THREEJS/Tool'
import Cat from './CatJSON'
import common from './Common'
window.lmthree = common

let that = null
let initFlag = false
let catMesh = null

export default {
  data() {
    return{
      cat: new Cat(),
      isInit: false
    }
  },
  mounted() {
    that = this
     that = this
    let options = {
      renderOption: {
        canvasFatherId: 'canvasFather'
      }
    }
    common.init(options)
    common.load({name: 'cat.json'})
    musicVisual.registAnimationFrame(this.loop,'cat')
  },
  destroyed() {
    musicVisual.stopAnimationFrame()
    common.uninstall()
    this.cat.destroyed()
  },
  methods: {
    loop() {
      common.rendering()
      if(musicVisual.lmaudio.subject.playing) {
        that.cat.setAnimotion(true)
        let degree = musicVisual.lmaudio.getAverageFrequency()
        catMesh = Tool.findMesh(common.scene, 'cat')
        if(catMesh && that.isInit === false) {
          that.cat.init(catMesh)
          that.isInit = true
        }
        if(that.isInit && catMesh) {
          that.cat.updateTail(degree/1000)
        }
      } else {
        that.cat.setAnimotion(false)
      }
    }
  }
}
</script>

<style>
.el-select {
    display: inline-block;
    width: 80px;
    opacity: 0.8;
    position: relative;
}
</style>
