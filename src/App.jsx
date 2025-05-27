import { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-center text-2xl font-bold mb-4 text-orange-500">🔐 Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-2 text-black outline-none"
            readOnly
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(password);
              alert('Copied to clipboard!');
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-white">Length: {length}</label>
            <input
              id="length"
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberInput" className="text-white">Include Numbers</label>
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterInput" className="text-white">Include Special Characters</label>
            <input
              type="checkbox"
              id="characterInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
