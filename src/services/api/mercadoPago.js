const createPreferenceUrl = import.meta.env.VITE_CREATE_PREFERENCE_URL;
const getReceiptUrl = import.meta.env.VITE_GET_RECEIPT_URL;

export const createPreference = async ({ cart, formData }) => {
  try {
    const response = await fetch(createPreferenceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
        formData,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return {
        success: false,
        code: response.status,
        message: data.mensaje || "Error en la preferencia",
        error: data.data,
      };
    }

    if (!data.data?.preference_id) {
      return {
        success: false,
        code: 500,
        message: "No se recibió preference_id",
        error: data,
      };
    }

    return {
      success: true,
      code: response.status,
      data: {
        preference_id: data.data.preference_id,
        init_point: data.data.init_point,
      },
    };
  } catch (error) {
    return {
      success: false,
      code: error?.response?.status || 500,
      message: error.message || "Error desconocido",
      error,
    };
  }
};

export const getReceipt = async (paymentId) => {
  try {
    const url = `${getReceiptUrl}?payment_id=${encodeURIComponent(paymentId)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentId,
      }),
    });
    const data = await response.json();

    if (!response.ok || data.status === "error") {
      return {
        success: false,
        code: response.status,
        message: data.menssage,
        error: data.data,
      };
    }
  } catch (error) {
    return {
      success: false,
      code: error?.response?.status || 500,
      message: error.message || "Error desconocido",
      error,
    };
  }
};
