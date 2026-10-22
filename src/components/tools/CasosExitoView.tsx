import React, { useState } from 'react';
import { Star, ArrowLeft, TrendingUp, Award, Quote, CheckCircle2, Video, DollarSign, Calendar } from 'lucide-react';

interface CasosExitoViewProps {
  onBackToCourse: () => void;
}

interface CasoItem {
  id: string;
  nombre: string;
  negocio: string;
  nicho: string;
  facturacionInicial: string;
  facturacionActual: string;
  tiempo: string;
  historia: string;
  leccionClave: string;
  logroDestacado: string;
  avatar: string;
}

const casosSeed: CasoItem[] = [
  {
    id: '1',
    nombre: 'Tomás Romero',
    negocio: 'Growth Pipeline B2B',
    nicho: 'Agencia de Prospección en Frío',
    facturacionInicial: '$0 USD/mes',
    facturacionActual: '$14,800 USD/mes',
    tiempo: '4 meses en la Incubadora',
    historia: 'Había probado cursos de marketing genéricos sin resultados. Con el módulo de "Vender en Frío" de la Incubadora entendí cómo estructurar una oferta de alto valor y prospectar 50 cuentas ideales por día.',
    leccionClave: 'Módulo 4: Vender en Frío y el Mapa de Negocios.',
    logroDestacado: 'Primer contrato de $3,500 USD cerrado en solo 18 días.',
    avatar: 'TR',
  },
  {
    id: '2',
    nombre: 'Belén Morales',
    negocio: 'Consultoría para Odontólogos',
    nicho: 'Servicios Profesionales',
    facturacionInicial: '$800 USD/mes',
    facturacionActual: '$9,200 USD/mes',
    tiempo: '3 meses en la Incubadora',
    historia: 'Tenía miedo a cobrar caro. Apliqué la sesión de Éxito Personal y reestructuré mi propuesta con garantía condicional. Pasé de cobrar $200 a paquetes de $1,800 USD por clínica.',
    leccionClave: 'Módulo 1: Éxito Personal y Eliminación de Creencias Limitantes.',
    logroDestacado: '5 clientes nuevos cerrados en su primer lanzamiento.',
    avatar: 'BM',
  },
  {
    id: '3',
    nombre: 'Matías Krasnov',
    negocio: 'StockBot - MicroSaaS para E-commerce',
    nicho: 'Software & Automatización',
    facturacionInicial: '$0 USD/mes',
    facturacionActual: '$8,400 USD MRR',
    tiempo: '5 meses en la Incubadora',
    historia: 'Construía código sin validar si alguien pagaría. Gracias al taller de "Existir y Validar", vendí la solución a 8 tiendas en preventa antes de escribir una sola línea de código definitiva.',
    leccionClave: 'Módulo de Validación Rápida y Vender a Conocidos.',
    logroDestacado: '64 suscriptores recurrentes activos con 93% retención.',
    avatar: 'MK',
  },
];

export const CasosExitoView: React.FC<CasosExitoViewProps> = ({ onBackToCourse }) => {
  const [casos] = useState<CasoItem[]>(casosSeed);
  const [isPostularOpen, setIsPostularOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#211608] via-[#1a1024] to-[#0f0f1c] rounded-2xl border border-[#3b2910] shadow-xl">
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
              Resultados Reales
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-0.5">
              Casos de Éxito — Logros Verificados
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsPostularOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8e1a24] to-[#6c131b] text-white text-xs font-bold hover:brightness-110 transition-all border border-[#f7bd3c]/30 shadow-md self-start sm:self-auto"
        >
          <Star className="w-3.5 h-3.5 text-[#f7bd3c]" />
          <span>★ Postularme como caso de éxito</span>
        </button>
      </div>

      {/* Grid of Case Studies */}
      <div className="space-y-6">
        {casos.map((caso) => (
          <div
            key={caso.id}
            className="p-6 rounded-2xl bg-[#121220] border border-[#232338] hover:border-[#f7bd3c]/40 transition-all space-y-4 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#232338]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f7bd3c] to-[#d97706] p-[2px] flex-shrink-0">
                  <div className="w-full h-full rounded-xl bg-[#121220] flex items-center justify-center font-bold text-[#f7bd3c] text-sm">
                    {caso.avatar}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {caso.nombre}
                  </h3>
                  <div className="text-xs text-[#a0a0be]">{caso.negocio} • {caso.nicho}</div>
                  <div className="text-[11px] text-[#707086] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" /> {caso.tiempo}
                  </div>
                </div>
              </div>

              {/* Metric Badge */}
              <div className="flex items-center gap-3 bg-[#18182c] px-4 py-2.5 rounded-xl border border-[#282842]">
                <div className="text-right">
                  <div className="text-[10px] text-[#8e8ea3] font-semibold">Antes: {caso.facturacionInicial}</div>
                  <div className="text-base font-black text-[#10b981] flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> {caso.facturacionActual}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="p-4 rounded-xl bg-[#0e0e18] border border-[#202034] text-xs text-[#d0d0e8] leading-relaxed italic relative">
              <Quote className="w-5 h-5 text-[#f7bd3c]/20 absolute right-3 top-3" />
              "{caso.historia}"
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#16162a] rounded-xl border border-[#24243e]">
                <span className="font-bold text-[#f7bd3c] block text-[11px] uppercase tracking-wider mb-0.5">
                  Módulo clave aplicado:
                </span>
                <span className="text-white font-medium">{caso.leccionClave}</span>
              </div>

              <div className="p-3 bg-[#16162a] rounded-xl border border-[#24243e]">
                <span className="font-bold text-[#10b981] block text-[11px] uppercase tracking-wider mb-0.5">
                  Logro destacado:
                </span>
                <span className="text-white font-medium">{caso.logroDestacado}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal postulación */}
      {isPostularOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#141424] border border-[#2d2d48] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-white font-display">
              ★ Postular mi Caso de Éxito
            </h3>
            <p className="text-[#a0a0b8]">
              ¿Validaste tu negocio, aumentaste tus ventas o automatizaste tus procesos con la Incubadora? Compártelo para inspirar a la comunidad y tener visibilidad ante mentores.
            </p>
            <input
              type="text"
              placeholder="¿Cuánto facturas actualmente?"
              className="w-full p-2.5 rounded-xl bg-[#1b1b30] border border-[#2b2b46] text-white focus:outline-none"
            />
            <textarea
              rows={4}
              placeholder="Resume tu avance y qué módulos de la Incubadora te ayudaron más..."
              className="w-full p-2.5 rounded-xl bg-[#1b1b30] border border-[#2b2b46] text-white focus:outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsPostularOpen(false)}
                className="px-4 py-2 rounded-xl text-[#8e8ea3] hover:text-white"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  alert('¡Postulación enviada a los mentores de la Incubadora con éxito!');
                  setIsPostularOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#f7bd3c] text-black font-bold"
              >
                Enviar Postulación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
