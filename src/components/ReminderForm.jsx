
import { useState } from 'react';

export default function ReminderForm() {
  const [tokenName, setTokenName] = useState('');
  const [xUsername, setXUsername] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [remindDays, setRemindDays] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tokenName || !xUsername || !walletAddress || !remindDays || !agreed) {
      alert('Please fill in all fields and agree to terms.');
      return;
    }

    try {
      const res = await fetch("https://x-reminder-bot.vercel.app/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: tokenName,
          twitterUsername: xUsername,
          wallet: walletAddress,
          remindInDays: remindDays
        }),
      });
      const data = await res.json();
      alert(data.message || "Reminder submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-4 rounded">
      <input className="w-full p-2 rounded text-black" placeholder="Token Name" value={tokenName} onChange={(e) => setTokenName(e.target.value)} />
      <input className="w-full p-2 rounded text-black" placeholder="X Username" value={xUsername} onChange={(e) => setXUsername(e.target.value)} />
      <input className="w-full p-2 rounded text-black" placeholder="Wallet Address" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} />
      <input className="w-full p-2 rounded text-black" placeholder="Reminder Days" value={remindDays} onChange={(e) => setRemindDays(e.target.value)} />
      <div>
        <label>
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mr-2" />
          I agree to receive reminders
        </label>
      </div>
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Submit</button>
    </form>
  );
}
