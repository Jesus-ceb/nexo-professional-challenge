import { Route, Routes } from "react-router-dom"
// Admin routes
import { AdminPanel } from "../components/pages/AdminPanel"
import { ProductsPage } from "../components/pages/admin/products/ProductsPage"
import { DashboardPage } from "../components/pages/admin/dashboard/DashboardPage"
import { CustomersPage } from "../components/pages/admin/customers/CustomersPage"
import { InventoryPage } from "../components/pages/admin/inventory/InventoryPage"
import { CategoriesPage } from "../components/pages/admin/categories/CategoriesPage"
import { SetupPage } from "../components/pages/admin/setup/SetupPage"
import { CreateProductPage } from "../components/pages/admin/products/CreateProductPage"
import { FeaturesPage } from "../components/pages/admin/features/FeaturesPage"
// main routes  
import { HomePage } from "../components/pages/HomePage"
import { ProductDetailPage } from "../components/pages/ProductDetailPage"
import { CategoryProductsPage } from "../components/pages/CategoryProductsPage"
// urls auth
import { RegisterPage } from "../components/pages/auth/RegisterPage"
import { LoginPage } from "../components/pages/auth/LoginPage"
import { RegistrationSuccessPage } from "../components/pages/auth/RegistrationSuccessPage"
// logged-in user routes
import { ProtectedRoute } from "./ProtectedRoute"
import { ProfilePage } from "../components/pages/ProfilePage"
// admin-only routes
import { AdminRoute } from "./AdminRoute"



export const AppRouter = () => {
        return (
            <>
            <Routes>

                {/* La URL "/admin" y sus rutas hijas (solo para usuarios con rol ADMIN) */}
                <Route path="/admin" element={<AdminRoute><AdminPanel/></AdminRoute>}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/new" element={<CreateProductPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="inventory" element={<InventoryPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="features" element={<FeaturesPage />} />
                    <Route path="setup" element={<SetupPage />} />
                </Route>
                
                {/* La URL principal "/" cargará todo tu diseño actual de Nexo */}
                <Route path="/" element={<HomePage />}  />
                <Route path="/products/:id" element={<ProductDetailPage/>}  />
                <Route path="/productos" element={<CategoryProductsPage/>}  />

                {/* URLs de auth */}
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/registro-exitoso" element={<ProtectedRoute><RegistrationSuccessPage/></ProtectedRoute>} />

                {/* Solo para usuarios con sesión iniciada */}
                <Route path="/mi-perfil" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />

                
            </Routes>
            </>
        )
}
