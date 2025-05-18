"use client";

import { useEffect, useRef } from "react";

interface LineChartProps {
  data: number[];
  currentPrice: number;
  maxValue?: number;
  minValue?: number;
  maxIndex?: number;
  minIndex?: number;
}

export function LineChart({
  data,
  currentPrice,
  maxValue,
  minValue,
  maxIndex,
  minIndex,
}: LineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || data.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Use exact min and max values for scaling (no buffer)
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1; // Prevent division by zero

    // Create gradient for the line
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "rgba(234, 179, 8, 0.8)"); // Yellow (top)
    gradient.addColorStop(1, "rgba(234, 179, 8, 0.2)"); // Yellow (bottom, more transparent)

    // Draw the line
    ctx.beginPath();
    ctx.strokeStyle = "rgba(234, 179, 8, 1)"; // Yellow
    ctx.lineWidth = 2;

    // Store coordinates for max and min points
    let maxX = 0,
      maxY = 0,
      minX = 0,
      minY = 0;

    // Draw the path
    data.forEach((price, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((price - min) / range) * height;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Store coordinates for max and min points
      if (maxIndex !== undefined && i === maxIndex) {
        maxX = x;
        maxY = y; // This will be at the top of the chart (y = 0)
      }
      if (minIndex !== undefined && i === minIndex) {
        minX = x;
        minY = y; // This will be at the bottom of the chart (y = height)
      }
    });

    // Stroke the line
    ctx.stroke();

    // Fill area under the line
    const lastPoint = data.length - 1;
    const lastX = (lastPoint / (data.length - 1)) * width;
    const lastY = height - ((data[lastPoint] - min) / range) * height;

    ctx.lineTo(lastX, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = "rgba(234, 179, 8, 0.1)";
    ctx.fill();

    // Draw a dot at the current price point
    const currentX = width;
    const currentY = height - ((currentPrice - min) / range) * height;

    ctx.beginPath();
    ctx.arc(currentX, currentY, 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(234, 179, 8, 1)";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Add subtle grid lines
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let i = 0; i < 5; i++) {
      const y = (height / 4) * i;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.stroke();

    // Draw the latest value in the middle of the chart
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Create a semi-transparent background for the text
    const text = `Current: ${currentPrice.toFixed(2)}`;
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = 20;
    const textX = width / 2;
    const textY = height / 2;

    // Draw background for text
    ctx.fillStyle = "rgba(18, 19, 45, 0.7)"; // Match the container background
    ctx.beginPath();
    ctx.roundRect(
      textX - textWidth / 2 - 10,
      textY - textHeight / 2,
      textWidth + 20,
      textHeight,
      4
    );
    ctx.fill();

    // Draw text
    ctx.fillStyle = "rgba(234, 179, 8, 1)"; // Yellow to match the line
    ctx.fillText(text, textX, textY);

    // Draw max value indicator (green dot)
    if (maxIndex !== undefined && maxIndex >= 0) {
      ctx.beginPath();
      ctx.arc(maxX, maxY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 197, 94, 1)"; // Green
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw max value text
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(34, 197, 94, 1)";
      ctx.fillText(maxValue?.toFixed(2) || "", maxX, maxY - 10);
    }

    // Draw min value indicator (red dot)
    if (minIndex !== undefined && minIndex >= 0) {
      ctx.beginPath();
      ctx.arc(minX, minY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(239, 68, 68, 1)"; // Red
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw min value text
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(239, 68, 68, 1)";
      ctx.fillText(minValue?.toFixed(2) || "", minX, minY + 15);
    }

    // Draw max value at top of chart
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(34, 197, 94, 1)"; // Green
    ctx.fillText(`Max: ${max.toFixed(2)}`, 5, 12);

    // Draw min value at bottom of chart
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(239, 68, 68, 1)"; // Red
    ctx.fillText(`Min: ${min.toFixed(2)}`, 5, height - 5);
  }, [data, currentPrice, maxValue, minValue, maxIndex, minIndex]);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        width={300}
        height={64}
        className="w-full h-full"
      />
    </div>
  );
}
