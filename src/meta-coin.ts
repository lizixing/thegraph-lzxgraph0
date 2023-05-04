import { log } from "@graphprotocol/graph-ts"
import { Transfer as TransferEvent } from "../generated/MetaCoin/MetaCoin"
import { Transfer } from "../generated/schema"
import { buildID } from "./common";

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(buildID(event))
  entity._from = event.params._from
  entity._to = event.params._to
  entity._value = event.params._value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex

  entity.save()

  log.info("blockNumber = {}, logIndex = {}, transactionHash = {}", [
    event.block.number.toHexString(),
    event.logIndex.toHexString(),
    event.transaction.hash.toHexString(),
  ]);
}
