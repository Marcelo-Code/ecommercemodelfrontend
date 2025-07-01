import { Link, ShoppingBag, ShoppingCart } from "lucide-react";
import { Icons } from "../../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";
import { Button } from "@mui/material";

export const CardActionContainer = ({
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

  return (
    <>
      {/* Botón de carrito */}
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col items-center transition-transform duration-500 ${
          isActive ? "translate-y-[calc(100%-250px)]" : "translate-y-[85%]"
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
          <div className="bg-black w-full p-4 rounded-[25px]">
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
          </div>
        </div>
      </div>
    </>
  );
};
