import {
  Cl,
  PostConditionMode,
  type ContractCallOptions,
} from "@stacks/transactions";
import type { StacksNetwork } from "@stacks/network";
import type { GuestbookConfig, EmojiId, WriteOptions, CreatePageOptions } from "./types";
import { resolveNetwork } from "./config";
import { ENTRY_FEE, REACTION_FEE, PAGE_FEE, USERNAME_FEE } from "./types";

function baseTx(
  config: GuestbookConfig,
  fn: string,
  args: any[],
  stxAmount?: number
): ContractCallOptions {
  const network: StacksNetwork = resolveNetwork(config.network);
  return {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: fn,
    functionArgs: args,
    network,
    postConditionMode: PostConditionMode.Allow,
    ...(stxAmount ? { stxAmount } : {}),
  };
}

export function buildWrite(options: WriteOptions, config: GuestbookConfig): ContractCallOptions {
  const args = [
    Cl.stringAscii(options.message),
    options.pageId !== undefined ? Cl.some(Cl.uint(options.pageId)) : Cl.none(),
    options.parentId !== undefined ? Cl.some(Cl.uint(options.parentId)) : Cl.none(),
    options.revealBlock !== undefined ? Cl.some(Cl.uint(options.revealBlock)) : Cl.none(),
  ];
  return baseTx(config, "write", args, ENTRY_FEE);
}

export function buildReact(
  entryId: number,
  emoji: EmojiId | undefined,
  config: GuestbookConfig
): ContractCallOptions {
  return baseTx(
    config,
    "react",
    [Cl.uint(entryId), emoji !== undefined ? Cl.some(Cl.uint(emoji)) : Cl.none()],
    emoji !== undefined ? REACTION_FEE : undefined
  );
}

export function buildCreatePage(options: CreatePageOptions, config: GuestbookConfig): ContractCallOptions {
  return baseTx(config, "create-page", [
    Cl.stringAscii(options.name),
    Cl.stringAscii(options.description),
    Cl.stringAscii(options.color),
  ], PAGE_FEE);
}

export function buildRegisterUsername(username: string, config: GuestbookConfig): ContractCallOptions {
  return baseTx(config, "register-username", [Cl.stringAscii(username)], USERNAME_FEE);
}

export function buildSeedPages(config: GuestbookConfig): ContractCallOptions {
  return baseTx(config, "seed-pages", []);
}

export function buildWithdrawFees(config: GuestbookConfig): ContractCallOptions {
  return baseTx(config, "withdraw-fees", []);
}
