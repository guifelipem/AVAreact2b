import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../../../components/Loading";
import { DashboardLayout } from "../../../components/DashboardLayout";

export const GerenciarUsuarios = () => {

    const { id } = useParams();
    const navigate = useNavigate()

    const [editar, setEditar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const refForm = useRef<any>(null)

    useEffect(() => {

        //buscar usuario pelo parametro
        const idUsuario = Number(id)

        if (!isNaN(idUsuario)) {

            setEditar(true);

            setIsLoading(true)
            axios.get(
                `http://localhost:3001/users?id=${idUsuario}`
            )
                .then((res) => {

                    refForm.current['nome'].value = res.data[0].nome
                    refForm.current['email'].value = res.data[0].email
                }).finally(() => {
                    setIsLoading(false)
                })
        }

    }, [id])

    const enviarFormulario = useCallback((event: SyntheticEvent) => {

        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nome: { value: string },
                email: { value: string },
                permissoes: { value: string },
                password: { value: string },
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value,
                permissoes: target.permissoes.value,
                password: target.password.value,
            }

            if (editar) {

                axios.put(
                    `http://localhost:3001/users/${id}`,
                    objSalvar
                )
                    .then(() => {
                        alert('Editado com sucesso')
                        navigate('/usuarios')
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            } else {
                axios.post('http://localhost:3001/users', objSalvar)
                    .then(() => {
                        alert('Salvo com sucesso :D')
                        navigate('/usuarios')
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })
            }



        } else {
            refForm.current.classList.add('was-validated')
        }

    }, [editar, id])

    return (
        <>
            <DashboardLayout />

            <div className="container">
                <Loading
                    visible={isLoading}
                />
                <div className="col-6 mx-auto p-3">
                <h1>Usuarios</h1>
                <form
                    noValidate
                    className="row g-3"
                    ref={refForm}
                    onSubmit={enviarFormulario}
                >
                    <div className="col-md-12">
                        <label htmlFor="nome" className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite seu nome"
                            required
                            id="nome"
                        />
                        <div className="invalid-feedback">
                            Por favor digite seu nome.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Digite seu email"
                            required
                            id="email"
                        />
                        <div className="invalid-feedback">
                            Por favor digite seu email.
                        </div>
                    </div>
                    <div
                        className="col-md-12"
                    >
                        <label
                            htmlFor="permissoes"
                            className="form-label"
                        >Tipo</label>
                        <select id="permissoes"
                            required
                            className="form-select"
                        >
                            <option value="">
                                Selecione o tipo
                            </option>
                            <option value="admin">
                                Admin
                            </option>
                            <option value="colaborador">
                                Colaborador
                            </option>
                            <option value="visitante">
                                Visitante
                            </option>
                        </select>
                        <div className="invalid-feedback">
                            Por favor selecioneum tipo.
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite uma senha.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                navigate('/usuarios')
                            }}
                            style={{marginRight: "2%"}}
                        >
                            Voltar
                        </button>
                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            {editar ? 'Editar' : 'Salvar'}
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </>
    )
}