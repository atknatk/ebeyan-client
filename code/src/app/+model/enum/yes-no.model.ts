/**
 * Created by cabbar on 23.05.2017.
 */
export class YesNoModel {

  id: number;
  name: string;
  otherName: string;
  otherNameVY: string;

  constructor(options: {} = {}) {
    this.id = options['id'];
    this.name = options['name'];
    this.otherName = options['otherName'];
    if (this.id == 1) {
      this.otherNameVY = 'V';
    } else if (this.id == 2) {
      this.otherNameVY = 'S';
    }

  }
}
