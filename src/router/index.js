import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import MeuCadastro from '../views/MeuCadastro.vue';
import Usuarios from '../views/UsuariosComponente.vue';
import PessoasComponente from '../views/PessoasComponente.vue';
import ContatosComponente from '../views/ContatosComponente.vue';
import LogoutComponente from '../views/LogoutComponente.vue';
import LoginComponente from '../views/LoginComponente.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meucadastro',
    name: 'MeuCadastro',
    component: MeuCadastro
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios,

  },
  {
    path: '/pessoas',
    name: 'Pessoas',
    component: PessoasComponente
  },
  {
    path: '/contatos',
    name: 'Contatos',
    component: ContatosComponente
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginComponente
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutComponente
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
