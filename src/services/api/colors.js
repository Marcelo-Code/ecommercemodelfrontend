import { supabaseClient } from "../config/config";

export const getColors = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("colors")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return { status: 200, message: "registros obtenidos con éxito", data };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registros",
      error,
    };
  }
};

export const getColor = async (colorId) => {
  try {
    const { data, error } = await supabaseClient
      .from("colors")
      .select("*")
      .eq("id", colorId)
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

export const createColor = async (newColor) => {
  try {
    const { error, data } = await supabaseClient
      .from("colors")
      .insert([newColor]);

    if (error) throw error;

    return {
      status: 201,
      message: "Registro creado con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear el registro",
      error,
    };
  }
};

export const updateColor = async (updatedColor) => {
  try {
    const { id, ...fieldsToUpdate } = updatedColor;

    const { data, error } = await supabaseClient
      .from("colors")
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
