import React, { useState } from 'react';
import { Heart, ArrowLeft, Sparkles, MessageCircle, Check, Star, Filter, MapPin, Briefcase, UserCheck } from 'lucide-react';

interface IncuMatchViewProps {
  onBackToCourse: () => void;
}

interface EntrepreneurProfile {
  id: string;
  nombre: string;
  rol: string;
  ciudad: string;
  negocio: string;
  rubro: string;
  facturacion: string;
  busca: string;
  ofrece: string;
  avatar: string;
  matchScore: number;
}

const profilesSeed: EntrepreneurProfile[] = [
  {
    id: '1',
    nombre: 'Mateo Rossi',
    rol: 'Founder & Closer B2B',
    ciudad: 'Buenos Aires, Argentina',
    negocio: 'Growth Automation para Clínicas',
    rubro: 'Servicios B2B',
    facturacion: '$14,000 USD/mes',
    busca: 'Socio técnico / Experto en automatizaciones e IA para escalar entrega.',
    ofrece: 'Pipeline comercial validado, prospección en frío y cierre de tickets $2k-$5k.',
    avatar: 'MR',
    matchScore: 98,
  },
  {
    id: '2',
    nombre: 'Camila Villalba',
    rol: 'E-commerce & Brand Director',
    ciudad: 'Santiago, Chile',
    negocio: 'Marca D2C de Cosmética Natural',
    rubro: 'E-commerce',
    facturacion: '$22,500 USD/mes',
    busca: 'Media buyer especialista en TikTok Ads y Meta Ads para escalar a México.',
    ofrece: 'Margen de producto del 72%, stock consolidado y logística lista.',
    avatar: 'CV',
    matchScore: 95,
  },
  {
    id: '3',
    nombre: 'Javier Morales',
    rol: 'Full Stack & AI Engineer',
    ciudad: 'Bogotá, Colombia',
    negocio: 'CRM especializado en inmobiliarias',
    rubro: 'Software / SaaS',
    facturacion: '$8,200 USD/mes MRR',
    busca: 'Co-founder comercial con experiencia en ventas consultivas.',
    ofrece: 'Producto con 45 clientes pagos, retención 94% y arquitectura escalable.',
    avatar: 'JM',
    matchScore: 92,
  },
  {
    id: '4',
    nombre: 'Lucía Fernández',
    rol: 'Directora de Agencia Creativa',
    ciudad: 'Madrid, España',
    negocio: 'Agencia de Contenido Orgánico & Reels',
    rubro: 'Agencia',
    facturacion: '$18,000 USD/mes',
    busca: 'Alianzas con agencias de pauta o consultores de negocio.',
    ofrece: 'Equipo de 6 editores de video top y guionistas especializados en marcas personales.',
    avatar: 'LF',
    matchScore: 89,
  },
];

