# NÚCLEOAR — Sistema de Gerenciamento de Serviços de Ar-Condicionado

Projeto acadêmico desenvolvido para a disciplina de **Projeto de Software**, com foco no desenvolvimento de um sistema para gerenciamento de clientes, equipamentos, serviços e ordens de serviço de uma empresa de instalação e manutenção de sistemas de ar-condicionado.

O projeto está sendo desenvolvido de forma incremental, com novas funcionalidades sendo adicionadas a cada entrega acadêmica.

## Objetivo do Projeto

Desenvolver uma solução integrada para auxiliar no gerenciamento dos serviços de uma empresa de ar-condicionado, permitindo controlar clientes, equipamentos, serviços e ordens de serviço.

A aplicação possui uma arquitetura composta por **Front-end, Back-end e Banco de Dados**, permitindo a integração entre as camadas e a persistência das informações.

## Tecnologias Utilizadas

- React
- TypeScript
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Git
- GitHub

---

## AC1 — Gerenciamento de Clientes

A primeira entrega do projeto teve como foco o **cadastro e gerenciamento de clientes**.

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
```

---

## AC2 — Gerenciamento de Equipamentos

A segunda entrega do projeto ampliou as funcionalidades do NÚCLEOAR com a implementação do **gerenciamento de equipamentos de ar-condicionado**, permitindo cadastrar equipamentos e vinculá-los aos clientes já registrados no sistema.

### Principais funcionalidades

- Cadastro de equipamentos
- Listagem de equipamentos
- Consulta de equipamentos por identificador
- Edição de equipamentos cadastrados
- Exclusão de equipamentos
- Associação de equipamentos a clientes existentes
- Integração do Front-end com a API
- Persistência dos equipamentos no banco de dados

### Dados cadastrados

- Cliente associado
- Marca
- Modelo
- Tipo de equipamento
- Capacidade em BTUs

### Alterações no Banco de Dados

Foi criada a tabela `TB_EQUIPAMENTO` no SQL Server para armazenar os dados dos equipamentos.

A tabela possui os seguintes campos:

| Campo | Descrição |
|---|---|
| `id_equipamento` | Identificador do equipamento |
| `id_cliente` | Identificador do cliente associado |
| `marca` | Marca do equipamento |
| `modelo` | Modelo do equipamento |
| `tipo` | Tipo do equipamento |
| `btus` | Capacidade do equipamento em BTUs |

Também foi configurado um relacionamento entre `TB_EQUIPAMENTO` e `TB_CLIENTE`, permitindo associar cada equipamento a um cliente cadastrado.

### Desenvolvimento do Back-end

No Back-end, foram realizadas as seguintes implementações:

- Criação do modelo `Equipamento` em C#.
- Configuração do mapeamento da entidade utilizando Entity Framework Core.
- Configuração do relacionamento entre equipamentos e clientes.
- Criação dos endpoints da API para operações de cadastro, consulta, edição e exclusão.
- Integração com o SQL Server para persistência dos dados.

### Desenvolvimento do Front-end

No Front-end, foi desenvolvida uma tela de gerenciamento de equipamentos integrada à área administrativa do sistema.

A tela permite:

- Preencher os dados do equipamento por meio de um formulário.
- Selecionar um cliente previamente cadastrado.
- Visualizar os equipamentos registrados.
- Editar informações de equipamentos.
- Excluir equipamentos cadastrados.

A navegação também foi integrada ao menu administrativo, facilitando o acesso à nova funcionalidade.

### Integração

A funcionalidade utiliza o seguinte fluxo:

```text
React + TypeScript
        ↓
ASP.NET Core Web API
        ↓
Entity Framework Core
        ↓
SQL Server
        ↓
TB_EQUIPAMENTO
        ↕
TB_CLIENTE
```

### Resultado da AC2

Com a implementação da AC2, o sistema passou a contemplar o gerenciamento de clientes e de seus respectivos equipamentos, ampliando a estrutura inicial do projeto e preparando a aplicação para futuras funcionalidades relacionadas ao gerenciamento de serviços e ordens de serviço.

---

## Próximas Etapas

O projeto poderá evoluir com a implementação de novas funcionalidades, como:

- Gerenciamento de serviços de instalação e manutenção.
- Cadastro e gerenciamento de técnicos.
- Abertura e acompanhamento de ordens de serviço.
- Associação de equipamentos às ordens de serviço.
- Ampliação das validações e dos testes da aplicação.

As próximas funcionalidades serão incorporadas de forma incremental, mantendo a integração entre Front-end, Back-end e Banco de Dados.