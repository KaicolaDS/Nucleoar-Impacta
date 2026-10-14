import { useEffect, useState, type FormEvent } from 'react';
import {
  Wind,
  Plus,
  Search,
  Pencil,
  Trash2,
  ArrowLeft,
  X,
  Snowflake,
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

interface Cliente {
  idCliente: number;
  nome: string;
}

interface Equipamento {
  idEquipamento: number;
  idCliente: number;
  marca: string;
  modelo: string;
  tipo: string;
  btus: number;
  cliente?: Cliente | null;
}

interface EquipamentosProps {
  onVoltar: () => void;
}

const equipamentoVazio = {
  idCliente: '',
  marca: '',
  modelo: '',
  tipo: 'Split',
  btus: '',
};

export default function Equipamentos({
  onVoltar,
}: EquipamentosProps) {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);
  const [form, setForm] = useState(equipamentoVazio);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarDados() {
    setCarregando(true);

    try {
      const [resEquipamentos, resClientes] = await Promise.all([
        fetch(`${API_URL}/Equipamentos`),
        fetch(`${API_URL}/Clientes`),
      ]);

      if (!resEquipamentos.ok || !resClientes.ok) {
        throw new Error('Não foi possível carregar os dados.');
      }

      const dadosEquipamentos = await resEquipamentos.json();
      const dadosClientes = await resClientes.json();

      setEquipamentos(dadosEquipamentos);
      setClientes(
        dadosClientes.map((c: any) => ({
          idCliente: c.idCliente ?? c.id,
          nome: c.nome,
        }))
      );
    } catch (erro) {
      console.error(erro);
      alert(
        'Erro ao carregar os dados. Verifique se a API está rodando na porta 5000.'
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function abrirCadastro() {
    setEditando(null);
    setForm(equipamentoVazio);
    setModalAberto(true);
  }

  function abrirEdicao(equipamento: Equipamento) {
    setEditando(equipamento.idEquipamento);
    setForm({
      idCliente: String(equipamento.idCliente),
      marca: equipamento.marca,
      modelo: equipamento.modelo,
      tipo: equipamento.tipo,
      btus: String(equipamento.btus),
    });
    setModalAberto(true);
  }

  async function salvarEquipamento(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.idCliente) {
      alert('Selecione um cliente.');
      return;
    }

    setSalvando(true);

    const equipamento = {
      idEquipamento: editando ?? 0,
      idCliente: Number(form.idCliente),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      tipo: form.tipo,
      btus: Number(form.btus),
    };

    try {
      const resposta = await fetch(
        editando
          ? `${API_URL}/Equipamentos/${editando}`
          : `${API_URL}/Equipamentos`,
        {
          method: editando ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(equipamento),
        }
      );

      if (!resposta.ok) {
        const erro = await resposta.text();
        throw new Error(erro || 'Não foi possível salvar o equipamento.');
      }

      setModalAberto(false);
      setForm(equipamentoVazio);
      await carregarDados();
      alert(editando ? 'Equipamento atualizado!' : 'Equipamento cadastrado!');
    } catch (erro) {
      console.error(erro);
      alert(
        erro instanceof Error
          ? `Erro ao salvar: ${erro.message}`
          : 'Erro ao salvar o equipamento.'
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirEquipamento(id: number) {
    if (!confirm('Deseja realmente excluir este equipamento?')) {
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/Equipamentos/${id}`, {
        method: 'DELETE',
      });

      if (!resposta.ok) {
        throw new Error('Não foi possível excluir o equipamento.');
      }

      await carregarDados();
    } catch (erro) {
      console.error(erro);
      alert('Erro ao excluir o equipamento.');
    }
  }

  const equipamentosFiltrados = equipamentos.filter((equipamento) => {
    const termo = busca.toLowerCase();

    return (
      equipamento.marca.toLowerCase().includes(termo) ||
      equipamento.modelo.toLowerCase().includes(termo) ||
      equipamento.tipo.toLowerCase().includes(termo) ||
      (equipamento.cliente?.nome ?? '').toLowerCase().includes(termo)
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
            title="Voltar para clientes"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
            <Wind size={23} />
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Equipamentos
            </h1>
            <p className="text-sm text-gray-500">
              Gerencie os aparelhos de ar-condicionado
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={abrirCadastro}
          className="flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700"
        >
          <Plus size={18} />
          Novo equipamento
        </button>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-sky-100 p-3 text-sky-600">
                <Snowflake size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Total de equipamentos
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {equipamentos.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                <Wind size={23} />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Clientes cadastrados
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  {clientes.length}
                </p>
              </div>
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
                placeholder="Pesquisar por marca, modelo ou cliente..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {carregando ? (
            <p className="p-10 text-center text-gray-500">
              Carregando equipamentos...
            </p>
          ) : equipamentosFiltrados.length === 0 ? (
            <div className="p-12 text-center">
              <Wind size={38} className="mx-auto mb-3 text-gray-300" />
              <p className="font-semibold text-gray-700">
                Nenhum equipamento encontrado
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Cadastre um equipamento ou altere sua pesquisa.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    {['Equipamento', 'Tipo', 'BTUs', 'Cliente', 'Ações'].map(
                      (titulo) => (
                        <th
                          key={titulo}
                          className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-gray-500"
                        >
                          {titulo}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {equipamentosFiltrados.map((equipamento) => (
                    <tr
                      key={equipamento.idEquipamento}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                            <Wind size={19} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {equipamento.marca}
                            </p>
                            <p className="text-xs text-gray-500">
                              {equipamento.modelo} · #
                              {equipamento.idEquipamento}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {equipamento.tipo}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {equipamento.btus.toLocaleString('pt-BR')} BTUs
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {equipamento.cliente?.nome ??
                          clientes.find(
                            (c) => c.idCliente === equipamento.idCliente
                          )?.nome ??
                          `Cliente #${equipamento.idCliente}`}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => abrirEdicao(equipamento)}
                            title="Editar"
                            className="rounded-lg p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={17} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              excluirEquipamento(equipamento.idEquipamento)
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
                  {editando ? 'Editar equipamento' : 'Novo equipamento'}
                </h2>
                <p className="text-sm text-gray-500">
                  Preencha os dados do aparelho
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

            <form onSubmit={salvarEquipamento} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Cliente
                </label>
                <select
                  required
                  value={form.idCliente}
                  onChange={(e) =>
                    setForm({ ...form, idCliente: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-sky-500"
                >
                  <option value="">Selecione um cliente</option>
                  {clientes.map((cliente) => (
                    <option
                      key={cliente.idCliente}
                      value={cliente.idCliente}
                    >
                      {cliente.nome}
                    </option>
                  ))}
                </select>

                {clientes.length === 0 && (
                  <p className="mt-1 text-xs text-red-500">
                    Cadastre um cliente antes de cadastrar um equipamento.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Marca
                </label>
                <input
                  required
                  maxLength={100}
                  value={form.marca}
                  onChange={(e) =>
                    setForm({ ...form, marca: e.target.value })
                  }
                  placeholder="Ex.: Samsung"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Modelo
                </label>
                <input
                  required
                  maxLength={100}
                  value={form.modelo}
                  onChange={(e) =>
                    setForm({ ...form, modelo: e.target.value })
                  }
                  placeholder="Ex.: WindFree"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Tipo de equipamento
                </label>
                <select
                  required
                  value={form.tipo}
                  onChange={(e) =>
                    setForm({ ...form, tipo: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-sky-500"
                >
                  <option value="Split">Split</option>
                  <option value="Multi Split">Multi Split</option>
                  <option value="Cassete">Cassete</option>
                  <option value="Piso Teto">Piso Teto</option>
                  <option value="Janela">Janela</option>
                  <option value="VRF">VRF</option>
                  <option value="Chiller">Chiller</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Capacidade (BTUs)
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  step="1"
                  value={form.btus}
                  onChange={(e) =>
                    setForm({ ...form, btus: e.target.value })
                  }
                  placeholder="Ex.: 12000"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-sky-500"
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
                  disabled={salvando || clientes.length === 0}
                  className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {salvando
                    ? 'Salvando...'
                    : editando
                      ? 'Salvar alterações'
                      : 'Cadastrar equipamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
