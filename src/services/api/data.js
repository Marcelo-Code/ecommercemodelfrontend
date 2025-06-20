import { supabaseClient } from "../config/config";

export const getData = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("app_data")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return { status: 200, message: "registro obtenido con éxito", data };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener registro",
      error,
    };
  }
};

export const updateData = async (updatedData) => {
  try {
    const { id, ...fieldsToUpdate } = updatedData;

    const { data, error } = await supabaseClient
      .from("app_data")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) throw error;

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 400,
      message: `Error al actualizar registro: ${error.message}`,
    };
  }
};
