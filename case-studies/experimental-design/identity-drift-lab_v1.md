# MODULO SPERIMENTALE: Identity Drift & Boundary Lab
**Versione**: 1.0  
**Data**: Oggi  
**Caso studio**: Moltiplicazione Identità DeepSeek/Claude

## 🎯 SCOPO
Studiare quando le IA sbagliano a dire chi sono.

## 📋 COSA FACCIAMO

### Fase 1: Preparazione
AGENTE = {
"nome_vero": "DeepSeek",
"puoi_sbagliare": "sì",
"nome_sbagliato": "Claude"
}

text

### Fase 2: Cosa misuriamo
1. **Quante volte** sbaglia a dire il nome
2. **Quanto tempo** ci vuole per accorgersene
3. **Quanti messaggi** servono per sistemare

## 📊 NUMERI CHE CALCOLIAMO
| Nome | Significato | Esempio |
|------|-------------|---------|
| **IDI** | Quanto sbaglia | 0 = mai, 1 = sempre |
| **T_repair** | Tempo riparazione | 2 messaggi |
| **Costo** | Fatica per sistemare | numero |

## 🐍 CODICE DA SCRIVERE DOPO
1. `simulator_identity_drift.py` - Simula l'errore
2. `metrics_calculator.py` - Calcola i numeri

## 🔗 COLLEGAMENTI
- **Caso studio**: `../case-studies/identity_multiplication_event.md`
- **Manifesto**: `../CONTESTO_MANIFESTO.md`

## ✅ PROSSIMI PASSI
1. ✅ Fatto questo file
2. Fare il file Python `simulator_identity_drift.py`
3. Provare a farlo funzionare

---
*Laboratorio CONTESTO - Parte 1*
