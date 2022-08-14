//------html------------------------//
<template>
  <!---->
  <header class="px-20 d-flex flex-row align-items-center">
    <!------logo--------->
    <a href="#" class="d-flex flex-row align-items-center mr-20">
      <img src="../assets/logo.svg" alt="image" />
      <span class="logo">ABsite</span>
    </a>
    <!--liste-->
    <div class="d-flex flex-row align-items-center flex-fill actions-container">
      <!------liste gauche--------->
      <ul class="d-flex flex-row flex-fill hide-xs">
        <li class="mr-10">
          <router-link to="/boutique">Boutique </router-link>
        </li>
        <li>
          <router-link to="/admin">Admin</router-link>
        </li>
      </ul>
      >

      <!------liste droite--------->
      <ul class="d-flex flex-row hide-xs">
        <li class="mr-10">
          <a href="#">Inscription</a>
        </li>
        <li>
          <a href="#">Connexion</a>
        </li>
      </ul>
      <!--_____________menu version mobile__________________-->
      <div class="menu-xs-container">
        <calc
          :open="state.open"
          @close="state.open = false"
          :transparent="true"
        />
        <i @click="state.open = !state.open" class="fas fa-bars show-xs"></i>
        <transition>
          <ul @click="state.open = false" v-if="state.open" class="menu card">
            <li>
              <a href="#">Inscription</a>
            </li>
            <li>
              <a href="#">Connexion</a>
            </li>
            <li>
              <router-link to="/boutique">Boutique</router-link>
            </li>
            <li>
              <router-link to="/admin">Admin</router-link>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </header>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { Page } from "@/interfaces";
import { reactive } from "vue";
import Calc from "./calc.vue";

const state = reactive<{
  open: boolean;
}>({
  open: false,
});

//-------propriétés-----------
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
  i {
    @include sm {
      display: none;
    }
    justify-self: end;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }

  // class definie par le routeur sur le lien actif
  a.router-link-active {
    text-decoration: underline;
  }

  .actions-container {
    @include xs {
      justify-content: end;
    }
  }
  .menu-xs-container {
    position: relative;
  }
  .menu {
    z-index: 2;
    position: absolute;
    top: 20px;
    right: 0px;
    li {
      padding: 10px;
    }
    a {
      color: $colortext;
    }
  }
}
.v-leave-to,
.v-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}
.v-leave-active,
.v-enter-active {
  transition: all 0.5s;
}
</style>
