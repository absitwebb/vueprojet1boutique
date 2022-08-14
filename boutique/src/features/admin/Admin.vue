/------html------------------------//
<template>
  <div class="admin-container d-flex flex-row p-20">
    <AdminNav class="admin-nav" />
    <div
      class="admin-main flex-fill d-flex flex-row justify-content-center align-items-center"
    >
      <RouterView></RouterView>
    </div>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import AdminNav from "./components/AdminNav.vue";
</script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "@/assets/base.scss";
.admin-container {
  height: 100%;
}

.admin-nav {
  margin-right: 20px;
  flex: 0 0 220px;
}
</style>
