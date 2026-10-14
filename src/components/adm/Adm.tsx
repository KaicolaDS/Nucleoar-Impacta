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
} from 'lucide-react';

import Equipamentos from '../Equipamentos';

const API_URL = 'http://localhost:5000/api/Clientes';

interface Cliente {
  idCliente: number;
  nome: string;
  telefone: string;
  email: string;
  endereco: string;
}

type SecaoAtiva = 'dashboard' | 'clientes' | 'equipamentos';

export default function Adm() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [secaoAtiva, setSecaoAtiva] =
    useState<SecaoAtiva>('clientes');

  const [clienteEditando, setClienteEditando] =
    useState<number | null>(null);

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');

  useEffect(() => {
    void carregarClientes();
  }, []);

  async function carregarClientes() {
    try {
      setCarregando(true);

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error('Erro ao carregar clientes.');
      }

      const dados = await resposta.json();
      setClientes(dados);
    } catch (erro) {
      console.error(erro);
      alert(
        'Não foi possível carregar os clientes. Verifique se a API está funcionando.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function limparFormulario() {
    setNome('');
    setTelefone('');
    setEmail('');
    setEndereco('');
    setClienteEditando(null);
  }

  function abrirCadastro() {
    limparFormulario();
    setModalOpen(true);
  }

  function editarCliente(cliente: Cliente) {
    setClienteEditando(cliente.idCliente);
    setNome(cliente.nome ?? '');
    setTelefone(cliente.telefone ?? '');
    setEmail(cliente.email ?? '');
    setEndereco(cliente.endereco ?? '');
    setModalOpen(true);
  }

  async function salvarCliente(
    evento: React.FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();

    if (!nome.trim()) {
      alert('Informe o nome do cliente.');
      return;
    }

    const cliente = {
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      endereco: endereco.trim(),
    };

    try {
      setSalvando(true);

      const editando = clienteEditando !== null;

      const url = editando
        ? `${API_URL}/${clienteEditando}`
        : API_URL;

      const corpo = editando
        ? {
            idCliente: clienteEditando,
            ...cliente,
          }
        : cliente;

      const resposta = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(corpo),
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(
          mensagem || 'Não foi possível salvar o cliente.'
        );
      }

      setModalOpen(false);
      limparFormulario();

      await carregarClientes();

      alert(
        editando
          ? 'Cliente atualizado com sucesso!'
          : 'Cliente cadastrado com sucesso!'
      );
    } catch (erro) {
      console.error('Erro ao salvar cliente:', erro);

      alert(
        erro instanceof Error
          ? erro.message
          : 'Erro ao salvar cliente.'
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirCliente(idCliente: number) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este cliente?'
    );

    if (!confirmar) return;

    try {
      const resposta = await fetch(
        `${API_URL}/${idCliente}`,
        {
          method: 'DELETE',
        }
      );

      if (!resposta.ok) {
        const mensagem = await resposta.text();

        throw new Error(
          mensagem || 'Não foi possível excluir o cliente.'
        );
      }

      await carregarClientes();

      alert('Cliente excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao excluir cliente:', erro);

      alert(
        erro instanceof Error
          ? erro.message
          : 'Erro ao excluir cliente.'
      );
    }
  }

  const clientesFiltrados = clientes.filter((cliente) => {
    const termo = busca.toLowerCase();

    return (
      (cliente.nome ?? '').toLowerCase().includes(termo) ||
      (cliente.email ?? '').toLowerCase().includes(termo) ||
      (cliente.telefone ?? '').toLowerCase().includes(termo)
    );
  });

  if (secaoAtiva === 'equipamentos') {
    return (
      <Equipamentos
        onVoltar={() => setSecaoAtiva('clientes')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Cabeçalho mobile */}
      <div className="flex items-center justify-between border-b bg-white p-4 lg:hidden">
        <div className="flex items-center gap-2">
          <Wind className="text-sky-600" size={25} />
          <span className="text-xl font-bold">NÚCLEOAR</span>
        </div>

        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Abrir menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* Menu lateral */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 flex w-64 flex-col
            border-r border-gray-100 bg-white p-5
            transition-transform duration-200
            lg:static lg:translate-x-0
            ${
              sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full'
            }
          `}
        >
          <div className="mb-10 flex items-center gap-3 px-2">
            <div className="rounded-xl bg-sky-100 p-2 text-sky-600">
              <Wind size={27} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                NÚCLEOAR
              </h1>
              <p className="text-xs text-gray-400">
                Painel administrativo
              </p>
            </div>
          </div>

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Menu principal
          </p>

          <nav className="flex-1 space-y-2">
            <MenuItem
              icon={<LayoutDashboard size={19} />}
              label="Dashboard"
              active={secaoAtiva === 'dashboard'}
              onClick={() => {
                setSecaoAtiva('dashboard');
                setSidebarOpen(false);
              }}
            />

            <MenuItem
              icon={<Users size={19} />}
              label="Clientes"
              active={secaoAtiva === 'clientes'}
              onClick={() => {
                setSecaoAtiva('clientes');
                setSidebarOpen(false);
              }}
            />

            <MenuItem
              icon={<Wind size={19} />}
              label="Equipamentos"
              active={secaoAtiva === 'equipamentos'}
              onClick={() => {
                setSecaoAtiva('equipamentos');
                setSidebarOpen(false);
              }}
            />

            <MenuItem
              icon={<Wrench size={19} />}
              label="Serviços"
              onClick={() =>
                alert('A tela de Serviços ainda não foi implementada.')
              }
            />

            <MenuItem
              icon={<ClipboardList size={19} />}
              label="Ordens de Serviço"
              onClick={() =>
                alert(
                  'A tela de Ordens de Serviço ainda não foi implementada.'
                )
              }
            />

            <MenuItem
              icon={<UserCog size={19} />}
              label="Técnicos"
              onClick={() =>
                alert('A tela de Técnicos ainda não foi implementada.')
              }
            />
          </nav>

          <div className="border-t border-gray-100 pt-4">
            <MenuItem
              icon={<LogOut size={19} />}
              label="Sair"
              onClick={() => {
                window.location.href = '/';
              }}
            />
          </div>
        </aside>

        {/* Área principal */}
        <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
          {secaoAtiva === 'dashboard' ? (
            <section>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Dashboard
                </h2>
                <p className="mt-2 text-gray-500">
                  Bem-vindo ao painel administrativo da NÚCLEOAR.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <ResumoCard
                  titulo="Clientes cadastrados"
                  valor={clientes.length}
                  icone={<Users size={24} />}
                />

                <ResumoCard
                  titulo="Equipamentos"
                  valor="—"
                  icone={<Wind size={24} />}
                />

                <ResumoCard
                  titulo="Ordens de serviço"
                  valor="—"
                  icone={<ClipboardList size={24} />}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="text-lg font-bold">Acesso rápido</h3>

                <p className="mt-2 text-sm text-gray-500">
                  Acesse o gerenciamento de clientes ou equipamentos.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setSecaoAtiva('clientes')}
                    className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700"
                  >
                    Gerenciar clientes
                  </button>

                  <button
                    type="button"
                    onClick={() => setSecaoAtiva('equipamentos')}
                    className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold hover:bg-gray-50"
                  >
                    Gerenciar equipamentos
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <>
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Clientes
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Gerencie os clientes cadastrados no sistema.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={abrirCadastro}
                  className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700"
                >
                  <Plus size={19} />
                  Novo cliente
                </button>
              </div>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <ResumoCard
                  titulo="Total de clientes"
                  valor={clientes.length}
                  icone={<Users size={24} />}
                />

                <ResumoCard
                  titulo="Resultados da busca"
                  valor={clientesFiltrados.length}
                  icone={<Search size={24} />}
                />
              </div>

              <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      Lista de clientes
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Consulte, edite ou exclua cadastros.
                    </p>
                  </div>

                  <div className="relative w-full sm:max-w-xs">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />

                    <input
                      type="text"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      placeholder="Buscar cliente..."
                      className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Cliente</th>
                        <th className="px-6 py-4">Telefone</th>
                        <th className="px-6 py-4">E-mail</th>
                        <th className="px-6 py-4">Endereço</th>
                        <th className="px-6 py-4 text-right">Ações</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {carregando ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-gray-500"
                          >
                            Carregando clientes...
                          </td>
                        </tr>
                      ) : clientesFiltrados.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center"
                          >
                            <div className="flex flex-col items-center">
                              <Users
                                size={35}
                                className="mb-3 text-gray-300"
                              />
                              <p className="font-semibold text-gray-700">
                                Nenhum cliente encontrado
                              </p>
                              <p className="mt-1 text-gray-400">
                                Cadastre um cliente ou altere a busca.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        clientesFiltrados.map((cliente) => (
                          <tr
                            key={cliente.idCliente}
                            className="transition hover:bg-gray-50"
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-bold text-sky-700">
                                  {(cliente.nome || '?')
                                    .charAt(0)
                                    .toUpperCase()}
                                </div>
                                <span className="font-semibold text-gray-800">
                                  {cliente.nome}
                                </span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {cliente.telefone || '—'}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {cliente.email || '—'}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                              {cliente.endereco || '—'}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => editarCliente(cliente)}
                                  title="Editar cliente"
                                  aria-label="Editar cliente"
                                  className="rounded-lg p-2 text-gray-500 hover:bg-sky-50 hover:text-sky-600"
                                >
                                  <Pencil size={17} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    excluirCliente(cliente.idCliente)
                                  }
                                  title="Excluir cliente"
                                  aria-label="Excluir cliente"
                                  className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-gray-100 px-6 py-4 text-sm text-gray-500">
                  {clientesFiltrados.length}{' '}
                  {clientesFiltrados.length === 1
                    ? 'cliente exibido'
                    : 'clientes exibidos'}
                </div>
              </section>
            </>
          )}
        </main>
      </div>

      {/* Modal de cadastro e edição */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {clienteEditando !== null
                    ? 'Editar cliente'
                    : 'Novo cliente'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Preencha os dados do cliente.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setModalOpen(false);
                  limparFormulario();
                }}
                aria-label="Fechar modal"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={salvarCliente} className="space-y-4">
              <Campo
                label="Nome completo"
                valor={nome}
                alterar={setNome}
                placeholder="Nome do cliente"
                obrigatorio
              />

              <Campo
                label="Telefone"
                valor={telefone}
                alterar={setTelefone}
                placeholder="(11) 99999-9999"
              />

              <Campo
                label="E-mail"
                valor={email}
                alterar={setEmail}
                placeholder="cliente@email.com"
                tipo="email"
              />

              <Campo
                label="Endereço"
                valor={endereco}
                alterar={setEndereco}
                placeholder="Rua, número, bairro..."
              />

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    limparFormulario();
                  }}
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-3 font-semibold hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="flex-1 rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvando
                    ? 'Salvando...'
                    : clienteEditando !== null
                      ? 'Salvar alterações'
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

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function MenuItem({
  icon,
  label,
  active = false,
  onClick,
}: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-xl
        px-3 py-3 text-sm font-semibold transition
        ${
          active
            ? 'bg-sky-50 text-sky-700'
            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}

interface ResumoCardProps {
  titulo: string;
  valor: string | number;
  icone: React.ReactNode;
}

function ResumoCard({
  titulo,
  valor,
  icone,
}: ResumoCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          {titulo}
        </p>
        <div className="rounded-xl bg-sky-50 p-3 text-sky-600">
          {icone}
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900">
        {valor}
      </p>
    </div>
  );
}

interface CampoProps {
  label: string;
  valor: string;
  alterar: (valor: string) => void;
  placeholder?: string;
  tipo?: string;
  obrigatorio?: boolean;
}

function Campo({
  label,
  valor,
  alterar,
  placeholder,
  tipo = 'text',
  obrigatorio = false,
}: CampoProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={tipo}
        value={valor}
        onChange={(e) => alterar(e.target.value)}
        placeholder={placeholder}
        required={obrigatorio}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}
