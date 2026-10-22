import React, { useState } from 'react';
import { ShoppingBag, ArrowLeft, Search, Tag, ExternalLink, Star, ShieldCheck, MessageSquare } from 'lucide-react';

interface IncuMarketViewProps {
  onBackToCourse: () => void;
}

interface MarketItem {
  id: string;
  negocio: string;
  fundador: string;
  categoria: string;
  tituloOferta: string;
  descripcion: string;
  descuentoIDE: string;
  precioNormal: string;
  precioAlumnos: string;
  webUrl: string;
  rating: number;
}

const marketSeed: MarketItem[] = [
  {
    id: '1',
    negocio: 'ColdOutreach Pro',
    fundador: 'Ignacio Peralta (Alumno IDE #14)',
    categoria: 'Software',
    tituloOferta: 'Sistema automatizado de prospección B2B en LinkedIn y Email',
    descripcion: 'Configuración llave en mano de dominios, calentamiento de casillas y secuencias de prospección con IA personalizada.',
    descuentoIDE: '30% OFF permanente',
    precioNormal: '$650 USD/mes',
    precioAlumnos: '$450 USD/mes',
    webUrl: 'https://coldoutreachpro.example.com',
    rating: 4.9,
  },
  {
    id: '2',
    negocio: 'VisualHooks Studio',
    fundador: 'Sofía Benítez (Alumna IDE #08)',
    categoria: 'Marketing',
    tituloOferta: 'Pack de 20 Creativos y Reels de Alta Conversión para Ads',
    descripcion: 'Diseño enfocado 100% en retorno publicitario. Guionizado, ganchos visuales y edición con subtítulos dinámicos.',
    descuentoIDE: '2x1 en primer mes',
    precioNormal: '$900 USD',
    precioAlumnos: '$490 USD',
    webUrl: 'https://visualhooks.example.com',
    rating: 5.0,
  },
  {
    id: '3',
    negocio: 'LegalStartup Global',
    fundador: 'Esteban Cárdenas (Alumno IDE #22)',
    categoria: 'Legal & Fiscal',
    tituloOferta: 'Apertura de LLC en EE.UU. + Cuenta Stripe Internacional',
    descripcion: 'Asesoramiento tributario para emprendedores digitales que venden servicios a clientes de todo el mundo sin trabas cambiarias.',
    descuentoIDE: 'Descuento $150 USD',
    precioNormal: '$750 USD',
    precioAlumnos: '$600 USD',
    webUrl: 'https://legalstartup.example.com',
    rating: 4.8,
  },
  {
    id: '4',
    negocio: 'FunnelsFlow',
    fundador: 'Lucas Domínguez (Alumno IDE #03)',
    categoria: 'Software',
    tituloOferta: 'Plantillas de Landing Pages de Alta Conversión listas en Framer',
    descripcion: 'Diseñadas bajo la estructura de ventas de la Incubadora: promesa clara, propuesta de valor, prueba social y llamado a la acción.',
    descuentoIDE: 'Gratis para miembros',
    precioNormal: '$180 USD',
    precioAlumnos: '$0 USD',
    webUrl: 'https://funnelsflow.example.com',
    rating: 4.9,
  },
];

export const IncuMarketView: React.FC<IncuMarketViewProps> = ({ onBackToCourse }) => {
  const [items] = useState<MarketItem[]>(marketSeed);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('Todas');

  const categories = ['Todas', 'Software', 'Marketing', 'Legal & Fiscal'];

  const filtered = items.filter((item) => {
    const matchCat = selectedCat === 'Todas' || item.categoria === selectedCat;
    const matchSearch =
      item.negocio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tituloOferta.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#211608] via-[#161224] to-[#0f0f1c] rounded-2xl border border-[#3d2910] shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1b2f] hover:bg-[#282844] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#32324f]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Volver al curso</span>
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#f7bd3c]/20 text-[#f7bd3c] tracking-wider">
              Mercado de Alumnos
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              IncuMarket — Negocios del Ecosistema
            </h1>
          </div>
        </div>

        <div className="text-xs text-[#a0a0b8] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#10b981]" />
          <span>Beneficios y tarifas preferenciales entre miembros</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-[#121220] rounded-xl border border-[#232338]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#8e8ea3] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar negocios, herramientas o servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#18182c] border border-[#2d2d46] text-white focus:outline-none focus:border-[#f7bd3c]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedCat === cat
                  ? 'bg-[#f7bd3c] text-black font-bold'
                  : 'bg-[#18182c] text-[#a0a0b8] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Market Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#121220] border border-[#232338] hover:border-[#f7bd3c]/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#1e1e32] text-[#f7bd3c]">
                    {item.categoria}
                  </span>
                  <h3 className="text-base font-bold text-white font-display mt-1.5 group-hover:text-[#f7bd3c] transition-colors">
                    {item.negocio}
                  </h3>
                  <div className="text-[11px] text-[#8e8ea3]">{item.fundador}</div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-[#f7bd3c] bg-[#f7bd3c]/15 px-2 py-0.5 rounded-full border border-[#f7bd3c]/30 flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {item.descuentoIDE}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#f59e0b] justify-end mt-1 font-bold">
                    <Star className="w-3 h-3 fill-current" /> {item.rating}
                  </div>
                </div>
              </div>

              <h4 className="text-xs font-bold text-[#d8d8ea] mt-2 mb-1">
                {item.tituloOferta}
              </h4>
              <p className="text-xs text-[#a0a0b8] leading-relaxed">
                {item.descripcion}
              </p>
            </div>

            <div className="pt-3 border-t border-[#1e1e32] flex items-center justify-between">
              <div>
                <span className="text-[10px] line-through text-[#666680] block">
                  Normal: {item.precioNormal}
                </span>
                <span className="text-sm font-black text-[#10b981]">
                  IDE: {item.precioAlumnos}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Conectando con el fundador de ${item.negocio}...`)}
                  className="px-3.5 py-2 rounded-xl bg-[#1e1e32] hover:bg-[#282844] text-white text-xs font-bold transition-colors border border-[#2d2d48] flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#f7bd3c]" />
                  <span>Contactar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
