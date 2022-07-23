/------html------------------------//
<template>
  <div class="card">
    <h3 class="mb-10">Ajouter un article</h3>
    <form @submit="trySubmit">
      <!--__________________________title_____________________________-->
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Titre</label>
        <input v-model="title.value.value" type="text" />
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

const required = { required_error: "veuillez renseigner ce champs" };

//--------schéma de validation--------------------
const validationSchema = toFormValidator(
  z.object({
    title: z
      .string(required)
      .min(1, { message: "le titre doit faire au moins un caractère" })
      .max(10, { message: "le titre doit faire moins de 10 caractères" }),
    image: z.string(required),
    price: z
      .number(required)
      .min(0, { message: "le prix doit être superieur à 0" })
      .min(15000, { message: "Le prix doit être inferieur à 15000" }),
    description: z
      .string(required)
      .min(10, { message: "La description doit faire au moins 10 caractères" }),
    category: z.string(required),
  })
);
//---useForm-----------------
const { handleSubmit, isSubmitting } = useForm({
  validationSchema,
});

//--useField
const title = useField("title");
const image = useField("image");
const price = useField("price");
const description = useField("description");
const category = useField("category");

//---submit-----------------
const trySubmit = handleSubmit((formValues) => {
  console.log(formValues);
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
