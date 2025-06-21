import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { createPurchaseOrder } from "../../../../services/api/purchaseOrders";

const FinalizarCompra = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const preferenceId = searchParams.get("preference_id");
    const collectionId = searchParams.get("collection_id");

    if (status === "approved" && preferenceId && collectionId) {
      // Ejecutar la orden de compra
      createPurchaseOrder(cart, formData, totalPrice),
    }
  }, []);
  
  return <h2>Gracias por tu compra</h2>;
};
