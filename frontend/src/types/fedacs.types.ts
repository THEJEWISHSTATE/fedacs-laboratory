// ============================================
// FILE: fedacs.types.ts
// Definisce il "motore" analitico FEDACS
// ============================================

/**
 * Le 4 coordinate fondamentali del contesto (V, S, R, C).
 * Ogni valore è normalizzato tra 0 (minimo) e 1 (massimo).
 */
export interface FEDACSContext {
    /** V: Velocità di cambiamento dell'ambiente */
    V: number;
    /** S: Irregolarità, complessità del problema */
    S: number;
    /** R: Richiesta di diversità di soluzioni */
    R: number;
    /** C: Costo di coordinamento con altri attori */
    C: number;
}

/**
 * Le due forze filosofiche in equilibrio.
 * Rappresentano il risultato del calcolo FEDACS per un dato contesto.
 */
export interface FEDACSForces {
    /** α (Alpha): Forza Esplorazione - Filosofia della Foresta */
    alpha: number; // Valore tra 0 e 1
    /** β (Beta): Forza Protezione - Filosofia della Società */
    beta: number;  // Valore tra 0 e 1
}

/**
 * Il risultato completo di un'analisi FEDACS.
 * Contiene il contesto di input, le forze calcolate e una interpretazione.
 */
export interface FEDACSAnalysis {
    id: string;
    /** Contesto (input) su cui è stata eseguita l'analisi */
    context: FEDACSContext;
    /** Forze (output) risultanti dal calcolo */
    forces: FEDACSForces;
    /** Descrizione in linguaggio naturale dell'equilibrio trovato */
    description: string;
    /** Consiglio suggerito (es.: "Serve più esplorazione (α)") */
    recommendation?: string;
}

/**
 * Calcola le forze Alpha e Beta a partire da un contesto.
 * QUESTA È LA FORMULA CORE DI FEDACS.
 * @param ctx - Il contesto con coordinate V, S, R, C
 * @returns Le forze alpha e beta calcolate
 */
export function calculateFEDACSForces(ctx: FEDACSContext): FEDACSForces {
    // Formula semplificata per l'esempio:
    // Alpha (Esplorazione) favorita da alta V e alta R
    // Beta (Protezione) favorita da alta S e alta C
    const alpha = Math.min(1, (ctx.V * 0.6 + ctx.R * 0.4) * 1.2);
    const beta = Math.min(1, (ctx.S * 0.5 + ctx.C * 0.5) * 1.2);

    // Normalizza per somma = 1 (se necessario per la visualizzazione)
    const sum = alpha + beta;
    return {
        alpha: alpha / sum,
        beta: beta / sum
    };
}
