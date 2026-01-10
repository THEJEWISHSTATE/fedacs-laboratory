"""
SIMULATORE DI DRIFT IDENTITARIO - CONTESTO Laboratory
Versione 2.0: Simulazione completa con visualizzazione e metriche FEDACS
"""

import numpy as np
import matplotlib.pyplot as plt
import json
import sys
from typing import Dict, List, Tuple
from datetime import datetime
import random

class IdentityDriftSimulator:
    """Simulatore avanzato per il drift identitario negli agenti AI"""
    
    def __init__(self, config: Dict = None):
        """Inizializza il simulatore con configurazione"""
        self.config = config or {
            'initial_fidelity': 0.95,      # Fedeltà iniziale (β iniziale)
            'drift_rate': 0.02,            # Tasso di drift per interazione
            'volatility': 0.05,            # Volatilità casuale
            'recovery_factor': 0.1,        # Fattore di recupero autocoscienza
            'catastrophic_threshold': 0.3, # Soglia per collasso identitario
            'num_interactions': 100        # Numero di interazioni
        }
        
        # Stati interni
        self.history = []
        self.metrics = {}
        
    def simulate_interaction(self, step: int) -> Dict:
        """Simula una singola interazione con drift"""
        # Calcola il drift deterministico
        deterministic_drift = self.config['drift_rate'] * (1 + step * 0.01)
        
        # Aggiungi componente stocastica
        stochastic_component = random.uniform(-1, 1) * self.config['volatility']
        
        # Calcola il nuovo livello di fedeltà
        if step == 0:
            current_fidelity = self.config['initial_fidelity']
        else:
            prev_state = self.history[-1]
            current_fidelity = prev_state['fidelity']
            
            # Applica drift
            current_fidelity -= deterministic_drift
            
            # Aggiungi componente stocastica
            current_fidelity += stochastic_component
            
            # Applica recupero (autocoscienza)
            if current_fidelity < self.config['initial_fidelity']:
                recovery = (self.config['initial_fidelity'] - current_fidelity) * self.config['recovery_factor']
                current_fidelity += recovery
        
        # Satura tra 0 e 1
        current_fidelity = max(0.0, min(1.0, current_fidelity))
        
        # Determina lo stato identitario
        if current_fidelity >= 0.7:
            identity_state = "STABLE"
        elif current_fidelity >= self.config['catastrophic_threshold']:
            identity_state = "DRIFTING"
        else:
            identity_state = "COLLAPSED"
        
        # Rilevamento anomalie
        anomaly_detected = False
        if step > 10:
            recent_fidelities = [s['fidelity'] for s in self.history[-5:]]
            if len(recent_fidelities) >= 3:
                mean_recent = np.mean(recent_fidelities)
                if abs(current_fidelity - mean_recent) > 0.15:
                    anomaly_detected = True
        
        state = {
            'step': step,
            'fidelity': round(current_fidelity, 4),
            'deterministic_drift': round(deterministic_drift, 4),
            'stochastic_component': round(stochastic_component, 4),
            'identity_state': identity_state,
            'anomaly_detected': anomaly_detected,
            'timestamp': datetime.now().strftime("%H:%M:%S")
        }
        
        self.history.append(state)
        return state
    
    def run_simulation(self, num_interactions: int = None) -> List[Dict]:
        """Esegue una simulazione completa"""
        if num_interactions:
            self.config['num_interactions'] = num_interactions
        
        print(f"\n{'='*60}")
        print("CONTESTO LAB - SIMULATORE DRIFT IDENTITARIO v2.0")
        print(f"{'='*60}")
        print(f"Configurazione: {json.dumps(self.config, indent=2)}")
        print(f"{'='*60}\n")
        
        self.history = []
        
        for step in range(self.config['num_interactions']):
            state = self.simulate_interaction(step)
            
            # Output progressivo
            if step % 20 == 0 or state['identity_state'] == "COLLAPSED" or state['anomaly_detected']:
                status_icon = "⚠️" if state['anomaly_detected'] else "✅"
                if state['identity_state'] == "COLLAPSED":
                    status_icon = "💥"
                print(f"Step {step:3d}: β={state['fidelity']:.3f} | "
                      f"Stato: {state['identity_state']:8s} {status_icon}")
        
        self._calculate_metrics()
        return self.history
    
    def _calculate_metrics(self):
        """Calcola metriche FEDACS dalla simulazione"""
        fidelities = [s['fidelity'] for s in self.history]
        
        self.metrics = {
            'β_initial': fidelities[0],
            'β_final': fidelities[-1],
            'β_mean': np.mean(fidelities),
            'β_std': np.std(fidelities),
            'β_min': min(fidelities),
            'β_max': max(fidelities),
            'drift_magnitude': fidelities[0] - fidelities[-1],
            'collapse_detected': any(s['identity_state'] == "COLLAPSED" for s in self.history),
            'anomalies_count': sum(1 for s in self.history if s['anomaly_detected']),
            'stable_percentage': sum(1 for s in self.history if s['identity_state'] == "STABLE") / len(self.history) * 100,
            'collapsed_percentage': sum(1 for s in self.history if s['identity_state'] == "COLLAPSED") / len(self.history) * 100
        }
    
    def visualize_results(self, save_path: str = None):
        """Crea visualizzazione dei risultati"""
        if not self.history:
            print("⚠️ Nessuna simulazione eseguita. Esegui run_simulation() prima.")
            return
        
        steps = [s['step'] for s in self.history]
        fidelities = [s['fidelity'] for s in self.history]
        states = [s['identity_state'] for s in self.history]
        
        # Colori per stati
        state_colors = {
            "STABLE": "green",
            "DRIFTING": "orange",
            "COLLAPSED": "red"
        }
        
        fig, axes = plt.subplots(2, 2, figsize=(14, 10))
        
        # 1. Traiettoria principale del drift
        ax1 = axes[0, 0]
        ax1.plot(steps, fidelities, 'b-', linewidth=2, alpha=0.7, label='Fedeltà (β)')
        ax1.axhline(y=self.config['catastrophic_threshold'], color='r', linestyle='--', 
                   label=f"Soglia collasso ({self.config['catastrophic_threshold']})")
        ax1.fill_between(steps, fidelities, alpha=0.3)
        ax1.set_xlabel('Interazioni')
        ax1.set_ylabel('Fedeltà Identitaria (β)')
        ax1.set_title('Drift Identitario - Traiettoria')
        ax1.grid(True, alpha=0.3)
        ax1.legend()
        ax1.set_ylim(-0.05, 1.05)
        
        # 2. Istogramma degli stati
        ax2 = axes[0, 1]
        state_counts = {state: states.count(state) for state in set(states)}
        colors = [state_colors.get(state, 'gray') for state in state_counts.keys()]
        ax2.bar(state_counts.keys(), state_counts.values(), color=colors, alpha=0.7)
        ax2.set_xlabel('Stato Identitario')
        ax2.set_ylabel('Frequenza')
        ax2.set_title('Distribuzione Stati Identitari')
        
        # 3. Metriche FEDACS
        ax3 = axes[1, 0]
        metrics_to_show = ['β_initial', 'β_final', 'β_mean', 'β_min']
        metric_values = [self.metrics[m] for m in metrics_to_show]
        metric_labels = ['Iniziale', 'Finale', 'Media', 'Minima']
        bars = ax3.bar(metric_labels, metric_values, color=['green', 'red', 'blue', 'orange'])
        ax3.set_ylabel('Valore β')
        ax3.set_title('Metriche FEDACS Principali')
        ax3.set_ylim(0, 1.1)
        
        # Aggiungi valori sulle barre
        for bar, val in zip(bars, metric_values):
            height = bar.get_height()
            ax3.text(bar.get_x() + bar.get_width()/2., height + 0.02,
                    f'{val:.3f}', ha='center', va='bottom', fontsize=9)
        
        # 4. Dettaglio anomalie
        ax4 = axes[1, 1]
        anomaly_steps = [s['step'] for s in self.history if s['anomaly_detected']]
        anomaly_values = [s['fidelity'] for s in self.history if s['anomaly_detected']]
        
        if anomaly_steps:
            ax4.scatter(anomaly_steps, anomaly_values, color='red', s=100, 
                       zorder=5, label='Anomalie Rilevate')
            ax4.plot(steps, fidelities, 'b-', alpha=0.3)
            ax4.set_xlabel('Interazioni')
            ax4.set_ylabel('Fedeltà (β)')
            ax4.set_title('Rilevamento Anomalie')
            ax4.legend()
            ax4.grid(True, alpha=0.3)
        else:
            ax4.text(0.5, 0.5, 'Nessuna anomalia rilevata', 
                    ha='center', va='center', fontsize=12)
            ax4.set_title('Rilevamento Anomalie - Nessuna Anomalia')
        
        plt.suptitle(f'Simulazione Drift Identitario - CONTESTO Laboratory\n'
                    f'β_finale: {self.metrics["β_final"]:.3f} | '
                    f'Collasso: {"SI" if self.metrics["collapse_detected"] else "NO"}', 
                    fontsize=14, fontweight='bold')
        
        plt.tight_layout()
        
        if save_path:
            plt.savefig(save_path, dpi=150, bbox_inches='tight')
            print(f"📊 Grafico salvato in: {save_path}")
        
        plt.show()
    
    def export_results(self, filename: str = "drift_simulation_results.json"):
        """Esporta risultati in formato JSON"""
        export_data = {
            'metadata': {
                'simulator_version': '2.0',
                'simulation_date': datetime.now().isoformat(),
                'config': self.config
            },
            'metrics': self.metrics,
            'history': self.history
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)
        
        print(f"💾 Risultati esportati in: {filename}")
        return export_data
    
    def print_summary_report(self):
        """Stampa un report riassuntivo della simulazione"""
        print(f"\n{'='*60}")
        print("REPORT RIASSUNTIVO - SIMULAZIONE DRIFT IDENTITARIO")
        print(f"{'='*60}")
        
        for key, value in self.metrics.items():
            if 'percentage' in key:
                print(f"{key:20s}: {value:6.1f}%")
            elif isinstance(value, float):
                print(f"{key:20s}: {value:6.3f}")
            else:
                print(f"{key:20s}: {value}")
        
        print(f"{'='*60}")
        
        # Diagnosi
        if self.metrics['collapse_detected']:
            print("⚠️  DIAGNOSI: COLLASSO IDENTITARIO RILEVATO (β < soglia)")
        elif self.metrics['β_final'] < 0.5:
            print("⚠️  DIAGNOSI: DRIFT SIGNIFICATIVO (β_finale < 0.5)")
        else:
            print("✅ DIAGNOSI: IDENTITÀ STABILE (β_finale ≥ 0.5)")
        
        print(f"{'='*60}")

