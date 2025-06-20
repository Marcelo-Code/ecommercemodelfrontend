import { errorToastifyAlert, successToastifyAlert } from "../../utils/alerts";
import { supabaseClient } from "../config/config";

export const createUser = async (newUser) => {
  const { email, name, last_name } = newUser;

  //Se crea un password provisorio
  const password = "12345678";

  //Se crea el usuario activo
  const active = true;

  try {
    //Crear un usuario en la tabla auth.users
    const { data: authData, error: authError } =
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/updatePassword`,
        },
      });

    if (authError) throw authError;

    const auth_user_id = authData.user.id;

    //Si el auth.user se crea correctamente, se inserta en la tabla 'users'
    const { error: insertError } = await supabaseClient.from("users").insert([
      {
        auth_user_id,
        name,
        last_name,
        email,
        active,
      },
    ]);

    if (insertError) throw insertError;

    return {
      status: 201,
      message: "Usuario creado correctamente en Auth y en la tabla usuarios",
    };
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return {
      status: 400,
      message: "Error al crear usuario",
      error: error.message,
    };
  }
};

export const updateLoggedInUserPassword = async (newPassword) => {
  try {
    const { data, error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });

    if (error) throw error;
    successToastifyAlert("Contraseña actualizada con éxito");
    return {
      status: 200,
      message: "Contraseña actualizada con éxito",
      data,
    };
  } catch (error) {
    errorToastifyAlert("Error al actualizar contraseña");
    return {
      status: 400,
      message: "Error al actualizar contraseña",
      error: error.message,
    };
  }
};

export const getUser = async (userId) => {
  try {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", userId);
    if (error) throw error;
    return {
      status: 200,
      message: "Registro obtenido con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 404,
      message: "Error al obtener registro",
      error: error.message,
    };
  }
};

export const getUsers = async () => {
  try {
    // Verificar si hay un usuario autenticado
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return {
        status: 401,
        message: "Usuario no autenticado",
        error: authError?.message || "No hay sesión activa",
      };
    }

    // Si está autenticado, hacer el query
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return {
      status: 200,
      message: "Registros obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error al obtener registros",
      error: error.message,
    };
  }
};

export const updateUser = async (updatedUser) => {
  try {
    const { id, ...fieldsToUpdate } = updatedUser;

    const { data, error } = await supabaseClient
      .from("users")
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
      message: "Error al actualizar registro",
      error: error.message,
    };
  }
};

export const getLoggedInUserData = async () => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError) throw authError;

    const auth_user_id = user.id;

    const { data, error: queryError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("auth_user_id", auth_user_id)
      .single();

    if (queryError) throw queryError;

    return {
      status: 200,
      message: "Datos del usuario obtenidos con éxito",
      data,
    };
  } catch (error) {
    return {
      status: 400,
      message: "Error al obtener datos del usuario",
      error: error.message,
    };
  }
};
