"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface PriceData {
  bid: number;
  ask: number;
  high: number;
  low: number;
  timestamp: string;
}

interface PriceContextType {
  currentPrice: PriceData;
  priceHistory: PriceData[];
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export function PriceProvider({ children }: { children: React.ReactNode }) {
  const [currentPrice, setCurrentPrice] = useState<PriceData>({
    bid: 0,
    ask: 0,
    high: 0,
    low: 0,
    timestamp: new Date().toISOString(),
  });

  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);

  const dataRef = useRef({
    askPrice: 0,
    bidPrice: 0,
    lowPrice: 0,
    highPrice: 0,
  });

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);
    const updateInterval = 1000; // Update every second

    const interval = setInterval(() => {
      const newPrice = {
        bid: dataRef.current.bidPrice,
        ask: dataRef.current.askPrice,
        high: dataRef.current.highPrice,
        low: dataRef.current.lowPrice,
        timestamp: new Date().toISOString(),
      };

      setCurrentPrice(newPrice);
      setPriceHistory((prev) => [...prev, newPrice]);
    }, updateInterval);

    ws.onopen = () => console.log("Connected to WebSocket server");

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      if (newMessage) {
        dataRef.current.askPrice = newMessage.askPrice;
        dataRef.current.bidPrice = newMessage.bidPrice;
        dataRef.current.lowPrice = newMessage.lowPrice;
        dataRef.current.highPrice = newMessage.highPrice;
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      clearInterval(interval);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      clearInterval(interval);
    };

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <PriceContext.Provider value={{ currentPrice, priceHistory }}>
      {children}
    </PriceContext.Provider>
  );
}

export function usePriceContext() {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePriceContext must be used within a PriceProvider");
  }
  return context;
}
