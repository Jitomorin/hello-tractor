import { createContext, useState, useEffect } from "react";
import { getDocument, startCartListener } from "@/utils/firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase/config";

interface Cart {
  uid: string;
  products: any[];
}

interface CartContextProps {
  cart: Cart | null;
  loading: boolean;
  error: any;
}

const CartContext = createContext<CartContextProps>({
  cart: null,
  loading: false,
  error: null,
});

const CartProvider: React.FC = ({ children, userId }: any) => {
  const [cart, setCart] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  //   console.log("context data:", userId);
  const docRef = doc(db, "carts", userId ? userId : "temp");

  useEffect(() => {
    onSnapshot(docRef, (data: any) => {
      if (data.exists()) {
        // console.log("cart is changing", data.data());
        localStorage.setItem("cart", JSON.stringify(data.data()));
        setCart(data.data());
      }
    });
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      try {
        const cartData: any = await getDocument("carts", userId);
        localStorage.setItem("cart", JSON.stringify(cartData));
        setCart(cartData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setCart(null);
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
