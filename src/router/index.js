import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Stations from "../views/Stations";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/zastavky",
    name: "zastavky",
    component: Stations
  },
  {
    path: "/zastavky/:stationId",
    name: "zastavka",
    component: () => import("../views/Station")
  },
  {
    path: "/spoj",
    name: "spoje",
    component: () => import("../views/Trips")
  },
  {
    path: "/spoj/:playerId",
    name: "spoj",
    component: () => import("../views/Trip")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
