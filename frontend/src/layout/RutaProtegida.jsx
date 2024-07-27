import { Outlet, Navigate } from "react-router-dom"
import Header from "../componentes/Header"
import Footer from "../componentes/Footer"
import useAuth from "../hooks/useAuth"


const RutaProtegida = () => {

    const { auth, cargando } = useAuth()

    if (cargando) return 'cargando...'

    return (
        <>
            <Header />
            {auth?._id ? (
                <main className="container mx-auto mt-10">
                    <Outlet />
                </main>
            ) : <Navigate to="/" />}
            <Footer />
        </>

    )
}

export default RutaProtegida