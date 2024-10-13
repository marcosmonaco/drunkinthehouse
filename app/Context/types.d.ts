export interface Storage {
  cart?: Any[];
  setCart: (cart: Any[] | undefined) => void;
}
