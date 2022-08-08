//------html------------------------//
<template>
  <teleport v-if="open" to="body">
    <div @click="emit('close')" class="calc" :class="{ transparent }"></div>
  </teleport>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
defineProps<{
  open: boolean;
  transparent?: boolean;
}>();
const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "@/assets/base.scss";
.calc {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.246);
  z-index: 1;
}
.transparent {
  background-color: transparent;
}
</style>
