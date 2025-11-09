import { useNavigate, useParams } from "react-router-dom"

import styles from "./styles.module.css"
import { useCallback, useRef, useState, type SyntheticEvent } from "react"
import { Loading } from "../../components/Loading";
import axios from "axios";
import { Toast } from "../../components/Toast";

export const Login = () => {

    const navigate = useNavigate();
    const refForm = useRef<any>(null)

    const [isLoading, setIsLoading] = useState(false)
    const [isToast, setIsToast] = useState(false)

    const { parametro } = useParams()

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault()

        if (refForm.current.checkValidity()) {
            setIsLoading(true)

            const target = event.target as typeof event.target & {
                email: { value: string },
                password: { value: string }
            }

            const objLogar = {
                email: target.email.value,
                password: target.password.value
            }

            axios
                .post("http://localhost:3001/login", objLogar)
                .then((resposta) => {
                    const dadosUsuario = resposta.data;

                    // Salva no localStorage
                    localStorage.setItem(
                        "chopts:usuarioLogado",
                        JSON.stringify(dadosUsuario)
                    );

                    // Verifica o tipo de permissão do usuário
                    if (dadosUsuario.user?.permissoes === "admin") {
                        navigate("/home"); // Admin → home
                    } else {
                        navigate("/usuarios"); // Outros → página de usuários
                    }

                })
                .catch((erro) => {
                    console.log(erro)
                    setIsToast(true)
                })
                .finally(() => {
                    setIsLoading(false)
                })

        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [])

    console.log(parametro)
    return (
        <>
            <Loading visible={isLoading} />
            <Toast
                show={isToast}
                message={'Usuário ou senha incorretos'}
                colors={'danger'}
                onClose={() => { setIsToast(false) }}
            />
            <div className={styles.main}>
                <div className={styles.border}>
                    <div className="d-flex flex-column align-items-center">
                        <h1 className="text-primary">Login</h1>
                        <p className="text-secondary">
                            Preencha os campos para logar no sistema
                        </p>
                    </div>
                    <hr />
                    <form
                        className="needs-validation"
                        noValidate
                        onSubmit={submitForm}
                        ref={refForm}
                    >
                        <div className="col-md-12">
                            <label
                                htmlFor="email"
                                className="form-label"
                                style={{ marginBottom: "0" }}
                            >Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                placeholder="Digite seu email"
                            />
                            <div className="invalid-feedback">
                                Por favor digite seu email
                            </div>

                        </div>

                        <div className="col-md-12">
                            <label
                                htmlFor="password"
                                className="form-label"
                                style={{ marginBottom: "0", marginTop: "3%" }}
                            >Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                required
                                placeholder="Digite sua senha"
                            />
                            <div className="invalid-feedback">
                                Por favor digite sua senha.
                            </div>

                        </div>

                        <div className="col-md-12 text-center">
                            <button
                                className="btn btn-primary"
                                type="submit"
                                style={{ margin: "4%" }}
                            >
                                Entrar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}