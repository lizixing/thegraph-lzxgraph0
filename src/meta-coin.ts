import {BigDecimal, log} from "@graphprotocol/graph-ts"
import {MetaCoin, SendCoinCall, Transfer as TransferEvent} from "../generated/MetaCoin/MetaCoin"
import {Transfer} from "../generated/schema"
import {buildID} from "./common";
import {Address, BigInt} from "@graphprotocol/graph-ts/common/numbers";
import {ethereum} from "@graphprotocol/graph-ts/chain/ethereum";
import {dataSource} from "@graphprotocol/graph-ts/common/datasource";
import {Bytes} from "@graphprotocol/graph-ts/common/collections";
import {MetaCoinTpl} from "../generated/templates";

export function handleTransfer(event: TransferEvent): void {
  log.info("enter handlerTransfer", []);
  let entity = new Transfer(buildID(event))
  log.info("step-1 built entity", []);
  entity._from = event.params._from
  entity._to = event.params._to
  entity._value = event.params._value
  log.info("step-2", []);

  let ctx = dataSource.context()
  let transactions = ctx.getString("transactions")

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.logIndex = event.logIndex

  let mcAddr = event.transaction.to
  if (mcAddr !== null) {
    let mc = MetaCoin.bind(mcAddr)
    entity.srcBalance = mc.getBalance(event.params._from)
    entity.dstBalance = mc.getBalance(event.params._to)
  }

  log.info("step-3, srcBalance = {}, dstBalance = {}", [
    entity.srcBalance.toString(),
    entity.dstBalance.toString(),
  ]);
  entity.save()

  log.info("blockNumber = {}, logIndex = {}, transactionHash = {}", [
    event.block.number.toHexString(),
    event.logIndex.toHexString(),
    event.transaction.hash.toHexString(),
  ]);

  MetaCoinTpl.create(event.params._to)
}

export function processTransfer(transfer: Transfer): Transfer {
  log.info("before transfer.id = {}", [transfer.id.toHexString()])
  log.info("before transfer._from = {}", [transfer._from.toHexString()])
  log.info("before transfer._to = {}", [transfer._to.toHexString()])
  // log.info("before transfer._value = {}", [transfer._value.toString()]) // transfer._value is lost
  transfer._value = BigInt.fromI32(1234567890)
  log.info("after transfer.id = {}", [transfer.id.toHexString()])
  log.info("after transfer._from = {}", [transfer._from.toHexString()])
  log.info("after transfer._to = {}", [transfer._to.toHexString()])
  log.info("after transfer._value = {}", [transfer._value.toString()])
  return transfer
}

export function handleSendCoin(call: SendCoinCall): void {
  log.info("called send coin, receiver:{}, amount:{}, retV1:{}, retV2:{}", [
    call.inputs.receiver.toString(),
    call.inputs.amount.toString(),
    call.outputs.v1.toString(),
    call.outputs.v2.toString(),
  ])
}

export function add(a: i32, b: i32): i32 {
  log.info("a = {}, b = {}", [a.toString(), b.toString()])
  return a + b
}

export function floatAdd(a: f32, b: f32): f64 {
  return a + b
}

export function foo(a: string, b: string, c: string): string {
  return a.indexOf(c) >= 0 ? a : b
}

export function indexOf(a: string, b: string): i32 {
  return a.indexOf(b)
}

export function bar(a: string, b: string): string {
  return "中文中文中文中文中文" + a + b;
}

export function returnString(n: i32): string {
  let s: string = "头";
  for (let i: i32 = 0; i < n; i++) {
    s = s + 'a'
  }
  return s
}

export function returnStringV2(s: string): string {
  return s
}

