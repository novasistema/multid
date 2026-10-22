import React, { useState } from 'react';
import { Users, ArrowLeft, Search, Filter, CheckCircle2, MessageCircle, Star, Briefcase, MapPin } from 'lucide-react';

interface BuscadorContactosViewProps {
  onBackToCourse: () => void;
}

interface ContactoItem {
  id: string;
  nombre: string;
  especialidad: string;
  experiencia: string;
  ciudad: string;
  disponibilidad: string;
  habilidades: string[];
  casosExito: string;
  tarifaAprox: string;
}

const contactosSeed: ContactoItem[] = [
  {
    id: '1',
    nombre: 'Agustín Rivas',
    especialidad: 'Closer de Ventas High-Ticket',
    experiencia: '3 años · Más de $400k USD cerrados',
    ciudad: 'Córdoba, Argentina',
    disponibilidad: 'A comisión + fee base',
    habilidades: ['Cierre consultivo', 'Manejo de objeciones', 'Venta telefónica/Zoom', 'HubSpot & PipeDrive'],
    casosExito: 'Cerró ofertas B2B de $3,500 USD con ratio de cierre del 28%.',
    tarifaAprox: '10% a 15% por venta',
  },
  {
    id: '2',
    nombre: 'Valentina Soto',
    especialidad: 'Media Buyer Meta & TikTok Ads',
    experiencia: '4 años gestionando más de $25k USD/mes en pauta',
    ciudad: 'Lima, Perú',
    disponibilidad: 'Disponible para 2 cuentas nuevas',
    habilidades: ['Estructuras CBO/ABO', 'Creativos de respuesta directa', 'UTMs & Pixel', 'E-commerce & Leads'],
    casosExito: 'Escaló tienda de suplementos a ROAS 3.8x sostenido durante 6 meses.',
    tarifaAprox: 'Desde $500 USD/mes',
  },
  {
    id: '3',
    nombre: 'Franco Benavídez',
    especialidad: 'Automatizaciones con IA & Make / n8n',
    experiencia: 'Desarrollador certificado Make & OpenAI',
    ciudad: 'Montevideo, Uruguay',
    disponibilidad: 'Por proyecto o mensual',
    habilidades: ['Make.com', 'n8n', 'WhatsApp Cloud API', 'Webhooks & Zapier', 'LangChain'],
    casosExito: 'Automatizó onboarding y recordatorios de pago para academia con 1,200 alumnos.',
    tarifaAprox: '$40 USD/hora o $800 USD/sistema',
  },
  {
    id: '4',
    nombre: 'Elena Doménech',
    especialidad: 'Copywriter de Lanzamientos y Páginas de Venta',
    experiencia: '2 años en el Ecosistema Multi D',
    ciudad: 'Valencia, España',
    disponibilidad: 'Freelance',
    habilidades: ['Copywriting directo', 'Email Marketing secuencias', 'Storytelling', 'Ofertas irresistibles'],
    casosExito: 'Redactó secuencia de 7 correos que generó $18,400 USD en 5 días.',
    tarifaAprox: '$600 USD por landing completa',
  },
];

export const BuscadorContactosView: React.FC<BuscadorContactosViewProps> = ({ onBackToCourse }) => {
  const [contactos] = useState<ContactoItem[]>(contactosSeed);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');

  const roles = ['Todos', 'Closer de Ventas', 'Media Buyer', 'Automatizaciones', 'Copywriter'];

  const filtered = contactos.filter((c) => {
    const matchRole = selectedRole === 'Todos' || c.especialidad.toLowerCase().includes(selectedRole.toLowerCase());
    const matchSearch =
      c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.especialidad.toLowerCase().includes(search.toLowerCase()) ||
      c.habilidades.some((h) => h.toLowerCase().includes(search.toLowerCase()));
    return matchRole && matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#14122e] via-[#101024] to-[#0f0f1c] rounded-2xl border border-[#2b2756] shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1b2f] hover:bg-[#282844] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#32324f]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Volver al curso</span>
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#6366f1]/20 text-[#a5b4fc] tracking-wider">
              Talento Verificado
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              Buscador de Contactos — ¿A quién necesitás?
            </h1>
          </div>
        </div>

        <div className="text-xs text-[#a0a0b8]">
          Profesionales certificados y capacitados con la metodología de la Incubadora
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-[#121220] rounded-xl border border-[#232338]">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#8e8ea3] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Buscar por rol, habilidad (ej: Make, Closer, Ads)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#18182c] border border-[#2d2d46] text-white focus:outline-none focus:border-[#f7bd3c]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedRole === r
                  ? 'bg-[#6366f1] text-white font-bold'
                  : 'bg-[#18182c] text-[#a0a0b8] hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#121220] border border-[#232338] hover:border-[#6366f1]/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-base font-bold text-white font-display group-hover:text-[#a5b4fc] transition-colors">
                    {item.nombre}
                  </h3>
                  <div className="text-xs font-semibold text-[#f7bd3c]">{item.especialidad}</div>
                  <div className="text-[11px] text-[#8e8ea3] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {item.ciudad} • {item.experiencia}
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#10b981] bg-[#10b981]/15 px-2 py-0.5 rounded-full border border-[#10b981]/30">
                  {item.disponibilidad}
                </span>
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-1.5 my-3">
                {item.habilidades.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#1a1a2e] text-[#c0c0d8] border border-[#282842]"
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Case study */}
              <div className="p-3 bg-[#16162a] rounded-xl border border-[#24243e] text-xs space-y-1">
                <span className="font-bold text-[#a5b4fc] block text-[11px] uppercase tracking-wider">
                  ★ Caso destacado:
                </span>
                <p className="text-[#c0c0d8] leading-relaxed">{item.casosExito}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1e1e32] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#8e8ea3] block">Honorarios aproximados:</span>
                <span className="text-xs font-bold text-white">{item.tarifaAprox}</span>
              </div>

              <button
                onClick={() => alert(`Iniciando contacto con ${item.nombre}...`)}
                className="px-4 py-2 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-xs font-bold transition-colors shadow-md flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contactar Profesional</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
