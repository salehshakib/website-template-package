"use client";

import { useEffect, useState } from "react";
import { GoldPrice } from "../../types/gold-price.interface";
import { IPriceModification } from "../../types/identity.interface";

type PriceDataProps = {
  askPriceModification: IPriceModification;
  bidPriceModification: IPriceModification;
  goldPrice: GoldPrice;
};

export function PriceHistory({
  askPriceModification,
  bidPriceModification,
  goldPrice,
}: PriceDataProps) {
  const [priceHistory, setPriceHistory] = useState<GoldPrice[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPriceHistory((prev) => {
        console.log(new Date(goldPrice.timestamp).toISOString());
        const newHistory = [goldPrice, ...prev]; // Add new data at the beginning
        return newHistory.slice(0, 10); // Keep only the last 10 values
      });
    }, 1000); // Update every 1 second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // useEffect(() => {
  //   setPriceHistory((prev) => [goldPrice, ...prev].slice(0, 10));
  // }, [goldPrice]);

  return (
    <div>
      <h2 className="mb-4 text-sm text-white/60">
        Price History (Last 10 Values)
      </h2>
      <div className="rounded-2xl border border-white/10 bg-[#12132d]/5 px-6 py-2 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm text-white/60">
                <th className="py-2 text-left">Time</th>
                <th className="py-2 text-right">BID</th>
                <th className="py-2 text-right">ASK</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory.length > 0 ? (
                priceHistory.map((price, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/5 text-white"
                  >
                    <td className="py-2 text-sm">
                      {new Date(price.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2 text-right">
                      {bidPriceModification?.modificationType.toLowerCase() ===
                      "discount"
                        ? Number(
                            price.bidPrice - bidPriceModification.amount
                          ).toFixed(2)
                        : Number(
                            price.bidPrice + bidPriceModification.amount
                          ).toFixed(2)}
                    </td>
                    <td className="py-2 text-right">
                      {askPriceModification?.modificationType.toLowerCase() ===
                      "discount"
                        ? Number(
                            price.askPrice - askPriceModification.amount
                          ).toFixed(2)
                        : Number(
                            price.askPrice + askPriceModification.amount
                          ).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-white/60">
                    No price history available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
