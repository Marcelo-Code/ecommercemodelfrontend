import { Icons } from "../../../assets/Icons";

export const adminOptions = [
  {
    icon: <Icons.SettingsIcon />,
    option: "Ajustes",
    link: "/settings",
  },
  {
    icon: <Icons.EditIcon />,
    option: "Categorias",
    link: `/categories`,
  },
  {
    icon: <Icons.EditIcon />,
    option: "Edición productos",
    link: `/updateProducts`,
  },
  {
    icon: <Icons.EditIcon />,
    option: "Marcas",
    link: `/brands`,
  },
  // {
  //   icon: <Icons.LocalOfferIcon />,
  //   option: "Ofertas",
  //   link: "/",
  // },
  {
    icon: <Icons.InventoryIcon />,
    option: "Productos",
    link: "/products",
  },
  {
    icon: <Icons.ReceiptIcon />,
    option: "Ordenes de compra",
    link: "/purchaseOrders",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Usuarios",
    link: "/users",
  },
];

export const userOptions = [
  {
    icon: <Icons.ContactsIcon />,
    option: "Contacto",
    link: "/contactUs",
  },
  {
    icon: <Icons.GroupsIcon />,
    option: "Nosotros",
    link: "/aboutUs",
  },
  {
    icon: <Icons.LocalOfferIcon />,
    option: "Ofertas",
    link: "/",
  },
  {
    icon: <Icons.InventoryIcon />,
    option: "Productos",
    link: "/products",
  },
  {
    icon: <Icons.PersonIcon />,
    option: "Ingresar",
    link: "/login",
  },
];
