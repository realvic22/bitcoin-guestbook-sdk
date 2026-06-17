/**
 * Core type definitions for the Bitcoin Guestbook SDK.
 */

/** A single guestbook entry */
export interface Entry {
  /** STX principal that wrote the entry */
  author: string;
  /** The message content (max 200 chars) */
  message: string;
  /** Bitcoin block height when the entry was included */
  block: number;
  /** Optional page/room ID this entry belongs to */
  pageId: number | null;
  /** Optional parent entry ID (for replies) */
  parentId: number | null;
  /** Optional block height at which a time-capsule entry is revealed */
  revealBlock: number | null;
}

/** A guestbook page (room/wall) */
export interface Page {
  /** STX principal that created the page */
  creator: string;
  /** Page name (max 30 chars) */
  name: string;
  /** Page description (max 80 chars) */
  description: string;
  /** Hex color for the page */
  color: string;
  /** Number of entries on this page */
  entryCount: number;
}

/** Reaction counts for the six emoji types */
export interface ReactionCounts {
  heart: number;
  pray: number;
  strong: number;
  fire: number;
  candle: number;
  star: number;
}

/** Emoji reaction IDs used in the contract */
export type EmojiId = 1 | 2 | 3 | 4 | 5 | 6;

/** Emoji labels mapped to contract IDs */
export const EMOJI: Record<string, EmojiId> = {
  HEART: 1,
  PRAY: 2,
  STRONG: 3,
  FIRE: 4,
  CANDLE: 5,
  STAR: 6,
} as const;

export const EMOJI_LABEL: Record<EmojiId, string> = {
  1: "heart",
  2: "pray",
  3: "strong",
  4: "fire",
  5: "candle",
  6: "star",
} as const;

/** SDK configuration */
export interface GuestbookConfig {
  /** Stacks contract address */
  contractAddress: string;
  /** Stacks contract name */
  contractName: string;
  /** Network: 'mainnet' or 'testnet' */
  network: "mainnet" | "testnet";
  /** Default sender address for read-only calls */
  senderAddress?: string;
}

/** Options for writing an entry */
export interface WriteOptions {
  /** The message content (required, max 200 chars) */
  message: string;
  /** Optional page/room ID */
  pageId?: number;
  /** Optional parent entry ID for replies */
  parentId?: number;
  /** Optional reveal block height for time capsules */
  revealBlock?: number;
}

/** Options for creating a page */
export interface CreatePageOptions {
  /** Page name (required, max 30 chars) */
  name: string;
  /** Page description (required, max 80 chars) */
  description: string;
  /** Hex color (required, max 7 chars, e.g. '#ff6b6b') */
  color: string;
}

/** Emoji constants matching the contract */
export const EMOJI_HEART = 1;
export const EMOJI_PRAY = 2;
export const EMOJI_STRONG = 3;
export const EMOJI_FIRE = 4;
export const EMOJI_CANDLE = 5;
export const EMOJI_STAR = 6;

/** Fee constants (microSTX) */
export const ENTRY_FEE = 10000;
export const REACTION_FEE = 1000;
export const PAGE_FEE = 50000;
export const USERNAME_FEE = 50000;
