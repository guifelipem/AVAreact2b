export interface IToken {
    acessToken: string;
    user: {
        id: number;
        nome: string;
        email: string;
        permissoes: string;
    }
}