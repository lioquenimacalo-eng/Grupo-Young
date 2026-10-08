import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const dadosLinha = [
  { mes: "Jan", visitas: 120 },
  { mes: "Fev", visitas: 180 },
  { mes: "Mar", visitas: 150 },
  { mes: "Abr", visitas: 240 },
  { mes: "Mai", visitas: 210 },
];

const dadosPizza = [
  { name: "Venda", value: 45, color: "#3b82f6" },
  { name: "Aluguel", value: 35, color: "#10b981" },
  { name: "Arrendamento", value: 20, color: "#f97316" },
];

export default function Graficos() {
  return (
    <div className="space-y-8">
      {/* Cards de Métricas - Minimalista */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl p-6 shadow-sm ">
          <p className="text-sm text-gray-500">Total de Imóveis</p>
          <p className="text-4xl font-semibold text-slate-800 mt-2">248</p>
          <p className="text-emerald-600 text-sm mt-2 flex items-center gap-1">
            +12 este mês
          </p>
        </div>

        <div className="rounded-2xl p-6 shadow-sm ">
          <p className="text-sm text-gray-500">Leads Captados</p>
          <p className="text-4xl font-semibold text-slate-800 mt-2">184</p>
          <p className="text-emerald-600 text-sm mt-2 flex items-center gap-1">
            +23 este mês
          </p>
        </div>

        <div className=" rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Visitas no Site</p>
          <p className="text-4xl font-semibold text-slate-800 mt-2">1.284</p>
          <p className="text-emerald-600 text-sm mt-2 flex items-center gap-1">
            +8% este mês
          </p>
        </div>

        <div className=" rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Taxa de Conversão</p>
          <p className="text-4xl font-semibold text-slate-800 mt-2">14.8%</p>
          <p className="text-amber-600 text-sm mt-2 flex items-center gap-1">
            -2% este mês
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Gráfico de Linha - Visitas */}
        <div className="lg:col-span-3  rounded-xl p-6 shadow-sm ">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-800">
              Visitas no Site
            </h2>
            <span className="text-sm text-gray-500">Últimos 5 meses</span>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosLinha}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="mes" tick={{ fill: '#64748b', fontSize: 13 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 13 }} />
                <Tooltip />
                <Line
                  type="natural"
                  dataKey="visitas"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={{ r: 5, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Pizza */}
        <div className="lg:col-span-2  rounded-xl p-6 shadow-sm ">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">
            Distribuição por Tipo
          </h2>

          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosPizza}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={110}
                  dataKey="value"
                >
                  {dadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}