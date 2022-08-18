/------html------------------------//
<template>
  <div class="card">
    <h3 class="mb-10">
      {{ product ? "Editer un produit" : "Créer un produit" }}
    </h3>
    <form @submit="trySubmit">
      <!--__________________________title_____________________________-->
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Titre</label>
        <input ref="firstInput" v-model="title.value.value" type="text" />
        <small class="form-error" v-if="title.errorMessage.value">{{
          title.errorMessage.value
        }}</small>
      </div>
      <!--__________________________image_____________________________-->
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Image</label>
        <input v-model="image.value.value" type="text" />
        <small class="form-error" v-if="image.errorMessage.value">{{
          image.errorMessage.value
        }}</small>
      </div>
      <!--__________________________price_____________________________-->
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Price</label>
        <input v-model="price.value.value" type="number" />
        <small class="form-error" v-if="price.errorMessage.value">{{
          price.errorMessage.value
        }}</small>
      </div>
      <!--__________________________description_____________________________-->
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Descrition</label>
        <textarea
          v-model="(description.value.value as string)"
          type="text"
        ></textarea>
        <small class="form-error" v-if="description.errorMessage.value">{{
          description.errorMessage.value
        }}</small>
      </div>
      <!--__________________________category____________________________-->
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Categorie</label>
        <select v-model="category.value.value">
          <option value>Choisissez une catégorie</option>
          <option value="gamer">jeu</option>
          <option value="desktop">bureautique</option>
          <option value="streaming">Stream</option>
        </select>
        <small class="form-error" v-if="category.errorMessage.value">{{
          category.errorMessage.value
        }}</small>
      </div>
      <button class="btn btn-primary" :disabled="isSubmitting">
        Sauvegarder
      </button>
    </form>
  </div>
</template>

//-------------javascript typecript--------------
<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import { z } from "zod";
import { toFormValidator } from "@vee-validate/zod";
import { onMounted, ref } from "vue";
import {
  addProduct,
  editProduct,
  getProduct,
} from "@/shared/services/product.services";
import type { ProductFormInterface, ProductInterface } from "@/interfaces";
import { useRoute, useRouter } from "vue-router";
import { router } from "@/router";

//on déclare firstInput dans input title avec comme type HTMLInputElement ou null. on mets null cimme valeur par défault
// on monte firstInput (onMounted) après la validation du formulaire
const firstInput = ref<HTMLInputElement | null>(null);
onMounted(() => {
  firstInput.value?.focus();
});
//_____________________________________________________________________________
//on récupère le router
//const router = useRouter();
// on declare route pour vérifier la route active, si on est sur nouvelle recette ou recette edit
const product = ref<ProductInterface | null>(null);
const route = useRoute();

if (route.params.productId) {
  product.value = await getProduct(route.params.productId as string);
}
//si il y à un produit on récupère ses valeurs
const initialValues = {
  title: product.value ? product.value.title : "",
  image: product.value ? product.value.image : "",
  price: product.value ? product.value.price : 0,
  description: product.value ? product.value.description : "",
  category: product.value ? product.value.category : "desktop",
};
//________________________________________________________________________________________
const required = { required_error: "veuillez renseigner ce champs" };

//--------schéma de validation--------------------
const validationSchema = toFormValidator(
  z.object({
    title: z
      .string(required)
      .min(1, { message: "le titre doit faire au moins un caractère" })
      .max(20, { message: "le titre doit faire moins de 10 caractères" }),
    image: z.string(required),
    price: z
      .number(required)
      .min(0, { message: "le prix doit être superieur à 0" })
      .max(15000, { message: "Le prix doit être inferieur à 15000" }),
    description: z
      .string(required)
      .min(10, { message: "La description doit faire au moins 10 caractères" }),
    category: z.string(required),
  })
);
//---useForm-----------------
const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
  initialValues,
});

//--useField
const title = useField("title");
const image = useField("image");
const price = useField("price");
const description = useField("description");
const category = useField("category");

//---submit-----------------
const trySubmit = handleSubmit(async (formValues, { resetForm }) => {
  try {
    if (!product.value) {
      await addProduct(formValues);
    } else {
      await editProduct(product.value._id, formValues);
    }
    //une fois créer ou modifié les produitsle routeur redirige sur le composant productlist
    router.push("/admin/productlist");
  } catch (e) {
    console.log(e);
  }
});
</script>

//-------scss------------------------------------
<style scoped lang="scss">
@import "../../../assets/base.scss";
.card {
  width: 100%;
  max-width: 500px;
}
</style>
