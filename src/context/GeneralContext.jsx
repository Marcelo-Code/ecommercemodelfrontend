/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { errorToastifyAlert, successToastifyAlert } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import { getPurchaseOrders } from "../services/api/purchaseOrders";
import { supabaseClient } from "../services/config/config";

export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const stored = localStorage.getItem("isLoggedIn");
    return stored === "true";
  });

  const [preferenceId, setPreferenceId] = useState(null);

  //Variables que mantienen los valores de los filtros activos
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");

  //Variables que mantiene el estado del usuario logueado
  const [loggedUser, setLoggedUser] = useState(() =>
    localStorage.getItem("loggedUser")
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("loggedUser", loggedUser);
  }, [isLoggedIn, loggedUser]);

  const navigate = useNavigate();

  // Función que navega hacia atrás
  const handleGoBack = () => {
    navigate(-1);
  };

  //Hook para el carrito
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [alerts, setAlerts] = useState([]);
  const [updateAlerts, setUpdateAlerts] = useState(false);
  const [updateOrderList, setUpdateOrderList] = useState(false);

  //Función para escuchar nuevos pedidos
  useEffect(() => {
    if (!isLoggedIn) return;

    const bellAlert = new Audio("/sounds/bellAlert.mp3");

    const channel = supabaseClient
      .channel("custom-ordenes-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "purchase_orders",
        },

        (payload) => {
          setUpdateAlerts((prev) => !prev);
          bellAlert
            .play()
            .catch((err) => console.warn("Error al reproducir sonido:", err));
          successToastifyAlert("¡Nueva orden recibida!");
          setUpdateOrderList((prev) => !prev);
          setUpdateAlerts((prev) => !prev);
        }
      )
      // Escuchar actualizaciones (como cambios de status)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "purchase_orders",
        },
        (payload) => {
          if (payload.old.status !== payload.new.status) {
            setUpdateOrderList((prev) => !prev);
            setUpdateAlerts((prev) => !prev);
            successToastifyAlert(
              `Estado de orden actualizado a: ${payload.new.status}`
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  //Función para obtener las alertas
  useEffect(() => {
    const fetchData = async () => {
      const response = await getPurchaseOrders();
      const filtered = response.data.filter(
        (item) => item.status === "pendiente"
      );
      setAlerts(filtered.length);
    };

    fetchData();
  }, [updateAlerts]);

  //Hook para los datos del comprador
  const [buyerData, setBuyerData] = useState({});

  //Función que verifica si hay suficiente stock FUERA DE SERVICIO
  const outOfStock = (product, action) => {
    const productInCart = cart.find((item) => item.id === product.id);
    const productQuantityInCart = productInCart ? productInCart.quantity : 0;

    //Verifica si hay suficiente stock desde el botón de "Agregar al carrito"
    const exceedsStockInCart =
      action === "addProductToCart" &&
      product.counter + productQuantityInCart > product.stock;

    //Verifica si hay suficiente stock desde el botón de "Agregar"
    const exceedsStockDirect =
      action === "addProduct" &&
      (product.counter ?? 0) + productQuantityInCart >= product.stock;

    if (exceedsStockInCart || exceedsStockDirect) {
      errorToastifyAlert("No hay suficiente stock");
      return true;
    }

    return false;
  };

  //Función que veirifica si el producto seleccionado se encuentra en el carrito
  const existingProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  //Función para incrementar el contador del producto
  const addProduct = (product, setProducts = null) => {
    // const action = "addProduct";

    //Verifica si hay suficiente stock
    // if (outOfStock(product, action)) return;

    //Incrementa el contador del producto estando en la página de productos
    if (setProducts) {
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? { ...prevProduct, counter: prevProduct.counter + 1 }
            : prevProduct
        )
      );
    }
    //Incrementa el contador del producto estando en la página del carrito
    //setProducts será "undefined" en la página del carrito
    else {
      setCart((prevCart) =>
        prevCart.map((prevProduct) =>
          prevProduct.id === product.id
            ? { ...prevProduct, quantity: product.quantity + 1 }
            : prevProduct
        )
      );
    }
  };

  //Función para decrementar el contador del producto
  const removeProduct = (product, setProducts = null) => {
    if ((product.counter || product.quantity) === 1) return;

    //Decrementa el contador del producto estando en la página de productos
    if (setProducts) {
      setProducts((prevProducts) =>
        prevProducts.map((prevProduct) =>
          prevProduct.id === product.id
            ? { ...prevProduct, counter: prevProduct.counter - 1 }
            : prevProduct
        )
      );
    }
    //Decrementa el contador del producto estando en la página del carrito
    //setProducts será "undefined" en la página del carrito
    else {
      setCart((prevCart) =>
        prevCart.map((prevProduct) =>
          prevProduct.id === product.id
            ? { ...prevProduct, quantity: product.quantity - 1 }
            : prevProduct
        )
      );
    }
  };

  //Función para agregar el producto al carrito
  const addProductToCart = (product, products, setProducts) => {
    // const action = "addProductToCart";
    //Verifica si hay suficiente stock
    // if (outOfStock(product, action)) return;

    const quantity = product.counter;
    const exists = existingProductInCart(product);

    //Verifica si el producto seleccionado se encuentra en el carrito
    const updatedCart = exists
      ? cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      : [
          ...cart,
          {
            id: product.id,
            quantity,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.price,
            // stock: product.stock,
          },
        ];

    //Actualiza el carrito
    setCart(updatedCart);
    successToastifyAlert("Agregado al carrito");

    //Reinicia el contador del producto a 1
    const updatedProducts = products.map((item) =>
      item.id === product.id ? { ...item, counter: 1 } : item
    );
    setProducts(updatedProducts);
  };

  const removeProductFromCart = (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const data = {
    cart,
    setCart,
    addProduct,
    removeProduct,
    addProductToCart,
    handleGoBack,
    removeProductFromCart,
    clearCart,
    buyerData,
    setBuyerData,
    isLoggedIn,
    setIsLoggedIn,
    loggedUser,
    setLoggedUser,
    existingProductInCart,
    alerts,
    setUpdateAlerts,
    updateAlerts,
    updateOrderList,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    preferenceId,
    setPreferenceId,
  };

  return (
    <GeneralContext.Provider value={data}>{children}</GeneralContext.Provider>
  );
};
