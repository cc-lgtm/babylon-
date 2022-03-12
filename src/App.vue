<script setup lang="ts">
  import { Engine } from 'babylonjs'
  import { onMounted } from 'vue'
  import { createScene } from './createScene'

  onMounted(async () => {
    const canvas = document.querySelector('.renderCanvas') as HTMLCanvasElement
    const engine = new Engine(canvas)
    const scene = await createScene(engine, canvas)
    engine.runRenderLoop(() => {
      scene.render()
    })
  })
</script>

<template>
  <canvas class="renderCanvas"></canvas>
</template>

<style>
html,
body,
.renderCanvas,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
