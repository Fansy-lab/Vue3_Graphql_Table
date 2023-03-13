import { gql } from "@apollo/client/core";

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      id
      name
      bank
    }
  }
`;
export const GET_ALL_UNIQUE_BANKS = gql`
  query Query {
    allUniqueBanks
  }
`;
export const GET_ALL_UNIQUE_ACCOUNTS = gql`
  query Query {
    allUniqueAccounts
  }
`;

export const GET_TRANSACTIONS_BY_COLUMNS = gql`
  query SearchTransactionsByColumns(
    $bank: String
    $accountIds: [ID]
    $dateRange: [DateInput]
    $limit: Int
    $offset: Int
  ) {
    searchTransactionsByColumns(
      bank: $bank
      accountIds: $accountIds
      dateRange: $dateRange
      limit: $limit
      offset: $offset
    ) {
      totalCount
      transactions {
        accountId
        amount
        category {
          color
          name
        }
        categoryId
        currency
        date
        id
        reference
      }
    }
  }
`;
export const GET_TRANSACTION_BY_ANY_PARAM = gql`
  query SearchTransactionsByAnyParam(
    $search: String
    $offset: Int
    $limit: Int
  ) {
    searchTransactionsByAnyParam(
      search: $search
      limit: $limit
      offset: $offset
    ) {
      transactions {
        id
        date
        amount
        currency
        reference
        accountId
        category {
          name
          color
        }
      }
      totalCount
    }
  }
`;
