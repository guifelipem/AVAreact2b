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
                <Route path='*' element={<h1>404</h1>} />

            </Routes>
        </BrowserRouter>
    )
}