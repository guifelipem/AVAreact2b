import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import { DashboardLayout } from "../../../components/DashboardLayout";

export const GerenciarClientes = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [editar, setEditar] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const refForm = useRef<any>(null);

    useEffect(() => {

        const idCliente = Number(id);

        if (!isNaN(idCliente)) {

            setEditar(true);
            setIsLoading(true);

            axios.get(`http://localhost:3001/clientes?id=${idCliente}`)
                .then((res) => {
                    const dados = res.data[0];

                    refForm.current["nomeCompleto"].value = dados.nomeCompleto;
                    refForm.current["cpf"].value = dados.cpf;
                    refForm.current["dataNascimento"].value = dados.dataNascimento;
                    refForm.current["email"].value = dados.email;
                    refForm.current["telefone"].value = dados.telefone;
                    refForm.current["logradouro"].value = dados.logradouro;
                    refForm.current["numero"].value = dados.numero;
                    refForm.current["complemento"].value = dados.complemento || "";
                    refForm.current["bairro"].value = dados.bairro;
                    refForm.current["cidade"].value = dados.cidade;
                    refForm.current["estado"].value = dados.estado;
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

    }, [id]);

    const enviarFormulario = useCallback((event: SyntheticEvent) => {

        event.preventDefault();

        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & {
                nomeCompleto: { value: string },
                cpf: { value: string },
                dataNascimento: { value: string },
                email: { value: string },
                telefone: { value: string },
                logradouro: { value: string },
                numero: { value: string },
                complemento: { value: string },
                bairro: { value: string },
                cidade: { value: string },
                estado: { value: string }
            };

            let objSalvar = {
                nomeCompleto: target.nomeCompleto.value,
                cpf: target.cpf.value,
                dataNascimento: target.dataNascimento.value,
                email: target.email.value,
                telefone: target.telefone.value,
                logradouro: target.logradouro.value,
                numero: target.numero.value,
                complemento: target.complemento.value,
                bairro: target.bairro.value,
                cidade: target.cidade.value,
                estado: target.estado.value
            };

            if (editar) {

                axios.put(
                    `http://localhost:3001/clientes/${id}`,
                    objSalvar
                )
                    .then(() => {
                        alert("Editado com sucesso");
                        navigate("/clientes");
                    })
                    .catch((erro) => {
                        console.log(erro);
                    });

            } else {

                axios.post("http://localhost:3001/clientes", objSalvar)
                    .then(() => {
                        alert("Salvo com sucesso :D");
                        navigate("/clientes");
                    })
                    .catch((erro) => {
                        console.log(erro);
                    });
            }

        } else {
            refForm.current.classList.add("was-validated");
        }

    }, [editar, id]);

    return (
        <>
            <DashboardLayout />

            <div className="container">
                <Loading visible={isLoading} />

                <div className="col-6 mx-auto p-3">
                    <h1>Clientes</h1>

                    <form
                        noValidate
                        className="row g-3"
                        ref={refForm}
                        onSubmit={enviarFormulario}
                    >

                        <div className="col-md-12">
                            <label className="form-label">Nome Completo</label>
                            <input type="text" className="form-control" id="nomeCompleto" required />
                            <div className="invalid-feedback">Digite o nome completo.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf" required />
                            <div className="invalid-feedback">Digite o CPF.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Data de Nascimento</label>
                            <input type="date" className="form-control" id="dataNascimento" required />
                            <div className="invalid-feedback">Digite a data de nascimento.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" required />
                            <div className="invalid-feedback">Digite um email válido.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Telefone</label>
                            <input type="text" className="form-control" id="telefone" required />
                            <div className="invalid-feedback">Digite o telefone.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Logradouro</label>
                            <input type="text" className="form-control" id="logradouro" required />
                            <div className="invalid-feedback">Digite o logradouro.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Número</label>
                            <input type="text" className="form-control" id="numero" required />
                            <div className="invalid-feedback">Digite o número.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Complemento (opcional)</label>
                            <input type="text" className="form-control" id="complemento" />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Bairro</label>
                            <input type="text" className="form-control" id="bairro" required />
                            <div className="invalid-feedback">Digite o bairro.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Cidade</label>
                            <input type="text" className="form-control" id="cidade" required />
                            <div className="invalid-feedback">Digite a cidade.</div>
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">Estado (UF)</label>
                            <select className="form-select" id="estado" required>
                                <option value="">Selecione o estado</option>
                                <option value="AC">AC</option>
                                <option value="AL">AL</option>
                                <option value="AP">AP</option>
                                <option value="AM">AM</option>
                                <option value="BA">BA</option>
                                <option value="CE">CE</option>
                                <option value="DF">DF</option>
                                <option value="ES">ES</option>
                                <option value="GO">GO</option>
                                <option value="MA">MA</option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PA">PA</option>
                                <option value="PB">PB</option>
                                <option value="PR">PR</option>
                                <option value="PE">PE</option>
                                <option value="PI">PI</option>
                                <option value="RJ">RJ</option>
                                <option value="RN">RN</option>
                                <option value="RS">RS</option>
                                <option value="RO">RO</option>
                                <option value="RR">RR</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                                <option value="SE">SE</option>
                                <option value="TO">TO</option>
                            </select>
                            <div className="invalid-feedback">Selecione o estado.</div>
                        </div>

                        <div className="col-md-12">
                            <button
                                className="btn"
                                type="button"
                                onClick={() => navigate("/clientes")}
                                style={{ marginRight: "2%" }}
                            >
                                Voltar
                            </button>

                            <button className="btn btn-success" type="submit">
                                {editar ? "Editar" : "Salvar"}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};
