import { useParams } from "react-router-dom";
import { PurchaseOrdersItemsList } from "./PurchaseOrdersItemsList";
import { useEffect, useState } from "react";
import {
  getPurchaseOrder,
  getPurchaseOrdersItems,
} from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import { handleError } from "../../../../utils/helpers";

export const PurchaseOrdersItemsListContainer = () => {
  const { purchaseOrderId } = useParams();

  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getPurchaseOrdersItems(purchaseOrderId),
      getPurchaseOrder(purchaseOrderId),
    ])
      .then(([responsePurchaseOrdersItems, responsePurchaseOrder]) => {
        //Captura erores en caso de que existan
        if (responsePurchaseOrdersItems.status !== 200) {
          handleError(responsePurchaseOrdersItems);
        }

        if (responsePurchaseOrder.status !== 200) {
          handleError(responsePurchaseOrder);
        }

        const responsePurchaseOrdersItemsData =
          responsePurchaseOrdersItems.data;
        const responsePurchaseOrderData = responsePurchaseOrder.data;
        setItems(responsePurchaseOrdersItemsData);
        setOrder(responsePurchaseOrderData);
      })
      .catch((error) => {
        setError(error.message || "Ocurrió un error inesperado");
      })
      .finally(() => setIsLoading(false));
  }, [purchaseOrderId]);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorContainer error={error} />;

  const purchaseOrdersItemsListProps = {
    items,
    order,
  };

  return <PurchaseOrdersItemsList {...purchaseOrdersItemsListProps} />;
};
