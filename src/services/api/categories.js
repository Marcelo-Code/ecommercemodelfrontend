import { supabaseClient } from "../config/config";

export const getCategories = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("categories")
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

export const getCategory = async (categoryId) => {
  try {
    const { data, error } = await supabaseClient
      .from("categories")
      .select("*")
      .eq("id", categoryId)
      .single();

    if (error) throw error;

    return { status: 200, message: "registro obtenido con éxito", data };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener los registro",
      error,
    };
  }
};

export const createCategory = async (newCategory) => {
  try {
    const { error, data } = await supabaseClient
      .from("categories")
      .insert([newCategory]);

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

export const updateCategory = async (updatedCategory) => {
  try {
    const { id, ...fieldsToUpdate } = updatedCategory;

    const { data, error } = await supabaseClient
      .from("categories")
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
