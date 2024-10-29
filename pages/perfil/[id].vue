<template>
    <div class="bg-zinc-200 h-screen">
        <Navigation/>
        <div class="pt-4 bg-white">
            <div class="">
                    <PhotoUploader/>
                    </div>
            <div class="flex flex-col md:flex-row justify-evenly items-center just">
                <div class="flex flex-col gap-y-12 justify-between ">
                    <div class="flex flex-col">
                        <p class="font-[Inter] font-bold text-5xl">{{ profileData?.name }} </p>
                        <p class="font-[Inter] font-bold text-5xl">{{ profileData?.lastName }}</p>
                    </div>
                    <div v-if="playerTeamData" class="flex flex-row items-center">
                        <img src="../../assets/images/patoLeagueLogo.png" alt="" class="w-12">  
                        <p>{{ playerTeamData.teamName }}</p>
                    </div>
                    <div class="flex flex-row gap-x-4">
                        <div class="flex flex-col">
                            <p class="font-[Inter] font-bold text-[10px] uppercase">Altura</p>
                            <p class="text-[12px]"><span class="text-3xl font-extrabold">{{ profileData?.height }}</span>CM</p>
                        </div>
                        <div class="flex flex-col">
                            <p class="font-[Inter] font-bold text-[10px] uppercase">peso</p>
                            <p class="text-[12px]"><span class="text-3xl font-extrabold">{{ profileData?.weight }}</span>KG</p>
                        </div>
                    </div>
                    <div class="">
                        <p class="text-4xl font-bold">🏀 {{ profileData?.position }}</p>
                    </div>
                    <div class="flex flex-col text-cyan-900 text-[12px] gap-y-4">
                        <div class="flex flex-row justify-between border-b-2 border-b-cyan-950 pb-2">
                            <p class="uppercase font-semibold ">nascimento</p>
                            <p>{{ profileData?.birthDate ? formatDate(profileData.birthDate) : 'N/A' }}</p>
                        </div>
                        <div class="flex flex-row justify-between border-b-2 border-b-cyan-950 pb-2">
                            <p class="uppercase font-semibold ">idade</p>
                            <p>{{ profileData?.birthDate ? calculateAge(profileData.birthDate) : 'N/A' }}</p>
                        </div>
                        
                    </div>
                </div>
                <div class="flex flex-col border-b items-center md:border-b-0 border-black animate__animated animate__fadeInUp">
                    
                    <img v-if="profileData && profileData.photoUrl" :src="profileData.photoUrl" class="w-9/12 rounded-full"/>
                    
                    
                    
                    
                    <div class="my-5" v-if="authStore.userId === profileData?.userId">
                        <button class="bg-zinc-100 border-black border p-2 hover:bg-black hover:text-white duration-200" @click="modalStore.handleModalAvatar()">Mudar Avatar</button>
                    </div>
                    
                </div>
                <div v-if="playerDataLoaded.length > 0" class="mt-20">
                    <ul class="">
                            <li class="flex flex-col items-center bg-img gap-x-5 rounded-xl min-w-fit p-2">
                                <p class="text-[12px] font-bold italic w-[100%]">Pontos por jogo</p>
                                <p class=" font-bold italic p-4">{{ playerDataLoaded[0].points_per_game.toFixed(1) }}</p>
                            </li>
                            <li class="flex bg-img flex-col items-center gap-x-10 my-4 min-w-fit rounded-xl p-2">
                                <p class="text-[12px] font-bold italic w-[100%]">Assistências por jogo</p>
                                <p class="   font-bold italic p-4">{{ playerDataLoaded[0].assists_per_game.toFixed(1) }}</p>
                            </li>
                            <li class="flex bg-img flex-col items-center gap-x-10 my-4 min-w-fit rounded-xl p-2">
                                <p class="text-[12px] font-bold italic w-[100%]">Rebotes por jogo</p>
                                <p class="   font-bold italic p-4">{{ playerDataLoaded[0].rebounds_per_game.toFixed(1) }}</p>
                            </li>
                            <li class="flex bg-img flex-col items-center gap-x-10 my-4 min-w-fit rounded-xl p-2">
                                <p class="text-[12px] font-bold italic w-[100%]">Jogos</p>
                                <p class="   font-bold italic p-4">{{ playerDataLoaded[0].games }}</p>
                            </li>
                            <li class="flex bg-img flex-col items-center gap-x-10 my-4 min-w-fit rounded-xl p-2">
                                <p class="text-[12px] font-bold italic w-[100%]">Vitórias</p>
                                <p class="   font-bold italic p-4">{{ playerDataLoaded[0].win_amount }}</p>
                            </li>
                            <li class="flex bg-img flex-col items-center gap-x-10 my-4 min-w-fit rounded-xl p-2">
                                <p class="text-[12px] font-bold italic w-[100%]">Derrotas</p>
                                <p class="   font-bold italic p-4">{{ playerDataLoaded[0].loss_amount }}</p>
                            </li>
                            <!-- <li class="flex bg-img flex-col items-center gap-x-10 my-4">
                                <p class="text-[12px] font-bold italic w-[100%]">Times na carreira</p>
                                <p class=" text-xl md:text-3xl font-bold italic p-4"></p>
                            </li> -->
                        </ul>   
                </div>
                <div v-else>
                    <p>Carregando</p>
                </div>
            </div>
            <!-- <div class="">
                <h3>Seu Perfil</h3>
            </div>
            <div class="mt-10 p-4 flex-col flex md:flex-row">
                <div class="">
                    <PhotoUploader/>
                </div>
                <div class="flex flex-col border-b items-center mb-10 md:border-b-0 border-black animate__animated animate__fadeInUp">
            
                    <img v-if="profileData && profileData.photoUrl" :src="profileData.photoUrl" class="w-9/12 md:w-4/12 rounded-full"/>
                    <p class="font-[Inter] font-bold text-2xl">{{ profileData?.name }} {{ profileData?.lastName }}</p>
                    <p class="text-[#ffb33a]">🏀 {{ profileData?.position }}</p>
                    <p class="font-[Inter] font-bold text-[12px]">Altura: {{ profileData?.height }}cm</p>
                    
                    <div class="my-5" v-if="authStore.userId === profileData?.userId">
                        <button class="bg-zinc-100 border-black border p-2 hover:bg-black hover:text-white duration-200" @click="modalStore.handleModalAvatar()">Mudar Avatar</button>
                    </div>
                </div>
                
                <div class="flex flex-col">
                    <div class="animate__fadeInLeftBig animate_animated">
                        <h2 class="text-xl font-semibold">Suas estatítiscas de Jogador</h2>
                        <ul v-if="playerDataLoaded.length > 0" class="flex flex-col mt-10">
                            <li class="flex flex-row items-center gap-x-5">
                                <p class="md:text-3xl font-bold italic w-[100%]">Pontos por jogo</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].points_per_game.toFixed(1) }}</p>
                            </li>
                            <li class="flex flex-row items-center gap-x-10 my-4 ">
                                <p class="md:text-3xl font-bold italic w-[100%]">Assistências por jogo</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].assists_per_game.toFixed(1) }}</p>
                            </li>
                            <li class="flex flex-row items-center gap-x-10 my-4">
                                <p class="md:text-3xl font-bold italic w-[100%]">Rebotes por jogo</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].rebounds_per_game.toFixed(1) }}</p>
                            </li>
                            <li class="flex flex-row items-center gap-x-10 my-4">
                                <p class="md:text-3xl font-bold italic w-[100%]">Jogos</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].games }}</p>
                            </li>
                            <li class="flex flex-row items-center gap-x-10 my-4">
                                <p class="md:text-3xl font-bold italic w-[100%]">Vitórias</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].win_amount }}</p>
                            </li>
                            <li class="flex flex-row items-center gap-x-10 my-4">
                                <p class="md:text-3xl font-bold italic w-[100%]">Derrotas</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].loss_amount }}</p>
                            </li>
                            <li class="flex flex-row items-center gap-x-10 my-4">
                                <p class="md:text-3xl font-bold italic w-[100%]">Times na carreira</p>
                                <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ teams }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> -->
        </div>
        <Footer/>
    </div>
