<template>
  <div class="mx-4">
    <!-- <h1>This is an position page, Hello {{ fullname }}</h1>
    <button class="btn btm-sm btn-danger" @click="hello">Click me</button>
    <h2>Email: {{ email }}, Age: {{ age + 1 }}</h2> -->
    <h3>ข้อมูลตำแหน่ง</h3>

    <router-link class="btn btn-primary" :to="{ name: 'PositionCreate' }"
      >เพิ่มข้อมูล</router-link
    >

    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <div class="row">
      <div class="form-group">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ชื่อตำแหน่ง</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="isLoading" class="d-flex justify-content-center">
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </template>
            <template v-if="position.length > 0">
              <tr v-for="item in position" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.title }}</td>
                <td>
                  <router-link
                    :to="{ name: 'PositionUpdate', params: { id: item.id } }"
                    >Edit</router-link
                  >
                  |
                  <a href="#" @click.prevent="onRemove(item.id)">Delete</a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { defineComponent, reactive, ref, toRefs } from "vue"; // move to use position
import { defineComponent } from "vue";
import { useIndex, useRemove } from "./composable/use-position";

// Composition API
export default defineComponent({
  name: "PositionIndex",
  setup() {
    // const { fullname, hello, email, age, position } = useIndex();
    // return { fullname, hello, email, age, position };

    const { position, errorMessage, isLoading } = useIndex();
    const { onRemove } = useRemove();
    return { position, errorMessage, isLoading, onRemove };

    // let fullname = "Bill"; // define normal
    // const fullname = ref("Hanajung"); //reference
    // const state = reactive({
    //   position: [
    //     {
    //       id: 1,
    //       title: "IT",
    //     },
    //     {
    //       id: 2,
    //       title: "Manager",
    //     },
    //     {
    //       id: 3,
    //       title: "Hr",
    //     },
    //   ],
    //   email: "bb@gmail.com",
    //   age: 20,
    // });
    // const hello = () => {
    //   fullname.value = "Youngdek"; //ref to index of fullname value
    //   state.email = "changeme@yahoo.com";
    // };
    // return {
    //   fullname,
    //   hello,
    //   ...toRefs(state),
    // };
  },
});
</script>

<style scoped></style>
