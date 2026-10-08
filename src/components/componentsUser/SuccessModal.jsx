import { CheckCircle2, X, Mail } from "lucide-react";

export default function SuccessModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 relative
                   animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center gap-3 pt-2">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7 text-green-600" />
          </div>

          <h2 className="text-lg font-semibold text-slate-900">Obrigado!</h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            Em breve, a nossa equipa entrará em contacto por e-mail para
            agendar a visita ao imóvel solicitado. Pedimos que mantenha
            atenção à sua caixa de entrada nos próximos dias.
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Verifique também a pasta de spam</span>
          </div>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-lg bg-slate-900 text-white text-sm font-medium py-2.5
                       hover:bg-slate-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}