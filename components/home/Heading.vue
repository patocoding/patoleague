<template>
    <div class="flex justify-center flex-col bg-img  p-12">
        <h1 class="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight 
        text-gray-900 md:text-5xl lg:text-6xl ">{{ $props.title }}</h1>
        <p class="bg-black bg-opacity-50 text-center mb-6 text-lg font-normal p-2
        text-white lg:text-xl sm:px-16 xl:px-48">{{ $props.belowText }}</p>
    </div>
</template>

<script setup lang="ts">
//make texts in this code dynamic using props
const props = defineProps ({
    title: {
        type: String,
        required: true
    },
    belowText: {
        type: String,
        required: false
    }
})
</script>

<style scoped>
.bg-img {
    background-image: url('../../assets/images/home/home-banner-principal.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style>