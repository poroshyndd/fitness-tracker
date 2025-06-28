# Fitness Tracker

## 🏷️ Nazwa projektu

**Fitness Tracker** – System organizacji treningów fitness

## 📝 Opis projektu

Aplikacja webowa służąca do planowania, monitorowania oraz zarządzania treningami fitness. Umożliwia użytkownikom tworzenie własnych planów treningowych, śledzenie postępów oraz przeglądanie statystyk aktywności fizycznej.

Projekt został stworzony indywidualnie jako zaliczenie przedmiotu z zakresu tworzenia aplikacji internetowych w Node.js, z użyciem wzorca MVC i techniki Server-Side Rendering (SSR).

## 🚀 Funkcjonalności

- ✅ Rejestracja i logowanie użytkownika (z wykorzystaniem bcrypt i sesji)  
- ✅ Tworzenie, edytowanie i usuwanie treningów (typ, intensywność, czas, data)  
- ✅ Lista treningów z możliwością edycji i usunięcia  
- ✅ Widok szczegółowy treningu  
- ✅ Statystyki:
  - całkowita liczba treningów  
  - średnia liczba treningów dziennie  
  - najbardziej i najmniej aktywne dni  
- ✅ Interaktywny kalendarz z zaznaczonymi dniami treningowymi i listą pod spodem  
- ✅ Profil użytkownika (imię, e-mail, wzrost, waga, wiek, cel)  
- ✅ Nawigacja dynamiczna w zależności od stanu zalogowania  

## 🛠️ Instrukcja uruchomienia aplikacji

### ✅ Wymagania

- Node.js (wersja 18+)  
- PostgreSQL z aktywną bazą danych  

### 🔧 Kroki

1. **Klonowanie repozytorium**  
 git clone https://github.com/poroshyndd/fitness-tracker.git
 cd fitness-tracker
2. **Instalacja zależności**
  npm install
3. **Utworzenie pliku .env**
 DATABASE_URL=
 PORT=3000

4.**Start**
   npm start
   
 ## 📂 Struktura aplikacji  
 
```plaintext
fitness-tracker/
│
├── controllers/         # Logika aplikacji: authController, trainingController, userController
├── models/              # Modele Sequelize: User.js, Training.js
├── routes/              # Routing aplikacji: authRoutes.js, trainingRoutes.js, userRoutes.js
├── views/               # Widoki EJS: login.ejs, register.ejs, trainings.ejs, stats.ejs, profile.ejs
│   └── partials/        # Części wspólne: layout.ejs, navbar.ejs, footer.ejs
├── public/              # Pliki statyczne (Bootstrap, CSS, obrazy)
├── config/              # Konfiguracja bazy danych
├── .env                 # Plik konfiguracyjny środowiska (lokalnie)
├── index.js             # Główny plik aplikacji Express
└── README.md            # Dokumentacja projektuu



 ##📦 Użyte biblioteki zewnętrzne
	•	express – framework backendowy
	•	ejs – silnik szablonów SSR
	•	express-ejs-layouts – layouty dla EJS
	•	sequelize + pg – ORM i sterownik do PostgreSQL
	•	bcrypt – szyfrowanie haseł
	•	express-session – obsługa sesji użytkownika
	•	dotenv – zmienne środowiskowe
	•	bootstrap – stylowanie frontendowe



Przykładowe dane wejściowe

✅ Rejestracja użytkownika:
	•	Imię: Jan
	•	Email: jan@example.com
	•	Hasło: test123
	•	Wiek: 28
	•	Waga: 75
	•	Wzrost: 180
	•	Cel: Redukcja
 ✅ Dodanie treningu:
	•	Typ: Siłowy
	•	Intensywność: Wysoka
	•	Czas trwania: 45 minut
	•	Data: 2025-06-24
