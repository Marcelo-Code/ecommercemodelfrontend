import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonColor, generalBackGroundColor } from "../../../../utils/helpers";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";

const productImages = [
  {
    id: 1,
    src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
    alt: "Zapatilla Adidas - Vista principal",
  },
  {
    id: 2,
    src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
    alt: "Zapatilla Adidas - Vista lateral",
  },
  {
    id: 3,
    src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
    alt: "Zapatilla Adidas - Vista trasera",
  },
  {
    id: 4,
    src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
    alt: "Zapatilla Adidas - Suela",
  },
];

const product = {
  name: "Basic Tee 6-Pack",
  price: 192,
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
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
  ],
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "gray",
      name: "Gray",
      classes: "bg-gray-200 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

const reviews = { href: "#", average: 4, totalCount: 117 };

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

export const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const visibleThumbnails = 6;
  const maxStartIndex = Math.max(0, productImages.length - visibleThumbnails);

  const nextThumbnails = () => {
    setThumbnailStartIndex((prev) => Math.min(prev + 1, maxStartIndex));
  };

  const prevThumbnails = () => {
    setThumbnailStartIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };
  return (
    <div className="bg-white">
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
              <span className="text-gray-700">Detalles</span>
            </li>
          </ol>
        </nav>

        {/* Mobile Carousel */}
        <div className="mx-auto mt-6 max-w-2xl px-4 sm:px-6 lg:hidden">
          <ImageCarousel images={product.images} />
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
                {productImages
                  .slice(
                    thumbnailStartIndex,
                    thumbnailStartIndex + visibleThumbnails
                  )
                  .map((image, index) => {
                    const actualIndex = thumbnailStartIndex + index;
                    return (
                      <button
                        key={image.id}
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

              {productImages.length > visibleThumbnails && (
                <div className="mt-4">
                  <div className="w-full h-16 rounded-lg border-2 border-gray-200 bg-white flex items-center justify-center">
                    <span className="text-lg text-blue-600 font-medium">
                      +{productImages.length - visibleThumbnails}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Main Image */}
          <div className="relative">
            <div className="relative aspect-square flex items-center justify-center max-w-2xl bg-white rounded-lg overflow-hidden h-[500px] w-[500px]">
              <img
                src={productImages[selectedImage].src || "/placeholder.svg"}
                alt={productImages[selectedImage].alt}
                className="object-contain rounded-lg"
                priority
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
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 md:row-span-3 md:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {currencyFormat(product.price)}
              {/* {product.price} */}
            </p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star
                      key={rating}
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900 fill-current"
                          : "text-gray-200",
                        "size-5 shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <fieldset aria-label="Choose a color" className="mt-4">
                  <div className="flex items-center gap-x-3">
                    {product.colors.map((color) => (
                      <div
                        key={color.id}
                        className="flex rounded-full outline -outline-offset-1 outline-black/10"
                      >
                        <input
                          defaultValue={color.id}
                          defaultChecked={color === product.colors[0]}
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

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset aria-label="Choose a size" className="mt-4">
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map((size) => (
                      <label
                        key={size.name}
                        className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                      >
                        <input
                          defaultValue={size.name}
                          defaultChecked={size === product.sizes[2]}
                          name="size"
                          type="radio"
                          disabled={!size.inStock}
                          className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                        />
                        <span className="text-sm font-medium uppercase group-has-checked:text-white">
                          {size.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            </form>

            <div className="w-full flex flex-col justify-between items-center p-4 rounded-[25px]">
              {/* Controles cantidad */}
              <div className="w-[200px] flex justify-between items-center bg-white rounded-full p-1 border border-black mb-3">
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
                style={{
                  backgroundColor: generalBackGroundColor,
                  color: buttonColor,
                }}
                className="w-[200px] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-full py-2 mb-2 flex items-center justify-center gap-2"
              >
                Agregar a carrito
              </button>
            </div>
          </div>

          <div className="py-10 md:col-span-2 md:col-start-1 md:border-r md:border-gray-200 md:pt-6 md:pr-8 md:pb-16">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackButtonContainer />
    </div>
  );
};