export const IncuMatchView: React.FC<IncuMatchViewProps> = ({ onBackToCourse }) => {
  const [profiles, setProfiles] = useState<EntrepreneurProfile[]>(profilesSeed);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'descubrir' | 'matches'>('descubrir');
  const [filterRubro, setFilterRubro] = useState<string>('todos');

  const handleConnect = (id: string) => {
    if (!connectedIds.includes(id)) {
      setConnectedIds([...connectedIds, id]);
    }
  };

  const filtered = profiles.filter((p) => {
    if (filterRubro === 'todos') return true;
    return p.rubro.toLowerCase().includes(filterRubro.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#240a16] via-[#161224] to-[#0f0f1c] rounded-2xl border border-[#3f1628] shadow-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCourse}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#1b1b2f] hover:bg-[#282844] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#32324f]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Volver al curso</span>
          </button>
          <div>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#ec4899]/20 text-[#f472b6] tracking-wider">
              Networking Inteligente
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              IncuMatch — Conexiones y Contactos
            </h1>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 bg-[#16162a] p-1 rounded-xl border border-[#2b2b44]">
          <button
            onClick={() => setActiveTab('descubrir')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'descubrir' ? 'bg-[#ec4899] text-white' : 'text-[#8e8ea3] hover:text-white'
            }`}
          >
            Descubrir Perfiles
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              activeTab === 'matches' ? 'bg-[#ec4899] text-white' : 'text-[#8e8ea3] hover:text-white'
            }`}
          >
            <span>Mis Conexiones</span>
            <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center">
              {connectedIds.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'descubrir' && (
        <>
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-[#121220] rounded-xl border border-[#232338]">
            <span className="text-xs font-bold text-[#8e8ea3] px-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filtrar por modelo:
            </span>
            {['todos', 'B2B', 'E-commerce', 'SaaS', 'Agencia'].map((r) => (
              <button
                key={r}
                onClick={() => setFilterRubro(r)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  filterRubro === r
                    ? 'bg-[#f7bd3c] text-black font-bold'
                    : 'bg-[#18182c] text-[#a0a0b8] hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((profile) => {
              const isConnected = connectedIds.includes(profile.id);

              return (
                <div
                  key={profile.id}
                  className="rounded-2xl bg-[#121220] border border-[#232338] hover:border-[#ec4899]/50 transition-all p-5 flex flex-col justify-between space-y-4 shadow-lg group"
                >
                  <div>
                    {/* Head */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#ec4899] to-[#8b5cf6] p-[2px] flex-shrink-0">
                          <div className="w-full h-full rounded-xl bg-[#0e0e18] flex items-center justify-center font-bold text-white text-sm">
                            {profile.avatar}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white font-display">
                            {profile.nombre}
                          </h3>
                          <div className="text-xs text-[#a0a0be] font-medium">{profile.rol}</div>
                          <div className="text-[11px] text-[#707086] flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {profile.ciudad}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-extrabold text-[#10b981] bg-[#10b981]/15 px-2 py-0.5 rounded-full border border-[#10b981]/30">
                          {profile.matchScore}% Match
                        </span>
                        <div className="text-[10px] text-[#8e8ea3] mt-1 font-semibold">
                          {profile.facturacion}
                        </div>
                      </div>
                    </div>

                    {/* Business badge */}
                    <div className="p-2.5 rounded-xl bg-[#16162a] border border-[#23233c] text-xs space-y-1 mb-3">
                      <div className="font-semibold text-[#f7bd3c] flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" /> {profile.negocio}
                      </div>
                      <div className="text-[11px] text-[#8e8ea3]">
                        Rubro: <strong className="text-white">{profile.rubro}</strong>
                      </div>
                    </div>

                    {/* Needs & Offers */}
                    <div className="space-y-2 text-xs">
                      <div className="bg-[#181828] p-2.5 rounded-lg border border-[#27273c]">
                        <span className="font-bold text-[#ec4899] block mb-0.5 text-[11px] uppercase tracking-wider">
                          🔍 Qué busca:
                        </span>
                        <p className="text-[#c0c0d8] leading-relaxed">{profile.busca}</p>
                      </div>

                      <div className="bg-[#181828] p-2.5 rounded-lg border border-[#27273c]">
                        <span className="font-bold text-[#10b981] block mb-0.5 text-[11px] uppercase tracking-wider">
                          💼 Qué ofrece:
                        </span>
                        <p className="text-[#c0c0d8] leading-relaxed">{profile.ofrece}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleConnect(profile.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border ${
                        isConnected
                          ? 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/40'
                          : 'bg-[#ec4899] text-white border-[#ec4899] hover:brightness-110 shadow-md shadow-[#ec4899]/20'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>¡Conectado! Chat Habilitado</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 fill-white" />
                          <span>Conectar con {profile.nombre.split(' ')[0]}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'matches' && (
        <div className="p-6 bg-[#121220] rounded-2xl border border-[#232338]">
          <h3 className="text-base font-bold text-white font-display mb-4">
            Emprendedores con los que has conectado ({connectedIds.length})
          </h3>

          {connectedIds.length > 0 ? (
            <div className="divide-y divide-[#1e1e32]">
              {profiles
                .filter((p) => connectedIds.includes(p.id))
                .map((m) => (
                  <div key={m.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#ec4899] flex items-center justify-center font-bold text-white text-xs">
                        {m.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{m.nombre}</div>
                        <div className="text-xs text-[#a0a0b8]">{m.negocio} • {m.ciudad}</div>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1e1e32] hover:bg-[#2a2a44] text-[#f7bd3c] text-xs font-bold transition-colors border border-[#343450] self-start sm:self-auto">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Abrir Mensaje Directo</span>
                    </button>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#8e8ea3] text-xs">
              Aún no has conectado con emprendedores. Explora los perfiles en la pestaña "Descubrir Perfiles" para iniciar alianzas.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
