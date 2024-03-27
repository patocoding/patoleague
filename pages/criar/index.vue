<template>
    <div>
      <!-- component -->

<div class="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
    <div class="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style="max-width:1000px">
        <div class="md:flex w-full">
            <div class="hidden md:block w-1/2 bg-indigo-500 py-10 px-10 relative">
                <img src="../../assets/images/homem-basquete.png"/>
                <h2 class="absolute top-[50%] left-[50%] text-white font-sans font-bold">Pato League</h2>
            </div>
            <div class="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div class="text-center mb-10">
                    <h1 class="font-bold text-3xl text-gray-900">Registro</h1>
                    <p>Insira suas informações para se registrar em Pato League &copy;</p>
                    {{ email }}
                </div>
                <div>
                    <div class="flex -mx-3">
                        <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Nome</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input v-model="nome" type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Pato">
                            </div>
                        </div>
                        <div class="w-1/2 px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Sobrenome</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <input v-model="sobrenome" type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="League">
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Email</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input v-model="email" type="email" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="patoleague@exemplo.com">
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Altura (em CM)</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input v-model="altura" type="number" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="185">
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Data de nascimento</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input v-model="dataNascimento" type="date" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="09/01/2001">
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Celular (WhatsApp)</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <input v-model="numeroCelular" type="text" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="(XX) 9XXXXXXXX">
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            <label for="" class="text-xs font-semibold px-1">Posição</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <select class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" v-model="posicao">
                                  <option disabled value="">Selecione a Posição</option>
                                  <option>Ala</option>
                                  <option>Ala-Pivô</option>
                                  <option>Pivô</option>
                                  <option>Armador</option>
                                  <option>Ala-Armador</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-12">
                            <label for="" class="text-xs font-semibold px-1">Senha</label>
                            <div class="flex">
                                <div class="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i class="mdi mdi-lock-outline text-gray-400 text-lg"></i></div>
                                <input v-model="password" type="password" class="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************">
                            </div>
                        </div>
                    </div>
                    <div class="flex -mx-3">
                        <div class="w-full px-3 mb-5">
                            {{ error }}
                            <button @click="handleSignup" class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">Registrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES -->
<div class="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
    <div>
        <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <img class="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"/>
        </a>
    </div>
</div>
    </div>
</template>
  
  
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../composables/useSupabaseClient';

const nome = ref('');
const sobrenome = ref('');
const dataNascimento = ref('');
const posicao = ref('');
const altura = ref('');
const numeroCelular = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

function isPasswordValid(senha: string) {
  return senha.length > 6 && /\d/.test(senha);
}

function isPhoneNumberValid(numero: string) {
  const pattern = /^\(\d{2}\)\d{9}$/;
  return pattern.test(numero);
}


async function handleSignup() {
    if (!isPasswordValid(password.value)) {
        error.value = 'A senha deve ter mais de 6 caracteres e conter pelo menos um número.';
        return;
    }

    if (!isPhoneNumberValid(numeroCelular.value)) {
        error.value = 'Número de celular deve seguir o formato (XX) XXXXXXXXX.';
        return;
  }

    // Aqui a resposta foi ajustada para obter o objeto 'user'
    let { data, error: signupError } = await supabase.auth.signUp({
        email: email.value,
        password: password.value
    });

    if (signupError) {
        error.value = signupError.message;
        console.log(signupError.message);
        return;
    }

    // Verifique se o usuário foi criado antes de inserir no perfil
   else {
        // Note que 'data' foi renomeado para 'profileData' para evitar conflito de nome
        let { data: profileData, error: profileError } = await supabase.from('profiles').insert([
            { 
                user_id: data.user?.id,
                nome: nome.value, 
                sobrenome: sobrenome.value, 
                data_nascimento: dataNascimento.value, 
                posicao: posicao.value, 
                altura: altura.value, 
                numero_celular: numeroCelular.value 
            }
        ]);

        if (profileError) {
            error.value = profileError.message;
            return;
        }

        console.log('Perfil criado:', profileData);
        router.push('/login');
    }

    
}

</script>

  
  <style scoped>
  /* Seus estilos aqui */
  </style>