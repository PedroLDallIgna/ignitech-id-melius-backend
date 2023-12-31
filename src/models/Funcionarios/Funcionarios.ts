import mssql, { ConnectionPool } from "mssql";

interface IFuncionario {
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  endereco: string;
  email: string;
  sexo: 'F' | 'M';
  equipe: number;
}

class Funcionarios {
  public async getAll(pool: ConnectionPool) {
    const query = `
      SELECT * FROM tblFuncionarios
    `;

    return pool.query(query);
  }

  public async getById(pool: ConnectionPool, id: number | string) {
    const query = `
      SELECT *
      FROM tblFuncionarios
      WHERE Id_Funcionario = ${id}
    `;

    return pool.query(query);
  }

  public async insert(pool: ConnectionPool, data: IFuncionario) {
    const request = new mssql.Request(pool);
    request.input('Nome', mssql.NVarChar(50), data.nome);
    request.input('DataNascimento', mssql.Date, data.dataNascimento);
    request.input('CPF', mssql.NVarChar(14), data.cpf);
    request.input('Telefone', mssql.NVarChar(15), data.telefone);
    request.input('Endereco', mssql.NVarChar(120), data.endereco);
    request.input('Email', mssql.NVarChar(100), data.email);
    request.input('Sexo', mssql.Char, data.sexo);
    request.input('Equipe', mssql.Int, data.equipe);

    return request.execute('InserirFuncionario');
  }

  public async update(pool: ConnectionPool, id: number | string, data: IFuncionario) {
    const request = new mssql.Request(pool);
    request.input('Id_Funcionario', mssql.Int, Number(id));
    request.input('Nome', mssql.NVarChar(50), data.nome);
    request.input('DataNascimento', mssql.Date, data.dataNascimento);
    request.input('CPF', mssql.NVarChar(14), data.cpf);
    request.input('Telefone', mssql.NVarChar(15), data.telefone);
    request.input('Endereco', mssql.NVarChar(120), data.endereco);
    request.input('Email', mssql.NVarChar(100), data.email);
    request.input('Sexo', mssql.Char, data.sexo);
    request.input('Equipe', mssql.Int, data.equipe);

    return request.execute('AtualizarFuncionario');
  }

  public async delete(pool: ConnectionPool, id: number | string) {
    const request = new mssql.Request(pool);
    request.input('Id', mssql.Int, id);

    return request.execute('ExcluirFuncionario');
  }
}

export default new Funcionarios();
