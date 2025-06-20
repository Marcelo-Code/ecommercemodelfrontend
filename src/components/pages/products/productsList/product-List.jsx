"use client";

import { useState } from "react";
import { CardActionContainer } from "./card-action-container";
import { generalBackGroundColor } from "../../../../utils/helpers";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";

export default function ProductsPage(productsListProps) {
  const {
    filteredProducts,
    setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
    ...generalBarContainerProps
  } = productsListProps;

  // Mapeo de colores
  const colorMap = {
    black: "bg-black",
    blue: "bg-blue-500",
    gray: "bg-gray-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
    white: "bg-white border border-gray-300",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  // Función para formatear precios
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const [activeCardId, setActiveCardId] = useState(null);

  return (
    <div className="h-full min-h-[85vh] w-full bg-black text-white pb-20 px-5">
      <GeneralBarContainer {...generalBarContainerProps} />

      {/* Stats Section */}
      <div className="mt-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="text-3xl font-bold text-generalBackGroundColor">
            {filteredProducts.length}
          </div>
          <div className="text-white font-bold">productos disponibles</div>
        </div>
        {/* <div className="space-y-2">
          <div className="text-3xl font-bold text-blue-400">
            {filteredProducts.filter((p) => p.bestSeller).length}
          </div>
          <div className="text-gray-400">Best Sellers</div>
        </div> */}
        {/* <div className="space-y-2">
          <div className="text-3xl font-bold text-purple-400">8</div>
          <div className="text-gray-400">Cuotas sin interés</div>
        </div> */}
      </div>
      {/* <div className="max-w-7xl mx-auto px-4 py-8"> */}
      {/* Header */}
      {/* <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Nuestros Productos
          </h1>
        </div> */}

      <PaginationContainer items={filteredProducts} itemsPerPage={10}>
        {(recordsToShow) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {recordsToShow.map((product) => (
              <div
                key={product.id}
                // className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                // onClick={() => handleProductClick(product)}
              >
                <div className="relative">
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden rounded-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.description}
                      className="w-full h-full object-cover"
                    />

                    <CardActionContainer
                      product={product}
                      filteredProducts={filteredProducts}
                      setFilteredProducts={setFilteredProducts}
                      addProductToCart={addProductToCart}
                      addProduct={addProduct}
                      removeProduct={removeProduct}
                      activeCardId={activeCardId}
                      setActiveCardId={setActiveCardId}
                    />

                    {/* Best Seller Badge */}
                    {product.bestSeller && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white font-bold px-3 py-1 text-xs rounded-md">
                        BEST SELLER
                      </div>
                    )}
                  </div>

                  {/* Color Options */}
                  {/* <div className="absolute bottom-3 left-3 flex gap-1">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full ${
                        colorMap[color] || "bg-gray-400"
                      } shadow-md ring-2 ring-white`}
                      title={`Color: ${color}`}
                    />
                  ))}
                </div> */}
                </div>

                <div className="p-4 space-y-3">
                  {/* Product Name */}
                  <h3 className="font-semibold text-sm sm:text-base leading-tight min-h-[2.5rem] line-clamp-2">
                    {product.description}
                  </h3>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex justify-center text-xl sm:text-2xl font-bold text-generalBackGroundColor">
                      {formatPrice(product.price)}
                    </div>

                    {/* Installments */}
                    <div className="text-xs sm:text-sm text-white">
                      {/* {product.installments.count}  */}
                      12 cuotas sin interés
                      <span className="font-semibold">
                        {/* {formatPrice(product.installments.amount)} */}
                      </span>
                    </div>
                  </div>

                  {/* Available Colors Text */}
                  {/* <div className="text-xs text-gray-500 pt-2 border-t"> */}
                  {/* {product.colors.length}{" "} */}
                  {/* {product.colors.length === 1
                    ? "color disponible"
                    : "colores disponibles"} */}
                  {/* </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </PaginationContainer>
    </div>
    // </div>
  );
}
