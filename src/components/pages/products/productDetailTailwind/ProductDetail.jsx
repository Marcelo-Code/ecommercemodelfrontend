import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import "../../../../assets/css/generalStyles.css";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { Chip } from "@mui/material";

const PRODUCT_COLORS = [
  { id: 1, name: "White", bgColor: "bg-white" },
  { id: 2, name: "Gray", bgColor: "bg-gray-200" },
  { id: 3, name: "Black", bgColor: "bg-gray-900" },
];

const PRODUCT_SIZES = [
  { id: 1, name: "XXS", inStock: false },
  { id: 2, name: "XS", inStock: true },
  { id: 3, name: "S", inStock: true },
  { id: 4, name: "M", inStock: true },
  { id: 5, name: "L", inStock: true },
  { id: 6, name: "XL", inStock: true },
  { id: 7, name: "2XL", inStock: true },
  { id: 8, name: "3XL", inStock: true },
];

const PRODUCT_HIGHLIGHTS = [
  "Hand cut and sewn locally",
  "Dyed with our proprietary colors",
  "Pre-washed & pre-shrunk",
  "Ultra-soft 100% cotton",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ImageCarousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative lg:hidden">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img
          src={images[currentImage].src || "/placeholder.svg"}
          alt={images[currentImage].alt}
          className="h-full w-full object-cover"
        />

        {/* Navigation buttons */}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 p-2 rounded-full border"
          onClick={prevImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 p-2 rounded-full border"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="mt-4 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={classNames(
              "h-2 w-2 rounded-full transition-colors",
              index === currentImage ? "bg-gray-900" : "bg-gray-300"
            )}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={classNames(
              "flex-shrink-0 rounded-lg border-2 transition-colors",
              index === currentImage ? "border-gray-900" : "border-transparent"
            )}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              className="h-16 w-16 rounded-lg object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export const ProductDetail = (productDetailProps) => {
  const { product, addProduct, removeProduct, counter, addProductToCart } =
    productDetailProps;

  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [data, setData] = useState({});

  const PRODUCT_IMAGES = [1, 2, 3, 4, 5]
    .map((i) =>
      product[`image${i}`] ? { src: product[`image${i}`], alt: "" } : null
    )
    .filter(Boolean);

  const PRODUCT_IMAGES1 = [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  const visibleThumbnails = 6;
  const maxStartIndex = Math.max(0, PRODUCT_IMAGES.length - visibleThumbnails);

  const nextThumbnails = () => {
    setThumbnailStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const prevThumbnails = () => {
    setThumbnailStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length
    );
  };

  return (
    <div
      style={{ fontFamily: "roboto", fontSize: "15px", color: "black" }}
      className="bg-white generalContainer"
    >
      <div>
        <nav
          aria-label="Breadcrumb"
          className="border-b border-gray-200 p-4 mb-4"
        >
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              Productos
              <span className="mx-1">&gt;</span>
              <span>Detalles</span>
              <span className="mx-1">&gt;</span>
              <span>
                <b>{product.description}</b>
              </span>
            </li>
          </ol>
        </nav>

        {/* Mobile Carousel */}
        <div className="mx-auto mt-6 max-w-2xl px-4 sm:px-6 lg:hidden">
          <ImageCarousel images={PRODUCT_IMAGES} />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8 h-full w-full justify-center items-start">
          {" "}
          {/* Thumbnails Column */}
          <div className="flex flex-col w-32 pl-8">
            <div className="relative h-full flex flex-col">
              {thumbnailStartIndex > 0 && (
                <button
                  variant="ghost"
                  size="sm"
                  onClick={prevThumbnails}
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10 h-6 w-6 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}

              <div className="flex flex-col h-20 w-20 justify-between gap-4">
                {PRODUCT_IMAGES.slice(
                  thumbnailStartIndex,
                  thumbnailStartIndex + visibleThumbnails
                ).map((image, index) => {
                  const actualIndex = thumbnailStartIndex + index;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(actualIndex)}
                      className={`relative w-full flex justify-center align-center rounded-lg overflow-hidden border-2 transition-all bg-white ${
                        selectedImage === actualIndex
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ minHeight: "80px" }}
                    >
                      <img
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        className="object-contain p-2"
                      />
                    </button>
                  );
                })}
              </div>

              {thumbnailStartIndex < maxStartIndex && (
                <button
                  variant="ghost"
                  size="sm"
                  onClick={nextThumbnails}
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-10 h-6 w-6 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}

              {PRODUCT_IMAGES.length > visibleThumbnails && (
                <div className="mt-4">
                  <div className="w-full h-16 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center">
                    <span>+{PRODUCT_IMAGES.length - visibleThumbnails}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main Image */}
          <div className="relative">
            <div className="relative aspect-square flex items-center justify-center max-w-2xl bg-white rounded-lg overflow-hidden h-[500px] w-[500px]">
              <img
                src={PRODUCT_IMAGES[selectedImage].src || "/placeholder.svg"}
                alt={PRODUCT_IMAGES[selectedImage].alt}
                className="object-contain rounded-lg"
              />

              {/* Navigation arrows */}
              <button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white h-12 w-12 p-0 rounded-full shadow-lg border"
              >
                <ChevronLeft className="h-6 w-6 ml-[20%]" />
              </button>
              <button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white h-12 w-12 p-0 rounded-full shadow-lg border"
              >
                <ChevronRight className="h-6 w-6 ml-[25%]" />
              </button>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 md:grid md:max-w-7xl md:grid-cols-3 md:grid-rows-[auto,auto,1fr] md:gap-x-8 md:px-8 md:pt-16 md:pb-24">
          <div className="md:col-span-2 md:border-r md:border-gray-200 md:pr-8">
            <h1 className="tracking-tight" style={{ fontSize: "20px" }}>
              <b>{product.name}</b>
            </h1>
          </div>

          {/* Options */}
          <div className="pl-4 md:row-span-3 md:border-l md:border-gray-200 md:mt-0">
            <div>{product.description}</div>
            <div className="tracking-tight mt-4" style={{ fontSize: "25px" }}>
              {currencyFormat(product.price)}
            </div>

            {/* Colors */}
            {/* <form className="mt-4">
              <div>
                <span>
                  {" "}
                  <b>Colores disponibles</b>
                </span>
                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center gap-x-3">
                    {PRODUCT_COLORS.map((color) => (
                      <div
                        key={color.id}
                        className="flex rounded-full outline -outline-offset-1 outline-black/10"
                      >
                        <input
                          defaultValue={color.id}
                          // defaultChecked={color === product.colors[0]}
                          name="color"
                          type="radio"
                          aria-label={color.name}
                          className={classNames(
                            color.classes,
                            "size-8 appearance-none rounded-full forced-color-adjust-none checked:outline-2 checked:outline-offset-2 focus-visible:outline-3 focus-visible:outline-offset-3"
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </form> */}

            <div className="mt-4 w-full flex flex-col justify-between items-center p-4 rounded-[25px]">
              <div className="w-[200px] flex justify-between items-center bg-white rounded-full mb-3">
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="color"
                  placeholder="Color"
                  clients={PRODUCT_COLORS}
                  value={data.name}
                  onChange={handleChange}
                  // label={"Seleccioná un color"}
                  required
                />
              </div>

              <div className="w-[200px] flex justify-between items-center bg-white rounded-full mb-3">
                <OptionSelect
                  getOptionLabel={(option) => `${option.name}`}
                  name="size"
                  placeholder="Talle"
                  clients={PRODUCT_SIZES}
                  value={data.size}
                  onChange={handleChange}
                  // label={"Seleccioná una talle"}
                  required
                />
              </div>

              {/* Controles cantidad */}
              <div className="w-[200px] flex justify-between items-center bg-white rounded-full p-1 border border-black mb-3">
                <button
                  aria-label="Remove product"
                  onClick={() => removeProduct(product)}
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
                <span className="text-black font-semibold">{counter}</span>
                <button
                  aria-label="Add product"
                  onClick={() => addProduct(product)}
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
                style={{
                  backgroundColor: generalBackGroundColor,
                  color: buttonColor,
                }}
                className="w-[200px] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full py-2 mb-2 flex items-center justify-center gap-2"
                onClick={() => addProductToCart(product, counter)}
              >
                Agregar a carrito
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-1 md:pr-8">
            {/* Description and details */}

            <div className="mt-4">
              <b>Marca</b>
              <div>{product.brands.name}</div>
            </div>
            <div className="mt-4">
              <span>
                <b>Descripción</b>
              </span>
              <p>{product.description}</p>
            </div>

            <div className="mt-4">
              <span>
                <b>Detalles</b>
              </span>
              <div>
                <ul role="list" className="list-disc space-y-2 pl-4 ">
                  {PRODUCT_HIGHLIGHTS.map((highlight, index) => (
                    <li key={index}>
                      <span>{PRODUCT_HIGHLIGHTS[index]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Categorias */}
            {product.categoriesArray.length > 0 && (
              <div className="mt-4">
                {product.categoriesArray.map((category) => (
                  <Chip
                    key={category.category_id}
                    label={category.name}
                    size="small"
                    sx={{
                      margin: "2px",
                      backgroundColor: generalBackGroundColor,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[80%]">
          <BackButtonContainer />
        </div>
      </div>
    </div>
  );
};
