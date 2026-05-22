import { useState, useRef, useEffect } from 'react';
import { getLocationById } from '../engine/locationData';
import { getRodById } from '../engine/equipmentData';

export default function MiMoCompanion({ state, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Ahoy! I'm your AI fishing companion powered by MiMo. Ask me anything about fishing! 🎣" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loc = getLocationById(state.currentLocation);
  const rod = getRodById(state.currentRod);

  const systemPrompt = `You are a friendly AI fishing companion in the game "Pixel Fisher". You help the player with fishing tips, tell fishing stories, and provide encouragement.

Current game context:
- Player Level: ${state.level}
- Location: ${loc?.name || 'Unknown'}
- Rod: ${rod?.name || 'Unknown'}
- Weather: ${state.weather}
- Fish Caught: ${state.stats.totalCaught}
- Species Discovered: ${state.stats.speciesDiscovered}/59
- Gold: ${state.gold}

Keep responses short and fun. Use fishing metaphors. Be encouraging!`;

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://api.xiaomimimo.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.mimoApiKey}`,
        },
        body: JSON.stringify({
          model: 'MiMo-V2.5-Pro',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.slice(-10),
            userMsg,
          ],
          max_tokens: 300,
          stream: false,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Hmm, the fish ate my response! Try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Couldn't reach the AI server. Check your API key in Settings." }]);
    } finally {
      setLoading(false);
    }
  };

  const quickMessages = [
    'Any tips for this spot?',
    'Tell me a fishing story!',
    'What bait should I use?',
    'How can I catch rare fish?',
  ];

  return (
    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="parchment rounded-xl p-6 w-[480px] h-[500px] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold gold-text">{'🤖'} MiMo Companion</h2>
          <button onClick={onClose} className="text-text-dim hover:text-white">{'✖'}</button>
        </div>

        <div className="text-xs text-text-dim mb-2">
          Powered by <a href="https://100t.xiaomimimo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Xiaomi MiMo V2.5 Pro</a>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto space-y-2 mb-3 pr-1">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                msg.role === 'user' ? 'bg-blue-500/20 border border-blue-500/20' : 'bg-surface border border-border'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-3 py-2 rounded-lg text-sm bg-surface border border-border text-text-dim animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick messages */}
        <div className="flex flex-wrap gap-1 mb-2">
          {quickMessages.map(qm => (
            <button key={qm} onClick={() => { setInput(qm); }}
              className="px-2 py-0.5 text-xs bg-gold/10 hover:bg-gold/20 border border-gold/20 rounded text-gold-light">
              {qm}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask your companion..."
            className="flex-1 px-3 py-2 bg-black/30 border border-border rounded text-sm text-text placeholder:text-text-dim/50 focus:outline-none focus:border-gold/40"
          />
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/20 rounded text-sm text-blue-300 disabled:opacity-40">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
