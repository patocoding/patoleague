<template>

<div>
  <button @click="openModal" class="border border-black bg-white w-fit p-2 hover:bg-black hover:text-white duration-200 my-5">Criar time</button>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-5 rounded-lg shadow-lg w-1/3">
        <h2 class="text-xl font-semibold mb-4">Criar Time</h2>
        <form @submit.prevent="createTeam">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="teamName">Nome do Time</label>
            <input v-model="team.name" id="teamName" type="text" class="w-full border p-2 rounded" required>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1" for="sigla">Sigla</label>
            <input v-model="team.sigla" id="sigla" type="text" class="w-full border p-2 rounded" required>
          </div>
          <!-- Adicione mais campos conforme necessário -->
          <div class="flex justify-end">
            <button type="button" @click="closeModal" class="mr-2 border border-black bg-white p-2 rounded hover:bg-black hover:text-white duration-200">Cancelar</button>
            <button type="submit" class="border border-black bg-black text-white p-2 rounded hover:bg-white hover:text-black duration-200">Criar</button>
          </div>
        </form>
      </div>
    </div>
</div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  import { supabase } from "../../composables/useSupabaseClient";
  axios.defaults.baseURL = 'https://localhost:7292';
  const user = await (await supabase.auth.getUser())
  const userId = user.data.user?.id || '' 
console.log(userId)
  const isOpen = ref(false);
  const team = ref({
    name: '',
    sigla: '',
    ownerId: userId,
    // Adicione mais campos conforme necessário
  });
  
  const openModal = () => {
    isOpen.value = true;
  };
  
  const closeModal = () => {
    isOpen.value = false;
  };
  
  const createTeam = async () => {
    try {
      console.log(team.value)
      const response = await axios.post('/api/Teams', team.value);
    
      alert('Time criado com sucesso!');
      closeModal();
      // Você pode adicionar lógica para atualizar a lista de times na interface, se necessário.
    } catch (error) {
      console.error('Erro ao criar o time:', error);
      alert('Ocorreu um erro ao criar o time.');
    }
  };
  </script>
<style scoped>

</style>