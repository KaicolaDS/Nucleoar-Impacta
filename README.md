# NÚCLEOAR — Sistema de Gerenciamento de Serviços de Ar-Condicionado

Projeto acadêmico desenvolvido para a disciplina de **Projeto de Software**. O objetivo é criar um sistema para gerenciar clientes, equipamentos, categorias e serviços de uma empresa de instalação e manutenção de ar-condicionado.

O projeto está sendo desenvolvido por etapas, com novas funcionalidades adicionadas a cada atividade acadêmica.

## Objetivo do Projeto

Desenvolver um sistema que facilite o gerenciamento de uma empresa de ar-condicionado, permitindo cadastrar e organizar clientes, equipamentos, categorias e serviços.

A aplicação possui três partes principais: Front-end, Back-end e Banco de Dados, que trabalham juntas para armazenar e apresentar as informações.

## Tecnologias Utilizadas

- React
- TypeScript
- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- HTML5
- CSS3
- JavaScript
- Node.js
- Git e GitHub

---

## AC1 — Gerenciamento de Clientes

A primeira entrega teve como foco o cadastro e o gerenciamento de clientes.

### Principais funcionalidades

- Cadastro de clientes;
- Listagem de clientes;
- Consulta de clientes;
- Edição de clientes;
- Exclusão de clientes;
- Validação dos dados informados;
- Armazenamento dos dados no banco de dados.

### Dados cadastrados

- Nome;
- Telefone;
- E-mail;
- Endereço.

### Integração

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

A segunda entrega ampliou o sistema com o gerenciamento de equipamentos de ar-condicionado, permitindo cadastrar equipamentos e vinculá-los aos clientes já registrados.

### Principais funcionalidades

- Cadastro de equipamentos;
- Listagem de equipamentos;
- Consulta por identificador;
- Edição de equipamentos;
- Exclusão de equipamentos;
- Associação de equipamentos aos clientes;
- Integração do Front-end com a API;
- Armazenamento dos dados no banco de dados.

### Dados cadastrados

- Cliente associado;
- Marca;
- Modelo;
- Tipo de equipamento;
- Capacidade em BTUs.

### Alterações no Banco de Dados

Foi criada a tabela `TB_EQUIPAMENTO` no SQL Server.

| Campo | Descrição |
|---|---|
| `id_equipamento` | Identificador do equipamento |
| `id_cliente` | Cliente associado |
| `marca` | Marca do equipamento |
| `modelo` | Modelo do equipamento |
| `tipo` | Tipo do equipamento |
| `btus` | Capacidade em BTUs |

Também foi criado um relacionamento entre `TB_EQUIPAMENTO` e `TB_CLIENTE`, permitindo vincular cada equipamento a um cliente cadastrado.

### Desenvolvimento

- Criação do modelo `Equipamento` em C#;
- Mapeamento da entidade com Entity Framework Core;
- Configuração do relacionamento entre equipamentos e clientes;
- Criação dos endpoints da API;
- Desenvolvimento da tela de gerenciamento;
- Criação do formulário de cadastro;
- Implementação de edição e exclusão;
- Integração com o SQL Server.

### Integração

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

---

## AC3 — Gerenciamento de Categorias

A terceira entrega adicionou o gerenciamento de categorias de equipamentos, permitindo organizar melhor os equipamentos cadastrados no sistema.

### Principais funcionalidades

- Cadastro de categorias;
- Listagem de categorias;
- Consulta de categorias;
- Edição de categorias;
- Exclusão de categorias;
- Associação de categorias aos equipamentos;
- Seleção de categorias no cadastro de equipamentos;
- Integração entre Front-end e API.

### Dados cadastrados

- Nome da categoria;
- Descrição.

### Alterações no Banco de Dados

Foi criada a tabela `TB_CATEGORIA` no SQL Server, responsável por armazenar as categorias cadastradas.

Também foi configurado um relacionamento entre categorias e equipamentos, permitindo associar uma categoria a cada equipamento.

### Desenvolvimento

- Criação do modelo `Categoria` em C#;
- Mapeamento da entidade com Entity Framework Core;
- Configuração do relacionamento com equipamentos;
- Criação e aplicação da migration;
- Criação dos endpoints da API;
- Desenvolvimento da tela de gerenciamento de categorias;
- Implementação de cadastro, consulta, edição e exclusão;
- Integração das categorias ao cadastro de equipamentos.

### Integração

```text
React + TypeScript
        ↓
ASP.NET Core Web API
        ↓
Entity Framework Core
        ↓
SQL Server
        ↓
TB_CATEGORIA
        ↕
TB_EQUIPAMENTO
```

---

## AC4 — Prova e Avaliação

A quarta atividade contínua corresponde à prova da disciplina, reunindo as funcionalidades desenvolvidas durante o projeto.

### Funcionalidades apresentadas

- Gerenciamento de clientes;
- Gerenciamento de equipamentos;
- Associação de equipamentos aos clientes;
- Gerenciamento de categorias;
- Associação de categorias aos equipamentos;
- Gerenciamento de serviços;
- Integração entre Front-end, Back-end e banco de dados.

### Validações

- Testar o cadastro, a consulta, a edição e a exclusão de registros;
- Verificar a comunicação entre Front-end e API;
- Verificar a persistência dos dados no SQL Server;
- Validar os relacionamentos entre as tabelas;
- Verificar o funcionamento geral do sistema.

---

## Estrutura do Projeto

O sistema está organizado em três partes:

- **Front-end:** desenvolvido em React e TypeScript, responsável pelas telas e pela interação com o usuário.
- **Back-end:** desenvolvido em C# com ASP.NET Core Web API, responsável pelas regras e operações do sistema.
- **Banco de Dados:** SQL Server, responsável pelo armazenamento das informações.

## Repositório

- **GitHub:** [Clique aqui para acessar.](https://github.com/KaicolaDS/Nucleoar-Impacta)
- **Board:**
- **Vídeo no YouTube:**

## Integrante

- Kaique Araujo Fernandes — RA: 2403062