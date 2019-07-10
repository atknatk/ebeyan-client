export class UlkeModel {

  id: number;
  name: string;

  constructor(options: {} = {}) {
    this.id = options['id'];
    this.name = options['name'];
  }
}
