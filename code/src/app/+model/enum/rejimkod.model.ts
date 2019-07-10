export class RejimKodModel {

  id: string;
  name: string;
  constructor(options: {} = {}) {
    this.id= options['id'];
    this.name = options['name'];
  }
}
