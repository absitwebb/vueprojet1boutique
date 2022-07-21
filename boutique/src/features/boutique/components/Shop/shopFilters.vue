//------html------------------------//
<template>
  <div class="p-20 d-flex flex-column">
    <!--section search-->
    <section class="mb-20">
      <h3 class="mb-10">rechercher</h3>
      <input
        :value="filters.search"
        @input="emit('updateFilter',{search: ($event.target as HTMLInputElement).value})"
        type="text"
        placeholder="rechercher"
      />
    </section>
    <!--section produits-->
    <section class="mb-20">
      <h3>Trier par prix</h3>
      <div
        class="mb-5"
        v-for="priceRange of ([[0, 10000],[800, 1000], [1000, 1500], [1500, 2000], [2000, 10000]] as [number, number][])"
      >
        <input
          :checked="filters.priceRange[0] === priceRange[0]"
          type="radio"
          name="priceRange"
          :id="priceRange[0] + ''"
          @input="emit('updateFilter', { priceRange })"
        />
        <label :for="priceRange[0] + ''">{{
          priceRange[0] === 0
            ? "tous les prix"
            : priceRange[0] === 2000
            ? "Plus de 2000€"
            : `Entre ${priceRange[0]}€ et ${priceRange[1]}€ }`
        }}</label>
      </div>
    </section>

    <!--section catégory-->
    <section class="mb-20 flex-fill">
      <h3 class="mb-10">Trier par catégorie</h3>
      <p
        class="category"
        :class="{ selected: filters.category === category }"
        v-for="category in (['all', 'desktop', 'gamer', 'streaming'] as Category[]) "
        @click="emit('updateFilter', { category })"
      >
        {{ category }}
      </p>
      <div class="mb-5"></div>
    </section>
    <small class="mb-5">
      Nombre de résultat:<strong> {{ nbrOfProducts }}</strong>
    </small>
    <button class="btn btn-danger" @click="emit('updateFilter', {})">
      Supprimer les filtres
    </button>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import type { filtersInterface, filterUpdate, Category } from "@/interfaces";

defineProps<{
  filters: filtersInterface;
  nbrOfProducts: number;
}>();

const emit = defineEmits<{
  (e: "updateFilter", updateFilters: filterUpdate): void;
}>();
</script>

//-------scss------------------------------------
<style lang="scss" scoped>
.category {
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.selected {
  text-decoration: underline;
  font-weight: bold;
}
</style>
