export const generalBackGroundColor = "#6BCEBF";
export const buttonColor = "black";
export const hoverButtonColor = "#6BCEBF";
export const deleteColor = "#E53935";

//Función para formatear el precio
export const commonCurrencyFormat = (number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(number);
};

//Función para obtener opciones unicas y ordenadas
export const getUniqueSortedOptions = (items, key, initialOption = null) => {
  const path = key.split(".");

  const getValue = (item) =>
    path.reduce(
      (acc, part) => (acc && acc[part] !== undefined ? acc[part] : ""),
      item
    );

  const uniqueValues = Array.from(new Set(items.map(getValue))).sort((a, b) =>
    a?.toString().localeCompare(b?.toString(), "es", { sensitivity: "base" })
  );

  const options = uniqueValues.map((value) => ({
    value,
    label: value,
  }));

  return initialOption ? [initialOption, ...options] : options;
};

//Función para limpiar el nombre de un archivo, elimina los acentos y carácteres especiales
export const sanitizeFileName = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.-]/g, "_");
};

//Función para limpiar un nombre, elimina los acentos y carácteres especiales y pasarlo a mayúsculas
export const sanitizeName = (name) => {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
};

export const dateFormat = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
  return formattedDate;
};

//Función para manejar errores y mostrar el mensaje adecuado
export const handleError = (response) => {
  const errorMessage =
    typeof response.error === "string"
      ? response.error
      : JSON.stringify(response.error);
  throw new Error(`${response.message}: ${errorMessage}`);
};

//Función para normalizar mayúsculas en nombres
export const normalizeName = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

//Función para obtener iniciales
export const getInitials = (name, lastName) => {
  const firstInitial = name?.trim()?.[0]?.toUpperCase() || "";
  const lastInitial = lastName?.trim()?.[0]?.toUpperCase() || "";
  return firstInitial + lastInitial;
};
