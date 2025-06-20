import { supabaseClient } from "../config/config";

export const getPurchaseOrders = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;

    return {
      status: 200,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};

export const getPurchaseOrder = async (orderId) => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders")
      .select("*")
      .eq("id", orderId)
      .single(); // Espera un único resultado

    if (error) throw error;

    return {
      status: 200,
      message: "Orden obtenida con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener la orden",
      error,
    };
  }
};

export const getPurchaseOrdersItems = async (orderId) => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders_items")
      .select("*, products: product_id(*)")
      .eq("purchase_order_id", orderId);
    if (error) throw error;

    return {
      status: 200,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};

//Función sin RPC, no la utilizo (no previene las race conditions)
export const createPurchaseOrder = async (cart, buyer, totalPrice) => {
  try {
    const date = new Date();

    // Crear orden de compra principal
    const { data: order, error } = await supabaseClient
      .from("purchase_orders")
      .insert({
        date,
        buyer_name: buyer.buyer_name,
        buyer_last_name: buyer.buyer_last_name,
        buyer_address: buyer.buyer_address,
        buyer_phone_number: buyer.buyer_phone_number,
        buyer_email: buyer.buyer_email,
        total_price: totalPrice,
        status: "pendiente",
      })
      .select()
      .single();

    if (error) throw error;

    // Insertar ítems de la orden
    const orderItems = cart.map((item) => ({
      purchase_order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabaseClient
      .from("purchase_orders_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return {
      status: 200,
      message: "Orden creada con éxito",
      data: {
        date,
        order_id: order.id,
        buyer,
        totalPrice,
        cart,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear la orden",
      error,
    };
  }
};

// NO UTILIZADO: función RPC, previene las race conditions
export const createPurchaseOrderRPC = async (cart, buyer, totalPrice) => {
  try {
    const { data, error } = await supabaseClient.rpc(
      "create_purchase_order_atomic",
      {
        items: cart,
        buyer_name: buyer.buyer_name,
        buyer_last_name: buyer.buyer_last_name,
        buyer_address: buyer.buyer_address,
        buyer_phone_number: buyer.buyer_phone_number,
        buyer_email: buyer.buyer_email,
        total_price: totalPrice,
      }
    );

    if (error) throw error;

    return {
      status: 200,
      message: "Orden creada con éxito",
      data: {
        order_id: data[0].order_id,
        cart,
        buyer,
        totalPrice,
      },
    };
  } catch (error) {
    throw new Error(
      error?.message || "Error al crear la orden desde el backend"
    );
  }
};

export const updatePurchaseOrderStatus = async (orderId) => {
  try {
    const { data, error } = await supabaseClient
      .from("purchase_orders")
      .select()
      .eq("id", orderId)
      .single();

    if (error) throw error;

    const currentStatus = data.status;
    const newStatus =
      currentStatus === "pendiente" ? "finalizado" : "pendiente";

    //Actualizar con el nuevo estado
    const { error: updateError } = await supabaseClient
      .from("purchase_orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (updateError) throw updateError;
  } catch (error) {
    throw new Error(
      error?.message || "Error al actualizar el estado de la orden"
    );
  }
};
