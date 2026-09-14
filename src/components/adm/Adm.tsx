import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Wind,
  Wrench,
  ClipboardList,
  UserCog,
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Pencil,
  Trash2,
  UserPlus,
} from 'lucide-react';

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
}

// IMPORTANTE:
// Troque 7000 pela porta HTTPS mostrada pelo "dotnet run"
const API_URL = 'http://localhost:5185/api/Clientes';

export default function Adm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [clientes, setClientes] = useState<Cliente[]>([]);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  const [busca, setBusca] = useState('');

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  /*
   * ============================================================
   * CARREGAR CLIENTES DA API
   * ============================================================
   */

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      setCarregando(true);

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os clientes.');
      }

      const dados = await resposta.json();

      const clientesFormatados: Cliente[] = dados.map(
        (cliente: any) => ({
          id: cliente.idCliente,
          nome: cliente.nome,
          telefone: cliente.telefone,
          email: cliente.email,
          endereco: cliente.endereco,
        })
      );

      setClientes(clientesFormatados);
    } catch (erro) {
      console.error('Erro ao carregar clientes:', erro);

      alert(
        'Não foi possível carregar os clientes. ' +
        'Verifique se a API está funcionando.'
      );
    } finally {
      setCarregando(false);
    }
  };

  /*
   * ============================================================
   * MODAL
   * ============================================================
   */

  const abrirModal = () => {
    setNome('');
    setTelefone('');
    setEmail('');
    setEndereco('');
    setModalOpen(true);
  };

  const fecharModal = () => {
    if (salvando) return;

    setModalOpen(false);
  };

  /*
   * ============================================================
   * CADASTRAR CLIENTE
   * ============================================================
   */

  const cadastrarCliente = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !nome.trim() ||
      !telefone.trim() ||
      !email.trim() ||
      !endereco.trim()
    ) {
      alert('Preencha todos os campos.');
      return;
    }

    try {
      setSalvando(true);

      const resposta = await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.trim(),
          email: email.trim(),
          endereco: endereco.trim(),
        }),
      });

      if (!resposta.ok) {
        let mensagem = 'Erro ao cadastrar cliente.';

        try {
          const erro = await resposta.json();

          if (erro.mensagem) {
            mensagem = erro.mensagem;
          }
        } catch {
          // Mantém a mensagem padrão
        }

        throw new Error(mensagem);
      }

      const clienteCriado = await resposta.json();

      const novoCliente: Cliente = {
        id: clienteCriado.idCliente,
        nome: clienteCriado.nome,
        telefone: clienteCriado.telefone,
        email: clienteCriado.email,
        endereco: clienteCriado.endereco,
      };

      setClientes((clientesAtuais) => [
        ...clientesAtuais,
        novoCliente,
      ]);

      setNome('');
      setTelefone('');
      setEmail('');
      setEndereco('');

      setModalOpen(false);

      alert('Cliente cadastrado com sucesso!');
    } catch (erro) {
      console.error('Erro ao cadastrar cliente:', erro);

      if (erro instanceof Error) {
        alert(erro.message);
      } else {
        alert('Erro ao cadastrar cliente.');
      }
    } finally {
      setSalvando(false);
    }
  };

  /*
   * ============================================================
   * EXCLUIR CLIENTE
   * ============================================================
   */

  const excluirCliente = async (id: number) => {
    const confirmar = window.confirm(
      'Deseja realmente excluir este cliente?'
    );

    if (!confirmar) {
      return;
    }

    try {
      const resposta = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!resposta.ok) {
        let mensagem = 'Erro ao excluir cliente.';

        try {
          const erro = await resposta.json();

          if (erro.mensagem) {
            mensagem = erro.mensagem;
          }
        } catch {
          // Mantém a mensagem padrão
        }

        throw new Error(mensagem);
      }

      setClientes((clientesAtuais) =>
        clientesAtuais.filter(
          (cliente) => cliente.id !== id
        )
      );

      alert('Cliente excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao excluir cliente:', erro);

      if (erro instanceof Error) {
        alert(erro.message);
      } else {
        alert('Erro ao excluir cliente.');
      }
    }
  };

  /*
   * ============================================================
   * FILTRO DE PESQUISA
   * ============================================================
   */

  const clientesFiltrados = clientes.filter(
    (cliente) => {
      const termo = busca.toLowerCase();

      return (
        cliente.nome
          .toLowerCase()
          .includes(termo) ||
        cliente.email
          .toLowerCase()
          .includes(termo) ||
        cliente.telefone.includes(termo)
      );
    }
  );

  /*
   * ============================================================
   * INTERFACE
   * ============================================================
   */

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================================
          OVERLAY MOBILE
      ======================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ======================================================
          SIDEBAR
      ======================================================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72
          flex-col border-r border-gray-200 bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        {/* LOGO */}

        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">

          <div className="flex items-center gap-3">

    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-500">
              <img src="./img/logo/iconColorida.png" alt="Núcleo Ar" />
            </div>

            <div>
              <h1 className="text-lg font-black text-gray-900">
                NÚCLEOAR
              </h1>

              <p className="text-[9px] font-semibold tracking-[0.2em] text-gray-400">
                ADMINISTRAÇÃO
              </p>
            </div>

          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>

        </div>

        {/* MENU */}

        <div className="flex-1 px-4 py-6">

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Menu
          </p>

          <nav className="space-y-1">

            <MenuItem
              icon={<LayoutDashboard size={19} />}
              label="Dashboard"
            />

            <MenuItem
              icon={<Users size={19} />}
              label="Clientes"
              active
            />

            <MenuItem
              icon={<Wind size={19} />}
              label="Equipamentos"
            />

            <MenuItem
              icon={<Wrench size={19} />}
              label="Serviços"
            />

            <MenuItem
              icon={<ClipboardList size={19} />}
              label="Ordens de Serviço"
            />

            <MenuItem
              icon={<UserCog size={19} />}
              label="Técnicos"
            />

          </nav>

        </div>

        {/* USUÁRIO */}

        <div className="border-t border-gray-100 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100">
              <UserCog
                size={18}
                className="text-brand-600"
              />
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-bold text-gray-800">
                Administrador
              </p>

              <p className="truncate text-xs text-gray-400">
                Acesso administrativo
              </p>

            </div>

          </div>

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-red-50 hover:text-red-500">
            <LogOut size={18} />
            Sair
          </button>

        </div>

      </aside>

      {/* ======================================================
          CONTEÚDO
      ======================================================= */}

      <main className="lg:ml-72">

        {/* HEADER MOBILE */}

        <header className="flex h-20 items-center border-b border-gray-200 bg-white px-5 lg:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>

          <h1 className="ml-4 text-lg font-bold text-gray-900">
            Clientes
          </h1>

        </header>

        {/* CONTEÚDO PRINCIPAL */}

        <div className="p-5 sm:p-8 lg:p-10">

          {/* ==================================================
              TOPO
          =================================================== */}

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div>

              <p className="mb-1 text-sm font-semibold text-brand-500">
                Administração
              </p>

              <h1 className="text-3xl font-black text-gray-900">
                Clientes
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Gerencie os clientes da NÚCLEOAR.
              </p>

            </div>

            <button
              onClick={abrirModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
            >
              <Plus size={19} />
              Novo cliente
            </button>

          </div>

          {/* ==================================================
              CARDS
          =================================================== */}

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* TOTAL */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Total de clientes
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-900">
                    {clientes.length}
                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">

                  <Users
                    size={23}
                    className="text-brand-500"
                  />

                </div>

              </div>

            </div>

            {/* CADASTRADOS */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Clientes cadastrados
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-900">
                    {clientes.length}
                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">

                  <UserPlus
                    size={23}
                    className="text-green-500"
                  />

                </div>

              </div>

            </div>

            {/* EQUIPAMENTOS */}

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm font-medium text-gray-500">
                    Equipamentos
                  </p>

                  <p className="mt-2 text-3xl font-black text-gray-900">
                    0
                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">

                  <Wind
                    size={23}
                    className="text-blue-500"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              LISTA
          =================================================== */}

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* CABEÇALHO */}

            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="font-bold text-gray-900">
                  Clientes cadastrados
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  Lista de clientes da NÚCLEOAR
                </p>

              </div>

              {/* PESQUISA */}

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Buscar cliente..."
                  value={busca}
                  onChange={(e) =>
                    setBusca(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 sm:w-64"
                />

              </div>

            </div>

            {/* ==================================================
                CARREGANDO
            =================================================== */}

            {carregando ? (

              <div className="flex flex-col items-center justify-center px-5 py-20 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">

                  <Wind
                    size={30}
                    className="animate-pulse text-brand-500"
                  />

                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  Carregando clientes...
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Buscando dados no banco de dados.
                </p>

              </div>

            ) : clientesFiltrados.length > 0 ? (

              /* ==================================================
                 TABELA
              =================================================== */

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-gray-100 bg-gray-50/70">

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Cliente
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Telefone
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        E-mail
                      </th>

                      <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                        Endereço
                      </th>

                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-400">
                        Ações
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {clientesFiltrados.map(
                      (cliente) => (

                        <tr
                          key={cliente.id}
                          className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50"
                        >

                          {/* CLIENTE */}

                          <td className="px-5 py-4">

                            <div className="flex items-center gap-3">

                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">

                                <Users
                                  size={18}
                                  className="text-brand-500"
                                />

                              </div>

                              <div>

                                <p className="text-sm font-bold text-gray-800">
                                  {cliente.nome}
                                </p>

                                <p className="text-xs text-gray-400">
                                  #{cliente.id}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* TELEFONE */}

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {cliente.telefone}
                          </td>

                          {/* EMAIL */}

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {cliente.email}
                          </td>

                          {/* ENDEREÇO */}

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {cliente.endereco}
                          </td>

                          {/* AÇÕES */}

                          <td className="px-5 py-4">

                            <div className="flex justify-end gap-2">

                              {/* EDITAR */}

                              <button
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-500"
                                title="Editar"
                                onClick={() =>
                                  alert(
                                    'A função de edição será implementada na próxima etapa.'
                                  )
                                }
                              >
                                <Pencil size={17} />
                              </button>

                              {/* EXCLUIR */}

                              <button
                                onClick={() =>
                                  excluirCliente(
                                    cliente.id
                                  )
                                }
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                                title="Excluir"
                              >
                                <Trash2 size={17} />
                              </button>

                            </div>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            ) : (

              /* ==================================================
                 ESTADO VAZIO
              =================================================== */

              <div className="flex flex-col items-center justify-center px-5 py-20 text-center">

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50">

                  <Users
                    size={30}
                    className="text-brand-500"
                  />

                </div>

                <h3 className="text-lg font-bold text-gray-900">

                  {busca
                    ? 'Nenhum cliente encontrado'
                    : 'Nenhum cliente cadastrado'}

                </h3>

                <p className="mt-2 max-w-sm text-sm text-gray-500">

                  {busca
                    ? 'Tente pesquisar por outro nome, e-mail ou telefone.'
                    : 'Cadastre o primeiro cliente para começar a gerenciar os atendimentos da NÚCLEOAR.'}

                </p>

                {!busca && (
                  <button
                    onClick={abrirModal}
                    className="mt-6 flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    <Plus size={18} />
                    Cadastrar primeiro cliente
                  </button>
                )}

              </div>

            )}

          </div>

        </div>

      </main>

      {/* ======================================================
          MODAL DE CADASTRO
      ======================================================= */}

      {modalOpen && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={fecharModal}
        >

          <div
            className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER MODAL */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">

                  <UserPlus
                    size={21}
                    className="text-brand-500"
                  />

                </div>

                <div>

                  <h2 className="text-lg font-black text-gray-900">
                    Novo cliente
                  </h2>

                  <p className="text-xs text-gray-500">
                    Cadastre um novo cliente
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={fecharModal}
                disabled={salvando}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <X size={21} />
              </button>

            </div>

            {/* FORMULÁRIO */}

            <form onSubmit={cadastrarCliente}>

              <div className="grid gap-5 px-6 py-6 sm:grid-cols-2">

                {/* NOME */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Nome completo
                  </label>

                  <input
                    type="text"
                    placeholder="Digite o nome do cliente"
                    value={nome}
                    onChange={(e) =>
                      setNome(e.target.value)
                    }
                    disabled={salvando}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:bg-gray-100"
                  />

                </div>

                {/* TELEFONE */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Telefone
                  </label>

                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) =>
                      setTelefone(e.target.value)
                    }
                    disabled={salvando}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:bg-gray-100"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    E-mail
                  </label>

                  <input
                    type="email"
                    placeholder="cliente@email.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    disabled={salvando}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:bg-gray-100"
                  />

                </div>

                {/* ENDEREÇO */}

                <div className="sm:col-span-2">

                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Endereço
                  </label>

                  <input
                    type="text"
                    placeholder="Rua, número, bairro, cidade"
                    value={endereco}
                    onChange={(e) =>
                      setEndereco(e.target.value)
                    }
                    disabled={salvando}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 disabled:bg-gray-100"
                  />

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={fecharModal}
                  disabled={salvando}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-xl bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {salvando
                    ? 'Cadastrando...'
                    : 'Cadastrar cliente'}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

/*
 * ============================================================
 * COMPONENTE DO MENU
 * ============================================================
 */

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function MenuItem({
  icon,
  label,
  active = false,
}: MenuItemProps) {

  return (
    <button
      type="button"
      className={`
        flex w-full items-center gap-3 rounded-xl
        px-3 py-3 text-sm font-semibold transition
        ${
          active
            ? 'bg-brand-50 text-brand-500'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}