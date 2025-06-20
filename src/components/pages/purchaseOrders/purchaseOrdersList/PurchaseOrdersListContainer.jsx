import { useContext, useEffect, useState } from "react";
import { PurchaseOrderList } from "./PurchaseOrderList";
import {
  getPurchaseOrders,
  getPurchaseOrdersItems,
  updatePurchaseOrderStatus,
} from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import {
  FIELDS_TO_SEARCH,
  FILTER_OPTIONS,
  SORT_OPTIONS,
} from "./filtersPurchaseOrdersList";
import { errorToastifyAlert } from "../../../../utils/alerts";
import { GeneralContext } from "../../../../context/GeneralContext";

export const PurchaseOrdersListContainer = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusIsLoading, setStatusIsLoading] = useState(null);
  const [error, setError] = useState(null);

  const { updateOrderList } = useContext(GeneralContext);

  const handleGetOrderDetails = async (orderId) => {
    await getPurchaseOrdersItems(orderId);
  };

  const handleChangeStatus = async (orderId) => {
    try {
      setStatusIsLoading(orderId);
      await updatePurchaseOrderStatus(orderId);

      const toggleStatus = (orders) =>
        orders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status:
                  order.status === "pendiente" ? "finalizado" : "pendiente",
              }
            : order
        );

      setFilteredOrders(toggleStatus);
      setOrders(toggleStatus);
    } catch (error) {
      errorToastifyAlert(error.message || "Ocurrió un error inesperado");
    } finally {
      setStatusIsLoading(null);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getPurchaseOrders()
      .then((response) => {
        setOrders(response.data);
        setFilteredOrders(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [updateOrderList]);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorContainer error={error} />;

  const generalBarContainerProps = {
    enableSearchFilterBar: true,
    enableEditionBar: false,
    setFilteredRecords: setFilteredOrders,
    records: orders,
    SORT_OPTIONS,
    FILTER_OPTIONS,
    FIELDS_TO_SEARCH,
  };

  const purchaseOrdersListProps = {
    ...generalBarContainerProps,
    filteredOrders,
    handleGetOrderDetails,
    setFilteredOrders,
    handleChangeStatus,
    statusIsLoading,
  };

  return <PurchaseOrderList {...purchaseOrdersListProps} />;
};
