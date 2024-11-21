"use client";

// React
import {useState, useEffect} from "react";

// Components
import ProductList from "@/components/ProductList";
import Cart from "@/components/Cart";

// Context
import {useAuth} from "./Context/storage";

const fetchProducts = async (): Promise<any[]> => {
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
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  const {setCart} = useAuth((state) => state);

  const manageItemCart = (newDrink: any) => {
    const existingItems = localStorage.getItem("drinkCart");

    let itemsOnCartArray = [];

    let updatedItems: Array<any> = [];

    if (existingItems) {
      itemsOnCartArray = JSON.parse(existingItems);

      const itemIndex = itemsOnCartArray.findIndex(
        (item: {idDrink: string}) => item.idDrink === newDrink.idDrink
      );

      if (itemIndex === -1) {
        updatedItems = [...itemsOnCartArray, newDrink];
      } else {
        updatedItems = [
          ...itemsOnCartArray.slice(0, itemIndex),
          ...itemsOnCartArray.slice(itemIndex + 1),
        ];
      }
    }

    setCart(updatedItems);
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
            <ProductList products={products} addToCart={manageItemCart} />
          )}
        </div>
        <div className="md:w-1/3">
          <Cart removeFromCart={manageItemCart} />
        </div>
      </div>
    </div>
  );
}
