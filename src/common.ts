import {Bytes} from "@graphprotocol/graph-ts";
import {Transfer as TransferEvent} from "../generated/MetaCoin/MetaCoin";

export function foo(a: string, b: string): string {
  return a + b
}

export function buildID(event: TransferEvent): Bytes {
  return event.transaction.hash.concatI32(event.logIndex.toI32() + 1)
}
