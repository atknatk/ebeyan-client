/**
 * Created by cabbar on 23.05.2017.
 */
export class SimpleDetaylibeyanKalemModel{

  kalemNo: string;
  gtip: string;

  constructor(options: {} = {}) {
    this.kalemNo = options['kalemNo'];
    this.gtip = options['gtip'];
  }
}
