// ============================================
// COMPONENT: FEDACSVisualizer.tsx
// Visualizza e calcola l'equilibrio FEDACS in tempo reale
// ============================================

import React, { useState } from 'react';
import { FEDACSContext, calculateFEDACSForces } from '../types/fedacs.types';

/**
 * Componente principale per visualizzare e interagire con il calcolo FEDACS.
 * Mostra 4 slider per V, S, R, C e un grafico a barre per α e β.
 */
const FEDACSVisualizer: React.FC = () => {
    // Stato iniziale delle coordinate (valori di esempio)
    const [context, setContext] = useState<FEDACSContext>({
        V: 0.5,
        S: 0.5,
        R: 0.5,
        C: 0.5
    });

    // Calcola le forze ogni volta che il contesto cambia
    const forces = calculateFEDACSForces(context);

    /**
     * Gestisce il cambiamento di uno slider per una coordinata specifica.
     * @param coordinate - La coordinata da aggiornare ('V' | 'S' | 'R' | 'C')
     * @param value - Il nuovo valore (stringa dall'input, convertita in numero)
     */
    const handleSliderChange = (coordinate: keyof FEDACSContext, value: string) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            setContext(prev => ({
                ...prev,
                [coordinate]: numValue
            }));
        }
    };

    /**
     * Resetta tutte le coordinate al valore di default (0.5).
     */
    const handleReset = () => {
        setContext({ V: 0.5, S: 0.5, R: 0.5, C: 0.5 });
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg">
            {/* INTESTAZIONE */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Laboratorio FEDACS</h1>
                <p className="text-gray-600 mt-2">
                    Regola le coordinate qui sotto per vedere come cambia l'equilibrio tra
                    <span className="font-semibold text-blue-600"> Esplorazione (α)</span> e
                    <span className="font-semibold text-amber-600"> Protezione (β)</span>.
                </p>
            </header>

            {/* SEZIONE SLIDERS PER LE COORDINATE */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Coordinate del Contesto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(['V', 'S', 'R', 'C'] as const).map((coord) => {
                        const labels = {
                            V: { name: 'Velocità (V)', desc: 'Quanto velocemente cambia la situazione?' },
                            S: { name: 'Irregolarità (S)', desc: 'Quanto è complesso e imprevedibile il problema?' },
                            R: { name: 'Diversità (R)', desc: 'Quante soluzioni diverse sono necessarie?' },
                            C: { name: 'Coordinamento (C)', desc: 'Quanto costa accordarsi con gli altri?' }
                        };
                        return (
                            <div key={coord} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between mb-1">
                                    <label htmlFor={coord} className="font-medium text-gray-800">
                                        {labels[coord].name}
                                    </label>
                                    <span className="font-bold text-blue-700">{context[coord].toFixed(2)}</span>
                                </div>
                                <input
                                    id={coord}
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={context[coord]}
                                    onChange={(e) => handleSliderChange(coord, e.target.value)}
                                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                                />
                                <p className="text-sm text-gray-500 mt-2">{labels[coord].desc}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        ↺ Resetta tutte le coordinate a 0.5
                    </button>
                </div>
            </section>

            {/* SEZIONE VISUALIZZAZIONE RISULTATI */}
            <section>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Equilibrio Calcolato</h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* GRAFICO A BARRE ORIZZONTALI */}
                    <div className="flex-1">
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-blue-600">α - Esplorazione (Forest Philosophy)</span>
                                    <span className="font-bold">{(forces.alpha * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6">
                                    <div
                                        className="bg-blue-600 h-6 rounded-full transition-all duration-300"
                                        style={{ width: `${forces.alpha * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium text-amber-600">β - Protezione (Society Philosophy)</span>
                                    <span className="font-bold">{(forces.beta * 100).toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-6">
                                    <div
                                        className="bg-amber-600 h-6 rounded-full transition-all duration-300"
                                        style={{ width: `${forces.beta * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOX INTERPRETAZIONE TESTUALE */}
                    <div className="flex-1 bg-blue-50 p-5 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-gray-800 mb-2">📊 Interpretazione</h3>
                        <p className="text-gray-700">
                            {forces.alpha > 0.6 ? (
                                <>L'ambiente richiede <strong>forte esplorazione (α)</strong>. È il momento di cercare soluzioni nuove, sperimentare e adattarsi rapidamente.</>
                            ) : forces.beta > 0.6 ? (
                                <>L'ambiente richiede <strong>forte protezione (β)</strong>. Priorità alla stabilità, alla conservazione delle risorse e alla coordinazione.</>
                            ) : (
                                <>L'ambiente richiede un <strong>equilibrio bilanciato</strong>. Servono sia esplorazione cauta che protezione flessibile.</>
                            )}
                        </p>
                        <div className="mt-4 text-sm text-gray-600">
                            <p><strong>Formula applicata:</strong> α ≈ (V×0.6 + R×0.4); β ≈ (S×0.5 + C×0.5)</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PIÈ DI PAGINA */}
            <footer className="mt-10 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>FEDACS Lab - Framework per l'analisi decisionale in contesti complessi.</p>
                <p className="mt-1">I valori sono normalizzati tra 0 (minimo) e 1 (massimo).</p>
            </footer>
        </div>
    );
};

export default FEDACSVisualizer;
