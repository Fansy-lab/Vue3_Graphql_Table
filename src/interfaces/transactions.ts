interface Category{
  name:string;
  color:string
}
export interface Transaction {
    id:string;
    reference?: string;
    category: Category;
    date: Date;
    amount: Number;
    currency: string;
  }