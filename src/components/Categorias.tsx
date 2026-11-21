
import { useEffect, useState, type FormEvent } from 'react';
import {
  Tags,
  Plus,
  Search,
  Pencil,
  Trash2,
  ArrowLeft,
  X,
} from 'lucide-react';

const API_URL = 'http://localhost:5185/api/Categorias';

interface Categoria {
  idCategoria: number;
  nome: string;
  descricao: string;
}

interface CategoriasProps {
  onVoltar: () => void;
}

const categoriaVazia = {
  nome: '',
  descricao: '',
};

export default function Categorias({ onVoltar }: CategoriasProps) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);
  const [form, setForm] = useState(categoriaVazia);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarCategorias() {
    setCarregando(true);

    try {
      const resposta = await fetch(API_URL);

      if (!resposta.ok) {
        throw new Error('Não foi possível carregar as categorias.');
      }

      const dados = await resposta.json();
      setCategorias(dados);
    } catch (erro) {
      console.error(erro);
      alert(
        'Erro ao carregar categorias. Verifique se a API está rodando na porta 5185.'
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarCategorias();
  }, []);

  function abrirCadastro() {
    setEditando(null);
    setForm(categoriaVazia);
    setModalAberto(true);
  }

  function abrirEdicao(categoria: Categoria) {
    setEditando(categoria.idCategoria);
    setForm({
      nome: categoria.nome,
      descricao: categoria.descricao ?? '',
    });
    setModalAberto(true);
  }

  async function salvarCategoria(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.nome.trim()) {
      alert('Informe o nome da categoria.');
      return;
    }

    setSalvando(true);

    const categoria = {
      idCategoria: editando ?? 0,
      nome: form.nome.trim(),
      descricao: form.descricao.trim(),
    };

    try {
      const resposta = await fetch(
        editando !== null ? `${API_URL}/${editando}` : API_URL,
        {
          method: editando !== null ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoria),
        }
      );

      if (!resposta.ok) {
        const mensagem = await resposta.text();
        throw new Error(mensagem || 'Não foi possível salvar a categoria.');
      }

      setModalAberto(false);
      setForm(categoriaVazia);
      await carregarCategorias();

      alert(
        editando !== null
          ? 'Categoria atualizada com sucesso!'
          : 'Categoria cadastrada com sucesso!'
      );
    } catch (erro) {
      console.error(erro);
      alert(
        erro instanceof Error
          ? `Erro ao salvar: ${erro.message}`
          : 'Erro ao salvar a categoria.'
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirCategoria(id: number) {
    if (!confirm('Deseja realmente excluir esta categoria?')) {
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();
        throw new Error(
          mensagem || 'Não foi possível excluir a categoria.'
        );
      }

      await carregarCategorias();
      alert('Categoria excluída com sucesso!');
    } catch (erro) {
      console.error(erro);
      alert(
        erro instanceof Error
          ? erro.message
          : 'Erro ao excluir a categoria.'
      );
    }
  }

  const categoriasFiltradas = categorias.filter((categoria) => {
    const termo = busca.toLowerCase();

    return (
      categoria.nome.toLowerCase().includes(termo) ||
      (categoria.descricao ?? '').toLowerCase().includes(termo)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onVoltar}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            title="Voltar ao painel"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Tags size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Categorias
            </h1>
            <p className="text-sm text-gray-500">
              Organize os equipamentos por categoria
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={abrirCadastro}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700"
        >
          <Plus size={18} />
          Nova categoria
        </button>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
              <Tags size={23} />
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total de categorias
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {categorias.length}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <div className="relative max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Pesquisar categoria..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {carregando ? (
            <p className="p-10 text-center text-gray-500">
              Carregando categorias...
            </p>
          ) : categoriasFiltradas.length === 0 ? (
            <div className="p-12 text-center">
              <Tags size={38} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-gray-700">
                Nenhuma categoria encontrada
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Cadastre uma categoria ou altere sua pesquisa.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {['Categoria', 'Descrição', 'Ações'].map((titulo) => (
                      <th
                        key={titulo}
                        className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
                      >
                        {titulo}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {categoriasFiltradas.map((categoria) => (
                    <tr
                      key={categoria.idCategoria}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                            <Tags size={18} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-800">
                              {categoria.nome}
                            </p>
                            <p className="text-xs text-gray-500">
                              #{categoria.idCategoria}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {categoria.descricao || '—'}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => abrirEdicao(categoria)}
                            title="Editar"
                            className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              excluirCategoria(categoria.idCategoria)
                            }
                            title="Excluir"
                            className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editando !== null ? 'Editar categoria' : 'Nova categoria'}
                </h2>
                <p className="text-sm text-gray-500">
                  Preencha os dados da categoria
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                title="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={salvarCategoria} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Nome
                </label>
                <input
                  required
                  maxLength={100}
                  value={form.nome}
                  onChange={(e) =>
                    setForm({ ...form, nome: e.target.value })
                  }
                  placeholder="Ex.: Residencial"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Descrição
                </label>
                <textarea
                  maxLength={255}
                  rows={3}
                  value={form.descricao}
                  onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                  placeholder="Descreva a categoria..."
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {salvando
                    ? 'Salvando...'
                    : editando !== null
                      ? 'Salvar alterações'
                      : 'Cadastrar categoria'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
