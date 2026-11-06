# Krzyżówka

Krzyżówka przygotowana w React. Aplikacja pozwala
uzupełniać hasła, wybierać definicje,
sprawdzać odpowiedzi, wyświetlać rozwiązanie i czyścić planszę.

## Funkcje

-   interaktywna plansza krzyżówki,
-   wybieranie hasła przez kliknięcie jego definicji,
-   podświetlanie pól należących do wybranego hasła,
-   wpisywanie pojedynczych liter,
-   odrzucanie cyfr i znaków spoza dozwolonego zbioru,
-   sprawdzanie poprawności wpisanych liter,
-   wyświetlanie pełnego rozwiązania,
-   czyszczenie planszy.

## Wykorzystane technologie

-   React -- budowa interfejsu użytkownika,
-   Vite -- uruchamianie środowiska developerskiego i budowanie
    aplikacji,
-   Vitest -- uruchamianie testów jednostkowych,
-   React Testing Library -- renderowanie komponentu i wyszukiwanie
    elementów interfejsu w testach,
-   @testing-library/user-event -- symulowanie działań użytkownika w
    testach.

## Wymagania

-   Node.js w wersji obsługiwanej przez używaną wersję Vite,
-   npm.

## Instalacja i uruchomienie

1.  pobierz projekt.

2.  Otwórz terminal w głównym katalogu projektu (tam, gdzie znajduje się
    `package.json`).

3.  dokonaj instalacji za pomocą:

    npm install
   
4.  Uruchom aplikację:

    npm run dev
   
5.  Otwórz w przeglądarce adres wyświetlony w terminalu - http://localhost:5173.

## Uruchamianie testów

Aby uruchomić testy jednostkowe wykonaj w terminalu:

npm test


Vitest może pozostać w trybie obserwowania zmian. Aby zakończyć jego
działanie, naciśnij `q` w terminalu.

Testy sprawdzają między innymi: 
- liczbę pól dla wybranego hasła, 
- ograniczenie liczby wpisywanych znaków,
- odrzucanie cyfr i znaków specjalnych, 
- oznaczanie niepoprawnych odpowiedzi, 
- działanie przycisków wyświetlania rozwiązania i czyszczenia planszy, 
- podświetlanie pól po wybraniu definicji.

## Struktura projektu

Najważniejsze pliki:

-   src/App.jsx -- główny komponent aplikacji,
-   src/App.test.jsx -- testy jednostkowe komponentu,
-   src/setupTests.js -- konfiguracja biblioteki testującej,
-   vite.config.js -- konfiguracja Vite i Vitest,
-   package.json -- zależności i skrypty projektu.

## Ważne

Jeśli po pobraniu projektu polecenie "npm test" nie uruchamia testów, należy zweryfikować czy w "package.json"
znajduje się:

{
  "scripts": {
    "test": "vitest"
  }
}

jeżeli go nie ma w cześci scripts należy go dodać ale pozostawić poprzednie również
