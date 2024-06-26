

<template>
    
    <div class="fixed inset-0 h-full bg-black bg-opacity-50 p-4">
        <div class="shadow-xl bg-white w-fit h-fit absolute top-0 bottom-0 right-0 left-0 m-auto rounded-lg font-[Inter]">
            <div class="bg-[#ff8539] p-5 rounded-t-lg shadow-xl">
                <h1 class="text-center text-3xl text-zinc-600 font-[Inter] font-bold italic">Criar Jogador</h1>
            </div>
            <div class="p-4">
                <p class="text-center text-[14px]">Antes de prosseguir para o seu perfil de jogador, crie um <strong>nome de usuário</strong>.</p>
                <p class="text-center text-[14px]">Você pode usar <strong>letras e números</strong>.</p>
                <p class="text-center my-3 text-zinc-400">Nota: esse nome aparecerá no link do seu perfil: /perfil/seuNome</p>
                <div class="relative border-b border-b-zinc-500 my-5">
                    <input v-model="username" type="text" 
                    id="floating_outlined" 
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-b-1 border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="floating_outlined" class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4">Insira nome de usuário</label>
                </div>
                <p v-if="usernameError" class="text-red-500 text-center">{{ usernameError }}</p>
                <button :disabled="!isUsernameValid || usernameProcessing" @click="submitUsername" class="my-5 bg-[#ff8539] rounded-lg px-6 py-2 text-white font-[Inter] font-semibold hover:bg-white hover:text-black duration-200" :class="{ 'opacity-50': !isUsernameValid || usernameProcessing }">Prosseguir</button>
            </div>
            <div v-if="isLoading" role="status" class="flex justify-center my-4">
                <!-- SPINNER -->
                <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>
  
<script async setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../composables/useSupabaseClient";
const username = ref('');
const usernameError = ref('');
const usernameProcessing = ref(false);
const user = await supabase.auth.getUser()
const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
const userId = user.data.user.id
const router = useRouter()
const isLoading = ref(false);

const isUsernameValid = computed(() => {
    if (username.value.length < 3) {
        usernameError.value = "O nome de usuário deve ter pelo menos 3 caracteres.";
        return false;
    } else if (!usernameRegex.test(username.value)) {
        usernameError.value = "O nome de usuário deve conter apenas letras e números.";
        return false;
    }
    usernameError.value = "";
    return true;
});

const submitUsername = async () => {
    if (isUsernameValid.value) {
        usernameProcessing.value = true;
        const { data, error } = await supabase.from('profiles').update({ username: username.value}).eq('user_id', userId).select()
        if (error) {
            console.log(error.message)
            return
        }
        
       if (data) {
        isLoading.value = true
        const { data, error } = await supabase.from('player_stats').insert({
            username: username.value,
            points_per_game: 0,
            assists_per_game: 0,
            rebounds_per_game: 0,
            games: 0,
            win_amount: 0,
            loss_amount: 0,
            teams: []
        })
        if(error) {
            usernameError.value = `erro: ${error.message}`
        }
        
            setTimeout(()=> {
            router.push(`/perfil/${username.value}`)
        }, 3000)
        isLoading.value = false
        
        
       }
        // Lembre-se de definir usernameProcessing.value = false depois de processar
    }
};

</script>

<style scoped>

</style>