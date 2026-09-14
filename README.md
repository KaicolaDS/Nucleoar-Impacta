# NÚCLEAR — Sistema de Gerenciamento de Serviços de Ar-Condicionado

Projeto acadêmico desenvolvido para a disciplina de **Projeto de Software**, com foco no desenvolvimento de um sistema para gerenciamento de clientes, equipamentos, serviços e ordens de serviço de uma empresa de instalação e manutenção de sistemas de ar-condicionado.

O projeto está sendo desenvolvido de forma incremental, com novas funcionalidades sendo adicionadas a cada entrega acadêmica.

## Objetivo do Projeto

Desenvolver uma solução integrada para auxiliar no gerenciamento dos serviços de uma empresa de ar-condicionado, permitindo controlar clientes, equipamentos, serviços e ordens de serviço.

A aplicação possui uma arquitetura composta por **Front-end, Back-end e Banco de Dados**, permitindo a integração e persistência das informações.

## Tecnologias Utilizadas

- React
- TypeScript
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Git
- GitHub

## AC1 — Gerenciamento de Clientes

A primeira entrega do projeto tem como foco o **cadastro e gerenciamento de clientes**.

### Principais funcionalidades

- Cadastro de clientes
- Listagem de clientes
- Consulta de clientes
- Exclusão de clientes
- Validação dos dados informados
- Persistência dos dados no banco de dados

### Dados cadastrados

- Nome
- Telefone
- E-mail
- Endereço

### Integração

A funcionalidade utiliza o seguinte fluxo:

```text
React
   ↓
ASP.NET Core Web API
   ↓
Entity Framework Core
   ↓
SQL Server
   ↓
TB_CLIENTE