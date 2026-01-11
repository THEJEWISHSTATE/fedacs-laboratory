// ============================================
// COMPONENT: App.tsx
// Componente radice dell'applicazione FEDACS Lab
// ============================================

import React from 'react';
import FEDACSVisualizer from './components/FEDACSVisualizer';
import { Character } from './types/narrative.types';

/**
 * Componente App principale.
 * Funge da layout di base e punto di smistamento per le varie "viste" dell'app.
 */
const App: React.FC = () => {
  // Stato per dimostrare futura integrazione con i personaggi
  const [activeView, setActiveView] = React.useState<'calculator' | 'narrative'>('calculator');

  // Dati mock per il futuro sviluppo narrativo
  const mockCharacter: Character = {
    id: 'bulimic-woman',
    name: 'Elena',
    age: 24,
    archetype: 'La Giovane Donna Bulimica',
    background: 'Studentessa di architettura, lotta con il controllo alimentare da 6 anni.',
    coreDilemma: 'Davanti allo specchio dopo un\'abbuffata: combattere il ciclo o arrendersi alla vergogna?',
    initialContext: { V: 0.6, S: 0.4, R: 0.3, C: 0.7 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header/Navigazione */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-amber-500"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FEDACS Humanized Lab</h1>
                <p className="text-sm text-gray-500">Framework per dilemmi esistenziali complessi</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <button
                onClick={() => setActiveView('calculator')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'calculator'
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                🧮 Calcolatore
              </button>
              <button
                onClick={() => setActiveView('narrative')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeView === 'narrative'
                    ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                disabled
                title="In sviluppo - presto disponibile"
              >
                🎭 Narrativa
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenuto Principale */}
      <main className="container mx-auto px-4 py-8">
        {activeView === 'calculator' ? (
          // Vista Calcolatore FEDACS
          <div className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Calcolatore Interattivo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sperimenta con le coordinate V, S, R, C per vedere come cambia l'equilibrio tra le forze
                di <span className="font-semibold text-blue-600">Esplorazione (α)</span> e{' '}
                <span className="font-semibold text-amber-600">Protezione (β)</span>.
                Questa è la base analitica che applicheremo ai personaggi narrativi.
              </p>
            </div>
            
            <FEDACSVisualizer />
            
            <div className="mt-12 max-w-3xl mx-auto bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-3">📝 Prossimi Passi</h3>
              <p className="text-gray-700 mb-4">
                Questo calcolatore è il <strong>motore analitico</strong> del laboratorio. Nelle prossime fasi
                integreremo i 4 personaggi narrativi:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div> La moglie del politico pedofilo</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Il figlio del sionista</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-500"></div> La giovane donna bulimica</li>
                <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Lo psichiatra malato terminale</li>
              </ul>
            </div>
          </div>
        ) : (
          // Vista Narrativa (placeholder per il futuro)
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-5xl mb-4">🎭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Narrativa in Sviluppo</h2>
            <p className="text-gray-600 mb-8">
              Stiamo lavorando all'integrazione degli scenari narrativi basati sui personaggi complessi.
            </p>
            <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4">
              <div className="text-2xl">👤</div>
              <div className="text-left">
                <p className="font-medium text-gray-800">{mockCharacter.archetype}</p>
                <p className="text-sm text-gray-600">{mockCharacter.coreDilemma}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              <p>
                <strong>FEDACS Lab</strong> - Un progetto di{' '}
                <a 
                  href="https://github.com/THEJEWISHSTATE" 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  THEJEWISHSTATE
                </a>
              </p>
              <p className="mt-1">Framework per l'analisi di dilemmi etici ed esistenziali complessi.</p>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://github.com/THEJEWISHSTATE/fedacs-laboratory" 
                className="text-gray-400 hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                title="Repository GitHub"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
