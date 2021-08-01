<template>
  <div class="position-create-form mt-4 mx-4 col-md-6">
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="exampleInputPositionTitle" class="form-label"
          >ชื่อตำแหน่ง</label
        >
        <input
          type="text"
          class="form-control"
          id="exampleInputPositionTitle"
          v-model="position.title"
        />
        <!-- {{ position.title }} -->
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCreate } from "./composable/use-position";

export default defineComponent({
  name: "PositionCreate",
  setup() {
    const { position, onSubmit } = useCreate();
    return { position, onSubmit };
  },
});
</script>

<style scoped></style>
