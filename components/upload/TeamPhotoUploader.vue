<template>
    <div class="photo-uploader font-[Inter]">
      <input class="text-[10px]" type="file" @change="onFileChange" accept="image/*" />
      <button class="bg-white p-2" @click="uploadPhoto" :disabled="!photo">Enviar Foto</button>
  
      <div v-if="uploadStatus" class="bg-black bg-opacity-50 fixed inset-0 p-4">
        <button class="bg-white absolute top-[20%] right-0 p-2" @click="uploadStatus = null">Fechar</button>
        <p class="absolute bg-white top-[50%]  w-full p-4">{{ uploadStatus }}</p>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { getConfig } from '~/config';
  import { supabase} from '../../composables/useSupabaseClient'
  const photo = ref(null);
  const uploadStatus = ref('');
  const { apiUrl } = getConfig()
  const route = useRoute()
  const teamId = route.params.id
  const uploadedImage = ref('');
  console.log(teamId)
  
  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      photo.value = file;
    }
  };
  
  const uploadPhoto = async () => {
    if (!photo.value) return;

    const formData = new FormData();
    formData.append('file', photo.value);
    formData.append('teamId', teamId );
    try {
      const response = await axios.post(`${apiUrl}/api/Upload/upload_teams`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Atualiza o status do upload
      uploadStatus.value = 'Upload realizado com sucesso!';
      const imageUrl = response.data.url;
      console.log('imageUrl: ' + imageUrl);
        uploadedImage.value = imageUrl; // Exibe a imagem enviada

   // Atualiza a URL da imagem no perfil do usuário
    const { data,error } = await supabase
        .from('teams')
        .update({ logo_url: imageUrl })
        .eq('id', teamId)
        .select()

    if (data) {
        console.log('data: ' + data);
    }
    if (error) {
        console.error('Error updating profile:', error);
    }
     
    } catch (error) {
      uploadStatus.value = 'Erro ao fazer o upload. Tente novamente.';
      console.error('Error:', error);
    }
  };
  </script>
  
  <style scoped>
  .photo-uploader {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  input {
    margin-bottom: 10px;
  }
  button {
    margin-bottom: 10px;
  }
  </style>
  