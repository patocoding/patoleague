<template>
    <div>
        <Navigation />
        <TestingPinia/>
    </div>
</template>

<script async setup lang="ts">
import {supabase} from "../composables/useSupabaseClient"
import Navigation from '../components/navigation/Navigation.vue'
import TestingPinia from '../components/testing/TestingPinia.vue'

const isDrawerOpen = ref(false);
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const user = await supabase.auth.getUser()
const session = await supabase.auth.getSession()
console.log(session)
const userData = ref([])
const userId = await user.data.user?.id

const getUserProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', userId)

    if (data) {
        userData.value = data[0]
    }
}

await getUserProfile()
onMounted(async ()=> {
    
})
</script>

<style scoped>

</style>