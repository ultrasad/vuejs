import { h, resolveComponent } from "vue";
import { RouteRecordRaw } from "vue-router";

const positionRoutes: Array<RouteRecordRaw> = [
  {
    path: "position",
    name: "Position",
    component: {
      render: () => h(resolveComponent("router-view")), // for sub router
    },
    children: [
      {
        path: "", // no use slash "/" in sub route
        name: "PositionIndex",
        component: () =>
          import(
            /* webpackChunkName: "PositionIndex" */ "@/views/position/PositionIndex.vue"
          ),
      },
      {
        path: "create", // no use slash "/" in sub route
        name: "PositionCreate",
        component: () =>
          import(
            /* webpackChunkName: "PositionCreate" */ "@/views/position/PositionCreate.vue"
          ),
      },
      {
        path: "edit/:id", // no use slash "/" in sub route
        name: "PositionUpdate",
        component: () =>
          import(
            /* webpackChunkName: "PositionUpdate" */ "@/views/position/PositionUpdate.vue"
          ),
      },
    ],
  },
];

export default positionRoutes;
