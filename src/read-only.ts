import { fetchCallReadOnlyFunction, Cl } from "@stacks/transactions";
import type { GuestbookConfig, Entry, Page, ReactionCounts } from "./types";
import { resolveNetwork } from "./config";

function readOnlyOpts(config: GuestbookConfig, fn: string, args: any[]) {
  return {
    contractAddress: config.contractAddress,
    contractName: config.contractName,
    functionName: fn,
    functionArgs: args,
    senderAddress: config.senderAddress || config.contractAddress,
    network: resolveNetwork(config.network),
  };
}

function extractOptional(v: any): any {
  if (!v || typeof v !== "object") return null;
  return v.type === "some" ? extractValue(v.value) : null;
}

function extractValue(v: any): any {
  if (!v || typeof v !== "object") return v;
  if (v.type === "uint" || v.type === "int") return Number(v.value);
  if (v.type === "bool") return v.value;
  if (v.type === "address" || v.type === "principal" || v.type === "string-ascii") return String(v.value);
  return v.value;
}

export async function getEntryCount(config: GuestbookConfig): Promise<number> {
  const r: any = await fetchCallReadOnlyFunction(readOnlyOpts(config, "get-entry-count", []));
  return r.type === "ok" && r.value?.type === "uint" ? Number(r.value.value) : 0;
}

export async function getEntry(entryId: number, config: GuestbookConfig): Promise<Entry | null> {
  try {
    const r: any = await fetchCallReadOnlyFunction(readOnlyOpts(config, "get-entry", [Cl.uint(entryId)]));
    if (r.type === "ok" && r.value?.type === "tuple") {
      const v = r.value.value;
      return {
        author: String(v.author?.value ?? ""),
        message: String(v.message?.value ?? ""),
        block: Number(v.block?.value ?? 0),
        pageId: extractOptional(v["page-id"]),
        parentId: extractOptional(v["parent-id"]),
        revealBlock: extractOptional(v["reveal-block"]),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getPageCount(config: GuestbookConfig): Promise<number> {
  const r: any = await fetchCallReadOnlyFunction(readOnlyOpts(config, "get-page-count", []));
  return r.type === "ok" && r.value?.type === "uint" ? Number(r.value.value) : 0;
}

export async function getPage(pageId: number, config: GuestbookConfig): Promise<Page | null> {
  try {
    const r: any = await fetchCallReadOnlyFunction(readOnlyOpts(config, "get-page", [Cl.uint(pageId)]));
    if (r.type === "ok" && r.value?.type === "tuple") {
      const v = r.value.value;
      return {
        creator: String(v.creator?.value ?? ""),
        name: String(v.name?.value ?? ""),
        description: String(v.description?.value ?? ""),
        color: String(v.color?.value ?? "#9e9e9e"),
        entryCount: Number(v["entry-count"]?.value ?? 0),
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function getReactions(entryId: number, config: GuestbookConfig): Promise<ReactionCounts> {
  const zero = { heart: 0, pray: 0, strong: 0, fire: 0, candle: 0, star: 0 };
  try {
    const r: any = await fetchCallReadOnlyFunction(readOnlyOpts(config, "get-reactions", [Cl.uint(entryId)]));
    if (r.type === "ok" && r.value?.type === "tuple") {
      const v = r.value.value;
      return {
        heart: Number(v.heart?.value ?? 0),
        pray: Number(v.pray?.value ?? 0),
        strong: Number(v.strong?.value ?? 0),
        fire: Number(v.fire?.value ?? 0),
        candle: Number(v.candle?.value ?? 0),
        star: Number(v.star?.value ?? 0),
      };
    }
    return zero;
  } catch {
    return zero;
  }
}

export async function getUserReaction(entryId: number, user: string, config: GuestbookConfig): Promise<number | null> {
  try {
    const r: any = await fetchCallReadOnlyFunction(
      readOnlyOpts(config, "get-user-reaction", [Cl.uint(entryId), Cl.principal(user)])
    );
    if (r.type === "ok") return r.value?.type === "some" ? Number(r.value.value?.value ?? 0) : null;
    return null;
  } catch {
    return null;
  }
}

export async function getPrincipal(username: string, config: GuestbookConfig): Promise<string | null> {
  try {
    const r: any = await fetchCallReadOnlyFunction(
      readOnlyOpts(config, "get-principal", [Cl.stringAscii(username)])
    );
    return r.type === "ok" && r.value?.type === "principal" ? String(r.value.value) : null;
  } catch {
    return null;
  }
}

export async function getUsername(who: string, config: GuestbookConfig): Promise<string | null> {
  try {
    const r: any = await fetchCallReadOnlyFunction(
      readOnlyOpts(config, "get-username", [Cl.principal(who)])
    );
    if (r.type === "ok") return r.value?.type === "some" ? String(r.value.value?.value ?? "") : null;
    return null;
  } catch {
    return null;
  }
}

export async function getUserEntryCount(who: string, config: GuestbookConfig): Promise<number> {
  const r: any = await fetchCallReadOnlyFunction(
    readOnlyOpts(config, "get-user-entry-count", [Cl.principal(who)])
  );
  return r.type === "ok" && r.value?.type === "uint" ? Number(r.value.value) : 0;
}

export async function getUserEntryAt(who: string, pos: number, config: GuestbookConfig): Promise<number | null> {
  try {
    const r: any = await fetchCallReadOnlyFunction(
      readOnlyOpts(config, "get-user-entry-at", [Cl.principal(who), Cl.uint(pos)])
    );
    return r.type === "ok" && r.value?.type === "uint" ? Number(r.value.value) : null;
  } catch {
    return null;
  }
}

export async function getFeesCollected(config: GuestbookConfig): Promise<number> {
  const r: any = await fetchCallReadOnlyFunction(readOnlyOpts(config, "get-fees-collected", []));
  return r.type === "ok" && r.value?.type === "uint" ? Number(r.value.value) : 0;
}
