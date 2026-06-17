import { STACKS_MAINNET, STACKS_TESTNET, type StacksNetwork } from "@stacks/network";
import type { GuestbookConfig } from "./types";

export const DEFAULT_MAINNET_CONFIG: GuestbookConfig = {
  contractAddress: "SP2X9XZZHGXMCV14WZ6FCNPH6JMR0NMASQGA3GAB1",
  contractName: "guestbook-v2",
  network: "mainnet",
};

export const DEFAULT_TESTNET_CONFIG: GuestbookConfig = {
  contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  contractName: "guestbook",
  network: "testnet",
};

export function resolveNetwork(network: "mainnet" | "testnet"): StacksNetwork {
  return network === "mainnet" ? STACKS_MAINNET : STACKS_TESTNET;
}
