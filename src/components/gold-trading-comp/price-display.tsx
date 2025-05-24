"use client";

import { useEffect, useState } from "react";

import { LineChart } from "./line-chart";
import { GoldPrice } from "../../types/gold-price.interface";
import {
  IPriceModification,
  TGoldPriceData,
} from "../../types/identity.interface";

type PriceDataProps = {
  askPriceModification: IPriceModification;
  bidPriceModification: IPriceModification;
  goldPrice: GoldPrice;
  goldPriceData?: TGoldPriceData[];
};

type PriceDataPoint = {
  price: number;
  timestamp: number;
};

export function PriceDisplay({
  askPriceModification,
  bidPriceModification,
  goldPrice,
  goldPriceData,
}: PriceDataProps) {
  if (!goldPriceData) return null;

  const [askPriceHistory, setAskPriceHistory] = useState<PriceDataPoint[]>([]);

  // useEffect(() => {
  //   if (!goldPriceData.length) return;

  //   const initialData = goldPriceData.map((data) => {
  //     let modifiedAskPrice = data.ask;

  //     if (askPriceModification?.modificationType === "Discount") {
  //       modifiedAskPrice = data.ask - (askPriceModification?.amount ?? 0);
  //     } else if (askPriceModification?.modificationType === "Premium") {
  //       modifiedAskPrice = data.ask + (askPriceModification?.amount ?? 0);
  //     }

  //     return {
  //       price: modifiedAskPrice,
  //       timestamp: data.timestamp,
  //     };
  //   });

  //   setAskPriceHistory(initialData);
  // }, [goldPriceData, askPriceModification]);

  useEffect(() => {
    const updateInterval = 100; // 100 ms

    const interval = setInterval(() => {
      const now = Date.now();

      // const initialData = goldPriceData.map((data) => {
      //   let modifiedAskPrice = data.ask;

      //   if (askPriceModification?.modificationType === "Discount") {
      //     modifiedAskPrice = data.ask - (askPriceModification?.amount ?? 0);
      //   } else if (askPriceModification?.modificationType === "Premium") {
      //     modifiedAskPrice = data.ask + (askPriceModification?.amount ?? 0);
      //   }

      //   return {
      //     price: modifiedAskPrice,
      //     timestamp: data.timestamp,
      //   };
      // });

      let modifiedAskPrice = goldPrice.askPrice;
      if (askPriceModification?.modificationType === "Discount") {
        modifiedAskPrice =
          goldPrice.askPrice - (askPriceModification?.amount ?? 0);
      } else if (askPriceModification?.modificationType === "Premium") {
        modifiedAskPrice =
          goldPrice.askPrice + (askPriceModification?.amount ?? 0);
      }

      setAskPriceHistory((prev) => {
        const newDataPoint = {
          price: modifiedAskPrice,
          timestamp: now,
        };

        const oneHourAgo = now - 60 * 60 * 1000; // 1 hour ago

        // Keep only the last 1 hour of data
        const newHistory = [...prev, newDataPoint].filter(
          (point) => point.timestamp >= oneHourAgo
        );

        return newHistory;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, [goldPrice, askPriceModification]);

  const priceValues = askPriceHistory.map((point) => point.price);

  const maxValue = priceValues.length > 0 ? Math.max(...priceValues) : 0;
  const minValue = priceValues.length > 0 ? Math.min(...priceValues) : 0;

  const maxIndex = priceValues.indexOf(maxValue);
  const minIndex = priceValues.indexOf(minValue);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#12132d]/5 px-8 py-4 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm">
      <div className="grid grid-cols-3 items-center gap-0">
        <div className="flex space-x-12 border-r border-white/10 pr-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-yellow-500">BID</span>
              <span className="text-sm text-white/60">OZ</span>
              {bidPriceModification?.modificationType === "Discount" ? (
                <p className="text-xs text-white/60">(Discount)</p>
              ) : (
                <p className="text-xs text-white/60">(Premium)</p>
              )}
            </div>
            <div className="min-w-[140px] text-4xl font-bold text-white">
              {bidPriceModification?.modificationType === "Discount"
                ? (goldPrice.bidPrice - bidPriceModification?.amount).toFixed(2)
                : bidPriceModification?.modificationType === "Premium"
                ? (goldPrice.bidPrice + bidPriceModification?.amount).toFixed(2)
                : goldPrice.bidPrice.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-yellow-500">ASK</span>
              <span className="text-sm text-white/60">OZ</span>
              {askPriceModification?.modificationType === "Discount" ? (
                <p className="text-xs text-white/60">(Discount)</p>
              ) : (
                <p className="text-xs text-white/60">(Premium)</p>
              )}
            </div>
            <div className="min-w-[140px] text-4xl font-bold text-white">
              {askPriceModification?.modificationType === "Discount"
                ? (goldPrice.askPrice - askPriceModification?.amount).toFixed(2)
                : askPriceModification?.modificationType === "Premium"
                ? (goldPrice.askPrice + askPriceModification?.amount).toFixed(2)
                : goldPrice.askPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Line chart: */}
        <div className="px-6">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-sm text-yellow-500">ASK</span>
            <span className="text-sm text-white/60">OZ</span>
            <span className="ml-auto text-sm text-white/60">Last 1 Hour</span>
          </div>
          <div className="h-16">
            <LineChart
              data={priceValues}
              currentPrice={
                askPriceModification?.modificationType === "Discount"
                  ? goldPrice.askPrice - askPriceModification?.amount
                  : askPriceModification?.modificationType === "Premium"
                  ? goldPrice.askPrice + askPriceModification?.amount
                  : goldPrice.askPrice
              }
              maxValue={maxValue}
              minValue={minValue}
              maxIndex={maxIndex}
              minIndex={minIndex}
            />
          </div>
        </div>

        {/* High and low price show: */}
        <div className="border-l border-white/10 pl-6">
          <div className="space-y-2">
            <div className="border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-white/60">HIGH</span>
                <span className="ml-auto text-white">
                  {goldPrice.high.toFixed(2)}
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span className="text-sm text-white/60">LOW</span>
                <span className="ml-auto text-white">
                  {goldPrice.low.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
