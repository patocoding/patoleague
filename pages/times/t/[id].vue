

<template>
    <div class="font-[Inter] ">
        <Navigation/>
       
        <div v-if="dataTeamLoaded">
            
            <div class="bg-img-2 p-8 marker:">
            <div class="flex flex-col justify-center items-center p-8 bg-black bg-opacity-50 rounded-xl">
            <img :src="dataTeamLoaded.logoUrl || '../../../assets/images/patoLeagueLogo.png'"  class="w-2/12"/>
            <h1 class="text-white font-bold text-4xl text-center">{{ dataTeamLoaded.name }}  [<strong>{{ dataTeamLoaded.sigla }}</strong>]</h1>
        </div>
        </div>
        <div class=" p-4 border border-slate-300 rounded-xl max-w-[1080px] mx-auto justify-center flex flex-col my-5 bg-img shadow-xl">
            <div class="flex flex-row justify-between">
                <p class="text-[12px] pr-4">Informações sobre <strong>{{ dataTeamLoaded.name }}</strong></p>
                <p v-if="dataTeamLoaded.isParticipating" class="text-emerald-500 font-semibold text-[12px]">👍 Este time está participando da atual Pato League</p>
                <p v-else class="text-red-400 font-semibold text-[12px]">❌ Este time não está participando da atual Pato League</p>
            </div>
            <div class="p-4 flex md:flex-row flex-col justify-between items-center">
                <div class="flex flex-col items-center">
                    <img :src="dataTeamLoaded.logoUrl || '../../../assets/images/patoLeagueLogo.png'" class="w-8/12 rounded-full"/>
                    <div v-if="dataTeamLoaded.ownerId === userId">
                    <TeamPhotoUploader/>
                </div>
                </div>
               <div>
                <p class=" italic">Temporadas Jogadas: <strong>{{ dataTeamLoaded.seasonsPlayed }}</strong></p>
                
                <p v-if="dataTeamLoaded.owner_id" class=" italic capitalize">Dono: <strong>{{ dataTeamLoaded.owner_id.nome }} {{ dataTeamLoaded.owner_id.sobrenome }}</strong></p>
                <div class="p-4 bg-white bg-opacity-70 my-5 rounded-xl shadow-xl md:w-72 w-72 border">
                <p class="text-zinc-700 font-bold text-xl mb-4 text-start">Títulos:</p>
                <div class="flex flex-col items-center mb-4">
                    <p class="text-zinc-700 w-fit font-semibold text-3xl rounded-full p-2 bg-white border-2 border-zinc-500">🏆</p>
                    <p class="uppercase text-[10px]">Campeão <span class="text-emerald-500 font-bold text-lg">{{ dataTeamLoaded.firstPlaceAmount }}x</span></p>
                </div>
                <div class="flex flex-col items-center mb-4">
                    <p class="text-zinc-700 w-fit font-semibold text-3xl rounded-full p-2 bg-white border-2 border-zinc-500">🥈</p>
                    <p class="uppercase text-[10px]">Vice-campeão <span class="text-emerald-500 font-bold text-lg">{{ dataTeamLoaded.secondPlaceAmount }}x</span></p>
                </div>
                <div class="flex flex-col items-center">
                    <p class="text-zinc-700 w-fit font-semibold text-3xl rounded-full p-2 bg-white border-2 border-zinc-500">🥉</p>
                    <p class="uppercase text-[10px]">3º Lugar - <span class="text-emerald-500 font-bold text-lg">{{ dataTeamLoaded.thirdPlaceAmount }}x</span></p>
                </div>
                </div>
               </div>
                
            </div>
                    <div class="">
                        <p class=" bg-gray-200 w-full border-zinc-300 border mx-auto p-2 bg-opacity-60 text-center text-3xl font-bold italic text-[#322c76]  ">Elenco</p>
                    </div>
                    <div class="md:p-20 w-full ">
                        <div v-for="player in teamPlayers" :key="player.id" class=" flex flex-row transform  -skew-x-12 items-center my-5 bg-white shadow-xl  ">
                            <div class="md:w-36 flex flex-col items-center transform -skew-x-10 p-10 bg-indigo-600">
                                <!-- <p class="text-4xl text-center uppercase text-white text-[10px]">
                                número
                            </p> -->
                            <p class="md:text-6xl text-2xl text-center skew-x-12  text-white font-bold">
                                {{ player.number }}
                            </p>
                        </div>
                        <div class="flex flex-row items-center justify-between gap-x-4">
                            <div class=" flex flex-col items-start pl-12">
                            <p class="transform uppercase skew-x-12 md:text-2xl text-lg font-light leading-[20px]">{{ player.user_id.nome }} <br/> 
                                <span class="font-semibold uppercase md:text-3xl text-xl text-zinc-600">{{ player.user_id.sobrenome }}</span>
                            </p>
                            <div class="transform skew-x-12 font-light">
                                <p class="text-[12px]">{{ player.user_id.posicao }}</p>
                            </div>
                        </div>
                        <div v-if="player.isCapitain" class="items-center flex flex-col transform skew-x-12">
                            <p class="uppercase text-[12px]">capitão</p>
                            <img src="../../../assets/icons/shield_captain.png" class="w-[48px]"/>
                        </div>
                       
                        </div>
                        
                        
                    </div>
                    </div>
                
            
        </div>
        </div>
       
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../../../composables/useSupabaseClient";
import { getConfig } from "../../../config"
import TeamPhotoUploader from "~/components/upload/TeamPhotoUploader.vue";
import axios from 'axios'
const { apiUrl } = getConfig()
const route = useRoute()
const dataTeamLoaded = ref([]);
const teamPlayers = ref([]);
const user =  await supabase.auth.getUser()
const userId = user.data.user?.id

const getTeam = async () => {
   try {
    const response = await axios.get(`${apiUrl}/api/Teams/${route.params.id}`)
    dataTeamLoaded.value = response.data
    console.log(dataTeamLoaded.value)
   } catch (e) {
    console.log(e)
   }
}

const getPlayerTeams = async () => {
    const { data, error } = await supabase.from('players_teams').select('time_in_team,user_id (nome,sobrenome,posicao), number, isCapitain').eq('team_id', route.params.id)

    if (data){
        teamPlayers.value = data
        console.log(data)
    }

    if (error) {
        console.log(error.message)
    }
}


onMounted( async ()=>{
    await getTeam();
    await getPlayerTeams();
})
</script>

<style scoped>
.bg-img {
    background-image: url('../../../assets/images/backgrounds/bg-clean-white.jpg');
    background-size: cover;
}

.stroke{
    -webkit-text-stroke-width: 0.5px;
    -webkit-text-stroke-color: rgb(255, 208, 0);
}

.bg-white-texture {
    background-image: url('../../../assets/images/backgrounds/white-texture.jpg');
    background-size: cover;
}

.rectangle {                
    transform: skewX(-15deg); /* Altere o valor para mudar o ângulo */
}

.reto {
    transform: skewX(10deg)
}

.bg-img-2{
    background-image: url('../../../assets/images/backgrounds/basketball-ball-texture.jpg');
    background-size: cover;
}

.bg-stickers{
    background-image: url('../../../assets/images/backgrounds/basketball_stickers.png');

}
</style>