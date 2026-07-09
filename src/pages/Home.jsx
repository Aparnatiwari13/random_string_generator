import { useState, useCallback, useEffect } from "react";

function Home() {
  const [length, setLength] = useState(10);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [randomString, setRandomString] = useState("");

  const generateRandomString = useCallback(() => {
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumbers) {
      characters += "0123456789";
    }

    if (includeSymbols) {
      characters += "!@#$%^&*()_+{}[]<>?";
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setRandomString(result);
  }, [length, includeNumbers, includeSymbols]);

  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(randomString);
    alert("Random String Copied!");
  };

  const getStrength = () => {
    if (length <= 10) {
      return {
        text: "Weak",
        color: "text-red-500",
      };
    } else if (length <= 20) {
      return {
        text: "Medium",
        color: "text-yellow-500",
      };
    } else {
      return {
        text: "Strong",
        color: "text-green-600",
      };
    }
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
          Random String Generator
        </h1>

        {/* Output Box */}

        <div className="bg-slate-900 rounded-xl p-5">

          <p className="text-green-400 font-mono text-lg break-all text-center">

            {randomString}

          </p>

        </div>

        {/* Copy Button */}

        <button
          onClick={copyToClipboard}
          className="mt-4 w-full border border-slate-300 py-3 rounded-lg hover:bg-slate-100 transition font-semibold"
        >
          📋 Copy
        </button>

        {/* Length */}

        <div className="mt-8">

          <div className="flex justify-between items-center mb-2">

            <label className="font-semibold text-slate-700">
              String Length
            </label>

            <span className="bg-slate-200 px-3 py-1 rounded-full font-bold">
              {length}
            </span>

          </div>

          <input
            type="range"
            min="5"
            max="30"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer"
          />

        </div>

        {/* Checkboxes */}

        <div className="mt-8 grid grid-cols-2 gap-4">

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-slate-50">

            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />

            <span className="font-medium">
              Include Numbers
            </span>

          </label>

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-slate-50">

            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />

            <span className="font-medium">
              Include Symbols
            </span>

          </label>

        </div>

        {/* Strength */}

        <div className="mt-8">

          <div className="flex justify-between">

            <span className="font-semibold text-slate-700">
              Strength
            </span>

            <span className={`font-bold ${strength.color}`}>
              {strength.text}
            </span>

          </div>

          <div className="w-full h-3 bg-slate-200 rounded-full mt-2">

            <div
              className={`h-3 rounded-full ${
                strength.text === "Weak"
                  ? "w-1/3 bg-red-500"
                  : strength.text === "Medium"
                  ? "w-2/3 bg-yellow-500"
                  : "w-full bg-green-600"
              }`}
            ></div>

          </div>

        </div>

        {/* Generate Button */}

        <button
          onClick={generateRandomString}
          className="mt-8 w-full bg-slate-800 hover:bg-slate-900 text-white py-4 rounded-xl text-lg font-semibold transition"
        >
          Generate Random String
        </button>

      </div>

    </div>
  );
}

export default Home;