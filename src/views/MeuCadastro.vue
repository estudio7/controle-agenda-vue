<template>
  <div class="cadastro">
    <h1>Meu Cadastro</h1>
    <form @submit.prevent="atualizarCadastro">
      <input type="text" v-model="usuario.nome" placeholder="Nome" required />
      <input type="text" v-model="usuario.cpf" placeholder="CPF" v-mask="'###.###.###-##'" required />
      <input type="text" v-model="usuario.dataNascimento" placeholder="Data de Nascimento" v-mask="'####-##-##'" required />
      <input type="email" v-model="usuario.email" placeholder="Email" required />
      <input type="text" v-model="usuario.telefone" placeholder="Telefone" v-mask="'(##) ####-####'" required />
      <input type="text" v-model="usuario.username" placeholder="Nome de Usuário" required />
      <input type="password" v-model="usuario.password" placeholder="Senha" minlength="8" pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" required />
      <button type="submit">Atualizar Cadastro</button>
    </form>
    <button @click="alterarSenha">Alterar Senha</button>
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask'
import api from '@/services/api';

export default {
  directives: { mask: VueMaskDirective },
  data() {
    return {
      usuario: {
        cpf: '',
        dataNascimento: '',
        email: '',
        id: 0,
        nome: '',
        password: '',
        telefone: '',
        username: ''
      }
    };
  },
  methods: {
    async atualizarCadastro() {
      const response = await api.put('usuario/atualizar', this.usuario);
      if (response.status === 200) {
        alert('Cadastro atualizado com sucesso!');
      }
    },
    alterarSenha() {
      const newPassword = prompt('Digite a nova senha');
      const password = prompt('Digite a senha atual');
      const username = this.usuario.username;

      api.post('usuario/alterarSenha', { newPassword, password, username })
        .then(() => {
          alert('Senha alterada com sucesso!');
        })
        .catch(() => {
          alert('Erro ao alterar senha');
        });
    }
  },
  created() {
    const userId = 1; // ID do usuário logado
    api.get(`usuario/buscar/${userId}`).then(response => {
      this.usuario = response.data.object.usuario;
    });
  }
};
</script>
