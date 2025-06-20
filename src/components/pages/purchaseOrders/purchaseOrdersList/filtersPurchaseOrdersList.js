//Array de campos a buscar
export const FIELDS_TO_SEARCH = [
  (r) => r.buyer_name,
  (r) => r.buyer_last_name,
  (r) => r.buyer_address,
  (r) => r.buyer_email,
  (r) => r.buyer_phone_number,
];

export const SORT_OPTIONS = [
  { value: "none", label: "Sin ordenar", name: "" },
  {
    value: "alphabetical-asc-buyer_name",
    label: "Nombre (A-Z)",
    name: "buyer_name",
  },
  {
    value: "alphabetical-desc-buyer_name",
    label: "Nombre (Z-A)",
    name: "buyer_name",
  },
  {
    value: "alphabetical-asc-buyer_last_name",
    label: "Apellido (A-Z)",
    name: "buyer_last_name",
  },
  {
    value: "alphabetical-desc-buyer_last_name",
    label: "Apellido (Z-A)",
    name: "buyer_last_name",
  },
  {
    value: "alphabetical-asc-buyer_address",
    label: "Dirección (A-Z)",
    name: "buyer_address",
  },
  {
    value: "alphabetical-desc-buyer_address",
    label: "Dirección (Z-A)",
    name: "buyer_address",
  },
  {
    value: "date-asc",
    label: "Fecha (ascendente)",
    name: "date",
  },
  {
    value: "date-desc",
    label: "Fecha (descendente)",
    name: "date",
  },
  {
    value: "number-asc",
    label: "Total (ascendente)",
    name: "total_price",
  },
  {
    value: "number-desc",
    label: "Total (descendente)",
    name: "total_price",
  },
];

const STATUS_OPTIONS_1 = [
  { value: "all", label: "Todos" },
  { value: "pendiente", label: "Pendiente" },
  { value: "finalizado", label: "Finalizado" },
];

export const FILTER_OPTIONS = [
  {
    name: "status",
    label: "Estado",
    options: STATUS_OPTIONS_1,
    placeholder: "Seleccioná un estado",
  },
];
