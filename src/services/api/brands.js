import { supabaseClient } from "../config/config";

export const getBrands = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("brands")
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

export const getBrand = async (brandId) => {
  try {
    const { data, error } = await supabaseClient
      .from("brands")
      .select("*")
      .eq("id", brandId)
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

export const createBrand = async (newBrand) => {
  try {
    const { error, data } = await supabaseClient
      .from("brands")
      .insert([newBrand]);

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

export const updateBrand = async (updatedBrand) => {
  try {
    const { id, ...fieldsToUpdate } = updatedBrand;

    const { data, error } = await supabaseClient
      .from("brands")
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
