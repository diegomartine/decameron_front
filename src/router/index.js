import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView, // Vista principal
  },
  {
    path: '/Createroom',
    name: 'about',
    component: () => import('../views/CreateRoom.vue'), // Carga diferida
  },
  {
    path: '/Listhotel',
    name: 'listHotel',
    component: () => import('../views/ListHotel.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
