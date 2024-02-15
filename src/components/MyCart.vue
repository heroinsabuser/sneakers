<script setup lang="ts">
import CartItem from './CartItem.vue'
import EmptyCart from './EmptyCart.vue'
const emit = defineEmits(['openCart', 'addToCart', 'createOrder'])
defineProps({
  totalPrice: Number,
  cart: Array,
  disabledCartBtn: Boolean,
  isOrderSuccess: Boolean
})
</script>

<template>
  <div class="bg-black/50 h-full w-full fixed top-0 flex flex-row-reverse">
    <div class="bg-white h-full w-96 p-6">
      <div class="flex justify-between">
        <h2 class="font-bold text-2xl">Корзина</h2>
        <img
          v-if="cart && cart.length > 0"
          @click="() => emit('openCart')"
          class="cursor-pointer mt-1 opacity-50 hover:opacity-100 transition"
          src="/arrow-right.svg"
          alt=""
        />
      </div>
      <EmptyCart
        img="/package-icon.png"
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        v-if="cart && cart.length === 0 && isOrderSuccess === false"
        @openCart="() => emit('openCart')"
        isCart
      />
      <EmptyCart
        img="/order-success-icon.png"
        title="Заказ оформлен"
        description="Ваш заказ находится в обработке"
        v-if="isOrderSuccess === true"
        @openCart="() => emit('openCart')"
        isCart
      />

      <div class="mt-8 gap-3 flex flex-col" v-auto-animate>
        <CartItem
          v-for="item in cart"
          :key="item.id"
          :title="item.title"
          :price="item.price"
          :image-url="item.imageUrl"
          @on-click-remove="() => emit('addToCart', item)"
        />
      </div>
      <div class="mt-4">
        <div class="flex gap-1">
          <p>Итого:</p>
          <div class="flex-1 border-dashed border-b"></div>
          <b class="font-semibold text-base">{{ totalPrice }} руб.</b>
        </div>
        <div class="flex gap-1 mt-2">
          <p>Налог 5%:</p>
          <div class="flex-1 border-dashed border-b"></div>
          <b class="font-semibold text-base">{{ Math.round(totalPrice * 0.05) }} руб.</b>
        </div>
        <button
          @click="() => emit('createOrder')"
          :disabled="disabledCartBtn"
          class="bg-lime-500 w-full rounded-xl p-3 text-white mt-3 transition active:bg-lime-700 disabled:bg-slate-200 hover:bg-lime-600"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
