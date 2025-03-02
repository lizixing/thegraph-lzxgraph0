// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  DataSourceTemplate,
  DataSourceContext
} from "@graphprotocol/graph-ts";

export class MetaCoinTpl extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("MetaCoinTpl", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "MetaCoinTpl",
      [address.toHex()],
      context
    );
  }
}
