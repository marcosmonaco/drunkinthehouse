"use client";

import {useState, useEffect} from "react";
import {Product} from "@/models/types";
import Cart from "@/components/Cart";
import ProductList from "@/components/ProductList";

const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data.drinks);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default function Checkout() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Drunk in the house!
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Cart />
      </div>
    </div>
  );
}
