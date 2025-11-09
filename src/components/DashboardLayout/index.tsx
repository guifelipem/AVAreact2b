import type { IToken } from "../../interfaces/token"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { validaPermissao } from "../../service/token";

export const DashboardLayout = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState<IToken>()

    useEffect(() => {

        let lsToken = localStorage.getItem('chopts:usuarioLogado')

        let token: IToken | null = null

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
            setToken(token!)
        }

        if (!token) {
            navigate('/')
        }

    }, [])

    return (
        <>
            {/* Navbar principal */}
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <a className="navbar-brand">
                        ChopiTS
                    </a>

                    {/* Saudação + Logout + botão */}
                    <div className="d-flex align-items-center">
                        <span className="text-white me-3">Olá, {token?.user.nome}</span>

                        <a className="btn btn-outline-light btn-sm me-2"
                            onClick={() => {
                                if (window.confirm("Tem certeza que deseja fazer logout?")) {
                                    navigate("/")
                                }
                            }}>
                            Logout
                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarToggleExternalContent"
                            aria-controls="navbarToggleExternalContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Conteúdo que expande abaixo da navbar */}
            <div
                className="collapse"
                id="navbarToggleExternalContent"
                data-bs-theme="dark"
            >
                <div className="bg-dark p-4">
                    <h5 className="text-white h5 mb-3">Links:</h5>
                    <ul className="list-unstyled mb-0">
                        {
                            validaPermissao(token?.user.permissoes, ['admin']) && (
                                <li>
                                    <a onClick={() => navigate("/home")} className="text-white text-decoration-none d-block mb-2" style={{ cursor: "pointer" }}>
                                        Home
                                    </a>
                                </li>
                            )
                        }
                        <li>
                            <a onClick={() => navigate("/usuarios")} className="text-white text-decoration-none d-block mb-2" style={{ cursor: "pointer" }}>
                                Usuários
                            </a>
                        </li>
                        <li>
                            <a onClick={() => navigate("/clientes")} className="text-white text-decoration-none d-block mb-2" style={{ cursor: "pointer" }}>
                                Clientes
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}