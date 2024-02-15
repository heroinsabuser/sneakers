<script lang="ts" setup>
const emit = defineEmits(['openCart'])
defineProps({
  totalPrice: Number
})
</script>

<template>
  <header class="flex justify-between border-b border-slate-100 p-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img class="w-10 h-10" src="/logo.png" alt="" />
        <div>
          <h2 class="text-xl uppercase font-bold">Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-8">
      <li
        @click="() => emit('openCart')"
        class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="Heart" />
          <p>Закладки</p>
        </li>
      </router-link>
      <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
        <img src="/profile.svg" alt="Profile" />
        <p>Профиль</p>
      </li>
    </ul>
  </header>
</template>
