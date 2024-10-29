<template>
    <div>
        <Navigation />
        <Heading title="Site Oficial da PATO LEAGUE" belowText="Aqui você encontra todas as informações do nosso campeonato: Rankings, Jogadores, partidas, resultados e muito mais!"/>  
        <MyPlayerSection/>  
        <!-- <SelectPow/> -->
        <Footer/>
    </div>
</template>

<script async setup lang="ts">
import {supabase} from "../composables/useSupabaseClient"
import Navigation from '../components/navigation/Navigation.vue'
import TestingPinia from '../components/testing/TestingPinia.vue'
import { useAuthStore } from '../store/useAuthStore';
import Heading from "../components/home/Heading.vue";
import SelectPoW from "~/components/week_player/SelectPoW.vue";
import { getConfig } from "../config"
import MyPlayerSection from "../components/home/MyPlayerSection.vue";


const authStore = useAuthStore();
console.log('auth store',authStore.user)

const { apiUrl } = getConfig()


const isDrawerOpen = ref(false);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const user = await supabase.auth.getUser()
const session = await supabase.auth.getSession()

const userData = ref([])
const userId = await user.data.user?.id

const getUserProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId)

    if (data) {
        userData.value = data[0]
    }
}

getUserProfile()
onMounted(() => {
  authStore.fetchUser();
});
</script>

<style scoped>

</style>