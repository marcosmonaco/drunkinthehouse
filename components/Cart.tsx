// React
import {useEffect, useState, useMemo} from "react";

// NextUI
import {Button} from "@nextui-org/react";

// Next
import Link from "next/link";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);

  // El total lo calculo con el id de la APi, ya que no incluye on precio como tal.
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.idDrink) / 1000, 0);
  }, [cart]);

  // El carrito todavia no se actualiza cuando agregamos un item (Leer el comentario en ProductList)
  useEffect(() => {
    const loadCart = () => {
      if (typeof window !== "undefined") {
        const savedCart = localStorage.getItem("drinkCart");
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      }
    };

    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const removeFromCart = (productId: number) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("drinkCart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="mb-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.strDrink} - ${(Number(item.idDrink) / 1000).toFixed(0)}
                </span>
                <Button size="sm" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
          <div className="text-xl font-bold">Total: ${total.toFixed(0)}</div>
          <Button className="w-full mt-4" as={Link} href="/checkout">
            Proceder al pago
          </Button>
        </>
      )}
    </div>
  );
}
