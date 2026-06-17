// Core types
export type {
  Entry,
  Page,
  ReactionCounts,
  EmojiId,
  GuestbookConfig,
  WriteOptions,
  CreatePageOptions,
} from "./types";

export {
  EMOJI,
  EMOJI_LABEL,
  EMOJI_HEART,
  EMOJI_PRAY,
  EMOJI_STRONG,
  EMOJI_FIRE,
  EMOJI_CANDLE,
  EMOJI_STAR,
  ENTRY_FEE,
  REACTION_FEE,
  PAGE_FEE,
  USERNAME_FEE,
} from "./types";

// Config
export {
  DEFAULT_MAINNET_CONFIG,
  DEFAULT_TESTNET_CONFIG,
  resolveNetwork,
} from "./config";

// Read-only contract calls
export {
  getEntryCount,
  getEntry,
  getPageCount,
  getPage,
  getReactions,
  getUserReaction,
  getPrincipal,
  getUsername,
  getUserEntryCount,
  getUserEntryAt,
  getFeesCollected,
} from "./read-only";

// Transaction builders
export {
  buildWrite,
  buildReact,
  buildCreatePage,
  buildRegisterUsername,
  buildSeedPages,
  buildWithdrawFees,
} from "./build-transaction";

// Unified client
export { GuestbookClient } from "./client";
