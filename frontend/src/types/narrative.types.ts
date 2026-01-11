// ============================================
// FILE: narrative.types.ts
// Definisce il sistema narrativo e i personaggi
// ============================================

import { FEDACSContext } from './fedacs.types';

/**
 * Profilo di un personaggio con un dilemma etico/esistenziale.
 * Corrisponde ai 4 personaggi da te identificati.
 */
export interface Character {
    id: string; // Es: 'bulimic-woman', 'politician-wife'
    name: string;
    age: number;
    /** Ruolo archetipico: "La Giovane Donna Bulimica", "La Moglie del Politico", ecc. */
    archetype: string;
    /** Background per contestualizzare la storia */
    background: string;
    /** Il conflitto centrale in una frase potente */
    coreDilemma: string;
    /** Stato iniziale delle coordinate FEDACS per questo personaggio */
    initialContext: FEDACSContext;
}

/**
 * Un momento decisivo critico nella storia del personaggio.
 * È il "punto di interazione" per l'utente.
 */
export interface DecisionPoint {
    id: string;
    /** ID del personaggio a cui appartiene questo punto decisionale */
    characterId: string;
    /** Titolo della scena: "Davanti allo specchio", "La chiamata dell'avvocato" */
    title: string;
    /** Descrizione immersiva della situazione e delle emozioni */
    situation: string;
    /** Le scelte disponibili per l'utente in questo punto */
    options: DecisionOption[];
}

/**
 * Una singola scelta che l'utente può compiere per il personaggio.
 */
export interface DecisionOption {
    id: string;
    /** Testo della scelta come viene presentata all'utente */
    text: string;
    /** Come questa scelta modifica le coordinate V, S, R, C del contesto */
    impactOnContext: Partial<FEDACSContext>;
    /** ID del prossimo punto decisionale (per storie ramificate). Null per finale. */
    nextPointId?: string | null;
    /** Anteprima breve della conseguenza di questa scelta */
    consequenceSummary: string;
}

/**
 * Rappresenta un intero scenario giocabile.
 * Contiene un personaggio e il suo albero decisionale iniziando dal primo punto.
 */
export interface NarrativeScenario {
    id: string;
    character: Character;
    /** ID del primo DecisionPoint da cui inizia la storia */
    firstDecisionPointId: string;
    /** Raccolta di tutti i punti decisionali di questo scenario */
    decisionPoints: Record<string, DecisionPoint>;
}

/**
 * Lo stato di una sessione di gioco in corso.
 */
export interface GameSession {
    scenarioId: string;
    characterId: string;
    /** Contesto FEDACS corrente, che evolve con le scelte */
    currentContext: FEDACSContext;
    /** Cronologia delle scelte fatte dall'utente */
    choiceHistory: Array<{
        decisionPointId: string;
        chosenOptionId: string;
        timestamp: Date;
    }>;
    /** ID del punto decisionale attualmente attivo */
    currentDecisionPointId: string;
}
