import type { Product} from "./products";

export interface CartItem extends Product{
  quantity: number;
  variants?: {
    size?: string;
    color?: string;
  };
}
