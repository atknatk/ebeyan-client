/**
 * Created by cabbar on 18.05.2017.
 */
export interface IList{
  add(key: string, value: any): void;
  remove(key: string): void;
  containsKey(key: string): boolean;
  keys(): string[];
  values(): any[];
}
