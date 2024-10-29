

<template>
    <div class="bg-img bg-opacity-50 w-full my-10 shadow-xl animate__animated animate__backInUp">
        <UsernameModal v-if="openModalCreateUsername"/>
        <div class="flex flex-col items-center md:items-start md:flex-row justify-center">
            <div>
                <img class="md:w-9/12" src="../../assets/images/home/lebron.png"/>
            </div>
            <div class="flex flex-col justify-center">
                <div class="mt-10">
                <h1 class="italic text-3xl text-zinc-700 font-extrabold conic">Meu Jogador</h1>
            </div>
            <div class="mt-10 flex flex-row gap-x-4">
                <h1 class="italic text-3xl text-red-700 font-extrabold">PPJ:</h1>
                <h1 class="italic text-3xl text-red-700 font-extrabold">{{ displayPpg.toFixed(1) }}</h1>
            </div>
            <div class="mt-10 flex flex-row gap-x-4">
                <h1 class="italic text-3xl text-red-700 font-extrabold">RPJ:</h1>
                <h1 class="italic text-3xl text-red-700 font-extrabold">{{ displayRpg.toFixed(1) }}</h1>
            </div>
            <div class="mt-10 flex flex-row gap-x-4">
                <h1 class="italic text-3xl text-red-700 font-extrabold">APJ:</h1>
                <h1 class="italic text-3xl text-red-700 font-extrabold">{{ displayApg.toFixed(1) }}</h1>
            </div>
            
            </div>
            <div class="mt-10 flex flex-row gap-x-4 p-4">
                <button @click="redirectTo(`/perfil/${authStore.username}`)" class="bg-slate-700 text-white font-[Inter] p-2 rounded-lg md:mt-32 md:ml-10 hover:bg-white hover:text-black duration-200">ACESSAR MEU JOGADOR ></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'animate.css';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/useAuthStore';
import { usePlayerStats } from '../../store/usePlayerStats';
import UsernameModal from '../modals/UsernameModal.vue';

const router = useRouter();
const authStore = useAuthStore();
const playerStats = usePlayerStats();

const openModalCreateUsername = ref(false);
const displayPpg = ref(0);
const displayRpg = ref(0);
const displayApg = ref(0);

const redirectTo = (route) => {
  if (authStore.username) {
    router.push(route);
  } else {
    openModalCreateUsername.value = true;
  }
};

const animateCount = (target, refVar) => {
  let start = 0;
  const end = target;
  const duration = 1000;
  const stepTime = Math.max(Math.floor(duration / 100), 20); // Intervalo de tempo fixo
  const increment = (end - start) / (duration / stepTime);

  const timer = setInterval(() => {
    start += increment;
    refVar.value = parseFloat(start.toFixed(1));
    if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
      refVar.value = end;
      clearInterval(timer);
    }
  }, stepTime);
};

onMounted(async () => {
  await authStore.fetchUser();
  await playerStats.fetchUser();

  animateCount(playerStats.ppg, displayPpg);
  animateCount(playerStats.rpg, displayRpg);
  animateCount(playerStats.apg, displayApg);
});
</script>

<style scoped>
.bg-img{
    background-image: url('../../assets/images/home/bg-orange2.png');
    background-size: cover;
}



.conic{
    background-image: conic-gradient(#553c9a, #ee4b2b, #00c2cb);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
}
</style>