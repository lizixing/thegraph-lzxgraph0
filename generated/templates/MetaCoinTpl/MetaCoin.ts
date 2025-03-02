// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get _from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get _extra1(): i32 {
    return this._event.parameters[3].value.toI32();
  }

  get _extra2(): Array<Transfer_extra2Struct> {
    return this._event.parameters[4].value.toTupleArray<
      Transfer_extra2Struct
    >();
  }
}

export class Transfer_extra2Struct extends ethereum.Tuple {
  get addr(): Address {
    return this[0].toAddress();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }

  get person(): Array<Transfer_extra2PersonStruct> {
    return this[2].toTupleArray<Transfer_extra2PersonStruct>();
  }
}

export class Transfer_extra2PersonStruct extends ethereum.Tuple {
  get name(): string {
    return this[0].toString();
  }

  get age(): i32 {
    return this[1].toI32();
  }

  get p1(): BigInt {
    return this[2].toBigInt();
  }

  get p2(): BigInt {
    return this[3].toBigInt();
  }
}

export class MetaCoin__getConvertorResult {
  value0: Address;
  value1: BigInt;

  constructor(value0: Address, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getAddr(): Address {
    return this.value0;
  }

  getRate(): BigInt {
    return this.value1;
  }
}

export class MetaCoin__sendCoinResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getV1(): BigInt {
    return this.value0;
  }

  getV2(): BigInt {
    return this.value1;
  }
}

export class MetaCoin extends ethereum.SmartContract {
  static bind(address: Address): MetaCoin {
    return new MetaCoin("MetaCoin", address);
  }

  getConvertor(): MetaCoin__getConvertorResult {
    let result = super.call(
      "getConvertor",
      "getConvertor():(address,uint256)",
      []
    );

    return new MetaCoin__getConvertorResult(
      result[0].toAddress(),
      result[1].toBigInt()
    );
  }

  try_getConvertor(): ethereum.CallResult<MetaCoin__getConvertorResult> {
    let result = super.tryCall(
      "getConvertor",
      "getConvertor():(address,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MetaCoin__getConvertorResult(
        value[0].toAddress(),
        value[1].toBigInt()
      )
    );
  }

  sendCoin(receiver: Address, amount: BigInt): MetaCoin__sendCoinResult {
    let result = super.call(
      "sendCoin",
      "sendCoin(address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(receiver),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );

    return new MetaCoin__sendCoinResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_sendCoin(
    receiver: Address,
    amount: BigInt
  ): ethereum.CallResult<MetaCoin__sendCoinResult> {
    let result = super.tryCall(
      "sendCoin",
      "sendCoin(address,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromAddress(receiver),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new MetaCoin__sendCoinResult(value[0].toBigInt(), value[1].toBigInt())
    );
  }

  getBalanceInEth(addr: Address): BigInt {
    let result = super.call(
      "getBalanceInEth",
      "getBalanceInEth(address):(uint256)",
      [ethereum.Value.fromAddress(addr)]
    );

    return result[0].toBigInt();
  }

  try_getBalanceInEth(addr: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getBalanceInEth",
      "getBalanceInEth(address):(uint256)",
      [ethereum.Value.fromAddress(addr)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getBalance(addr: Address): BigInt {
    let result = super.call("getBalance", "getBalance(address):(uint256)", [
      ethereum.Value.fromAddress(addr)
    ]);

    return result[0].toBigInt();
  }

  try_getBalance(addr: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getBalance", "getBalance(address):(uint256)", [
      ethereum.Value.fromAddress(addr)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  convert(amount: BigInt): BigInt {
    let result = super.call("convert", "convert(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);

    return result[0].toBigInt();
  }

  try_convert(amount: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("convert", "convert(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(amount)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class SendCoinCall extends ethereum.Call {
  get inputs(): SendCoinCall__Inputs {
    return new SendCoinCall__Inputs(this);
  }

  get outputs(): SendCoinCall__Outputs {
    return new SendCoinCall__Outputs(this);
  }
}

export class SendCoinCall__Inputs {
  _call: SendCoinCall;

  constructor(call: SendCoinCall) {
    this._call = call;
  }

  get receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SendCoinCall__Outputs {
  _call: SendCoinCall;

  constructor(call: SendCoinCall) {
    this._call = call;
  }

  get v1(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get v2(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}
