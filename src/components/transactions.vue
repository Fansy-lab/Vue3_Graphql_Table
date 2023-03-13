<template>
  <div class="table-container">
    <div
      class="w-9/12 overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table
        class="h-96 w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-lg font-bold">
              Transactions
              <p class="text-sm">
                <span class="text-red-500 text-xl"> IMPORTANT! </span>
                <br />
                Use the big search textbox
                <span class="text-red-500 text-xl"> or </span>

                filter by the 3 columns
              </p>
            </th>
            <th class="p-4 text-lg"></th>
            <th class="p-4 text-lg"></th>
            <th class="p-4 text-lg"></th>
            <th class="p-4 text-lg"></th>
          </tr>
          <tr>
            <th class="p-4">
              <label for="category">Search</label>
              <input
                v-on:keyup.enter="searchClick"
                v-model="anySearchValue"
                id="Search"
                class="pl-2 border border-gray-300 py-2 rounded-md w-full"
                type="text"
                placeholder="Search by bank, account, reference, category..." />
            </th>
            <th class="p-4">
              <label for="bank">Bank</label>

              <select
                :disabled="anySearchValue ? true : false"
                @change="selectBankFilter($event.target.value)"
                id="bank"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>No filter applied</option>
                <option
                  v-for="bank in allUniqueBanksComputed"
                  :key="bank.name"
                  :value="bank">
                  {{ bank }}
                </option>
              </select>
            </th>
            <th class="p-4">
              <label for="account">Account</label>
              <select
                :disabled="anySearchValue ? true : false"
                @change="selectAccountFilter($event.target.value)"
                id="account"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>No filter applied</option>
                <option
                  v-for="acc in allUniqueAccountsComputed"
                  :key="acc.accountIds"
                  :value="acc.name">
                  {{ acc.name }}
                </option>
              </select>
            </th>
            <th class="p-4">
              <label for="date">Date</label>

              <VueDatePicker
                :disabled="anySearchValue ? true : false"
                auto-apply
                id="date"
                v-model="dateSearchValue"
                range
                month-picker
                placeholder="No filter applied"></VueDatePicker>
            </th>
            <th class="p-4 text-lg">
              <button
                @click="searchClick"
                class="mt-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Search
              </button>
            </th>
          </tr>
          <tr>
            <th scope="col" class="w-5/12 px-6 py-4 font-medium text-gray-900">
              Reference
            </th>
            <th scope="col" class="w-2/12 px-6 py-4 font-medium text-gray-900">
              Category
            </th>
            <th
              colspan="2"
              scope="col"
              class="w-5/12 text-right px-6 py-4 font-medium text-gray-900">
              Date
            </th>
            <th
              colspan="2"
              scope="col"
              class="px-6 py-4 font-medium text-right text-gray-900">
              Amount
            </th>
          </tr>
        </thead>
        <tbody
          v-if="!isLoading"
          class="divide-y divide-gray-100 border-t border-gray-100">
          <tr
            v-for="transaction in transactionsComputed"
            :key="transaction.id"
            @click="goToDetailsView(transaction)"
            class="hover:bg-gray-50 cursor-pointer">
            <th class="w-1/2 flex gap-3 px-6 py-4 font-normal text-gray-900">
              <div
                v-if="transaction.reference"
                class="font-medium text-gray-700">
                {{ transaction.reference }}
              </div>
              <div v-else class="text-gray-400">No reference provided</div>
            </th>
            <td class="px-6 py-4">
              <span
                v-if="transaction.category"
                :style="getBackgroundColor(transaction.category)"
                class="inline-flex items-center gap-1 rounded-full px-2 py-2 text-black text-xs font-semibold">
                {{ transaction.category.name }}
              </span>
              <span v-else> N/A </span>
            </td>
            <td colspan="2" class="text-right px-6 py-4">
              {{ getFormatedDate(transaction.date) }}
            </td>
            <td colspan="2" class="px-6 py-4">
              <div class="flex justify-end gap-2">
                {{ transaction.amount
                }}<span class="text-gray-400">
                  {{ transaction.currency }}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
        <div v-else class="w-full flex">
          <img
            src="https://www.iwastesomuchtime.com/wp-content/uploads/sites/68/2021/12/10252014134466-51924.gif" />
        </div>
      </table>
      <div class="flex p-6 mt-2 sm:flex sm:items-center sm:justify-between">
        <div
          class="flex justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          Results: {{ transactionsLengthComputed }}
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
          <a
            @click="previousPage"
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span> previous </span>
          </a>

          <a
            @click="nextPage"
            href="#"
            class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span> Next </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 rtl:-scale-x-100">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  <errorModal
    v-if="showError"
    @closeClicked="hideErrorModal"
    :error-data="{
      title: 'Error',
      message:
        'An error ocurred while getting the data. Check the console for more info.',
    }"></errorModal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  fetchallUniqueBanks,
  fetchAllAccounts,
  fetchTransactionsByAnyParam,
  fetchTransactionsByColumns,
} from "@/providers/gqlProvider";
import type { Transaction } from "@/interfaces/transactions";
import type { Bank } from "@/interfaces/banks";
import router from "@/router/index";
import { RouteNamespace } from "@/namespaces/RouteNamespace";
import { useTransactionsStore } from "@/stores/transactionsStore";
import errorModal from "./errorModal.vue";

