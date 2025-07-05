import { ScrollToTop } from "./components/common/scrollToTop/ScrollToTop";
import { FooterContainer } from "./components/layouts/footer/FooterContainer";
import { NavBarContainer } from "./components/layouts/navBar/NavBarContainer";
import { AboutUsContainer } from "./components/pages/aboutUs/AboutUsContainer";
import { CartListContainer } from "./components/pages/cart/cartList/CartListContainer";
import { LoginContainer } from "./components/pages/login/LoginContainer";
import { CreateEditProductContainer } from "./components/pages/products/createEditProduct/CreateEditProductContainer";
import { ProductsListContainer } from "./components/pages/products/productsList/ProductsListContainer";
import { ProductsListUpdateModeContainer } from "./components/pages/products/productsListUpdateMode/ProductsListUpdateModeContainer";
import { BuyersDataContainer } from "./components/pages/purchaseOrders/buyersData/BuyersDataContainer";
import { PurchaseOrdersItemsListContainer } from "./components/pages/purchaseOrders/purchaseOrdersItemsList/PurchaseOrdersItemsListContainer_";
import { PurchaseOrdersListContainer } from "./components/pages/purchaseOrders/purchaseOrdersList/PurchaseOrdersListContainer";
import { ConfirmProvider } from "./context/ConfirmContext";
import { GeneralContextProvider } from "./context/GeneralContext";
import { Route, Routes } from "react-router-dom";
import { ProtectedUserRoute } from "./routes/ProtectedUserRoute";
import { ContactUsContainer } from "./components/pages/contactUs/ContactUsContainer";
import { RecoverPasswordContainer } from "./components/pages/recoverPassword/RecoverPasswordContainer";
import { UpdatePasswordContainer } from "./components/pages/updatePassword/UpdatePasswordContainer";
import { SettingsContainer } from "./components/pages/settings/SettingsContainer";
import { CategoriesListContainer } from "./components/pages/categories/categoriesList/CategoriesListContainer";
import { CreateEditCategoriesContainer } from "./components/pages/categories/createEditCategories/CreateEditCategoriesContainer";
import { BrandsListContainer } from "./components/pages/brands/brandsList/BrandsListContainer";
import { CreateEditBrandsContainer } from "./components/pages/brands/createEditBrands/CreateEditBrandsContainer";
import { UsersListContainer } from "./components/pages/users/usersList/UsersListContainer";
import { CreateEditUserContainer } from "./components/pages/users/createEditUser/CreateEditUserContainer";
import { SpecialOffersContainer } from "./components/pages/specialOffers/SpecialOffersContainer";
import { NotFoundContainer } from "./components/pages/notFound/NotFoundContainer";
import { ProtectedCheckOutRoute } from "./routes/ProtectedCheckOutRoute";
import { FinalizePurchaseContainer } from "./components/pages/purchaseOrders/finalizePurchase/FinalizePurchaseContainer";
import { DownloadPurchaseOrderContainer } from "./components/pages/purchaseOrders/downloadPurchaseOrder/DownloadPurchaseOrderContainer";
import { ProductDetailContainer } from "./components/pages/products/productDetailTailwind/ProductDetailContainer";
import { ProductDetailEjemplo } from "./components/pages/products/productDetailTailwind/ProductDetailEjemplo";
import { ColorsListContainer } from "./components/pages/productFeatures/colors/colorsList/ColorListContainer";
import { CreateEditColorsContainer } from "./components/pages/productFeatures/colors/createEditColors/CreateEditColorsContainer";

