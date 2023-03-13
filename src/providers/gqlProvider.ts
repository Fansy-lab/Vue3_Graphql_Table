import {
  GET_ALL_UNIQUE_BANKS,
  GET_ACCOUNTS,
  GET_TRANSACTION_BY_ANY_PARAM,
  GET_TRANSACTIONS_BY_COLUMNS
} from "../graphql/queries/queries";
import { useQuery,provideApolloClient } from "@vue/apollo-composable";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
provideApolloClient(apolloClient);


const fetchTransactionsByAnyParam = async (search:string,limit: number, offset: number): Promise<any> => {
    const { result, loading, error } = await useQuery(GET_TRANSACTION_BY_ANY_PARAM, {
      search,
      offset,
      limit,
    })
   return {result,loading,error};
}
const fetchTransactionsByColumns = async (bank:string,accountIds:Array<string>,dateRange:Array<{month:number,year:number}>,limit: number, offset: number): Promise<any> => {
    const { result, loading, error } = await useQuery(GET_TRANSACTIONS_BY_COLUMNS, {
      bank,
      accountIds,
      dateRange,
      offset,
      limit,
    })
   return {result,loading,error};
}
const fetchallUniqueBanks = async (): Promise<any> => {
  const { result, loading, error } = await useQuery(GET_ALL_UNIQUE_BANKS)

 return {result,loading,error};
}
const fetchAllAccounts = async (): Promise<any> => {
  const { result, loading, error } = await useQuery(GET_ACCOUNTS)

 return {result,loading,error};
}

export {fetchallUniqueBanks,fetchAllAccounts,fetchTransactionsByAnyParam,fetchTransactionsByColumns}