</template>

<script async setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../composables/useSupabaseClient';
import { onMounted, ref, watch } from 'vue';
import PhotoUploader from '~/components/upload/PhotoUploader.vue';
import { useModalStore } from '~/store/state';
import { getConfig } from "../../config"
import axios from 'axios'

const router = useRouter();
const route = useRoute();
const query = route.params.id;
const authStore = useAuthStore();
const playerDataLoaded = ref([]);
const modalStore = useModalStore();
const teams = ref('');
const { apiUrl } = getConfig();
const profileData = ref<any>(null);  // Guardar os dados do perfil (nome, avatar, etc.)
const playerTeamData = ref<any>(null); // Guardar os dados do perfil

// Buscar dados do perfil
const fetchProfileData = async () => {
    try {
        const response = await axios.get(`${apiUrl}/api/Profiles/get-profile-by-username?username=${query}`); // Altere esta URL de acordo com o seu endpoint de perfil
        profileData.value = response.data;
        console.log("Perfil carregado:", profileData.value);
    } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
    }
};

const fetchPlayerTeam = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/Profiles/get-player-team/${query}`);
    console.log("Dados do time:", response.data);
    playerTeamData.value = response.data;
    // Aqui você pode usar response.data para exibir os dados no frontend
  } catch (error) {
    console.error("Erro ao buscar dados do time do jogador:", error);
  }
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Função para calcular a idade
const calculateAge = (dateString: string): number => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
};

// Buscar estatísticas do jogador
const getPlayerStats = async () => {
    const { data, error } = await supabase
        .from('player_stats')
        .select('*')
        .eq('username', query);

    if (data) {
        playerDataLoaded.value = data;
        teams.value = data[0].teams
    }
};

onMounted(async () => {
    await fetchProfileData();
    await getPlayerStats();
    await fetchPlayerTeam()
});
</script>



<style scoped>
.bg-img{
    background-image: url('../../assets/images/home/bg-orange2.png');
    background-size: cover;
}

</style>