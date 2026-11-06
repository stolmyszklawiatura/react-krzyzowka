
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Testy jednostkowe aplikacji – krzyżówka", () => {

  // TEST 1 – liczba pól dla hasła PROPS (5 liter)
  it("powinien wyświetlić 5 pól dla hasła PROPS", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(
      screen.getByRole("button", { name: /Dane przekazywane do komponentu/i })
    );

    const activeInputs = container.querySelectorAll(
      ".active-word input"
    );

    expect(activeInputs).toHaveLength(5);
  });

  // TEST 2 – możliwość wpisania tylko jednej litery
  it("powinien pozwolić wpisać tylko jedną literę", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", {
      name: "Wiersz 1, kolumna 4",
    });

    await user.type(input, "AB");

    expect(input).toHaveValue("A");
  });

  // TEST 3 – blokowanie cyfr
  it("nie powinien pozwalać na wpisanie cyfr", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", {
      name: "Wiersz 1, kolumna 4",
    });

    await user.type(input, "1");

    expect(input).toHaveValue("");
  });

  // TEST 4 – blokowanie znaków specjalnych
  it("nie powinien pozwalać na wpisanie znaków specjalnych", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", {
      name: "Wiersz 1, kolumna 4",
    });

    await user.type(input, "!");

    expect(input).toHaveValue("");
  });

  // TEST 5 – sprawdzanie poprawności odpowiedzi
  it("powinien oznaczyć niepoprawną odpowiedź po kliknięciu Sprawdź", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const input = screen.getByRole("textbox", {
      name: "Wiersz 1, kolumna 4",
    });

    await user.type(input, "X");

    await user.click(
      screen.getByRole("button", { name: "Sprawdź" })
    );

    expect(container.querySelector(".wrong")).toBeInTheDocument();
  });

  // TEST 6 – wyświetlanie rozwiązania
  it("powinien wypełnić wszystkie pola poprawnymi odpowiedziami", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Pokaż rozwiązanie" })
    );

    const inputs = container.querySelectorAll(".letter-cell input");

    expect(inputs.length).toBeGreaterThan(0);

    inputs.forEach((input) => {
      expect(input.value).not.toBe("");
    });

    expect(inputs[0]).toHaveValue("H");
  });

  // TEST 7 – czyszczenie planszy
  it("powinien wyczyścić wszystkie pola po kliknięciu Wyczyść", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    const input = screen.getByRole("textbox", {
      name: "Wiersz 1, kolumna 4",
    });

    await user.type(input, "H");

    await user.click(
      screen.getByRole("button", { name: "Wyczyść" })
    );

    const inputs = container.querySelectorAll(".letter-cell input");

    inputs.forEach((input) => {
      expect(input).toHaveValue("");
    });
  });

  // TEST 8 – podświetlanie pól po wybraniu definicji
  it("powinien podświetlić odpowiednie pola po kliknięciu definicji hasła", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);

    await user.click(
      screen.getByRole("button", { name: /Składnia pozwalająca pisać/i })
    );

    const activeInputs = container.querySelectorAll(
      ".active-word input"
    );

    expect(activeInputs).toHaveLength(3);
  });

});
