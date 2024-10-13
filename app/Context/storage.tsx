// Zustand
import {create} from "zustand";
import {devtools} from "zustand/middleware";

// Types
import {Storage} from "./types";

export const useAuth = create(
  devtools<Storage>((set) => ({
    setCart: (cartItems) => {
      localStorage.setItem("drinkCart", JSON.stringify(cartItems));
      return set({cart: cartItems});
    },
  }))
);
