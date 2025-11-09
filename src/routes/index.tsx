import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom'

import { Home } from './../pages/Home'
import { Login } from '../pages/Login'
import { Produtos } from '../pages/Produtos'
import { Usuarios } from '../pages/Usuarios'
import { GerenciarUsuarios } from '../pages/Usuarios/Gerenciar'
import { Clientes } from '../pages/Clientes'
import { GerenciarClientes } from '../pages/Clientes/Gerenciar'

export const Rotas = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<Home />} />
                <Route path='/produtos/:parametro' element={<Produtos />} />
                <Route
                    path='/usuarios'
                    element={<Usuarios />}
                />
                <Route
                    path={'/usuarios/:id'}
                    element={<GerenciarUsuarios />}
                />
                <Route
                    path='/clientes'
                    element={<Clientes />}
                />
                <Route
                    path={'/clientes/:id'}
                    element={<GerenciarClientes />}
                />
                <Route path='*' element={<h1>404</h1>} />

            </Routes>
        </BrowserRouter>
    )
}