export class MyEvent {
  constructor(
    public array1: Array<boolean>,
    public array2: Array<u8> | null,
    public params: Array<ethereum.EventParam>,
    public intKey10: i8,
    public intKey11: i8,
    public intKey12: i8,
    public intKey2: i16,
    public intKey4: i64,
    public intKey3: i32,
    public boolKey: boolean,
    public floatKey1: f32,
    public floatKey2: f64,
    public address: Address | null,
    public message: string,
    public intKey20: i8,
    public intKey21: i8,
    public intKey22: i8,
    public bigIntKey1: BigInt,
    public bigIntKey2: BigInt,
    public bigIntKey3: BigInt,
    public bigDecimalKey1: BigDecimal,
    public bigDecimalKey2: BigDecimal,
    public bigDecimalKey3: BigDecimal,
  ) {
  }
}

export function returnMyEvent(): MyEvent {
  let arr1: Array<boolean> = new Array<boolean>(5);
  for (let i = 0; i < 5; i++) {
    arr1[i] = i % 2 == 0
  }
  let arr2: Array<u8> = new Array<u8>(10);
  for (let i: u8 = 0; i < 10; i++) {
    arr2[i] = i + 10
  }
  let params: Array<ethereum.EventParam> = new Array<ethereum.EventParam>();
  params.push(new ethereum.EventParam("param1", ethereum.Value.fromBoolean(true)))
  params.push(new ethereum.EventParam("param2", ethereum.Value.fromString("value-2")))
  params.push(new ethereum.EventParam("param3", ethereum.Value.fromAddress(
    Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121314")))))
  let addr: Address = Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121318"))
  return new MyEvent(arr1, arr2, params,
    111, 112, 113, 114, 115, 116,
    true, 178.125, 0.00125, addr, "message12",
    117, 118, 119,
    BigInt.fromU32(3333333333),
    BigInt.fromI32(-1111111111),
    BigInt.zero(),
    new BigDecimal(BigInt.fromI32(-1111111111)),
    BigDecimal.fromString("11111111.22222222"),
    BigDecimal.fromString("-11111111.22222222"))
}

export function returnMyEventV2(event: MyEvent): MyEvent {
  event.message = event.message + "-suffix"
  event.floatKey1 += 10000
  event.floatKey2 += 20000
  event.boolKey = !event.boolKey
  event.address = Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121318"))
  event.array2 = null
  event.intKey22 = -111
  event.bigIntKey3 = event.bigIntKey1.minus(event.bigIntKey2)
  event.bigDecimalKey3 = event.bigDecimalKey1.times(event.bigDecimalKey2)
  return event
}

export function returnEvent(): TransferEvent {
  let params: Array<ethereum.EventParam> = new Array<ethereum.EventParam>()
  params.push(new ethereum.EventParam("param1", ethereum.Value.fromAddress(
    Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121318")))))
  params.push(new ethereum.EventParam("param2", ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(118))))
  return new TransferEvent(
    Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121314")),
    BigInt.fromI32(100),
    BigInt.fromI32(101),
    "logType",
    new ethereum.Block(
      Bytes.fromHexString("0xbbb0"),
      Bytes.fromHexString("0xbbb1"),
      Bytes.fromHexString("0xbbb2"),
      Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121315")),
      Bytes.fromI32(102),
      Bytes.fromI32(103),
      Bytes.fromI32(104),
      BigInt.fromI32(105),
      BigInt.fromI32(106),
      BigInt.fromI32(107),
      BigInt.fromI32(108),
      BigInt.fromI32(109),
      BigInt.fromI32(110),
      BigInt.fromI32(111),
      BigInt.fromI32(112),
    ),
    new ethereum.Transaction(
      Bytes.fromHexString("0xbbb3"),
      BigInt.fromI32(113),
      Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121316")),
      Address.fromBytes(Bytes.fromHexString("0102030405060708090a0b0c0d0e0f1011121317")),
      BigInt.fromI32(114),
      BigInt.fromI32(115),
      BigInt.fromI32(116),
      Bytes.fromHexString("0xbbb4"),
      BigInt.fromI32(117),
    ),
    params,
    null,
  )
}