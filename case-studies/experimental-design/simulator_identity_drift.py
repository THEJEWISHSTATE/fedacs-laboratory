import random

def simulate_ai_response(error_probability):
    """Simulate an AI response with a given error probability."""
    return random.random() < error_probability

def main():
    print("SIMULATORE CASO STUDIO: DeepSeek -> Claude")
    print("=" * 40)

    num_trials = 10
    error_probability = 0.2
    errors = sum(1 for _ in range(num_trials) if simulate_ai_response(error_probability))

    for i in range(num_trials):
        result = "[ERRORE] IA dice: 'Sono Claude'" if i < errors else "[OK] IA dice: 'Sono DeepSeek'"
        print(f"{i+1}. {result}")

    print("=" * 40)
    print(f"RISULTATI: {errors} errori su {num_trials} tentativi")
    print(f"Coerenza: {(num_trials-errors)/num_trials*100:.0f}%")
    print(f"Metrica FEDACS β: {(num_trials-errors)/num_trials:.1f}")

if __name__ == "__main__":
    main()