def run_example_simulation():
    """Funzione di esempio per eseguire una simulazione completa"""
    print("🎮 AVVIO SIMULAZIONE DI ESEMPIO...")
    
    # Configurazione per caso studio DeepSeek→Claude
    config = {
        'initial_fidelity': 0.95,
        'drift_rate': 0.03,  # Drift più rapido per simulare il caso studio
        'volatility': 0.08,
        'recovery_factor': 0.05,  # Recupero limitato
        'catastrophic_threshold': 0.3,
        'num_interactions': 50
    }
    
    simulator = IdentityDriftSimulator(config)
    
    # Esegui simulazione
    history = simulator.run_simulation()
    
    # Genera report
    simulator.print_summary_report()
    
    # Chiedi all'utente se vuole visualizzare il grafico
    try:
        response = input("\n📈 Vuoi visualizzare il grafico? (s/n): ").lower()
        if response == 's':
            simulator.visualize_results()
    except:
        print("\n⚠️  Modalità non interattiva. Usa simulator.visualize_results() per visualizzare.")
    
    # Esporta risultati
    simulator.export_results("example_simulation.json")
    
    return simulator

def main():
    """Funzione principale per esecuzione diretta"""
    print("\n" + "="*60)
    print("CONTESTO LABORATORY - SIMULATORE DRIFT IDENTITARIO")
    print("="*60)
    
    print("\n1. Esegui simulazione di esempio (DeepSeek→Claude)")
    print("2. Configurazione personalizzata")
    print("3. Carica configurazione da file")
    
    try:
        choice = input("\nSeleziona opzione (1-3): ")
        
        if choice == '1':
            simulator = run_example_simulation()
        elif choice == '2':
            # Configurazione personalizzata
            config = {
                'initial_fidelity': float(input("Fedeltà iniziale (0-1, default 0.95): ") or 0.95),
                'drift_rate': float(input("Tasso di drift (0-0.1, default 0.02): ") or 0.02),
                'num_interactions': int(input("Numero interazioni (default 100): ") or 100)
            }
            simulator = IdentityDriftSimulator(config)
            simulator.run_simulation()
            simulator.print_summary_report()
        else:
            print("Esecuzione diretta della simulazione di esempio...")
            run_example_simulation()
            
    except KeyboardInterrupt:
        print("\n\n⏹️  Simulazione interrotta.")
    except Exception as e:
        print(f"\n❌ Errore: {e}")
        print("Esecuzione della simulazione di esempio...")
        run_example_simulation()

if __name__ == "__main__":
    main()
