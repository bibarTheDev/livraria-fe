export interface CadastroData
{
    cpf: String,
    email: String,
    nome: String,
    telefone: String,
    senha: String,
    rua: String,
    cep: String,
    estado: String,
    cidade: String,
}

export class Cadastro implements CadastroData
{
    cpf: String = "";
    email: String = "";
    nome: String = "";
    telefone: String = "";
    senha: String = "";
    rua: String = "";
    cep: String = "";
    estado: String = "";
    cidade: String = "";

    listaEstados: String[] = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MS", "MT", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO" 
    ];

    validaCpf(): boolean
    {
        return true;
    }

    validaEmail(): boolean
    {
        return true;
    }

    validaNome(): boolean
    {
        return true;
    }

    validaTelefone(): boolean
    {
        return true;
    }

    validaSenha(): boolean
    {
        return true;
    }

    validaRua(): boolean
    {
        return true;
    }

    validaCep(): boolean
    {
        return true;
    }

    validaEstado(): boolean
    {
        return this.listaEstados.includes(this.estado);
    }

    validaCidade(): boolean
    {
        return true;
    }

    valida(): boolean
    {
        return this.validaCpf()
        && this.validaEmail()
        && this.validaNome()
        && this.validaTelefone()
        && this.validaSenha()
        && this.validaRua()
        && this.validaCep()
        && this.validaEstado()
        && this.validaCidade();
    }
}