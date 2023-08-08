<template>
  <div class="home">
    <h1>Lista de Contatos</h1>
    <input type="text" v-model="novoContato.nome" placeholder="Nome" />
    <input type="text" v-model="novoContato.telefone" placeholder="Telefone" />
    <button @click="incluir">Incluir</button>
    <input v-model="termo" @input="pesquisar" placeholder="Pesquisar" />
    <button @click="carregarContatos">Atualizar</button>
    <ul>
      <li v-for="contato in contatos" :key="contato.id">
       <img :src="contato.pessoa.foto.id" alt="Foto" />

        <p>{{ contato.pessoa.nome }} - {{ contato.telefone }} <span v-if="contato.favorito">Favorito</span></p>
        <button @click="remover(contato.id)">Remover</button>
        <button @click="favoritar(contato)">Favoritar</button>
        <button @click="editar(contato)">Editar</button>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '@/services/api';

export default {
  data() {
    return {
      contatos: [],
      termo: '',
      novoContato: {
        nome: '',
        telefone: ''
      },
      editando: null, // Contém o contato que está sendo editado
    };
  },
  methods: {
    async carregarContatos() {
      const pessoa_id = 1; // define o ID da pessoa
      const response = await api.get(`contato/listar/${pessoa_id}`);
      this.contatos = response.data;
    },
    async pesquisar() {
      const response = await api.post('contato/pesquisar', { termo: this.termo });
      this.contatos = response.data;
    },
    async remover(id) {
      await api.delete(`contato/remover/${id}`);
      this.carregarContatos(); // Atualiza a lista
    },
    async incluir() {
      const contato = {
        nome: this.novoContato.nome,
        telefone: this.novoContato.telefone,
        // Outros campos necessários
      };
      await api.post('contato/salvar', contato);
      this.carregarContatos();
    },
    editar(contato) {
      this.editando = contato;
      this.novoContato = { ...contato }; 
    },
    async favoritar(contato) {
      contato.favorito = !contato.favorito;
      await api.post('contato/salvar', contato); 
    }
  },
  created() {
    this.carregarContatos();
  },
};
</script>
