import React, { useState } from 'react';
import { Briefcase, ArrowLeft, Plus, Clock, MessageSquare, Tag, AlertCircle, CheckCircle } from 'lucide-react';

interface PedidosViewProps {
  onBackToCourse: () => void;
}

interface PedidoItem {
  id: string;
  titulo: string;
  descripcion: string;
  autor: string;
  categoria: string;
  urgencia: 'Alta' | 'Media' | 'Baja';
  presupuesto: string;
  respuestasCount: number;
  creadoHace: string;
  estado: 'Abierto' | 'En proceso' | 'Completado';
}

const pedidosSeed: PedidoItem[] = [
  {
    id: '1',
    titulo: 'Busco Closer de Ventas bilingüe (Inglés/Español) para llamadas B2B',
    descripcion: 'Tenemos 25 llamadas calificadas por semana en EE.UU. y UK. Ticket promedio de $4,500 USD con comisión del 12%. Buscamos alguien con experiencia comprobable en ventas por Zoom.',
    autor: 'Martín Cabrera',
    categoria: 'Ventas',
    urgencia: 'Alta',
    presupuesto: 'Comisión 12% ($540 USD por cierre)',
    respuestasCount: 6,
    creadoHace: 'Hace 3 horas',
    estado: 'Abierto',
  },
  {
    id: '2',
    titulo: 'Necesito programador para integrar pasarela de pagos con MercadoPago y Stripe',
    descripcion: 'App en React y Node.js que requiere webhook de confirmación automática de membresías y generación de facturas electrónicas.',
    autor: 'Florencia Gómez',
    categoria: 'Desarrollo & Tech',
    urgencia: 'Media',
    presupuesto: '$500 USD pago único',
    respuestasCount: 4,
    creadoHace: 'Hace 1 día',
    estado: 'Abierto',
  },
  {
    id: '3',
    titulo: 'Buscamos socio estratégico para marca de cosmética que ya factura $20k/mes',
    descripcion: 'Queremos abrir canal de retail físico y cadenas de farmacias. Buscamos socio con experiencia en distribución o capital de expansión.',
    autor: 'Camila Villalba',
    categoria: 'Sociedad / Inversión',
    urgencia: 'Media',
    presupuesto: '% de participación a convenir',
    respuestasCount: 9,
    creadoHace: 'Hace 2 días',
    estado: 'Abierto',
  },
];

