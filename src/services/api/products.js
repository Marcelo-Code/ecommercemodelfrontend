import { errorToastifyAlert, successToastifyAlert } from "../../utils/alerts";
import { supabaseClient } from "../config/config";

// export const getProductsWithVariants = async () => {
//   try {
//     const { data, error, status, statusText, ...rest } = await supabase.from(
//       "products"
//     ).select(`
//         id,
//         nombre,
//         descripcion,
//         imagen_principal,
//         products_variants (
//           id,
//           color,
//           talle,
//           sku,
//           precio,
//           stock
//         )
//       `);

//     if (error) {
//       return {
//         data: null,
//         error: {
//           code: error.code || null,
//           status: status || null,
//           message: error.message || statusText || "Error desconocido",
//           error,
//         },
//       };
//     }

//     return { data, error: null };
//   } catch (err) {
//     return {
//       data: null,
//       error: {
//         code: err.code || null,
//         status: null,
//         message: err.message || "Error inesperado",
//         error: err,
//       },
//     };
//   }
// };

export const getProducts = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select(
        `
    *,
    brands: brand_id(name),
    products_categories (
      category_id,
      categories(id, name)
    )
  `
      )
      .order("description", { ascending: true });

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

export const getActiveProducts = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("products")
      .select(
        `
        *,
        brands:brand_id(name),
        products_categories(
          product_id,
          category_id,
          categories:category_id(name)
        )
      `
      )
      .eq("active", true)
      .order("description", { ascending: true });

    if (error) throw error;

    return {
      status: 200,
      message: "registros obtenidos con éxito",
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

export const createProduct = async (product, firstVariant) => {
  try {
    //1. Crear producto
    const { error } = await supabaseClient.from("products").insert([product]);

    if (error) throw error;

    //2. Obtener el producto recientemente creado
    const { data: fetched, error: fetchError } = await supabaseClient
      .from("products")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    const createdProduct = fetched[0];

    //3. Crear la primer variante del producto
    const variantToInsert = {
      ...firstVariant,
      product_id: createdProduct.id,
    };

    const { error: variantError } = await supabaseClient
      .from("products_variants")
      .insert([variantToInsert]);

    if (variantError) throw variantError;

    return {
      status: 201,
      message: "Producto creado con éxito",
      data: fetched[0],
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear el producto",
      error,
    };
  }
};

export const createProductWithCategoriesArray = async (productData) => {
  try {
    const { categoriesArray, firstVariant, ...productDataToInsert } =
      productData;

    // 1. Insertar nuevo producto
    const { data: insertedProduct, error: insertProductError } =
      await supabaseClient
        .from("products")
        .insert(productDataToInsert)
        .select("*")
        .single();

    if (insertProductError) throw insertProductError;

    const productId = insertedProduct.id;

    // 2. Insertar relaciones producto-categoría
    const relations = categoriesArray.map((category) => ({
      product_id: productId,
      category_id: category.category_id,
    }));

    // Insertar relaciones
    const { error: insertRelationsError } = await supabaseClient
      .from("products_categories")
      .insert(relations);

    if (insertRelationsError) throw insertRelationsError;

    // 3. Insertar primera variante
    if (firstVariant) {
      const variantToInsert = {
        ...firstVariant,
        product_id: productId,
      };

      const { error: insertVariantError } = await supabaseClient
        .from("products_variants")
        .insert([variantToInsert]);

      if (insertVariantError) throw insertVariantError;
    }

    return {
      status: 200,
      message: "Producto creado con éxito",
      data: { ...insertedProduct, categoriesArray },
    };
  } catch (error) {
    console.error("Error al crear producto y categorías:", error);
    return { status: 500, error: error.message };
  }
};

export const getProduct = async (productId) => {
  try {
    const { data: productData, error: productError } = await supabaseClient
      .from("products")
      .select("*, brands: brand_id(name)")
      .eq("id", productId)
      .single();

    if (productError) throw productError;

    // Obtener categorías relacionadas al producto
    const { data: categoriesData, error: categoriesError } =
      await supabaseClient
        .from("products_categories")
        .select(
          `
          product_id,
          category_id,
          categories:category_id(name)
        `
        )
        .eq("product_id", productId);

    if (categoriesError) throw categoriesError;

    const categoriesArray = categoriesData.map((item) => ({
      category_id: item.category_id,
      name: item.categories.name,
    }));

    return {
      status: 200,
      message: "Registro obtenido con éxito",
      data: {
        ...productData,
        categoriesArray,
      },
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registro",
      error: error.message,
    };
  }
};

export const updateProduct = async (updatedProduct) => {
  try {
    //brands y categories son propiedades que la tabla products no tiene
    const { id, brands, categories, ...fieldsToUpdate } = updatedProduct;

    const { data, error } = await supabaseClient
      .from("products")
      .update(fieldsToUpdate)
      .eq("id", id);

    if (error) throw error;

    successToastifyAlert(`Producto actualizado con éxito`);

    return {
      status: 200,
      message: "Registro actualizado con éxito",
      data,
    };
  } catch (error) {
    errorToastifyAlert("Error al actualizar registro");

    return {
      status: 400,
      message: "Error al actualizar registro",
      error: error.message,
    };
  }
};

export const updateProductWithCategoriesArray = async (productData) => {
  try {
    const { id, categoriesArray, ...productDataToUpdate } = productData;
    // Actualizar el producto
    const { error: updateError } = await supabaseClient
      .from("products")
      .update(productDataToUpdate)
      .eq("id", id);

    if (updateError) throw updateError;

    // Eliminar relaciones (producto categoría) actuales
    const { error: deleteError } = await supabaseClient
      .from("products_categories")
      .delete()
      .eq("product_id", id);

    if (deleteError) throw deleteError;

    // Insertar nuevas relaciones (producto categoría)
    const newRelations = categoriesArray.map((category) => ({
      product_id: id,
      category_id: category.category_id,
    }));

    const { error: insertError } = await supabaseClient
      .from("products_categories")
      .insert(newRelations);

    if (insertError) throw insertError;

    return {
      status: 200,
      message: "Registro actualizado con éxito",
    };
  } catch (error) {
    console.error("Error updating product and categories:", error);
    return { success: false, error };
  }
};

export const createProductVariant = async (productVariant) => {
  try {
    //1. Crear producto
    const { error } = await supabaseClient
      .from("products_variants")
      .insert([productVariant]);

    if (error) throw error;

    //2. Obtener el producto recientemente creado
    const { data: fetched, error: fetchError } = await supabaseClient
      .from("products_variants")
      .select("*")
      .order("id", { ascending: false })
      .limit(1);

    if (fetchError) throw fetchError;

    return {
      status: 201,
      message: "Registro creado con éxito",
      data: fetched[0],
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al crear el producto",
      error,
    };
  }
};

export const getProductsVariants = async () => {
  try {
    const { data, error } = await supabaseClient
      .from("products_variants")
      .select(
        `
        *,
        colors:color_id(name, code),
        sizes: size_id(name)
      `
      )
      .order("id", { ascending: true });

    if (error) throw error;

    return {
      status: 200,
      message: "registros obtenidos con éxito",
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

export const updateProductVariant = async (productVariantData) => {
  try {
    const { id, ...productVariantDataToUpdate } = productVariantData;
    // Actualizar el producto
    const { error: updateError } = await supabaseClient
      .from("products_variants")
      .update(productVariantDataToUpdate)
      .eq("id", id);

    if (updateError) throw updateError;

    return {
      status: 200,
      message: "Registro actualizado con éxito",
    };
  } catch (error) {
    console.error("Error al actualizar registro:", error);
    return { success: false, error };
  }
};

export const getProductVariant = async (productVariantId) => {
  try {
    const { data: productData, error: productError } = await supabaseClient
      .from("products_variants")
      .select("*")
      .eq("id", productVariantId)
      .single();

    if (productError) throw productError;

    return {
      status: 200,
      message: "Registro obtenido con éxito",
      data: productData,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registro",
      error: error.message,
    };
  }
};
