export interface Product
{
    id:number;
    name:string;
    price:number;
}
export interface ProductsData
{
    [category:string]:Product[];
}