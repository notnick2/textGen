import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkeletonLoader from './SkeltonLoader';

function App() {
  const [recipient, setRecipient] = useState('');
  const [length, setLength] = useState('');
  const [tone, setTone] = useState('');
  const [callToAction, setCallToAction] = useState('');
  const [sampleText, setSampleText] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const generateText = async () => {
    setLoading(true);
    setOutput('');
    try {
      const response = await axios.post('https://textgen.varun123024.workers.dev/', {
        recipient,
        input: sampleText,
        length,
        tone,
        callToAction,
      });
      setLoading(false);
      setOutput(response.data);
    } catch (error) {
      console.error('Error generating text:', error);
      setLoading(false); // Ensure loading is set to false in case of error
    }
  };

  const TypingEffect = ({ text }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
      let index = 0;

      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 5); // Adjust typing speed here (in milliseconds)

      return () => clearInterval(interval);
    }, [text]);

    return (
      <div
        style={{
          
          whiteSpace: 'pre-wrap', // Use pre-wrap for line breaks with wrapping
          maxWidth: '775px', // Set a maximum width to prevent overflow
          margin: '0 auto', // Center the text horizontally
        }}
      >
        {displayText}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-purple-800">
        <div className="text-2xl font-bold text-teal-400">Logo</div>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-white">Pricing</a>
          <a href="#" className="text-white">Log In</a>
          <button className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-500 transition">
            Try for free →
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-4xl font-bold text-center mb-4">Free AI Writer</h1>
        <p className="text-center mb-8">Convert your text instructions into professional texts</p>

        <div className="max-w-3xl mx-auto space-y-4">
          {/* Input fields */}
          <input
            type="text"
            className="w-full p-2 rounded text-black"
            placeholder="Name of recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />

          {/* Radio options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Length */}
            <div>
              <h3 className="mb-2">Length</h3>
              <div className="space-y-2">
                {['Short', 'Middle', 'Long'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="length"
                      value={option}
                      checked={length === option}
                      onChange={() => setLength(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <h3 className="mb-2">Tone</h3>
              <div className="space-y-2">
                {['Friendly', 'Sad', 'Angry', 'Sarcastic'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="tone"
                      value={option}
                      checked={tone === option}
                      onChange={() => setTone(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div>
              <h3 className="mb-2">Call to Action</h3>
              <div className="space-y-2">
                {['Contact me', 'Do what I say', 'Wait for me'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="callToAction"
                      value={option}
                      checked={callToAction === option}
                      onChange={() => setCallToAction(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Textarea for sample text */}
          <textarea
            className="w-full p-2 rounded text-black"
            rows="6"
            placeholder="Sample Text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
          ></textarea>

          {/* Generate Button */}
          <button
            className="w-full bg-teal-600 text-white py-3 rounded-lg text-xl font-semibold"
            onClick={generateText}
          >
            Generate Text
          </button>

          {/* Display generated text */}
          { loading ? ( <SkeletonLoader/>) : output && (
            <div>
              <TypingEffect text={output} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 text-center bg-purple-800 mt-auto">
        <a href="#" className="mr-4">Contact Us</a>
        <a href="#" className="mr-4">Privacy Policy</a>
        <a href="#">Terms of Services</a>
      </footer>
    </div>
  );
}

export default App;