export const PedidosView: React.FC<PedidosViewProps> = ({ onBackToCourse }) => {
  const [pedidos, setPedidos] = useState<PedidoItem[]>(pedidosSeed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevaCat, setNuevaCat] = useState('Ventas');
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState('');
  const [selectedCat, setSelectedCat] = useState('Todas');

  const handleCrearPedido = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoTitulo.trim() || !nuevaDesc.trim()) return;

    const nuevo: PedidoItem = {
      id: Date.now().toString(),
      titulo: nuevoTitulo,
      descripcion: nuevaDesc,
      autor: 'Tú (Alumno IDE)',
      categoria: nuevaCat,
      urgencia: 'Alta',
      presupuesto: nuevoPresupuesto || 'A convenir',
      respuestasCount: 0,
      creadoHace: 'Recién',
      estado: 'Abierto',
    };

    setPedidos([nuevo, ...pedidos]);
    setIsModalOpen(false);
    setNuevoTitulo('');
    setNuevaDesc('');
    setNuevoPresupuesto('');
  };

  const filtered = pedidos.filter(
    (p) => selectedCat === 'Todas' || p.categoria.toLowerCase() === selectedCat.toLowerCase()
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#21180a] via-[#161224] to-[#0f0f1c] rounded-2xl border border-[#3d2f14] shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1b2f] hover:bg-[#282844] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#32324f]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Volver al curso</span>
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#fbbf24] tracking-wider">
              Muro de Oportunidades
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              Pedidos — Necesidades y Propuestas
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-black text-xs font-extrabold hover:brightness-110 transition-all shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publicar Pedido →</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-3 bg-[#121220] rounded-xl border border-[#232338]">
        {['Todas', 'Ventas', 'Desarrollo & Tech', 'Sociedad / Inversión'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
              selectedCat === cat
                ? 'bg-[#f59e0b] text-black font-bold'
                : 'bg-[#18182c] text-[#a0a0b8] hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pedidos List */}
      <div className="space-y-4">
        {filtered.map((pedido) => (
          <div
            key={pedido.id}
            className="p-5 rounded-2xl bg-[#121220] border border-[#232338] hover:border-[#f59e0b]/40 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#1e1e32] text-[#f59e0b]">
                    {pedido.categoria}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    pedido.urgencia === 'Alta' ? 'bg-[#ef4444]/20 text-[#fca5a5]' : 'bg-[#3b82f6]/20 text-[#93c5fd]'
                  }`}>
                    Urgencia {pedido.urgencia}
                  </span>
                  <span className="text-[11px] text-[#707086]">• {pedido.creadoHace}</span>
                </div>
                <h3 className="text-base font-bold text-white font-display">
                  {pedido.titulo}
                </h3>
                <div className="text-xs text-[#8e8ea3] mt-0.5">Publicado por {pedido.autor}</div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-[#10b981] bg-[#10b981]/15 px-2.5 py-1 rounded-lg border border-[#10b981]/30">
                  {pedido.presupuesto}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#c0c0d8] leading-relaxed bg-[#0d0d17] p-3 rounded-xl border border-[#1f1f32]">
              {pedido.descripcion}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#8e8ea3] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#f59e0b]" />
                {pedido.respuestasCount} propuestas enviadas
              </span>

              <button
                onClick={() => alert(`Enviando propuesta para el pedido: "${pedido.titulo}"`)}
                className="px-4 py-2 rounded-xl bg-[#1e1e32] hover:bg-[#282844] text-white text-xs font-bold transition-colors border border-[#2e2e4a]"
              >
                Enviar Propuesta
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Post New Pedido */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#141424] border border-[#2d2d48] rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white font-display">
              Publicar Nuevo Pedido al Ecosistema
            </h3>
            <p className="text-xs text-[#a0a0b8]">
              Describe con claridad tu requerimiento, el perfil que buscas y la remuneración u oferta.
            </p>

            <form onSubmit={handleCrearPedido} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#a0a0b8] font-semibold mb-1">Título del Pedido</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Busco Media Buyer para tienda online en Shopify"
                  value={nuevoTitulo}
                  onChange={(e) => setNuevoTitulo(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#1b1b30] border border-[#2b2b46] text-white focus:outline-none focus:border-[#f59e0b]"
                />
              </div>

              <div>
                <label className="block text-[#a0a0b8] font-semibold mb-1">Categoría</label>
                <select
                  value={nuevaCat}
                  onChange={(e) => setNuevaCat(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#1b1b30] border border-[#2b2b46] text-white focus:outline-none"
                >
                  <option value="Ventas">Ventas & Closer</option>
                  <option value="Desarrollo & Tech">Desarrollo & Tech</option>
                  <option value="Marketing">Marketing & Ads</option>
                  <option value="Sociedad / Inversión">Sociedad / Inversión</option>
                </select>
              </div>

              <div>
                <label className="block text-[#a0a0b8] font-semibold mb-1">Presupuesto / Retribución</label>
                <input
                  type="text"
                  placeholder="Ej: $400 USD + comisión o % de participación"
                  value={nuevoPresupuesto}
                  onChange={(e) => setNuevoPresupuesto(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#1b1b30] border border-[#2b2b46] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#a0a0b8] font-semibold mb-1">Descripción Detallada</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explica qué necesitas exactamente, plazos y requisitos..."
                  value={nuevaDesc}
                  onChange={(e) => setNuevaDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#1b1b30] border border-[#2b2b46] text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#8e8ea3] hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#f59e0b] text-black font-bold text-xs hover:bg-[#d97706]"
                >
                  Publicar Ahora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
