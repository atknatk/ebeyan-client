/**
 * Created by cabbar on 23.05.2017.
 */
export class BankaKodModel {
  id: number;
  name: string;
  constructor(options: {} = {}) {
    this.id= options['id'];
    this.name = options['name'];
  }
}
