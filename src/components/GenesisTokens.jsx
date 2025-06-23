import React, { useEffect, useState } from 'react';

const GenesisTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy loading simulation
    setTimeout(() => {
      setTokens([
        {
          ticker: "JARVIS",
          price: "0.0123",
          change: "+5.6%",
          stakeRatio: "42.1%",
          fdv: "$1,230,000",
          lp: "0xb00c5f0f9aa2f95057d7b9a18ad7d2d18f6ff298",
        }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="text-white">
      {loading ? (
        <div className="text-center text-lg animate-pulse">Loading... Keep calm Virgen 🧘‍♂️</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token, i) => (
            <div key={i} className="bg-black rounded-xl p-4 border border-gray-700 shadow">
              <h2 className="text-xl font-bold mb-2">{token.ticker}</h2>
              <p>Price: ${token.price}</p>
              <p>24h Change: {token.change}</p>
              <p>Stake Ratio: {token.stakeRatio}</p>
              <p>FDV: {token.fdv}</p>
              <div className="mt-3">
                <iframe
                  src={`https://dexscreener.com/base/${token.lp}`}
                  height="300"
                  width="100%"
                  frameBorder="0"
                  title="chart"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenesisTokens;
