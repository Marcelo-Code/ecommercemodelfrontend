import { getInitials } from "../../utils/helpers";
import { supabaseClient } from "../config/config";

//Función de login
export const login = async (email, password) => {
  try {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    return { status: 200, message: "Login exitoso" };
  } catch (error) {
    return { status: 500, message: `Error en el login:  ${error.message}` };
  }
};

//Función de logout
export const logout = async () => {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabaseClient.auth.getSession();

    if (sessionError) throw sessionError;
    if (!session) throw new Error("No hay sesión activa.");

    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;

    return { status: 200, message: "Logout exitoso" };
  } catch (error) {
    return { status: 500, message: `Error al cerrar sesión: ${error.message}` };
  }
};

//FUnción para verificar si el usuario esta logueado
export const checkAuth = async (setIsloggedIn, setLoggedUser) => {
  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) throw new Error("Error al obtener la sesión");

    if (!data?.session) {
      setIsloggedIn(false);
      setLoggedUser("");
      return;
    }

    const email = data.session.user.email;

    const { data: userData, error: userError } = await supabaseClient
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (userError || !userData) {
      setIsloggedIn(false);
      setLoggedUser("");
      return;
    }

    if (userData.active === false) {
      setIsloggedIn(false);
      setLoggedUser("");
      return;
    }

    const userInitials = getInitials(userData.name, userData.last_name);

    setLoggedUser(userInitials);
    setIsloggedIn(true);

    return { status: 200, message: "Sesión activa" };
  } catch (err) {
    // En caso de error inesperado, asegurate de desloguear también
    setIsloggedIn(false);
    setLoggedUser("");
    return { status: 500, message: err.message || "Error inesperado" };
  }
};

export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabaseClient.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return { status: 200, message: "Contraseña actualizada" };
  } catch (error) {
    return {
      status: 500,
      message: error.message || "Error al actualizar contraseña",
    };
  }
};
