import { useContext, useEffect, useRef, useState } from "react";
import { createPurchaseOrder } from "../../../../services/api/purchaseOrders";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { BuyersData } from "./BuyersData";
import { GeneralContext } from "../../../../context/GeneralContext";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { useNavigate } from "react-router-dom";
import { getData } from "../../../../services/api/data";
import html2pdf from "html2pdf.js";
import { initMercadoPago } from "@mercadopago/sdk-react";

export const BuyersDataContainer = () => {
  const [formData, setFormData] = useState({
    buyer_name: "",
    buyer_last_name: "",
    buyer_address: "",
    buyer_phone_number: "",
    buyer_email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createdPurchaseOrder, setCreatedPurchaseOrder] = useState({});
  const navigate = useNavigate();

  const { cart, clearCart, handleGoBack } = useContext(GeneralContext);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const formRef = useRef();

  const createPreferenceUrl = import.meta.env.VITE_CREATE_PREFERENCE_URL;
  const mercadoPagoPublicKey = import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY;

  const downloadPDF = () => {
    const element = formRef.current;
    html2pdf()
      .set({
        margin: 1,
        filename: `Nativo_orden_de_compra_${createdPurchaseOrder.order_id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
    handleNavigate();
    clearCart();
  };

  const handleNavigate = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!window.MercadoPago) {
      initMercadoPago(mercadoPagoPublicKey, { locale: "es-AR" });
    } else {
      console.log("MercadoPago ya fue inicializado");
    }
  }, []);

  const handleBuy = () => {
    return fetch(createPreferenceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
        payer: {
          email: formData.buyer_email,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        else return response.json();
      })

      .then((data) => {
        if (data.preference_id) return data.preference_id;
        else throw new Error("No se recibio preference_id");
      });
  };

  const [preferenceId, setPreferenceId] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    Promise.all([
      // getData(),
      // createPurchaseOrder(cart, formData, totalPrice),
      handleBuy(),
    ])
      .then(
        ([
          // dataResponse, orderResponse,
          buyResponse,
        ]) => {
          const preferenceId = buyResponse;

          navigate(`/purchaseOrders/finalize/${preferenceId}`, {
            state: { cart, formData },
          });
        }
      )
      .catch((error) => {
        errorToastifyAlert(error.message || "Ocurrió un error inesperado");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!createdPurchaseOrder || !createdPurchaseOrder.cart) return;

    const lines = [];
    lines.push(`👋 Hola te envío los detalles de mi compra:\n`);
    lines.push(`🧾 *Orden de compra nro ${createdPurchaseOrder.order_id}*\n`);
    lines.push(
      `👤 *Comprador:* ${createdPurchaseOrder.buyer.buyer_name || "N/A"} ${
        createdPurchaseOrder.buyer.buyer_last_name || "N/A"
      }`
    );
    lines.push(
      `🏠 *Dirección:* ${createdPurchaseOrder.buyer.buyer_address || "N/A"}`
    );
    lines.push(
      `📞 *Teléfono:* ${createdPurchaseOrder.buyer.buyer_phone_number || "-"}`
    );
    lines.push(
      `📧 *Email:* ${createdPurchaseOrder.buyer.buyer_email || "N/A"}\n`
    );
    lines.push(`🛒 *Productos:*\n`);

    createdPurchaseOrder.cart.forEach((item, index) => {
      const subtotal = (item.price * item.quantity).toFixed(2);
      lines.push(
        `${index + 1}. ${item.description}\n   Cantidad: ${
          item.quantity
        } | Precio: $${item.price.toFixed(2)} | Subtotal: $${subtotal}`
      );
    });

    const total_price = Number(createdPurchaseOrder.totalPrice) || 0;
    lines.push(`\n📌 *Total:* $${total_price.toFixed(2)}`);

    // ⚠️ Encode only after the string is fully formed
    const message = encodeURIComponent(lines.join("\n"));

    const whatsappUrlUpdated = `https://wa.me/${phoneNumber}?text=${message}`;
    setWhatsappUrl(whatsappUrlUpdated);
  }, [createdPurchaseOrder, phoneNumber]);

  if (isLoading) return <LoadingContainer />;

  const buyersDataProps = {
    handleSubmit,
    handleGoBack,
    formData,
    handleChange,
    createdPurchaseOrder,
    totalPrice,
    downloadPDF,
    formRef,
    preferenceId,
  };

  return <BuyersData {...buyersDataProps} />;
};
