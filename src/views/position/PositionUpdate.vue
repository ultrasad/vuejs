<template>
  <div class="position-create-form mt-4 mx-4 col-md-6">
    <h1>แก้ไขข้อมูล {{ position.title }}</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="exampleInputPositionTitle" class="form-label"
          >แก้ไข ชื่อตำแหน่ง</label
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
import { useUpdate } from "./composable/use-position";

export default defineComponent({
  name: "PositionUpdate",
  setup() {
    const { position, onSubmit } = useUpdate();
    return { position, onSubmit };
  },
});
</script>

<style scoped></style>
