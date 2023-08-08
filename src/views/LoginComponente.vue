<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="remember">Lembrar credenciais:</label>
        <input type="checkbox" id="remember" v-model="remember" />
      </div>
      <div>
        <button type="submit">Entrar</button>
      </div>
    </form>
    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script>
import auth from '@/services/auth.js';

export default {
  data() {
    return {
      username: '',
      password: '',
      remember: false,
      error: null
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Remova a declaração da variável 'response' se não for utilizada posteriormente
        await auth.login(this.username, this.password);
        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.error('Erro no login:', error);
        this.error = 'Erro no login. Verifique suas credenciais.';
      }
    }
  }
};
</script>
