import { defineStore } from 'pinia';
import {supabase} from '../composables/useSupabaseClient.ts'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    user: null ,
    userFirstName: null,
    userLastName: null,
    userId: null
  }),
  actions:  ({
    async fetchUser() {
      const gettedUser = await supabase.auth.getUser()
      this.user = gettedUser;
      this.userId = gettedUser.data.user.id
      this.getUserMetadata(this.userId);
    },

    async getUserMetadata(userId) {
      const { data, error } = await supabase.from('profiles')
      .select('*').eq('user_id', userId)
      console.log('pegou')
      console.log('data')
      if (data) {
        console.log(data)
        this.userLastName = data[0].sobrenome
        this.userFirstName = data[0].nome
      }

      if (error) {
        console.log(error.message)
      }
    }
  })
});