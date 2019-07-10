import { Injectable } from '@angular/core';
import { DetayliBeyanBilgiModel } from '../../+model/detaylibeyan/detaylibeyan-bilgi.model';

@Injectable()
export class DetaylibeyanAlldataValidationService {
  private readonly errorList: string[] = [];

  public check(detaylibeyan: DetayliBeyanBilgiModel): string[] {
    return this.errorList;
  }
}
