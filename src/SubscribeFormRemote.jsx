import { useState } from 'react';

export default function SubscribeFormRemote() {
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
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input type="text" className="w-full p-2 text-black rounded" placeholder="Enter Token Name" value={token} onChange={(e) => setToken(e.target.value)} required />
      <input type="text" className="w-full p-2 text-black rounded" placeholder="Twitter Username" value={twitterUsername} onChange={(e) => setTwitterUsername(e.target.value)} required />
      <input type="text" className="w-full p-2 text-black rounded" placeholder="Wallet Address" value={wallet} onChange={(e) => setWallet(e.target.value)} required />
      <input type="number" className="w-full p-2 text-black rounded" placeholder="Reminder in Days" value={remindInDays} onChange={(e) => setRemindInDays(e.target.value)} required />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">Subscribe</button>
      {message && <p className="text-green-400 mt-2">{message}</p>}
    </form>
  );
}
