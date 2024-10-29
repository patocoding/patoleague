<template>
    <div class="p-4">
        <div class="bg-white font-[Inter] shadow-xl p-4 " v-if="userTeams.length > 5">
            <div class="flex justify-between font-bold mb-10">
                <p class="flex flex-col">
                    Seu(s) Time(s)
                    <span class="text-[10px]">clique em um time para ver</span>
                </p>
                <button class="underline bg-black text-white p-2">
                    Ver Tudo
                </button>
            </div>
            <div v-for="team in userTeams" :key="team.id">
                <p @click="router.push(`/times/t/${team.id}`)">{{ team.name }}</p>
            </div>
        </div>
        <div v-else class="bg-white font-[Inter] shadow-xl p-4 ">
            <div class="flex justify-center flex-col" >
                <p class="font-bold">Você ainda não tem um time :(</p>
                <CreateTeam/>
            </div>
        </div>
    </div>
</template>

<script async setup lang="ts">
import { supabase } from "../../composables/useSupabaseClient";
import CreateTeam from "./CreateTeam.vue"

const user = await (await supabase.auth.getUser())
const userId = await (await user.data.user?.id)
const userTeams = ref([])
const router = useRouter()

const getUserTeams = async () => {
    const { data, error } = await supabase.from('teams').select("*").eq('owner_id', userId)

    if (data){
        console.log(data)
        userTeams.value = data
    }

    if (error) {
        console.log(error)
    }
}

onMounted(()=> {
    getUserTeams()
})
</script>

<style scoped>

</style>