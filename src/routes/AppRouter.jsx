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
// main routes  
import { HomePage } from "../components/pages/HomePage"
import { ProductDetailPage } from "../components/pages/ProductDetailPage"
// urls auth
import { RegisterPage } from "../components/pages/auth/RegisterPage"
import { LoginPage } from "../components/pages/auth/LoginPage"
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
                    <Route path="setup" element={<SetupPage />} />
                </Route>
                
                {/* La URL principal "/" cargará todo tu diseño actual de Nexo */}
                <Route path="/" element={<HomePage />}  />
                <Route path="/products/:id" element={<ProductDetailPage/>}  />

                {/* URLs de auth */}
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />

                {/* Solo para usuarios con sesión iniciada */}
                <Route path="/mi-perfil" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />

                
            </Routes>
            </>
        )
}
