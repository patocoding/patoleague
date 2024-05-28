<template>
   <div v-if="modalStore.modalAvatarOpen" class="fixed inset-0 bg-black bg-opacity-50">
    <div class="avatar-selector mt-48">
    <div class="avatar-list">
      <div
        v-for="avatar in avatars"
        :key="avatar"
        class="avatar-item"
        @click="selectAvatar(avatar)"
      >
        <img :src="avatar" alt="Avatar" class="avatar-img" :class="{'border-4 border-green-500' : selectedAvatar === avatar}" />
      </div>
    </div>
    <div class="my-5">
        <button class="bg-zinc-100 border-black border p-2 hover:bg-black hover:text-white duration-200" @click="saveAvatar">Salvar Avatar</button>
    </div>
  </div>
   </div>
</template>
  
<script setup lang="ts">
 import { ref } from 'vue';
import { supabase } from '../../composables/useSupabaseClient';
import { useAuthStore } from '../../store/useAuthStore';
import { useModalStore } from '~/store/state';

const avatars = ref([
  'https://i.imgur.com/MuqWFkR.png',
  'https://i.imgur.com/1BBIyE7.png',
  'https://i.imgur.com/dt3EIwF.png',
  'https://i.imgur.com/VxXh05P.png',
  'https://i.imgur.com/E1Injfs.png'
  // Adicione mais URLs de avatares aqui
]);

const modalStore = useModalStore()

const selectedAvatar = ref('');
const authStore = useAuthStore();

const selectAvatar = (avatar: string) => {
  selectedAvatar.value = avatar;
  console.log(selectedAvatar.value);
};



const saveAvatar = async () => {
  if (!selectedAvatar.value) return;

  const { error } = await supabase
    .from('profiles')
    .update({ photo_url: selectedAvatar.value })
    .eq('user_id', authStore.userId);

  if (error) {
    console.error('Error updating profile:', error);
  } else {
    authStore.photo_url = selectedAvatar.value;
    alert('Avatar atualizado com sucesso!');
    modalStore.handleModalAvatar()
  }
};
  </script>
<style scoped>
.avatar-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.avatar-item {
  cursor: pointer;
}

.avatar-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: border-color 0.3s;
}

.avatar-img:hover {
  border-color: #007bff;
}
</style>