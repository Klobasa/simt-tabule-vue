import { createRouter, createWebHistory } from "vue-router";
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
  },
  {
    path: "/jizdniDoby",
    name: "jizdniDoby",
    component: () => import("../views/Timetables")
  },
  {
    path: "/changelog",
    name: "changelog",
    component: () => import("../views/Changelog")
  },
  {
    path: "/dispecer",
    name: "dispecer",
    component: () => import("../views/Dispatch")
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
