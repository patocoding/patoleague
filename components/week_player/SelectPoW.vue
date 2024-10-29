<template>
    <div>
      <h2>Escolher Jogador da Semana</h2>
      <div>
        <label for="weekStart">Início da Semana:</label>
        <input type="date" v-model="weekStart" />
      </div>
      <div>
        <label for="weekEnd">Fim da Semana:</label>
        <input type="date" v-model="weekEnd" />
      </div>
      <div>
        <label for="player">Jogador:</label>
        <select v-model="selectedPlayer">
          <option v-for="player in players" :key="player.user_id" :value="player.user_id">
            {{ player.nome }} {{ player.sobrenome }}
          </option>
        </select>
      </div>
      <button @click="setPlayerOfTheWeek">Salvar Jogador da Semana</button>
    </div>
</template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../composables/useSupabaseClient';
  
    interface Player {
        nome: string,
        sobrenome: string,
        user_id: string
    }

  const weekStart = ref('');
  const weekEnd = ref('');
  const selectedPlayer = ref('');
  const players = ref<Player>();
  
  const fetchPlayers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id,  nome,  sobrenome');
    
    if (data) {
        
      players.value = data
      console.log(players.value);
    } else {
      console.error('Error fetching players:', error);
    }
  };

  
  const setPlayerOfTheWeek = async () => {
    if (!weekStart.value || !weekEnd.value || !selectedPlayer.value) return;
    
    const { error } = await supabase
      .from('player_of_the_week')
      .insert({
        user_id: selectedPlayer.value,
        week_start: weekStart.value,
        week_end: weekEnd.value
      });
    
    if (error) {
      console.error('Error setting player of the week:', error);
    } else {
      alert('Jogador da Semana atualizado com sucesso!');
    }
  };
  
  onMounted(() => {
    fetchPlayers();
  });
  </script>
  
  <style scoped>
  /* Adicione seus estilos aqui */
  </style>