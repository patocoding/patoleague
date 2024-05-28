<template>
    <div class="bg-zinc-200 h-screen">
        <Navigation/>
        <div class="p-8 bg-white">
            <div class="">
                <h3>Seu Perfil</h3>
            </div>
            <div class="mt-10  p-4 flex-col flex md:flex-row">
            <div class="flex flex-col border-b items-center mb-10  md:border-b-0 border-black">
                <img :src="authStore.photo_url" class="w-9/12 md:w-4/12"/>
                <p class="font-[Inter] font-bold text-2xl">{{ authStore.userFirstName }} {{ authStore.userLastName }}</p>
               <p class="text-[#ffb33a]">🏀 {{authStore.player_position}}</p>
               <p class="font-[Inter] font-bold text-[12px]">Altura: {{authStore.player_height}}cm</p>
                <div class="">
                    <PhotoUploader/>
                </div>
                <div class="my-5">
                    <button class="bg-zinc-100 border-black border p-2 hover:bg-black hover:text-white duration-200" @click="modalStore.handleModalAvatar()">Mudar Avatar</button>
                </div>
            </div>
            <div class="flex flex-col ">
                <div>
                    <h2 class="text-xl font-semibold">Suas estatítiscas de Jogador</h2>
                    <ul v-if="playerDataLoaded.length > 0" class="flex flex-col mt-10">
                        <li class="flex flex-row items-center gap-x-5">
                            <p  class="md:text-3xl font-bold italic w-[100%]">Pontos por jogo</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].points_per_game.toFixed(1)}}</p>
                        </li>
                        <li class="flex flex-row items-center gap-x-10 my-4 ">
                            <p class=" md:text-3xl font-bold italic w-[100%]">Assistências por jogo</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].assists_per_game.toFixed(1)}}</p>
                        </li>
                        <li class="flex flex-row items-center gap-x-10 my-4">
                            <p class=" md:text-3xl font-bold italic w-[100%]">Rebotes por jogo</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].rebounds_per_game.toFixed(1)}}</p>
                        </li>
                        <li class="flex flex-row items-center gap-x-10 my-4">
                            <p class=" md:text-3xl font-bold italic w-[100%]">Jogos</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].games}}</p>
                        </li>
                        <li class="flex flex-row items-center gap-x-10 my-4">
                            <p class=" md:text-3xl font-bold italic w-[100%]">Vitórias</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].win_amount}}</p>
                        </li>
                        <li class="flex flex-row items-center gap-x-10 my-4">
                            <p class=" md:text-3xl font-bold italic w-[100%]">Derrotas</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ playerDataLoaded[0].loss_amount}}</p>
                        </li>
                        <li class="flex flex-row items-center gap-x-10 my-4">
                            <p class=" md:text-3xl font-bold italic w-[100%]">Times na carreira</p>
                            <p class="bg-img text-xl md:text-3xl font-bold italic p-4">{{ teams}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
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

const router = useRouter();
const authStore = useAuthStore();
const route = useRoute();
const query = route.params.id;
const playerDataLoaded = ref([]);
const modalStore = useModalStore();
const teams = ref('')

const getPlayerStats = async () => {
    console.log(authStore.username);
    const { data, error } = await supabase
        .from('player_stats')
        .select('*')
        .eq('username', authStore.username);

    if (data) {
        playerDataLoaded.value = data;
        teams.value = data[0].teams

    }
};



onMounted(async () => {
    await authStore.fetchUser();
    getPlayerStats();
});

watch(
    () => authStore.username,
    (newUsername) => {
        if (newUsername) {
            getPlayerStats();
        }
    }
);
</script>

<style scoped>
.bg-img{
    background-image: url('../../assets/images/home/bg-orange2.png');
    background-size: cover;
}

</style>