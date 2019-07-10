import { IGtbModel } from '../model';
export class BeyanTuruModel implements IGtbModel<BeyanTuruModel> {


  id: number;
   name: string;

  constructor(options: {} = {}) {
    this.creatorModel(options);
  }

  creatorModel(options: {} = {}): BeyanTuruModel {

    this.id = options['id'];
    this.name = options['name'];
    return this;
  }
}
