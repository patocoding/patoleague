import { defineStore } from 'pinia';


export const useModalStore = defineStore('modal', {
  state: () => ({ 
    modalAvatarOpen: false
  }),
  actions:  ({
    async handleModalAvatar() {
      this.modalAvatarOpen = !this.modalAvatarOpen
    },
  })
});