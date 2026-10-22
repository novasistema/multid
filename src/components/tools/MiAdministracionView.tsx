import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Percent, 
  Upload, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  BarChart3,
  Download
} from 'lucide-react';

interface MiAdministracionViewProps {
  onBackToCourse: () => void;
}

interface MonthlyRecord {
  mes: string;
  ingresos: number;
  costosVariables: number;
  gastosFijos: number;
  gananciaNeta: number;
  margen: number;
  clientes: number;
}

const initialRecords: MonthlyRecord[] = [
  { mes: 'Enero', ingresos: 12500, costosVariables: 3200, gastosFijos: 2800, gananciaNeta: 6500, margen: 52, clientes: 24 },
  { mes: 'Febrero', ingresos: 15800, costosVariables: 4100, gastosFijos: 2850, gananciaNeta: 8850, margen: 56, clientes: 31 },
  { mes: 'Marzo', ingresos: 19400, costosVariables: 4900, gastosFijos: 3100, gananciaNeta: 11400, margen: 58, clientes: 39 },
  { mes: 'Abril', ingresos: 23600, costosVariables: 5800, gastosFijos: 3200, gananciaNeta: 14600, margen: 61, clientes: 48 },
  { mes: 'Mayo', ingresos: 28200, costosVariables: 6900, gastosFijos: 3400, gananciaNeta: 17900, margen: 63, clientes: 58 },
  { mes: 'Junio', ingresos: 34500, costosVariables: 8200, gastosFijos: 3600, gananciaNeta: 22700, margen: 65, clientes: 72 },
];

