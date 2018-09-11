export class UserModel {

  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;

  constructor(
    id: string,
    nome: string,
    email: string,
    telefone: string,
    cpf: string,
    senha: string) {

    this.id = id;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.senha = senha;
  }
}