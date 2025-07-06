import { supabaseClient } from "../config/config";

export const getSizes = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("sizes")
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

export const getSize = async (sizeId) => {
  try {
    const { data, error } = await supabaseClient
      .from("sizes")
      .select("*")
      .eq("id", sizeId)
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

export const createSize = async (newSize) => {
  try {
    const { error, data } = await supabaseClient
      .from("sizes")
      .insert([newSize]);

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

export const updateSize = async (updatedSize) => {
  try {
    const { id, ...fieldsToUpdate } = updatedSize;

    const { data, error } = await supabaseClient
      .from("sizes")
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
