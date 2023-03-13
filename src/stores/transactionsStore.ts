import type { Transaction } from "@/interfaces/transactions";
import { defineStore } from "pinia";


export interface LastSearchParams {
  value: String,
  lastPageVisited:Number,
  itemsPerPage: Number,
  startIndex: Number,
}
export type RootState = {
  selectedTransaction:Transaction;
  lastSearchParams:LastSearchParams
};

export const useTransactionsStore = defineStore({
  id: "transactionsStore",
  state: () =>
    ({
      selectedTransaction: {},
    } as RootState),

  actions: {
    setNewSelectedTransaction(param: Transaction) {
      this.selectedTransaction = param;
    },
    setLastSearchParams(params: LastSearchParams){
      this.lastSearchParams =params;
    }

  },
  persist: true,

});