export const MiAdministracionView: React.FC<MiAdministracionViewProps> = ({ onBackToCourse }) => {
  const [records, setRecords] = useState<MonthlyRecord[]>(initialRecords);
  const [selectedMonth, setSelectedMonth] = useState<string>('Junio');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  // Totals
  const totalIngresos = records.reduce((acc, r) => acc + r.ingresos, 0);
  const totalGanancia = records.reduce((acc, r) => acc + r.gananciaNeta, 0);
  const avgMargen = Math.round(records.reduce((acc, r) => acc + r.margen, 0) / records.length);
  const latestMonth = records[records.length - 1];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner & Back */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#21090e] via-[#161224] to-[#0f0f1c] rounded-2xl border border-[#3b1520] shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1b2f] hover:bg-[#282844] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#32324f]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Volver al curso</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#f7bd3c]/20 text-[#f7bd3c] tracking-wider">
                Herramienta Exclusiva IDE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              Mi Administración — Tablero de tu Negocio
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8e1a24] to-[#6c131b] text-white text-xs font-bold cursor-pointer hover:brightness-110 transition-all border border-[#f7bd3c]/30 shadow-md">
            <Upload className="w-3.5 h-3.5 text-[#f7bd3c]" />
            <span>{uploadedFileName ? 'Reemplazar Excel' : 'Subir planilla (.xlsx / .csv)'}</span>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>

      {uploadSuccess && (
        <div className="p-3.5 rounded-xl bg-[#10b981]/15 border border-[#10b981]/40 text-[#6ee7b7] text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
          <span>¡Archivo <strong>{uploadedFileName}</strong> procesado con éxito! Se han actualizado las métricas de tu negocio.</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-[#121220] border border-[#232338]">
          <div className="flex items-center justify-between text-xs text-[#8e8ea3] mb-2 font-semibold">
            <span>Facturación del Mes</span>
            <div className="w-7 h-7 rounded-lg bg-[#7c3aed]/20 text-[#c4b5fd] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-display">
            ${latestMonth.ingresos.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-[#10b981] mt-1 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +22.3% respecto al mes anterior
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121220] border border-[#232338]">
          <div className="flex items-center justify-between text-xs text-[#8e8ea3] mb-2 font-semibold">
            <span>Ganancia Neta Real</span>
            <div className="w-7 h-7 rounded-lg bg-[#10b981]/20 text-[#6ee7b7] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#10b981] font-display">
            ${latestMonth.gananciaNeta.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-[#8e8ea3] mt-1 font-semibold">
            Margen de ganancia: <strong className="text-white">{latestMonth.margen}%</strong>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121220] border border-[#232338]">
          <div className="flex items-center justify-between text-xs text-[#8e8ea3] mb-2 font-semibold">
            <span>Clientes Activos</span>
            <div className="w-7 h-7 rounded-lg bg-[#f7bd3c]/20 text-[#f7bd3c] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-display">
            {latestMonth.clientes} clientes
          </div>
          <div className="text-[11px] text-[#8e8ea3] mt-1 font-semibold">
            Ticket promedio: <strong className="text-white">${Math.round(latestMonth.ingresos / latestMonth.clientes)} USD</strong>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#121220] border border-[#232338]">
          <div className="flex items-center justify-between text-xs text-[#8e8ea3] mb-2 font-semibold">
            <span>Acumulado Histórico</span>
            <div className="w-7 h-7 rounded-lg bg-[#8e1a24]/20 text-[#f87171] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#f7bd3c] font-display">
            ${totalGanancia.toLocaleString()} USD
          </div>
          <div className="text-[11px] text-[#8e8ea3] mt-1 font-semibold">
            En los últimos 6 meses de operación
          </div>
        </div>

      </div>

      {/* Main Analysis Chart & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visual Bar Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-[#121220] border border-[#232338] space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white font-display">
                Evolución de Ingresos vs Ganancia Neta
              </h3>
              <p className="text-xs text-[#8e8ea3]">
                Visualiza el crecimiento mensual y el control de costos de tu empresa.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-3 h-3 rounded-sm bg-[#7c3aed]"></span> Ingresos
              </span>
              <span className="flex items-center gap-1.5 text-[#10b981]">
                <span className="w-3 h-3 rounded-sm bg-[#10b981]"></span> Ganancia Neta
              </span>
            </div>
          </div>

          {/* Bars */}
          <div className="h-64 flex items-end justify-between gap-3 pt-6 border-b border-[#232338] px-2">
            {records.map((r) => {
              const maxIncome = 35000;
              const incomeHeight = (r.ingresos / maxIncome) * 100;
              const profitHeight = (r.gananciaNeta / maxIncome) * 100;
              const isSelected = r.mes === selectedMonth;

              return (
                <div
                  key={r.mes}
                  onClick={() => setSelectedMonth(r.mes)}
                  className={`flex-1 flex flex-col items-center gap-2 cursor-pointer transition-all ${
                    isSelected ? 'opacity-100 scale-105' : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="w-full flex items-end justify-center gap-1.5 h-48">
                    {/* Income bar */}
                    <div
                      className="w-1/2 bg-[#7c3aed] rounded-t-md hover:brightness-110 transition-all relative group"
                      style={{ height: `${incomeHeight}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] text-white px-1.5 py-0.5 rounded whitespace-nowrap z-20 pointer-events-none">
                        ${r.ingresos}
                      </div>
                    </div>
                    {/* Profit bar */}
                    <div
                      className="w-1/2 bg-[#10b981] rounded-t-md hover:brightness-110 transition-all relative group"
                      style={{ height: `${profitHeight}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-[10px] text-[#6ee7b7] px-1.5 py-0.5 rounded whitespace-nowrap z-20 pointer-events-none">
                        ${r.gananciaNeta}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-[#f7bd3c]' : 'text-[#8e8ea3]'}`}>
                    {r.mes.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#8e8ea3]">
            <span>Click en cualquier mes para desglosar el estado financiero.</span>
            <span className="text-[#f7bd3c] font-semibold">Mes seleccionado: {selectedMonth}</span>
          </div>
        </div>

        {/* Selected Month Details */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-[#121220] border border-[#232338] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#232338]">
              <h4 className="text-sm font-bold text-white font-display">
                Desglose: {selectedMonth}
              </h4>
              <span className="text-xs font-bold text-[#10b981]">
                Margen {records.find((r) => r.mes === selectedMonth)?.margen}%
              </span>
            </div>

            {(() => {
              const current = records.find((r) => r.mes === selectedMonth) || records[0];
              return (
                <div className="space-y-3 pt-3 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-[#18182c]">
                    <span className="text-[#a0a0be]">Ventas Brutas:</span>
                    <strong className="text-white">${current.ingresos.toLocaleString()} USD</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#18182c]">
                    <span className="text-[#a0a0be]">Costos Variables:</span>
                    <strong className="text-[#f87171]">-${current.costosVariables.toLocaleString()} USD</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#18182c]">
                    <span className="text-[#a0a0be]">Gastos Fijos / Herramientas:</span>
                    <strong className="text-[#f87171]">-${current.gastosFijos.toLocaleString()} USD</strong>
                  </div>
                  <div className="flex justify-between p-2.5 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30">
                    <span className="text-[#6ee7b7] font-bold">Ganancia de Bolsillo:</span>
                    <strong className="text-[#10b981] font-extrabold text-sm">${current.gananciaNeta.toLocaleString()} USD</strong>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#18182c]">
                    <span className="text-[#a0a0be]">Clientes del mes:</span>
                    <strong className="text-white">{current.clientes} clientes</strong>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="p-3 bg-[#0d0d16] rounded-xl border border-[#232338] text-[11px] text-[#9090a8] space-y-1">
            <div className="font-bold text-[#f7bd3c] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Consejo del Mentor:
            </div>
            <p>
              Tu estructura de costos variables se mantiene bajo el 25%. Es el momento óptimo para reinvertir un 15% en adquisición de leads en frío.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
