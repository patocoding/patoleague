import { defineStore } from 'pinia';
import { supabase } from '../composables/useSupabaseClient.ts';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    userFirstName: null,
    userLastName: null,
    userId: null,
    username: null,
    player_position: '', 
    player_height: 0,
    photo_url: '',
  }),
  actions: {
    async fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        this.user = user;
        this.userId = user.id;
        this.getUserMetadata(this.userId);
      } else {
        this.user = null;
      }
    },

    async getUserMetadata(userId) {
      const { data, error } = await supabase.from('profiles')
        .select('*').eq('user_id', userId);

      if (data && data.length > 0) {
        this.userLastName = data[0].sobrenome;
        this.userFirstName = data[0].nome;
        this.username = data[0].username;
        this.photo_url = data[0].photo_url;
        this.player_position = data[0].posicao;
        this.player_height = data[0].altura;

      } else if (error) {
        console.log(error.message);
      }
    },

    
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (!error) {
        this.user = null;
        this.userFirstName = null;
        this.userLastName = null;
        this.userId = null;
        this.username = null;
        this.photo_url = '';
      }
    }
  },
});

