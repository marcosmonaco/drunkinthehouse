// Next
import Image from "next/image";

// NextUI
import {Button} from "@nextui-org/react";

// Context
import {useAuth} from "@/app/Context/storage";

export default function ProductList({products, addToCart}: any) {
  // Estados
  const {cart} = useAuth((state) => state);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-svh flex-wrap overflow-y-auto scrollbar-hide">
      {products &&
        products.map((product: any) => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col">
            <Image
              src={product.strDrinkThumb}
              alt={product.strDrink}
              width={200}
              height={200}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-semibold mb-2">
              {product.strDrink} - 1 Litro
            </h2>
            {/* // El total lo calculamos con el id de la APi, ya que no incluye un precio como tal */}
            <p className="text-gray-600 mb-4">
              ${(Number(product.idDrink) / 1000).toFixed(0)}
            </p>
            <p className="text-gray-600 mb-4">
              Instrucciones:{" "}
              {product.strInstructionsES ?? "No tiene instrucciones"}
            </p>
            <p className="text-gray-600 mb-1">Ingredientes:</p>
            <div className="flex flex-col mb-2">
              {Array.from({length: 15}).map((_, index) => {
                const ingredient = product[`strIngredient${index + 1}`];
                const measure = product[`strMeasure${index + 1}`];

                return (
                  ingredient && (
                    <p key={index} className="text-gray-600">
                      {ingredient} {measure ? `(${measure})` : ""}
                    </p>
                  )
                );
              })}
            </div>

            <Button
              onClick={() => {
                addToCart(product);
              }}
              className="mt-auto"
            >
              {cart?.some(
                (cartItem: {idDrink: string}) =>
                  cartItem.idDrink === product.idDrink
              ) ? (
                <p>Quitar al carrito</p>
              ) : (
                <p>Agregar al carrito</p>
              )}
            </Button>
          </div>
        ))}
    </div>
  );
}
