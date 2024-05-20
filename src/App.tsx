import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PrivateRoute, AdminPrivateRoute } from "./components/PrivateRoute"
import Layout from "./components/Layout"

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SoloProduct from "./pages/SoloProduct"
import CatePage from "./pages/CatePage"

import SearchByCate from "./pages/SearchByCate"
import { ReactAdminPage } from "./pages/ReactAdminPage"
import BrandPage from "./pages/BrandPage"
import SearchByBrand from "./pages/SearchByBrand"


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="login" element={<LoginPage />} />

                <Route index element={<HomePage />} />
                <Route path="items/:id" element={<SoloProduct />} />

                <Route path="cate" element={<CatePage />} />
                <Route path="cate/:cate" element={<SearchByCate />} />

                <Route path="brand" element={<BrandPage />} />
                <Route path="brand/:brand" element={<SearchByBrand />} />
            </Route>

            <Route path="reactadmin/*" element={<AdminPrivateRoute />} >
                <Route path="*" element={<ReactAdminPage/>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
