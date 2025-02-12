import { TransactionFields } from "./FormType";

export interface Filter {
  id: number;
  field: keyof TransactionFields | "";
  operator: string;
  value: string;
}

export interface SearchState {
  searchValue: string;
  filters: Filter[];
}
