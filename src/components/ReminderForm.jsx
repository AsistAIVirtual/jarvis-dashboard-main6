import { useState } from 'react';

export default function SubscribeForm() {
  const [wallet, setWallet] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [remindInDays, setRemindInDays] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      wallet,
      twitterUsername,
      remindInDays: parseInt(remindInDays),
      token
    };

    try {
      const response = await fetch('https://x-reminder-bot.vercel.app/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Reminder registered and tweet sent!');
      } else {
        setMessage(result.error || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to reach the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Wallet Address"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Twitter Username (without @)"
        value={twitterUsername}
        onChange={(e) => setTwitterUsername(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Remind in (days)"
        value={remindInDays}
        onChange={(e) => setRemindInDays(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Token (e.g. $JARVIS)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Subscribe
      </button>
      {message && <p className="text-center mt-4">{message}</p>}
    </form>
  );
}
