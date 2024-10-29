<template>
  
<div>
  <UsernameModal v-if="openModalCreateUsername"/>
  <nav class="bg-slate-900 border-gray-200 font-[Inter] p-2">
  <div class="max-w-screen-xl flex   justify-between mx-auto p-4">
  <div @click="router.push('/')" class="flex items-center  rtl:space-x-reverse">
      <img src="../../assets/images/patoLeagueLogo.png" class="h-8" alt="Flowbite Logo" />
      <span class="self-center text-lg font-semibold whitespace-nowrap text-white">Pato League</span>
  </div>
  
  <div class="flex items-center md:order-2 space-x-3  rtl:space-x-reverse">
      <button @click="toggleDrawer" type="button" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span class="sr-only">Open user menu</span>
        <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi text-white bi-person-fill-gear" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
</svg>
      </button>
      <!-- Dropdown menu -->
  </div>
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
      <li>
        <a href="#" class="block py-2 px-3 text-white rounded   md:p-0 " aria-current="page">Inicio</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent  
        md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Rankings</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 ">Meu Jogador</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0" @click="router.push('/times')">Times</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
<!-- Drawer -->
<div v-if="isDrawerOpen" class="fixed inset-0 z-40 flex ">
    <div class="animate__fadeIn animate__animated fixed inset-0 bg-black bg-opacity-50" @click="toggleDrawer"></div>
    <div class="animate__animated animate__fadeInLeft relative drawer-enter-active drawer-leave-active flex flex-col w-64 h-full bg-slate-800 ">
        <!-- Cabeçalho do Drawer -->
        <div v-if="authStore.user" class="">
          <div class="p-4">
            <button class="text-white" @click="toggleDrawer">
                X
            </button>
          </div>
          <div class="pl-4">
            <h4 class="font-[Inter] font-semibold text-white">Olá, {{ authStore.userFirstName }}!</h4>
          </div>
          <div class="p-4">
            <button class="bg-[#ff8539] px-6 py-2 text-white font-[Inter] font-semibold hover:bg-white hover:text-black duration-200"> Ver Perfil </button>
          </div>
          <p class="text-white"></p>
        </div>
        <div class="p-4 mt-10" v-else>
          <button class="bg-[#ff8539] px-6 py-2 text-white font-[Inter] font-semibold hover:bg-white hover:text-black duration-200" @click="router.push('/login')"> Fazer Login</button>
        </div>
        <!-- Conteúdo do Drawer -->
        <div class="flex-1 overflow-y-auto p-4">
           
           <div class="p-4">
            <ul class="font-bold gap-y-12 flex flex-col font-[Inter]">
              <li class="text-white border-b border-b-[#ff8539] cursor-pointer hover:scale-110 duration-200" @click="router.push('/')">Página Inicial</li>
              <li class="text-white border-b border-b-[#ff8539] cursor-pointer hover:scale-110 duration-200" @click="redirectTo(`/perfil/${authStore.username}`)">Meu Jogador</li>
              <li class="text-white border-b border-b-[#ff8539] cursor-pointer hover:scale-110 duration-200" @click="router.push('/')">Ranking patoLEAGUE</li>
              <li class="text-white border-b border-b-[#ff8539] cursor-pointer hover:scale-110 duration-200" @click="router.push('/')">Jogos & Datas</li>
              <li class="text-white border-b border-b-[#ff8539] cursor-pointer hover:scale-110 duration-200" @click="router.push('/')">Vídeos</li>
              <li class="text-white border-b border-b-[#ff8539] cursor-pointer hover:scale-110 duration-200">Jogadores & Times</li>
            </ul>
            <button v-if="authStore.userFirstName" class="text-red-500 font-bold mt-10" @click="signOut">Sair</button>
           </div>
          
        </div>
        
    </div>
</div>
</div>

</template>

<script async setup lang="ts">
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../composables/useSupabaseClient';
import { useAuthStore } from '../../store/useAuthStore';
import UsernameModal from '../modals/UsernameModal.vue'
import 'animate.css';

const authStore = useAuthStore()
const userId = ref('')
const firstName = ref('')
const isDrawerOpen = ref(false);
const router = useRouter()
const getUser = await supabase.auth.getUser()
console.log(getUser)
const isUserLoggedIn = ref(false)
const openModalCreateUsername = ref(false)

const redirectTo = (route) => {
  
  if (authStore.username) {
    router.push(route)
    isDrawerOpen.value = false
  } else {
    openModalCreateUsername.value = true
    isDrawerOpen.value = false
  }
}

const signOut = async () => {
  const {error} = await supabase.auth.signOut()

  if (error) {
    console.log(error.message)
  } else {
    router.push('/login')
  }
}

const getLoggedUser = async () =>{
  await getUser
  if ((await getUser).data.user?.id ==! null){
    return true
  }
}

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
}

// useHead({
//   link: [{
//       href: 'https://www.w3schools.com/w3css/4/w3.css', rel: 'stylesheet'
//   }]
// })


onMounted(() => {
  
  userId.value = authStore.userId
  firstName.value = authStore.userFirstName
})

</script>

<style scoped>

</style>