function App() {
  return (
    <>
      <GeneralContextProvider>
        <ConfirmProvider>
          <NavBarContainer />
          <ScrollToTop />
          <Routes>
            {/* Lista de ofertas */}
            <Route path="/" element={<SpecialOffersContainer />} />
            {/* Lista de productos */}
            <Route path="/products" element={<ProductsListContainer />} />
            {/* Detalle del producto */}
            <Route
              path="/productDetail/:productId"
              element={<ProductDetailContainer />}
            />
            {/* Carrito de compras */}
            <Route path="/cart" element={<CartListContainer />} />
            {/* Nosotros */}
            <Route path="/aboutUs" element={<AboutUsContainer />} />"
            {/* Contacto */}
            <Route path="/contactUs" element={<ContactUsContainer />} />"
            {/* Login */}
            <Route path="/login" element={<LoginContainer />} />
            {/* Recuperar contraseña */}
            <Route
              path="/recoverPassword"
              element={<RecoverPasswordContainer />}
            />
            {/* Actualizar contraseña */}
            <Route
              path="/updatePassword"
              element={<UpdatePasswordContainer />}
            />
            {/* Rutas protegidas para el admin */}
            {/* Lista de usuarios */}
            <Route
              path="/users"
              element={
                <ProtectedUserRoute>
                  <UsersListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar usuario */}
            <Route
              path="/updateUsers/updateUser/:userId"
              element={
                <ProtectedUserRoute>
                  <CreateEditUserContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear usuario */}
            <Route
              path="/users/createUser"
              element={
                <ProtectedUserRoute>
                  <CreateEditUserContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista de categorías */}
            <Route
              path="/categories"
              element={
                <ProtectedUserRoute>
                  <CategoriesListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar categoría */}
            <Route
              path="/updateCategories/updateCategory/:categoryId"
              element={
                <ProtectedUserRoute>
                  <CreateEditCategoriesContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear categoría */}
            <Route
              path="/updateCategories/createCategory"
              element={
                <ProtectedUserRoute>
                  <CreateEditCategoriesContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista de marcas */}
            <Route
              path="/brands"
              element={
                <ProtectedUserRoute>
                  <BrandsListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar marca */}
            <Route
              path="/updateBrands/updateBrand/:brandId"
              element={
                <ProtectedUserRoute>
                  <CreateEditBrandsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear marca */}
            <Route
              path="/updateBrands/createBrand"
              element={
                <ProtectedUserRoute>
                  <CreateEditBrandsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista de colores */}
            <Route
              path="/colors"
              element={
                <ProtectedUserRoute>
                  <ColorsListContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar colores */}
            <Route
              path="/updateColors/updateColor/:colorId"
              element={
                <ProtectedUserRoute>
                  <CreateEditColorsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear color */}
            <Route
              path="/updateColors/createColor"
              element={
                <ProtectedUserRoute>
                  <CreateEditColorsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Settings */}
            <Route
              path="/settings"
              element={
                <ProtectedUserRoute>
                  <SettingsContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista editar productos */}
            <Route
              path="/updateProducts"
              element={
                <ProtectedUserRoute>
                  <ProductsListUpdateModeContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Crear producto */}
            <Route
              path="/updateProducts/createProduct"
              element={
                <ProtectedUserRoute>
                  <CreateEditProductContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Editar producto */}
            <Route
              path="/updateProducts/updateProduct/:productId"
              element={
                <ProtectedUserRoute>
                  <CreateEditProductContainer />
                </ProtectedUserRoute>
              }
            />
            {/* Lista de órdenes de compra */}
            <Route
              path="/checkout"
              element={
                <ProtectedCheckOutRoute>
                  <BuyersDataContainer />
                </ProtectedCheckOutRoute>
              }
            />
            <Route
              path="/purchaseOrders"
              element={
                <ProtectedUserRoute>
                  <PurchaseOrdersListContainer />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="/purchaseOrders/finalize/:preferenceId"
              element={
                // <ProtectedUserRoute>
                <FinalizePurchaseContainer />
                // </ProtectedUserRoute>
              }
            />
            {/* Detalle de orden de compra */}
            <Route
              path="/purchaseOrders/details/:purchaseOrderId"
              element={
                <ProtectedUserRoute>
                  <PurchaseOrdersItemsListContainer />
                </ProtectedUserRoute>
              }
            />
            <Route
              path="/checkout/success"
              element={<DownloadPurchaseOrderContainer />}
            />
            {/* 404 */}
            <Route path="*" element={<NotFoundContainer />} />
            <Route path="/ejemplo" element={<ProductDetailEjemplo />} />
          </Routes>
          <FooterContainer />
        </ConfirmProvider>
      </GeneralContextProvider>
    </>
  );
}

export default App;
