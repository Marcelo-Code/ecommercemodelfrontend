"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

export default function ProductCard({ product, onProductClick }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  return (
    <Card
      className="bg-white text-black overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Product Image */}
        <div className="relative h-64 sm:h-72 bg-gray-50 overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Best Seller Badge */}
          {product.bestSeller && (
            <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 text-xs">
              BEST SELLER
            </Badge>
          )}
        </div>

        {/* Color Options */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full ${
                colorMap[color] || "bg-gray-400"
              } shadow-md ring-2 ring-white`}
              title={color}
            />
          ))}
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 min-h-[2.5rem] leading-tight">
          {product.name}
        </h3>

        {/* Price */}
        <div className="space-y-1">
          <div className="text-xl sm:text-2xl font-bold text-green-600">
            {formatPrice(product.price)}
          </div>

          {/* Installments */}
          <div className="text-xs sm:text-sm text-gray-600">
            {product.installments.count} cuotas sin interés de{" "}
            <span className="font-semibold">
              {formatPrice(product.installments.amount)}
            </span>
          </div>
        </div>

        {/* Available Colors Text */}
        <div className="text-xs text-gray-500 pt-2 border-t">
          {product.colors.length}{" "}
          {product.colors.length === 1
            ? "color disponible"
            : "colores disponibles"}
        </div>
      </CardContent>
    </Card>
  );
}
