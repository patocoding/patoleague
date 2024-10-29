<template>
    <div v-if="playerOfTheWeek">
      <h2>Jogador da Semana</h2>
      <p>{{ playerOfTheWeek.firstName }} {{ playerOfTheWeek.lastName }}</p>
      <p>De: {{ playerOfTheWeek.week_start }} até {{ playerOfTheWeek.week_end }}</p>
</div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../composables/useSupabaseClient';
  
  const playerOfTheWeek = ref(null);
  
  const fetchPlayerOfTheWeek = async () => {
    const { data, error } = await supabase
      .from('player_of_the_week')
      .select(`
        week_start,
        week_end,
        profiles (
          firstName: nome,
          lastName: sobrenome
        )
      `)
      .eq('week_start', new Date().toISOString().split('T')[0]) // Assumindo que queremos o jogador da semana atual
      .single();
    
    if (data) {
      playerOfTheWeek.value = data;
    } else {
      console.error('Error fetching player of the week:', error);
    }
  };
  
  onMounted(() => {
    fetchPlayerOfTheWeek();
  });
  </script>
  
  <style scoped>
  /* Adicione seus estilos aqui */
  </style>