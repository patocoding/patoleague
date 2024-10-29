
<template>
  <div v-if="modalStore.modalAvatarOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 animate__animated animate__backInUp">
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
       <input type="file" @change="handleFileUpload" />
       <button class="bg-zinc-100 border-black border p-2 hover:bg-black hover:text-white duration-200" @click="saveAvatar">Salvar Avatar</button>
     </div>
     <div v-if="uploadedImage" class="mt-4">
       <p>Avatar Atualizado:</p>
       <img :src="uploadedImage" alt="Avatar Atualizado" class="avatar-img" />
     </div>
   </div>
  </div>
</template>
 
<script setup lang="ts">
import 'animate.css';
import { ref } from 'vue';
import { supabase } from '../../composables/useSupabaseClient';
import { useAuthStore } from '../../store/useAuthStore';
import { useModalStore } from '~/store/state';
import { getConfig } from '../../config'
import axios from 'axios';

const modalStore = useModalStore()
const authStore = useAuthStore();
const { apiUrl } = getConfig();
const selectedAvatar = ref('');
const uploadedImage = ref('');
const fileToUpload = ref<File | null>(null);

const avatars = ref([
 'https://i.imgur.com/MuqWFkR.png',
 'https://i.imgur.com/1BBIyE7.png',
 'https://i.imgur.com/dt3EIwF.png',
 'https://i.imgur.com/VxXh05P.png',
 'https://i.imgur.com/E1Injfs.png'
]);

const selectAvatar = (avatar: string) => {
 selectedAvatar.value = avatar;
 console.log(selectedAvatar.value);
};

const handleFileUpload = (event: Event) => {
 const target = event.target as HTMLInputElement;
 if (target.files && target.files.length > 0) {
   fileToUpload.value = target.files[0];
 }
};

const saveAvatar = async () => {
  if (!fileToUpload.value) {
   alert("Por favor, selecione um arquivo.");
   return;
 }
 if (!authStore.userId) {
   console.error("userId não está definido.");
   return;
 }
 // Faz o upload da imagem via API
 const formData = new FormData();
 formData.append('file', fileToUpload.value);
 formData.append('userId', authStore.userId);
 console.log(authStore.userId);
 try {
   const response = await axios.post(`${apiUrl}/api/Upload/upload`, formData, {
     headers: {
       'Content-Type': 'multipart/form-data',
     },
   });
   
   const imageUrl = response.data.url;
   uploadedImage.value = imageUrl; // Exibe a imagem enviada

   // Atualiza a URL da imagem no perfil do usuário
   const { error } = await supabase
     .from('profiles')
     .update({ photo_url: imageUrl })
     .eq('user_id', authStore.userId);

   if (error) {
     console.error('Error updating profile:', error);
   } else {
     authStore.photo_url = imageUrl;
     alert('Avatar atualizado com sucesso!');
     modalStore.handleModalAvatar();
   }
 } catch (error) {
   console.error('Erro ao fazer upload da imagem:', error);
 }
};

onMounted(()=> {
  authStore.fetchUser()
})
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