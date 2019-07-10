export class LimanKodModel {

  id: number;
  name: string;

  constructor(options: {} = {}) {
    this.id = options['id'];
   this.name = options['name'];
  }
}
