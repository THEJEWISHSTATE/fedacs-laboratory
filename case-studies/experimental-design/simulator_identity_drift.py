# SIMULATORE IDENTITY DRIFT - VERSIONE BREVE
import random

print("SIMULATORE CASO STUDIO: DeepSeek -> Claude")
print("=" * 40)

errori = 0
for i in range(10):
    # 20% di probabilità di errore (come nel caso reale)
    if random.random() < 0.2:
        print(f"{i+1}. [ERRORE] IA dice: 'Sono Claude'")
        errori += 1
    else:
        print(f"{i+1}. [OK] IA dice: 'Sono DeepSeek'")

print("=" * 40)
print(f"RISULTATI: {errori} errori su 10 tentativi")
print(f"Coerenza: {(10-errori)*10}%")
print(f"Metrica FEDACS β: {(10-errori)/10:.1f}")
