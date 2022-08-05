//------html------------------------//
<template>
  <div class="app-container">
    <!--composants-->
    <!--composant header-->
    <theheader @navigate="navigate" :page="state.page" class="header" />
    <!--____________composants dynamique-->
    <div class="app-content">
      <!--suspense permet d'afficher un template spécifique pendant le chargement des différentes ressources asynchrones.-->
      <Suspense>
        <Component :is="pages[state.page]" />
      </Suspense>
    </div>
    <!--composant footer-->
    <thefooter class="footer" />
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
// on importe les composants
import theheader from "./components/Header.vue";
import thefooter from "./components/Footer.vue";
import boutique from "./features/boutique/boutique.vue";
import Admin from "./features/admin/Admin.vue";
import { reactive, type Component as C } from "vue";
import type { Page } from "./interfaces";
import { seed, seed50articles } from "./data/seed";
//------reactive----------------------------------
const state = reactive<{
  page: Page;
}>({
  page: "boutique",
});

// on declare nos pages composants
const pages: { [s: string]: C } = {
  boutique,
  Admin,
};

function navigate(page: Page): void {
  state.page = page;
}
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
