import { useEffect, useRef, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useNavigate, useParams } from "react-router-dom";
import { CreateEditProduct } from "./CreateEditProduct";
import { getBrands } from "../../../../services/api/brands";
import { getCategories } from "../../../../services/api/categories";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import {
  createProduct,
  createProductVariant,
  createProductWithCategoriesArray,
  getProduct,
  updateProduct,
  updateProductWithCategoriesArray,
} from "../../../../services/api/products";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { deleteImage, uploadImage } from "../../../../services/api/images";
import { useConfirm } from "../../../../context/ConfirmContext";
import imageCompression from "browser-image-compression";
import { handleError } from "../../../../utils/helpers";
import { getColors } from "../../../../services/api/colors";
import { getSizes } from "../../../../services/api/sizes";

export const CreateEditProductContainer = () => {
  const [formData, setFormData] = useState({});
  const [formDataProductVariant, setFormDataProductVariant] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [categoryArrayError, setCategoryArrayError] = useState(false);

  const formDataInitialState = {
    description: "",
    brand_id: "",
    price: 0,
    previous_price: 0,
    special_offer: "",
    categoriesArray: [],
    firstVariant: {
      color_id: null,
      size_id: null,
      stock: 0,
    },
  };

  const formDataProductVariantInitialState = {
    product_id: null,
    stock: 0,
    color_id: null,
    size_id: null,
  };

  const PRODUCT_STATUS = [
    {
      id: true,
      name: "Producto activo",
    },
    {
      id: false,
      name: "Producto inactivo",
    },
  ];

  //Flag para saber si se creo el producto
  const [createdProduct, setCreatedProduct] = useState(false);

  //hook para guardar el nombre de la imagen
  const [documentName, setDocumentName] = useState(null);

  //hook para el selector de archivos
  const fileInputRef = useRef(null);

  //Obtiene el id del producto para su edición
  const { productId } = useParams();

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  const confirm = useConfirm();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleUploadImage = (documentName) => {
    if (formData[documentName]) {
      errorToastifyAlert(
        "Ya existe una imagen, eliminá antes de cargar una nueva"
      );
      return;
    }
    setDocumentName(documentName);
    fileInputRef.current.click();
  };

  const handleChangeProductVariant = (event) => {
    const { name, value } = event.target;
    const updatedFormProductVariant = {
      ...formDataProductVariant,
      [name]: value,
      product_id: productId,
    };
    setFormDataProductVariant(updatedFormProductVariant);
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedFormProductVariant);
  };

  const handleDeleteImage = async (documentName) => {
    if (!formData[documentName]) {
      errorToastifyAlert("No existe imagen para eliminar");
      return;
    }

    const isConfirmed = await confirm(`¿Querés eliminar la imagen?`);

    if (!isConfirmed) return;

    setIsLoadingImage(activeImageIndex);
    // Llama a la función para eliminar el archivo
    delete formData.brands;
    deleteImage(documentName, formData)
      .then(() => {
        return getProduct(formData.id);
      })
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoadingImage(null));
  };

  // Función para manejar la carga de archivos
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedFileTypes.includes(file.type)) {
        errorToastifyAlert("Formato de archivo no permitido");
        return;
      }

      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };

        setIsLoadingImage(activeImageIndex);

        // Comprime la imagen
        const compressedFile = await imageCompression(file, options);

        // Convertir a .webp
        const webpBlob = await convertToWebP(compressedFile);
        const webpFile = new File([webpBlob], "imagen.webp", {
          type: "image/webp",
        });

        delete formData.brands;

        await uploadImage(webpFile, documentName, formData);
        const { data } = await getProduct(formData.id);
        setFormData(data);
      } catch (error) {
        console.error("Error al procesar la imagen:", error);
      } finally {
        setIsLoadingImage(null);
      }
    }
  };

  // Convierte una imagen a WebP usando canvas
  const convertToWebP = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Error al convertir a WebP"));
          },
          "image/webp",
          0.8
        );
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoriesArray || formData.categoriesArray.length === 0) {
      setCategoryArrayError(true);
      return;
    } else {
      setCategoryArrayError(false);
    }

    setIsLoadingButton(true);
    setCreatedProduct(false);

    delete formData.brands;
    delete formData.categories;

    const request = productId
      ? updateProductWithCategoriesArray
      : createProductWithCategoriesArray;

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201) {
        const errorMessage =
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error);
        throw new Error(
          `${response?.message ?? "Error sin mensaje"}: ${
            errorMessage ?? "Detalles no disponibles"
          }`
        );
      }

      const action = productId ? "actualizado" : "creado";
      successToastifyAlert(`Producto ${action} con éxito`);
      setModifiedFlag(false);

      if (!productId) {
        setCreatedProduct(true);
        setFormData(response.data);
      }

      setModifiedFlag(false);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleSubmitProductVariant = async (e) => {
    e.preventDefault();

    setIsLoadingButton(true);

    try {
      const response = await createProductVariant(formDataProductVariant);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      successToastifyAlert(`Variante creada con éxito`);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getBrands(),
      getCategories(),
      getColors(),
      getSizes(),
      productId ? getProduct(productId) : Promise.resolve({ data: [null] }),
    ])
      .then(
        ([
          brandsResponse,
          categoriesResponse,
          colorsResponse,
          sizesResponse,
          productResponse,
        ]) => {
          //Validaciones de marcas
          if (brandsResponse.status !== 200) handleError(brandsResponse);

          //Validaciones de categorias

          //Validaciones de colores
          if (colorsResponse.status !== 200) handleError(colorsResponse);

          //Validaciones de talles
          if (sizesResponse.status !== 200) handleError(sizesResponse);

          // Validaciones de producto (si aplica)
          if (productId && productResponse.status !== 200)
            handleError(productResponse);

          setBrands(brandsResponse.data);
          setColors(colorsResponse.data);
          setSizes(sizesResponse.data);

          setCategories(
            categoriesResponse.data.map((category) => ({
              category_id: category.id,
              name: category.name,
            }))
          );

          if (productId) {
            setFormData(productResponse.data);
          } else {
            setFormData(formDataInitialState);
          }
        }
      )
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const createEditProductProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    brands,
    categories,
    colors,
    sizes,
    handleChange,
    handleChangeProductVariant,
    formData,
    formDataProductVariant,
    handleSubmit,
    handleSubmitProductVariant,
    createdProduct,
    handleUploadImage,
    handleFileChange,
    fileInputRef,
    handleDeleteImage,
    isLoadingImage,
    productId,
    PRODUCT_STATUS,
    categoryArrayError,
    setActiveImageIndex,
  };

  return <CreateEditProduct {...createEditProductProps} />;
};
