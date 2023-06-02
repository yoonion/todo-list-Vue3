import { createRouter, createWebHistory } from "vue-router";
import Home from '@/pages/index.vue';
import TodoList from '@/pages/todolist/index.vue';
import Todo from '@/pages/todolist/_id.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/todolist',
      name: 'TodoList',
      component: TodoList
    },
    {
      path: '/todolist/:id',
      name: 'Todo',
      component: Todo
    }
  ]
});

export default router;