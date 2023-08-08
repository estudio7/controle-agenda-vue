<template>
  <div class="usuarios">
    <h1>Lista de Usuários</h1>
    <!-- Lista de usuários -->
    <ul v-if="usuarios.length > 0">
      <li v-for="usuario in usuarios" :key="usuario.id">
        {{ usuario.nome }} - {{ usuario.email }}
        <button @click="editar(usuario)">Editar</button>
        <button @click="alterarSenha(usuario)">Alterar Senha</button>
      </li>
    </ul>
    <p v-else>Nenhum usuário encontrado.</p>

    <!-- Formulário para incluir e/ou alterar usuários -->
    <form v-if="mostrarFormulario">
      <input type="text" v-model="usuario.nome" placeholder="Nome" />
      <input type="text" v-model="usuario.email" placeholder="Email" />
      <!-- Outros campos do usuário, como cpf, dataNascimento, telefone, etc. -->

      <button @click="salvarUsuario">Salvar</button>
      <button @click="cancelarEdicao">Cancelar</button>
    </form>

    <!-- Botão para abrir o formulário para incluir um novo usuário -->
    <button @click="novoUsuario">Novo Usuário</button>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      usuarios: [],
      mostrarFormulario: false,
      usuario: {
        nome: '',
        email: '',
        // Outros campos do usuário, como cpf, dataNascimento, telefone, etc.
      },
    };
  },
  methods: {
    async listarUsuarios() {
      const response = await api.post('/usuario/pesquisar', { termo: '' });
      this.usuarios = response.data.object.usuarios;
    },
    async salvarUsuario() {
      try {
        // Verifica se é uma edição ou inclusão de usuário
        if (this.usuario.id) {
         
          await api.put('/usuario/atualizar', this.usuario);
        } else {
         
          await api.post('/usuario/salvar', this.usuario);
        }

        this.mostrarFormulario = false;
        this.listarUsuarios();
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
      }
    },
    editar(usuario) {
      this.usuario = { ...usuario };
      this.mostrarFormulario = true;
    },
    novoUsuario() {
      this.usuario = {
        nome: '',
        email: '',
        // Outros campos do usuário, como cpf, dataNascimento, telefone, etc.
      };
      this.mostrarFormulario = true;
    },
    cancelarEdicao() {
      this.mostrarFormulario = false;
    },
    async alterarSenha(usuario) {
      try {
        // Implementar a lógica para alterar a senha do usuário
        console.log('Implementar lógica para alterar senha do usuário:', usuario);
      } catch (error) {
        console.error('Erro ao alterar senha do usuário:', error);
      }
    },
  },
  created() {
    this.listarUsuarios();
  },
};
</script>

