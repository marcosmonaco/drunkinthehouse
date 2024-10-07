"use client";

import {useState, useEffect} from "react";
import {Product} from "@/models/types";
import Cart from "@/components/Cart";
import ProductList from "@/components/ProductList";

const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
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

export default function EcommercePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      console.log(data);
      setIsLoading(false);
    });
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("drinkCart") || "[]");
    const updatedCart = [...cart, product];
    localStorage.setItem("drinkCart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Drunk in the house!
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {isLoading ? (
            <p className="text-center">Cargando productos...</p>
          ) : (
            <ProductList products={products} addToCart={addToCart} />
          )}
        </div>
        <div className="md:w-1/3">
          <Cart />
        </div>
      </div>
    </div>
  );
}
