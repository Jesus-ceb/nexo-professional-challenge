import { Route, Routes } from "react-router-dom"
import { HomePage } from "../components/pages/HomePage"
import { AdminPanel } from "../components/pages/AdminPanel"


export const AppRouter = () => {
        return (
            <>
            <Routes>
                {/* La URL principal "/" cargará todo tu diseño actual de Nexo */}
                <Route path="/" element={<HomePage />}  />

                {/* La URL "/admin" cargará solo el botón de agregar información */}
                <Route path="/admin" element={<AdminPanel/>} />
            </Routes>
            </>
        )
}
