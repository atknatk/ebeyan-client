import { IList } from './ilist';
/**
 * Created by cabbar on 09.05.2017.
 */

export class List implements IList {
  add(key: string, value: any): void {
  }

  remove(key: string): void {
  }

  containsKey(key: string): boolean {
    return undefined;
  }

  keys(): string[] {
    return undefined;
  }

  values(): any[] {
    return undefined;
  }

  _values: any[] = [];

  constructor(init?: { key: string; value: any; }[]) {
    if (init) {
      for (let x = 0; x < init.length; x++) {
        this[init[x].key] = init[x].value;
        this._values.push(init[x].value);
      }
    }
  }



}
