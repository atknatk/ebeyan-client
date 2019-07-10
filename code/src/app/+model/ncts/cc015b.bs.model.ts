/**
 * Created by Cabbar on 8.07.2017.
 */
import { DnXmlElementPascal } from '../../shared/utils/dn-serialize';
import { ModelBase } from '../model';

export class BSModel extends ModelBase {

  @DnXmlElementPascal()
  namBeyanSahibi: string;

  @DnXmlElementPascal()
  stBeyanSahibi: string;

  @DnXmlElementPascal()
  citBeyanSahibi: string;

  @DnXmlElementPascal()
  tinBeyanSahibi: string;

  @DnXmlElementPascal()
  musavirVergino: string;

  @DnXmlElementPascal()
  musavirUnvan: number;

  constructor(options: {} = {}) {
    super();
    this.equalizer(options);
  }
}
