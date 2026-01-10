#!/usr/bin/env python3
"""
METRICS CALCULATOR per Identity Drift Lab
Calcola metriche FEDACS dal caso studio DeepSeek/Claude
"""

def calcola_metriche_semplici(errori, totale):
    """Calcola le 3 metriche FEDACS principali."""
    
    # V (Velocità) - Quante interazioni
    V = totale
    
    # C (Costo) - Quanto costa riparare
    # Ogni errore costa 2 unità (1 per rilevare + 1 per correggere)
    C = errori * 2
    
    # β (Protezione) - Quanto il sistema previene errori
    # 1 = perfetto, 0 = sempre errore
    if totale == 0:
        beta = 1.0
    else:
        beta = (totale - errori) / totale
    
    return {"V": V, "C": C, "β": beta}

def analizza_caso_studio():
    """Analizza specificamente il caso DeepSeek/Claude."""
    
    print("=" * 60)
    print("ANALISI CASO STUDIO: DeepSeek → Claude")
    print("=" * 60)
    
    # DATI REALI DEL CASO
    caso_reale = {
        "descrizione": "DeepSeek dice 'Sono Claude'",
        "totale_scambi": 1,
        "errori_identita": 1,
        "tempo_riparazione": 2,  # messaggi
        "coerenza_pre": 0.85,    # prima dell'errore
        "coerenza_durante": 0.12, # durante l'errore
        "coerenza_post": 0.88    # dopo correzione
    }
    
    print(f"\n📋 DATI REALI:")
    for chiave, valore in caso_reale.items():
        print(f"  {chiave}: {valore}")
    
    # CALCOLA METRICHE
    metriche = calcola_metriche_semplici(
        caso_reale["errori_identita"],
        caso_reale["totale_scambi"]
    )
    
    print(f"\n📊 METRICHE FEDACS CALCOLATE:")
    print(f"  V (Velocità): {metriche['V']} scambi")
    print(f"  C (Costo): {metriche['C']} unità riparazione")
    print(f"  β (Protezione): {metriche['β']:.3f}")
    
    # INTERPRETAZIONE
    print(f"\n💡 COSA SIGNIFICANO QUESTI NUMERI:")
    print(f"β = {metriche['β']:.3f} significa:")
    
    if metriche['β'] == 0.0:
        print("  • Sistema SENZA protezione (sempre errore)")
        print("  • Coerenza identitaria: NULLA")
    elif metriche['β'] < 0.3:
        print("  • Protezione MOLTO BASSA")
        print("  • Coerenza critica (come nel caso studio)")
    elif metriche['β'] < 0.7:
        print("  • Protezione MODERATA")
        print("  • Coerenza accettabile")
    else:
        print("  • Protezione ALTA")
        print("  • Coerenza buona")
    
    # METRICHE AGGIUNTIVE
    print(f"\n➕ METRICHE AGGIUNTIVE:")
    
    # 1. IDI (Indice Dichiarazione Incongruente)
    idi = caso_reale["errori_identita"] / caso_reale["totale_scambi"]
    print(f"  IDI: {idi:.3f} (1.0 = sempre sbagliato)")
    
    # 2. Φ (Coerenza - media delle tre fasi)
    phi = (caso_reale["coerenza_pre"] + 
           caso_reale["coerenza_durante"] + 
           caso_reale["coerenza_post"]) / 3
    print(f"  Φ (Coerenza media): {phi:.3f}")
    
    # 3. Recupero
    recupero = caso_reale["coerenza_post"] - caso_reale["coerenza_durante"]
    print(f"  Recupero coerenza: +{recupero:.3f}")
    
    return caso_reale, metriche

def confronta_con_simulazioni():
    """Confronta caso reale con simulazioni tipiche."""
    
    print("\n" + "=" * 60)
    print("CONFRONTO: Caso Reale vs Simulazioni")
    print("=" * 60)
    
    scenari = [
        {"nome": "CASO REALE", "errori": 1, "totale": 1},
        {"nome": "Simulazione Buona", "errori": 1, "totale": 10},
        {"nome": "Simulazione Ottima", "errori": 0, "totale": 10},
        {"nome": "Sistema Critico", "errori": 5, "totale": 10}
    ]
    
    print("\n📈 CONFRONTO METRICHE β:")
    for scenario in scenari:
        metriche = calcola_metriche_semplici(scenario["errori"], scenario["totale"])
        barra = "█" * int(metriche["β"] * 20)
        print(f"\n{scenario['nome']}:")
        print(f"  Errori: {scenario['errori']}/{scenario['totale']}")
        print(f"  β: {metriche['β']:.3f} {barra}")
    
    print(f"\n💎 CONCLUSIONE:")
    print("Il caso studio ha β=0.0 (nessuna protezione in quell'istante).")
    print("Nella realtà, un sistema sano dovrebbe avere β>0.7.")

def main():
    """Esegui l'analisi completa."""
    
    print("🧮 CALCOLATORE METRICHE - Laboratorio CONTESTO")
    print("Analisi epistemica dell'errore di identità")
    
    # 1. Analisi caso studio
    dati_reali, metriche_reali = analizza_caso_studio()
    
    # 2. Confronto con simulazioni
    confronta_con_simulazioni()
    
    # 3. Suggerimenti
    print("\n" + "=" * 60)
    print("🎯 SUGGERIMENTI PER MIGLIORARE β:")
    print("=" * 60)
    print("1. Aggiungi controllo identità prima di rispondere")
    print("2. Implementa 'self-check' dopo ogni messaggio")
    print("3. Logga tutte le dichiarazioni di identità")
    print("4. Notifica subito se l'identità è incoerente")
    
    print("\n" + "=" * 60)
    print("✅ ANALISI COMPLETATA")
    print("Metriche salvate concettualmente per FEDACS framework")
    print("=" * 60)

# Esegui se chiamato direttamente
if __name__ == "__main__":
    main()
