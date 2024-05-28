import { defineStore } from 'pinia';
import { supabase } from '../composables/useSupabaseClient.ts';
import { useAuthStore } from './useAuthStore.js';

export const usePlayerStats = defineStore('stats', {
  state: () => ({
    ppg: null,
    apg: null,
    rpg: null,
    games: null,
    wins: null,
    losses: null,
    teams: []
    
  }),
  actions: {
    async fetchUser() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          this.user = user;
          this.userId = user.id;
          const authStore = useAuthStore();
          await authStore.fetchUser();
          if (authStore.username) {
            await this.getUserMetadata(authStore.username);
          } else {
            console.error('Username is null after fetching user metadata');
          }
        } else {
          this.user = null;
        }
      },

    async getUserMetadata(username) {
      const { data, error } = await supabase.from('player_stats')
        .select('*').eq('username', username)

      if (data && data.length > 0) {
        this.ppg = data[0].points_per_game
        this.apg = data[0].assists_per_game
        this.rpg = data[0].rebounds_per_game
        this.games = data[0].games
        this.wins = data[0].win_amount
        this.losses = data[0].loss_amount
        this.teams = data[0].teams

      } else if (error) {
        console.log(error.message);
      }
    },

   
  },
});

