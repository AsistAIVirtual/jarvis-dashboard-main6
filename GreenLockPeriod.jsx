
import greenLockData from '../data/greenLockData_withLaunchTime.json';

function calculateRemainingDays(item) {
  const [hour, minute] = item.launchTime ? item.launchTime.split(':').map(Number) : [0, 0];
  const launchDateTime = new Date(item.date);
  launchDateTime.setHours(hour, minute, 0, 0);

  const now = new Date();
  const diffTime = now - launchDateTime;
  const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const remaining = item.baseUnlock - daysPassed;
  return remaining > 0 ? remaining : 0;
}

export default function GreenLockPeriod() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">🔒 Green Lock Period</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {greenLockData.map((token) => (
          <div
            key={token.ticker}
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <img src={token.image} alt={token.name} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold">{token.name}</h3>
                <p className="text-xs text-gray-400">{token.ticker}</p>
              </div>
            </div>
            <p className="text-sm text-yellow-300 mb-1 font-mono">
              ⏳ Unlocking Token: <strong>{calculateRemainingDays(token)} days</strong>
            </p>
            <p className="text-xs text-gray-300">Participants: {token.participants}</p>
            <p className="text-xs text-gray-400">Oversub: {token.oversub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
