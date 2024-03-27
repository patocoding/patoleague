import { defineStore } from 'pinia';
import { supabase } from '@/plugins/supabaseClient';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
  }),
  actions: {
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      this.user = user;
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
    checkUser() {
      const user = supabase.auth.user();
      this.user = user;
    }
  },
});