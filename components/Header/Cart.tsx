import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartColumn from "../CartColumn";
import { getDocument } from "@/utils/firebase/firestore";
import { useAuthContext } from "@/contexts/AuthContext";

const Cart = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const { user, loading }: any = useAuthContext();
  const [cart, setCart] = useState<any>();
  const [snackbarMessage, setSnackbarMessage] = useState("Default Message");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cartLoading, setCartLoading] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    // check if user exists

    const fetchCartData = async () => {
      if (!user) return;
      setCartLoading(true);
      await getDocument("carts", user?.uid).then((res) => {
        if (res) {
          setCart(res);
          console.log("Cart: ", res);
          setCartLoading(false);
        }
      });
    };

    // fetchCartData();
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [user]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <div
        ref={trigger}
        onClick={() => {
          setOpenCart(!openCart);
        }}
        className="relative flex h-8 w-8 items-center justify-center rounded-full  hover:scale-[1.025] dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {cartLoading ? (
          <></>
        ) : (
          <CartColumn
            cart={cart}
            user={user}
            open={openCart}
            setOpen={setOpenCart}
            callSnackBar={(message: string) => {
              setSnackbarMessage(message);
              setSnackbarOpen(true);
            }}
          />
        )}
        <span
          className={`absolute -top-1 right-0 z-1 h-2 w-2  bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <FontAwesomeIcon
          // color={theme !== "light" ? "#fff" : ""}
          style={{ color: "#656575" }}
          icon={faCartShopping}
        />
      </div>
    </li>
  );
};

export default Cart;
