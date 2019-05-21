<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import musicVisual from '3d/MusicVisual'
import Splots from './Splots'

let that = null
let splots = null

export default {
  data() {
    return {
      splots
    }
  },
  mounted() {
    that = this
    splots = new Splots('canvas')
    this.splots = splots
    musicVisual.registAnimationFrame(this.loop)
  },
  methods: {
    loop() {
      if (musicVisual.lmaudio.subject.playing) {
        let numbers = musicVisual.lmaudio.getAverageFrequency()
        splots.anim(numbers)
      }
    }
  }
}
</script>

<style>
#canvas {
  background-color: #000;
}
</style>
