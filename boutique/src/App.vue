//------html------------------------//
<template>
  <div class="app-container">
    <!--composants-->
    <!--composant header-->
    <theheader class="header" />
    <!--____________composants dynamique-->
    <div class="app-content">
      <!--suspense permet d'afficher un template spécifique pendant le chargement des différentes ressources asynchrones.-->
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </template>
      </router-view>
    </div>

    <!--composant footer-->
    <thefooter class="footer hide-xs" />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
// on importe les composants
import theheader from "./components/Header.vue";
import thefooter from "./components/Footer.vue";

import { seed, seed50articles } from "./data/seed";
//------reactive----------------------------------

//fonction pour envoyer tous les produits sur restapi.fr
// les données sur le site restent 10heures
//seed("vueprojectproducts");
//seed50articles("vueprojectproducts");
</script>

//-------scss------------------------------------
<style lang="scss">
@import "./assets/base.scss";

// on crée une grille pour placer nos éléments
.app-container {
  height: 100vh;
  display: grid;
  grid-template-areas: "header " "app-content" "footer";

  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}
.app-content {
  grid-area: app-content;
}

.footer {
  grid-area: footer;
}
</style>
