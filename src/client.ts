import type {
  GuestbookConfig,
  Entry,
  Page,
  ReactionCounts,
  EmojiId,
  WriteOptions,
  CreatePageOptions,
} from "./types";
import { DEFAULT_MAINNET_CONFIG } from "./config";
import * as readOnly from "./read-only";
import * as tx from "./build-transaction";
import type { ContractCallOptions } from "@stacks/transactions";

export class GuestbookClient {
  readonly config: GuestbookConfig;

  constructor(config?: Partial<GuestbookConfig>) {
    this.config = { ...DEFAULT_MAINNET_CONFIG, ...config };
  }

  // ---- Read-only queries ----

  async getEntryCount(): Promise<number> {
    return readOnly.getEntryCount(this.config);
  }

  async getEntry(entryId: number): Promise<Entry | null> {
    return readOnly.getEntry(entryId, this.config);
  }

  async getPageCount(): Promise<number> {
    return readOnly.getPageCount(this.config);
  }

  async getPage(pageId: number): Promise<Page | null> {
    return readOnly.getPage(pageId, this.config);
  }

  async getReactions(entryId: number): Promise<ReactionCounts> {
    return readOnly.getReactions(entryId, this.config);
  }

  async getUserReaction(entryId: number, user: string): Promise<number | null> {
    return readOnly.getUserReaction(entryId, user, this.config);
  }

  async getPrincipal(username: string): Promise<string | null> {
    return readOnly.getPrincipal(username, this.config);
  }

  async getUsername(who: string): Promise<string | null> {
    return readOnly.getUsername(who, this.config);
  }

  async getUserEntryCount(who: string): Promise<number> {
    return readOnly.getUserEntryCount(who, this.config);
  }

  async getUserEntryAt(who: string, pos: number): Promise<number | null> {
    return readOnly.getUserEntryAt(who, pos, this.config);
  }

  async getFeesCollected(): Promise<number> {
    return readOnly.getFeesCollected(this.config);
  }

  // ---- Transaction builders ----

  buildWrite(options: WriteOptions): ContractCallOptions {
    return tx.buildWrite(options, this.config);
  }

  buildReact(entryId: number, emoji?: EmojiId): ContractCallOptions {
    return tx.buildReact(entryId, emoji, this.config);
  }

  buildCreatePage(options: CreatePageOptions): ContractCallOptions {
    return tx.buildCreatePage(options, this.config);
  }

  buildRegisterUsername(username: string): ContractCallOptions {
    return tx.buildRegisterUsername(username, this.config);
  }

  buildSeedPages(): ContractCallOptions {
    return tx.buildSeedPages(this.config);
  }

  buildWithdrawFees(): ContractCallOptions {
    return tx.buildWithdrawFees(this.config);
  }
}
