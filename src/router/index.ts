import { createRouter, createWebHistory } from 'vue-router'
import Transactions from '@/views/TransactionsView.vue'
 import TransactionDetails from '@/views/TransactionDetails.vue'
 import type { Transaction } from "@/interfaces/transactions";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'transactions',
      component: Transactions
    },

    {
      path: '/transaction',
      name: 'transactionDetails',
      component: TransactionDetails,
    }

  ]
})

export default router
