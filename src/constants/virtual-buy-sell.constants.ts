export const GM = 1;
export const TROY_ONZ_CONSTANTS = 31.1034768;
export const TTB = 116.52;
export const KILOBAR = 1000;

export const metalObj = Object.freeze({
  GRAM: GM,
  OUNCE: TROY_ONZ_CONSTANTS,
  TTB: TTB,
  KILOBAR: KILOBAR,
});

export const METAL_TYPE_OPTIONS = [
  { value: 'TTB', label: `TTB (${metalObj.TTB} gm)` },
  { value: 'KILOBAR', label: `KILOBAR (${metalObj.KILOBAR} gm)` },
  { value: 'GRAM', label: `GRAM (${metalObj.GRAM} gm)` },
  { value: 'OUNCE', label: `OUNCE (${Number(metalObj.OUNCE.toFixed(2))} gm)` },
];

export const TRADE_TYPE = Object.freeze({
  BUY: 'BUY',
  SELL: 'SELL',
});

export const PROFIT_LOSS_TYPE = Object.freeze({
  PROFIT: 'profit',
  LOSS: 'loss',
});

export const virtualTradingFeePerGram = +(1 / metalObj.OUNCE).toFixed(5);

export const thresholdPercentage = 1;

export const AEDConversionRate = 3.674;

export const usdNeededToOpenPerGramTrade = +(136.025177 / metalObj.TTB).toFixed(6);

export const threshold = 2;

export const manualTradeThreshold = 10;

export const PRICE_GAP_LIMIT = 5;

export const ACCOUNT_STATUS = Object.freeze({
  ACTIVE: 'active',
  EQUAL: 'equal',
  HOLD: 'hold',
  BLOCKED: 'blocked',
});

export const downloadPDFEnum = Object.freeze({
  depositHistory: 'dpst',
  withdrawHistory: 'wthdrw',
  DirectIncomeHistory: 'DrctIncm',
  RoyaltyIncomeHistory: 'RyltyIncm',
  statement: 'stmnt',
  mainStatementSummary: 'mnStmnt',
  userTradeHistory: 'Trd',
  transactionHistory: 'trnsctn',
  virtualBuySellSummary: 'vrtlBySlSmry',
});
