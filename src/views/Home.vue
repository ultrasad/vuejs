<template>
  <div class="home px-4">
    <!-- <NavBar /> -->
    <!-- <p><button class="btn btn-primary">Touch me</button></p> -->

    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <!-- <h1>This is an home page</h1> -->

    <div class="container-fluid px-4">
      <h1 class="mt-4" v-if="profile">
        ยินดีต้อนรับ {{ profile?.fullname }}({{ profile?.email }})
      </h1>
      <ol class="breadcrumb mb-4">
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="card bg-primary text-white mb-4">
            <div class="card-body">Primary Card</div>
            <div
              class="
                card-footer
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <a class="small text-white stretched-link" href="#"
                >View Details</a
              >
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-warning text-white mb-4">
            <div class="card-body">Warning Card</div>
            <div
              class="
                card-footer
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <a class="small text-white stretched-link" href="#"
                >View Details</a
              >
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-success text-white mb-4">
            <div class="card-body">Success Card</div>
            <div
              class="
                card-footer
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <a class="small text-white stretched-link" href="#"
                >View Details</a
              >
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-danger text-white mb-4">
            <div class="card-body">Danger Card</div>
            <div
              class="
                card-footer
                d-flex
                align-items-center
                justify-content-between
              "
            >
              <a class="small text-white stretched-link" href="#"
                >View Details</a
              >
              <div class="small text-white">
                <i class="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6">
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-chart-area me-1"></i>
              Area Chart Example
            </div>
            <div class="card-body">
              <DoughnutChart
                ref="doughnutRef"
                :chartData="testData"
                :options="options"
              />
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="card mb-4">
            <div class="card-header">
              <i class="fas fa-chart-bar me-1"></i>
              Bar Chart Example
            </div>
            <div class="card-body">
              <canvas id="myBarChart" width="100%" height="40"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { defineComponent } from "vue";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
// import HelloWorld from "../components/HelloWorld.vue"; // ../ is an alias to /src
// import NavBar from "../components/NavBar.vue"; // ../ is an alias to /src

// import { Chart, registerables } from "chart.js";
// Chart.register(...registerables);

import { computed, defineComponent, ref } from "vue";
import { DoughnutChart, ExtractComponentData } from "vue-chart-3";

import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
import { useStore } from "vuex";
Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: { DoughnutChart },
  setup() {
    const data = ref([30, 40, 60, 70, 5]);
    const doughnutRef = ref<ExtractComponentData<typeof DoughnutChart>>();

    const store = useStore();
    const profile = computed(() => store.state.authModule.profile); //state profile on authModule

    const options = ref<ChartOptions<"doughnut">>({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    });

    const testData = computed<ChartData<"doughnut">>(() => ({
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: data.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    }));

    // function shuffleData() {
    //   data.value = shuffle(data.value);
    // }

    return { testData, doughnutRef, options, profile };
  },
  // components: {
  //   NavBar,
  // },
  // components: {
  //   HelloWorld,
  // },
});
</script>
