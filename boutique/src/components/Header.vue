//------html------------------------//
<template>
  <header class="px-20 d-flex flex-row align-items-center">
    <!------logo--------->
    <a href="#" class="d-flex flex-row align-items-center mr-20">
      <img src="../assets/logo.svg" alt="image" />
      <span class="logo">ABsite</span>
    </a>
    <!------liste gauche--------->
    <ul class="d-flex flex-row flex-fill">
      <li class="mr-10">
        <a
          :class="{ active: page === 'boutique' }"
          @click="emit('navigate', 'boutique')"
          >Boutique</a
        >
      </li>
      <li>
        <a
          :class="{ active: page === 'Admin' }"
          @click="emit('navigate', 'Admin')"
          >Admin</a
        >
      </li>
    </ul>
    <!------liste droite--------->
    <ul class="d-flex flex-row">
      <li class="mr-10">
        <a href="#">Inscription</a>
      </li>
      <li>
        <a href="#">Connexion</a>
      </li>
    </ul>
  </header>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { Page } from "@/interfaces";

//-------propriétés-----------
defineProps<{
  page: Page;
}>();

const emit = defineEmits<{
  (e: "navigate", page: Page): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
@import "../assets/base.scss";
header {
  background-color: $colorprimary-1;
  a {
    color: $colortext-primary;
    img {
      width: 35px;
      margin-right: 5px;
    }
    .logo {
      font-weight: 700;
      font-size: 20px;
    }
  }
  a.active {
    text-decoration: underline;
  }
}
</style>
