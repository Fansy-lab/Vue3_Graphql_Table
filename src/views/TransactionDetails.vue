<template>
  <div class="flex flex-col w-full">
    <div class="flex items-center py-4">
      <router-link to="/" class="text-lg text-gray-800 hover:text-gray-600">
        <svg
          style="zoom: 2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 22"
          stroke-width="2.5"
          stroke="currentColor"
          class="ml-6 w-5 h-5 rtl:-scale-x-100">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
      </router-link>
      <h1 class="ml-4 text-3xl font-bold text-gray-800">Back</h1>
    </div>
    <div class="pt-60 flex flex-col items-center h-screen bg-gray-100">
      <div class="w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h1 class="text-xl font-bold mb-4">Transaction Details</h1>
        <div class="flex flex-col gap-2">
          <div class="flex justify-between">
            <span class="font-semibold">Reference:</span>
            <span>{{ transactionData.reference || "N/A" }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Category:</span>
            <span>{{ transactionData.category.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Date:</span>
            <span>{{ getFormatedDate(transactionData.date) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="font-semibold">Amount:</span>
            <span
              >{{ transactionData.amount }} {{ transactionData.currency }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from "@/interfaces/transactions";
import { onMounted, ref } from "vue";
import { useTransactionsStore } from "@/stores/transactionsStore";
const transactionsStore = useTransactionsStore();

const transactionData = ref<Transaction>({
  id: "",
  category: "",
  date: new Date(),
  currency: "",
  amount: 0,
});
onMounted(() => {
  loadTransactionData();
});
const getFormatedDate = (dateParam: Date) => {
  const date = new Date(dateParam);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};
const loadTransactionData = () => {
  transactionData.value = transactionsStore.selectedTransaction;
};
</script>
