<template>
  <div class="bg-zinc-200 h-screen">
    <Navigation />
    <div class="font-[Inter]">
        <Heading title="Times" belowText="Veja os times criados na Pato League e suas estatísticas"/>
    </div>
    <div>
        <MyTeams/>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 p-4 gap-x-4 gap-y-6">
        <div v-for="team in teams" :key="team.id" class="bg-[#37003c] flex flex-row  shadow-xl">
            <div class="bg-white p-4 flex flex-col items-center">
                <img :src="team.logoUrl || PatoLogo" class="w-24"/>
                <p class="font-bold italic ">{{ team.sigla }}</p>
            </div>
            <div class="flex flex-row  w-full justify-between">
                <div class="ml-2 p-6 flex flex-col ">
                    <p class="font-bold text-2xl  text-white">{{ team.name }}</p>
                    <p class="text-[12px] text-white">Temporadas: {{ team.seasonsPlayed }}</p>
                    
                    <button 
                    class="flex items-start text-[12px] font-semibold my-2
                     bg-white w-fit p-2 border border-black hover:bg-black hover:text-white
                     hover:border-white duration-200" @click="router.push(`/times/t/${team.id}`)">Ver time</button>
                </div>
                <div class="flex  flex-col p-4 text-white">
                    <p v-if="team.isParticipating === true" class="text-green-500 uppercase font-bold text-[12px]"> Participando</p>
                    <p v-if="team.isParticipating === false" class="text-red-500 uppercase font-bold text-[12px]">Não participando</p>
                    <p v-if="team.ownerUsername" class="text-[12px]">Dono: {{ team.ownerUsername }}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// list teams from supabase and display them
import Navigation from "../../components/navigation/Navigation.vue";
import Heading from "../../components/home/Heading.vue"
import MyTeams from "~/components/teams/MyTeams.vue";
import PatoLogo from '../../assets/images/patoLeagueLogo.png'
import { ref } from "vue"
import { supabase } from '../../composables/useSupabaseClient';
import { useRouter } from "vue-router";
import { getConfig } from "../../config"
import axios from "axios";
const teams = ref([])
const statusMsg = ref<string | null>(null)
const router = useRouter()
const { apiUrl } = getConfig()

const getTeams = async () => {
    try {
        // 1. Faz a requisição para obter os times
        const { data: teamsData } = await axios.get(`${apiUrl}/api/Teams`);
        
        // 2. Extrair os ownerIds dos times
        const ownerIds = teamsData.map(team => team.ownerId);
        
        // Verifique se ownerIds não está vazio antes de fazer a consulta
        if (ownerIds.length === 0) {
            throw new Error('Nenhum ownerId encontrado nos times');
        }

        console.log('Owner IDs:', ownerIds);
        
        // 3. Faz a requisição para obter os perfis dos donos dos times
        const { data: profilesData } = await axios.get(`${apiUrl}/api/Profiles`, {
            params: {
                userIds: ownerIds.join(',') // Envia os IDs dos donos como parâmetro
            }
        });

        console.log('Teams data:', teamsData);
        console.log('Profiles data:', profilesData);

        // 4. Mapeia os times e adiciona o nome completo dos donos
        const teamsWithOwner = teamsData.map(team => {
            const owner = profilesData.find(profile => profile.userId === team.ownerId);
            return {
                ...team,
                ownerUsername: owner ? `${owner.name} ${owner.lastName}` : 'Unknown'
            };
        });

        teams.value = teamsWithOwner; 
        console.log('Teams with owner:', teams.value);
    } catch (error) {
        // Em caso de erro, exibe a mensagem e loga o erro
        statusMsg.value = 'Erro ao buscar times ou perfis';
        console.error('Error fetching teams or profiles:', error);
    }
};



onMounted(()=> {
    getTeams()
})
// function that makes a regex to match
</script>

<style scoped>

.bg-grey{
    background-image: url('../../assets/images/backgrounds/greybg.jpg');
}
</style>
