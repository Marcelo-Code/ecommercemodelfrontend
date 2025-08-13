import { Link, ShoppingBag, ShoppingCart } from "lucide-react";
import { Icons } from "../../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";

export const CardActionContainer = ({
  productsVariants,
  product,
  filteredProducts,
  setFilteredProducts,
  addProductToCart,
  addProduct,
  removeProduct,
  activeCardId,
  setActiveCardId,
}) => {
  const isActive = activeCardId === product.id;

  const [data, setData] = useState({});

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [availableColors, setAvailableColors] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]);

  // Filtrar variantes con stock > 0 y del producto actual
  const validVariants = productsVariants.filter(
    (variant) => variant.product_id === product.id && variant.stock > 0
  );

  console.log(productsVariants);

  // Filtrar talles cuando se selecciona un color
  useEffect(() => {
    if (selectedColor) {
      const sizes = validVariants
        .filter((v) => v.color_id === selectedColor.id)
        .map((v) => ({
          id: v.size_id,
          name: v.sizes.name,
        }));

      // Eliminar duplicados
      const uniqueSizes = Array.from(
        new Map(sizes.map((s) => [s.id, s])).values()
      );
      setAvailableSizes(uniqueSizes);
    } else {
      // Si no hay color seleccionado, mostrar todos los talles disponibles
      const sizes = validVariants.map((v) => ({
        id: v.size_id,
        name: v.sizes.name,
      }));
      const uniqueSizes = Array.from(
        new Map(sizes.map((s) => [s.id, s])).values()
      );
      setAvailableSizes(uniqueSizes);
    }
  }, [selectedColor]);

  // Filtrar colores cuando se selecciona un talle
  useEffect(() => {
    if (selectedSize) {
      const colors = validVariants
        .filter((v) => v.size_id === selectedSize.id)
        .map((v) => ({
          id: v.color_id,
          name: v.colors.name,
        }));

      const uniqueColors = Array.from(
        new Map(colors.map((c) => [c.id, c])).values()
      );
      setAvailableColors(uniqueColors);
    } else {
      // Si no hay talle seleccionado, mostrar todos los colores disponibles
      const colors = validVariants.map((v) => ({
        id: v.color_id,
        name: v.colors.name,
      }));
      const uniqueColors = Array.from(
        new Map(colors.map((c) => [c.id, c])).values()
      );
      setAvailableColors(uniqueColors);
    }
  }, [selectedSize]);

  // Handlers
  const handleColorChange = (option) => {
    setSelectedColor(option);
    // Reset talle si ya no es válido
    if (
      selectedSize &&
      !validVariants.some(
        (v) =>
          v.color_id === option.id &&
          v.size_id === selectedSize.id &&
          v.product_id === product.id &&
          v.stock > 0
      )
    ) {
      setSelectedSize(null);
    }
  };

  const handleSizeChange = (option) => {
    setSelectedSize(option);
    // Reset color si ya no es válido
    if (
      selectedColor &&
      !validVariants.some(
        (v) =>
          v.size_id === option.id &&
          v.color_id === selectedColor.id &&
          v.product_id === product.id &&
          v.stock > 0
      )
    ) {
      setSelectedColor(null);
    }
  };

  const PRODUCT_SIZES = productsVariants
    .filter((variant) => variant.product_id === product.id)
    .map((variant) => ({
      id: variant.size_id,
      name: variant.sizes.name,
    }));

  console.log(productsVariants);

  const PRODUCT_COLORS = productsVariants
    .filter((variant) => variant.product_id === product.id)
    .map((variant) => ({
      id: variant.color_id,
      name: variant.colors.name,
    }));

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <>
      {/* Botón de carrito */}
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center transition-transform duration-500 ${
          isActive ? "translate-y-[20%]" : "translate-y-[85%]"
        }`}
      >
        <button
          style={{ backgroundColor: generalBackGroundColor }}
          className="text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 active:bg-gray-900"
          onClick={() => setActiveCardId(isActive ? null : product.id)}
          aria-label="Toggle product actions"
        >
          <ShoppingBag style={{ color: "black" }} className="w-6 h-6" />
        </button>

        <div
          className={`
            w-11/12 max-w-xs flex flex-col items-center transition-all duration-500 ease-in-out mt-2
          ${
            isActive
              ? "opacity-100  pointer-events-auto"
              : "opacity-0  pointer-events-none"
          }`}
        >
          <div className="bg-black w-full p-3 rounded-[25px]">
            {/* Controles cantidad */}
            <div className="w-full flex justify-between items-center bg-white rounded-full p-1 border border-black mb-3">
              <button
                aria-label="Remove product"
                onClick={() => removeProduct(product, setFilteredProducts)}
                className="w-7 h-7 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:bg-blue-800"
                style={{
                  backgroundColor: generalBackGroundColor,
                  color: buttonColor,
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="12" x2="6" y2="12" />
                </svg>
              </button>
              <span className="text-black font-semibold">
                {product.counter}
              </span>
              <button
                aria-label="Add product"
                onClick={() => addProduct(product, setFilteredProducts)}
                style={{
                  backgroundColor: generalBackGroundColor,
                  color: buttonColor,
                }}
                className="w-7 h-7 text-white rounded-full flex items-center justify-center hover:bg-blue-700 active:bg-blue-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="12" y1="6" x2="12" y2="18" />
                  <line x1="6" y1="12" x2="18" y2="12" />
                </svg>
              </button>
            </div>

            {/* Botón agregar */}
            <button
              onClick={() =>
                addProductToCart(product, filteredProducts, setFilteredProducts)
              }
              style={{
                backgroundColor: generalBackGroundColor,
                color: buttonColor,
              }}
              className="w-full hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full py-2 mb-2 flex items-center justify-center gap-2"
            >
              Agregar a carrito
            </button>

            {/* Botón detalles */}
            <a href={`/productDetail/${product.id}`}>
              <button className="w-full border border-black bg-white text-black font-semibold rounded-full py-2 hover:bg-gray-200 active:bg-gray-300 transition">
                Detalles
              </button>
            </a>

            {/* Seleccionar Talle */}
            {availableSizes.length > 1 && (
              <div className="w-full py-2">
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="size"
                  placeholder="Talle"
                  clients={availableSizes}
                  value={selectedSize}
                  onChange={handleSizeChange}
                  // label={"Seleccioná un color"}
                  required
                />
              </div>
            )}

            {/* Seleccionar Color */}
            {availableColors.length > 1 && (
              <div className="w-full pb-2">
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="color"
                  placeholder="Color"
                  clients={availableColors}
                  value={selectedColor}
                  onChange={handleColorChange}
                  // label={"Seleccioná un color"}
                  required
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
