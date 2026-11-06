import React, { useState } from "react";

// row i col to pozycja pierwszej litery hasła na planszy.
// H oznacza poziomo, V oznacza pionowo.
const words = [
  { id: 1, answer: "HOOK", clue: "Specjalna funkcja Reacta, np. useState.", row: 0, col: 3, dir: "V" },
  { id: 2, answer: "JSX", clue: "Składnia pozwalająca pisać HTML-podobny kod w JavaScript.", row: 1, col: 5, dir: "H" },
  { id: 3, answer: "STAN", clue: "Dane komponentu, które mogą się zmieniać.", row: 1, col: 6, dir: "V" },
  { id: 4, answer: "FUNKCJA", clue: "Podstawowy blok kodu wykonujący określone zadanie.", row: 3, col: 0, dir: "H" },
  { id: 5, answer: "CSS", clue: "Język służący do stylowania stron.", row: 3, col: 4, dir: "V" },
  { id: 6, answer: "PROPS", clue: "Dane przekazywane do komponentu.", row: 5, col: 0, dir: "H" },
  { id: 7, answer: "REACT", clue: "Biblioteka JavaScript do budowania interfejsów.", row: 5, col: 1, dir: "V" },
  { id: 8, answer: "HTML", clue: "Język znaczników używany do tworzenia stron.", row: 9, col: 0, dir: "H" }
];

const ROWS = 10;
const COLS = 8;

function cellKey(row, col) {
  return `${row}-${col}`;
}

function App() {
  const [letters, setLetters] = useState({});
  const [activeWord, setActiveWord] = useState(1);
  const [activeCell, setActiveCell] = useState(null);
  const [checked, setChecked] = useState(false);

  // Na podstawie haseł budujemy wspólną planszę. Przecinające się litery
  // zajmują jedno pole, więc wpisana litera pasuje do obu haseł.
  const cells = {};
  words.forEach((word) => {
    for (let i = 0; i < word.answer.length; i++) {
      const row = word.row + (word.dir === "V" ? i : 0);
      const col = word.col + (word.dir === "H" ? i : 0);
      const key = cellKey(row, col);

      if (!cells[key]) {
        cells[key] = { answer: word.answer[i], number: null };
      }
      if (i === 0) {
        cells[key].number = word.id;
      }
    }
  });

  const selectedWord = words.find((word) => word.id === activeWord);

  function isInActiveWord(row, col) {
    if (!selectedWord) return false;

    for (let i = 0; i < selectedWord.answer.length; i++) {
      const wordRow = selectedWord.row + (selectedWord.dir === "V" ? i : 0);
      const wordCol = selectedWord.col + (selectedWord.dir === "H" ? i : 0);
      if (row === wordRow && col === wordCol) return true;
    }
    return false;
  }

  function changeLetter(key, value) {
    const letter = value.toUpperCase().replace(/[^A-ZĄĆĘŁŃÓŚŹŻ]/g, "").slice(-1);
    setLetters({ ...letters, [key]: letter });
    setChecked(false);
  }

  function checkAnswers() {
    setChecked(true);
  }

  function showSolution() {
    const solution = {};
    Object.keys(cells).forEach((key) => {
      solution[key] = cells[key].answer;
    });
    setLetters(solution);
    setChecked(false);
  }

  function clearBoard() {
    setLetters({});
    setChecked(false);
  }

  function selectWord(word) {
    setActiveWord(word.id);
    setActiveCell(cellKey(word.row, word.col));
  }

  return (
    <main className="app">
      <h1>Krzyżówka</h1>

      <div className="content">
        <section className="game-panel">
          <div className="board-wrap">
            <div className="board" aria-label="Krzyżówka">
              {Array.from({ length: ROWS }, (_, row) => (
                <div className="board-row" key={row}>
                  {Array.from({ length: COLS }, (_, col) => {
                    const key = cellKey(row, col);
                    const cell = cells[key];

                    if (!cell) {
                      return <div className="empty-cell" key={col} />;
                    }

                    const value = letters[key] || "";
                    const correct = value !== "" && value === cell.answer;
                    const wrong = value !== "" && value !== cell.answer;
                    let className = "letter-cell";

                    if (isInActiveWord(row, col)) className += " active-word";
                    if (activeCell === key) className += " active-cell";
                    if (checked && correct) className += " correct";
                    if (checked && wrong) className += " wrong";

                    return (
                      <div className={className} key={col}>
                        {cell.number && <span className="cell-number">{cell.number}</span>}
                        <input
                          value={value}
                          maxLength={1}
                          onFocus={() => setActiveCell(key)}
                          onChange={(event) => changeLetter(key, event.target.value)}
                          aria-label={`Wiersz ${row + 1}, kolumna ${col + 1}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="actions">
            <button className="primary" onClick={checkAnswers}>Sprawdź</button>
            <button className="secondary" onClick={showSolution}>Pokaż rozwiązanie</button>
            <button className="secondary" onClick={clearBoard}>Wyczyść</button>
          </div>
        </section>

        <aside className="clues-panel">
          <section className="clue-group">
            <h2>Poziomo:</h2>
            {words.filter((word) => word.dir === "H").map((word) => (
              <button
                className={`clue ${activeWord === word.id ? "selected" : ""}`}
                key={word.id}
                onClick={() => selectWord(word)}
              >
                <span className="clue-number">{word.id}</span>
                <span>{word.clue}</span>
              </button>
            ))}
          </section>

          <section className="clue-group">
            <h2>Pionowo:</h2>
            {words.filter((word) => word.dir === "V").map((word) => (
              <button
                className={`clue ${activeWord === word.id ? "selected" : ""}`}
                key={word.id}
                onClick={() => selectWord(word)}
              >
                <span className="clue-number">{word.id}</span>
                <span>{word.clue}</span>
              </button>
            ))}
          </section>
        </aside>
      </div>
    </main>
  );
}

export default App;
