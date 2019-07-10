/**
 * Created by cabbar on 30.03.2017.
 */
export class DnKeyValueBase<T>{
  key: T;
  value: string;


  constructor(options: {
                key?: T
                value?: string,
              } = {}) {
    this.key = options.key;
    this.value = options.value || '';
  }
}
