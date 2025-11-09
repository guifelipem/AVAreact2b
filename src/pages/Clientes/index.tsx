import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { validaPermissao } from "../../service/token";
import type { IToken } from "../../interfaces/token";
import { DashboardLayout } from "../../components/DashboardLayout";

interface IClientes {
    id: number;
    nomeCompleto: string;
    email: string;
}

export const Clientes = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState<IToken>()
    const [clientes, setClientes] = useState<IClientes[]>([])

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

        // Requisição no backend
        axios.get('http://localhost:3001/clientes')
            .then((resposta) => {
                setClientes(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })

    }, [])

    const excluirCliente = useCallback(async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/clientes/${id}`)

            const { data } = await axios.get('http://localhost:3001/clientes')

            setClientes(data)

        } catch (erro) {
            console.log(erro)
        }

    }, [])

    return (
        <>
            <DashboardLayout />
            <div className="container">
                <div className="col-10 mx-auto">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: 15
                        }}
                    >
                        <h2>Clientes</h2>

                        {
                            validaPermissao(token?.user.permissoes, ['admin']) && (
                                <button
                                    className="btn btn-success"
                                    type="button"
                                    onClick={() => {
                                        navigate('/clientes/criar')
                                    }}
                                >
                                    Adicionar
                                </button>
                            )
                        }

                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome Completo</th>
                                <th scope="col">Email</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map((clientes, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{clientes.id}</th>
                                            <td>{clientes.nomeCompleto}</td>
                                            <td>{clientes.email}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    style={{
                                                        marginRight: 5
                                                    }}
                                                    onClick={() => {
                                                        navigate(`/clientes/${clientes.id}`)
                                                    }}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    type="button"
                                                    onClick={() => {
                                                        if (window.confirm("Tem certeza que deseja excluir este cliente?")) {
                                                            excluirCliente(clientes.id);
                                                        }
                                                    }}
                                                >Excluir</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}