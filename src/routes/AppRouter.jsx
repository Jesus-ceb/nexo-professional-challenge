import { Route, Routes } from "react-router-dom"
// main routes  
import { HomePage } from "../components/pages/HomePage"
import { AdminPanel } from "../components/pages/AdminPanel"
// other routes
import { ProductsPage } from "../components/pages/admin/products/ProductsPage"
import { DashboardPage } from "../components/pages/admin/dashboard/DashboardPage"
import { CustomersPage } from "../components/pages/admin/customers/CustomersPage"
import { InventoryPage } from "../components/pages/admin/inventory/InventoryPage"
import { CategoriesPage } from "../components/pages/admin/categories/CategoriesPage"
import { SetupPage } from "../components/pages/admin/setup/SetupPage"
import { CreateProductPage } from "../components/pages/admin/products/CreateProductPage"



export const AppRouter = () => {
        return (
            <>
            <Routes>
                {/* La URL principal "/" cargará todo tu diseño actual de Nexo */}
                <Route path="/" element={<HomePage />}  />

                {/* La URL "/admin" y sus rutas hijas */}
                <Route path="/admin" element={<AdminPanel/>}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/new" element={<CreateProductPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                    <Route path="inventory" element={<InventoryPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="setup" element={<SetupPage />} />
                </Route>
                
            </Routes>
            </>
        )
}
