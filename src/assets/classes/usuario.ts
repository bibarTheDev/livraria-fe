import { Endereco } from "./endereco";

export interface Usuario {
    admin: any,
    cpf: String,
    email: String,
    nome: String,
    telefone: String,
    enderecos: Endereco[],
}