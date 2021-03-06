import * as ccurl from 'ccurl.interface.js';
import * as path from 'path';
import { ICurlHash } from '../api/CurlHash';

export class CurlHash implements ICurlHash {
  private ccurlPath: string = path.join(__dirname, '..', 'binaries', 'mac');
  public init(iota: any): void {
    iota.api.attachToTangle = this.localAttachToTangle;
    iota.api.__proto__.attachToTangle = this.localAttachToTangle;
  }
  private localAttachToTangle(
    trunkTransaction: any,
    branchTransaction: any,
    minWeightMagnitude: number,
    trytes: any,
    callback: any
  ): void {
    ccurl(
      trunkTransaction,
      branchTransaction,
      minWeightMagnitude,
      trytes,
      this.ccurlPath,
      (error: any, success: any) => {
        if (callback) {
          return callback(error, success);
        } else {
          return success;
        }
      }
    );
  }
}
