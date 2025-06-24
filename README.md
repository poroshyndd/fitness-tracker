# Fitness Tracker

Aplikacja webowa do planowania i monitorowania treningów fitness, napisana w Node.js z użyciem wzorca MVC oraz Server-Side Rendering (SSR).

## Funkcjonalności

- Rejestracja i logowanie użytkowników (bcrypt + session)
- Tworzenie, edycja i usuwanie treningów (typ, intensywność, czas, data)
- Widok listy treningów z akcjami (edycja, usunięcie)
- Widok szczegółów treningu
- Tabela statystyk: łączna liczba treningów, średnia dzienna, dni najbardziej/​najmniej aktywne
- Interaktywny kalendarz miesiąca z podświetleniem dni z treningami i listą treningów pod tabelą
- Profil użytkownika: imię, email, waga, wzrost, wiek, cel
- Nawigacja dostosowana do stanu zalogowania (zaloguj/wyloguj)

## Technologie

- Node.js
- Express.js
- EJS + express-ejs-layouts
- PostgreSQL via Sequelize ORM
- Bootstrap 5 (CSS)
- express-session, bcrypt

## Struktura katalogów

