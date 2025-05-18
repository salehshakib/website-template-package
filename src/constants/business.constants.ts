export const BUSINESS_STATUS = Object.freeze({
  NOT_SUBMITTED: 'NOT_SUBMITTED',
  SUBMITTED: 'SUBMITTED',
  REVIEWING: 'REVIEWING',
  REJECTED: 'REJECTED',
  RESUBMITTED: 'RESUBMITTED',
  APPROVED: 'APPROVED',
  PENDING: 'PENDING',
} as const);

export type TBusinessStatus = keyof typeof BUSINESS_STATUS;

export const BUSINESS_DOC_TYPES = Object.freeze({
  TRADE_LICENSE: 'TRADE_LICENSE',
} as const);

export type TBusinessDocTypes = keyof typeof BUSINESS_DOC_TYPES;