let anySearchValue = ref("");
let accountSearchValue = ref<string[]>([]);
let bankSearchValue = ref<string>("");
let dateSearchValue = ref();
let transactionsForTable = ref([]);
let allUniqueBanks = ref([]);
let allUniqueAccounts = ref([]);
let currentPage = ref(1);
let showError = ref(false);
const transactionsStore = useTransactionsStore();

const ITEMS_PER_PAGE = 10;

// Hooks
onMounted(async () => {
  allUniqueBanks.value = await fetchallUniqueBanks();
  allUniqueAccounts.value = await fetchAllAccounts();
  await loadLastSearch();
});

// Computed Properties

const allUniqueAccountsComputed = computed(() => {
  if (allUniqueAccounts.value.result) {
    const uniqueNames = [
      ...new Set(
        allUniqueAccounts.value.result.accounts.map((item) => item.name)
      ),
    ];
    const result = uniqueNames.map((name) => {
      const accountIds = allUniqueAccounts.value.result.accounts
        .filter((item) => item.name === name)
        .map((item) => item.id);
      return { name, accountIds };
    });
    return result;
  }

  return [];
});
const allUniqueBanksComputed = computed<Bank[]>(() => {
  if (allUniqueBanks.value.result)
    return allUniqueBanks.value.result.allUniqueBanks as Bank[];
  return [];
});
const transactionsLengthComputed = computed(() => {
  if (transactionsForTable.value.result) {
    const totalCount =
      transactionsForTable?.value?.result?.searchTransactionsByAnyParam
        ?.totalCount ??
      transactionsForTable?.value?.result?.searchTransactionsByColumns
        ?.totalCount ??
      0;

    const formattedTotalCount = totalCount.toLocaleString("en-US");
    return formattedTotalCount;
  }

  return "";
});
const isLoading = computed(() => {
  return transactionsForTable.value.loading;
});
const transactionsComputed = computed<Transaction[]>(() => {
  if (transactionsForTable.value.result) {
    const transactions =
      transactionsForTable?.value?.result?.searchTransactionsByAnyParam
        ?.transactions ||
      transactionsForTable?.value?.result?.searchTransactionsByColumns
        ?.transactions ||
      [];

    return transactions as Transaction[];
  }
  return [];
});
// Watchers
const watchError = (source) => {
  return watch(
    () => source.value?.error,
    (hasError) => {
      if (hasError) {
        showError.value = true;
        console.error(source.value?.error);
      }
    }
  );
};
watchError(allUniqueAccounts);
watchError(allUniqueBanks);
watchError(transactionsForTable);
// Functions
const hideErrorModal = () => {
  showError.value = false;
};

const getBackgroundColor = (category: Transaction["category"]) => {
  if (category) return `background-color:#${category.color}`;
};

const getFormatedDate = (dateParam: string) => {
  const date = new Date(dateParam);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};
const goToDetailsView = (transaction: Transaction) => {
  transactionsStore.setNewSelectedTransaction(transaction);
  router.push(RouteNamespace.transactionsDetails);
};
const searchClick = async () => {
  currentPage.value = 1;
  if (anySearchValue.value) {
    await searchByAnyValue();
  } else {
    await searchByColumns();
  }
};
const loadLastSearch = async () => {
  if (transactionsStore.lastSearchParams) {
    currentPage.value = transactionsStore.lastSearchParams.lastPageVisited;
    anySearchValue.value = transactionsStore.lastSearchParams.value.toString();
    await searchByAnyValue();
  }
};
const selectBankFilter = (bankName: string) => {
  bankSearchValue.value = bankName;
};
const selectAccountFilter = (accountName: string) => {
  let filteredAccounts = allUniqueAccounts.value.result.accounts
    .filter((account) => account.name === accountName)
    .map((account) => account.id);

  accountSearchValue.value = filteredAccounts;
};
const searchByColumns = async () => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE;
  transactionsForTable.value = await fetchTransactionsByColumns(
    bankSearchValue.value,
    accountSearchValue.value,
    dateSearchValue.value,
    ITEMS_PER_PAGE,
    startIndex
  );
};
const searchByAnyValue = async () => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE;

  transactionsForTable.value = await fetchTransactionsByAnyParam(
    anySearchValue.value,
    ITEMS_PER_PAGE,
    startIndex
  );
  transactionsStore.setLastSearchParams({
    value: anySearchValue.value,
    lastPageVisited: currentPage.value,
    itemsPerPage: ITEMS_PER_PAGE,
    startIndex,
  });
};
const nextPage = async () => {
  currentPage.value++;
  if (anySearchValue.value) {
    await searchByAnyValue();
  } else {
    await searchByColumns();
  }
};
const previousPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;

    if (anySearchValue.value) {
      await searchByAnyValue();
    } else {
      await searchByColumns();
    }
  }
};
</script>
<style lang="scss">
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: calc(5%);
}

.filters {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.filters input {
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 200px;
}
</style>
