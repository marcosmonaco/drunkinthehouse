// React
import {useEffect, useMemo} from "react";

// NextUI
import {Button} from "@nextui-org/react";

// Next
import Link from "next/link";

// Context
import {useAuth} from "@/app/Context/storage";

export default function CheckoutCart({removeFromCart}: any) {
  const {setCart, cart} = useAuth((state) => state);

  // El total lo calculo con el id de la APi, ya que no incluye on precio como tal.
  const total = useMemo(() => {
    return cart?.reduce((sum, item) => sum + Number(item.idDrink) / 1000, 0);
  }, [cart]);

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

  return (
    <div className="border rounded-lg p-4 h-fit">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {cart ? (
        <>
          <ul className="mb-4">
            {cart?.map((item) => (
              <li
                key={item.idDrink}
                className="flex justify-between items-center mb-2"
              >
                <span>
                  {item.strDrink} - ${(Number(item.idDrink) / 1000).toFixed(0)}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-xl font-bold">Total: ${total.toFixed(0)}</div>
          <Button className="w-full mt-4" as={Link} href="/">
            Volver al catalogo
          </Button>
        </>
      ) : (
        <p>Tu carrito está vacío</p>
      )}
    </div>
  );
}
