
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Search,
  Pencil,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';

const API_URL = 'http://localhost:5185/api/Servicos';

interface Servico {
  idServico: number;
  nome: string;
  descricao: string;
  valor: number;
}

interface ServicosProps {
  onVoltar: () => void;
}

export default function Servicos({ onVoltar }: ServicosProps) {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState('');

  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    void carregarServicos();
  }, []);

  async function carregarServicos() {
    try {
      setCarregando(true);

      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error('Erro ao carregar serviços.');
      }

      const dados = await resposta.json();
      setServicos(dados);
    } catch (erro) {
      console.error(erro);
      alert(
        'Não foi possível carregar os serviços. Verifique se a API está funcionando.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function limparFormulario() {
    setNome('');
    setDescricao('');
    setValor('');
    setIdEditando(null);
  }

  function abrirCadastro() {
    limparFormulario();
    setModalAberto(true);
  }

  function editarServico(servico: Servico) {
    setIdEditando(servico.idServico);
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setValor(String(servico.valor).replace('.', ','));
    setModalAberto(true);
  }

  async function salvarServico(
    evento: React.FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();

    if (!nome.trim()) {
      alert('Informe o nome do serviço.');
      return;
    }

    if (!descricao.trim()) {
      alert('Informe a descrição do serviço.');
      return;
    }

    const valorNumerico = Number(valor.replace(',', '.'));

    if (!Number.isFinite(valorNumerico) || valorNumerico < 0) {
      alert('Informe um valor válido para o serviço.');
      return;
    }

    const servico = {
      nome: nome.trim(),
      descricao: descricao.trim(),
      valor: valorNumerico,
    };

    const editando = idEditando !== null;

    try {
      setSalvando(true);

      const url = editando
        ? `${API_URL}/${idEditando}`
        : API_URL;

      const corpo = editando
        ? {
            idServico: idEditando,
            ...servico,
          }
        : servico;

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
          mensagem || 'Não foi possível salvar o serviço.'
        );
      }

      setModalAberto(false);
      limparFormulario();

      await carregarServicos();

      alert(
        editando
          ? 'Serviço atualizado com sucesso!'
          : 'Serviço cadastrado com sucesso!'
      );
    } catch (erro) {
      console.error('Erro ao salvar serviço:', erro);

      alert(
        erro instanceof Error
          ? erro.message
          : 'Erro ao salvar serviço.'
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirServico(idServico: number) {
    const confirmar = window.confirm(
      'Deseja realmente excluir este serviço?'
    );

    if (!confirmar) return;

    try {
      const resposta = await fetch(`${API_URL}/${idServico}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();
        throw new Error(
          mensagem || 'Não foi possível excluir o serviço.'
        );
      }

      await carregarServicos();
      alert('Serviço excluído com sucesso!');
    } catch (erro) {
      console.error('Erro ao excluir serviço:', erro);

      alert(
        erro instanceof Error
          ? erro.message
          : 'Erro ao excluir serviço.'
      );
    }
  }

  const servicosFiltrados = servicos.filter((servico) => {
    const termo = busca.toLowerCase();

    return (
      servico.nome.toLowerCase().includes(termo) ||
      servico.descricao.toLowerCase().includes(termo)
    );
  });

  function formatarValor(valor: number) {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5 text-gray-800 sm:p-8 lg:p-10">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            type="button"
            onClick={onVoltar}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-sky-600"
          >
            <ArrowLeft size={18} />
            Voltar ao painel
          </button>

          <h2 className="text-3xl font-bold text-gray-900">
            Serviços
          </h2>

          <p className="mt-2 text-gray-500">
            Gerencie os serviços oferecidos pela NÚCLEOAR.
          </p>
        </div>

        <button
          type="button"
          onClick={abrirCadastro}
          className="flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          <Plus size={19} />
          Novo serviço
        </button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <ResumoCard
          titulo="Total de serviços"
          valor={servicos.length}
          icone={<Wrench size={24} />}
        />

        <ResumoCard
          titulo="Resultados da busca"
          valor={servicosFiltrados.length}
          icone={<Search size={24} />}
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold">
              Lista de serviços
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Consulte, edite ou exclua serviços cadastrados.
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
              placeholder="Buscar serviço..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4">Serviço</th>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Valor</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {carregando ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Carregando serviços...
                  </td>
                </tr>
              ) : servicosFiltrados.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <Wrench
                        size={35}
                        className="mb-3 text-gray-300"
                      />

                      <p className="font-semibold text-gray-700">
                        Nenhum serviço encontrado
                      </p>

                      <p className="mt-1 text-gray-400">
                        Cadastre um serviço ou altere a busca.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                servicosFiltrados.map((servico) => (
                  <tr
                    key={servico.idServico}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                          <Wrench size={19} />
                        </div>

                        <span className="font-semibold text-gray-800">
                          {servico.nome}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {servico.descricao}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {formatarValor(servico.valor)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => editarServico(servico)}
                          title="Editar serviço"
                          aria-label="Editar serviço"
                          className="rounded-lg p-2 text-gray-500 hover:bg-sky-50 hover:text-sky-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            excluirServico(servico.idServico)
                          }
                          title="Excluir serviço"
                          aria-label="Excluir serviço"
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
          {servicosFiltrados.length}{' '}
          {servicosFiltrados.length === 1
            ? 'serviço exibido'
            : 'serviços exibidos'}
        </div>
      </section>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">
                  {idEditando !== null
                    ? 'Editar serviço'
                    : 'Novo serviço'}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Preencha os dados do serviço.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setModalAberto(false);
                  limparFormulario();
                }}
                aria-label="Fechar modal"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={salvarServico} className="space-y-4">
              <Campo
                label="Nome do serviço"
                valor={nome}
                alterar={setNome}
                placeholder="Ex.: Instalação de ar-condicionado"
                obrigatorio
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Descrição
                </label>

                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Descreva o serviço..."
                  required
                  maxLength={255}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              </div>

              <Campo
                label="Valor (R$)"
                valor={valor}
                alterar={setValor}
                placeholder="Ex.: 150,00"
                tipo="number"
                obrigatorio
              />

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setModalAberto(false);
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
                    : idEditando !== null
                      ? 'Salvar alterações'
                      : 'Cadastrar serviço'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
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
        min={tipo === 'number' ? '0' : undefined}
        step={tipo === 'number' ? '0.01' : undefined}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
      />
    </div>
  );
}
