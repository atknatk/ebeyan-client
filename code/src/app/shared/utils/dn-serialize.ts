import { isNullOrUndefined } from '@dinazor/core';
import * as moment from 'moment';

/**
 * Created by cabbar on 06.05.2017.
 */

export class DnXmlSerialize {
  static xmlSerializeProp: string = '__xmlProp__';

  static serialize(obj: any, option?: any): string {
    if (isNullOrUndefined(option)) {
      option = {removeNullTags: false};
    }
    let sb = [];
    this._serialize(obj, 0, sb, option);
    return sb.join('');
  }

  static serializeNcts(obj: any): string {
    let sb = [];
    this._serializeNcts(obj, 0, sb, {removeNullTags: true});
    return sb.join('');
  }

  private static _serialize(obj: any, tab: number, builder: string[], option) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop.toUpperCase() === 'GUAGUA') {
          const a = 1;
        }
        if (prop.startsWith(this.xmlSerializeProp) ||
          prop == 'constructor') return;

        let val = obj[prop];
        if (Object.prototype.toString.call(val) === '[object Array]') {
          let decoratedProp = this.getXmlName(obj, prop);
          this.appendStartTag(decoratedProp, tab, builder);
          this.appendLine(builder);
          val.forEach(arrItem => {
            let rootTag = this.getXmlRootName(obj, prop);
            this.appendStartTag(rootTag, tab, builder);
            this._serialize(arrItem, tab, builder, option);
            this.appendFinishTag(rootTag, tab, builder, option);
          });
          this.appendLine(builder);
          this.appendFinishTag(decoratedProp, tab, builder, option);
        } else if (val !== null && val instanceof Date) {
          this.addElementWithControl(obj, prop, val, tab, builder, null, option);
        } else if (val !== null && typeof val === 'object') {
          if (this.checkModelDecorate(obj, prop)) {
            this.addElementWithControl(obj, prop, val, tab, builder, obj[this.xmlSerializeProp], option);
            continue;
          }
          let decoratedProp = this.getXmlName(obj, prop);
          let namespace = this.getXmlNamespace(obj, prop);
          if (namespace != null) {
            this.appendStartTagWithNamespace(decoratedProp, namespace, tab, builder);
          } else {
            this.appendStartTag(decoratedProp, tab, builder);
          }
          this.appendLine(builder);
          this._serialize(val, tab + 1, builder, option);
          this.appendLine(builder);
          this.appendFinishTag(decoratedProp, tab, builder, option);
        } else {
          this.addElementWithControl(obj, prop, val, tab, builder, null, option);
        }
      }
    }
  }

  private static _serializeNcts(obj: any, tab: number, builder: string[], option) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (prop.toUpperCase() === 'GUAGUA') {
          const a = 1;
        }
        if (prop.startsWith(this.xmlSerializeProp) ||
          prop == 'constructor') return;

        let val = obj[prop];
        if (Object.prototype.toString.call(val) === '[object Array]') {
          let decoratedProp = this.getXmlName(obj, prop);
          val.forEach(arrItem => {
            this.appendStartTag(decoratedProp, tab, builder);
            this._serializeNcts(arrItem, tab, builder, option);
            this.appendFinishTag(decoratedProp, tab, builder, option);
          });
        } else if (val !== null && val instanceof Date) {
          this.addElementWithControl(obj, prop, val, tab, builder, null, option);
        } else if (val !== null && typeof val === 'object') {
          if (this.checkModelDecorate(obj, prop)) {
            this.addElementWithControl(obj, prop, val, tab, builder, obj[this.xmlSerializeProp], option);
            continue;
          }
          let decoratedProp = this.getXmlName(obj, prop);
          let namespace = this.getXmlNamespace(obj, prop);
          if (namespace != null) {
            this.appendStartTagWithNamespace(decoratedProp, namespace, tab, builder);
          } else {
            this.appendStartTag(decoratedProp, tab, builder);
          }
          this.appendLine(builder);
          this._serializeNcts(val, tab + 1, builder, option);
          this.appendLine(builder);
          this.appendFinishTag(decoratedProp, tab, builder, option);
        } else {
          this.addElementWithControl(obj, prop, val, tab, builder, null, option);
        }
      }
    }
  }

  private static addElement(tag, value, tab: number, builder: string[], option: any) {

    // if (value == null || value === undefined || (typeof value === 'boolean' && !value)) {
    //   this.appendNullTag(tag, tab, builder);
    // } else {
    this.appendStartTag(tag, tab, builder);
    if (typeof value === 'boolean' && value) {
      builder.push('EVET');
    } else if (typeof value === 'boolean' && !value) {
      builder.push('HAYIR');
    } else if (value instanceof Date) {
      builder.push(this.toStringDateTimeT(value));
    } else {
      builder.push(value);
    }

    this.appendFinishTag(tag, 0, builder, option);
    this.appendLine(builder);
    // }

  }

  private static addElementWithControl(obj, tag, value, tab: number, builder: string[], xmlArr: XmlProp[], option: any) {
    let ths = this;
    if (!xmlArr || xmlArr == null) {
      xmlArr = obj[this.xmlSerializeProp];
    }

    if (!xmlArr) {
      this.addElement(tag, value, tab, builder, option);
      return;
    }

    let xmlProp = xmlArr.filter(xml => xml.decoratedPropertyName == tag)[0];
    if (!xmlProp) {
      this.addElement(tag, value, tab, builder, option);
      return;
    }

    if (xmlProp.ignore) {
      return;
    }

    if (xmlProp.modelProperties.length != 0) {
      xmlProp.modelProperties.forEach(modelProp => {
        if (value == null || value === undefined) {
          if (option.removeNullTags === false) {
            ths.appendNullTag(modelProp.xmlName, tab, builder);
          }
          return;
        }
        ths.addElement(modelProp.xmlName, value[modelProp.modelName], tab, builder, option);
      });
      return;
    }

    if (xmlProp.xmlSerializeName) {
      if (xmlProp.xmlNamespace) {
        ths.addElementWithNamespace(xmlProp.xmlSerializeName, xmlProp.xmlNamespace, value, tab, builder, option);
      } else {
        if (option.removeNullTags === false) {
          ths.addElement(xmlProp.xmlSerializeName, value, tab, builder, option);
        } else if (!isNullOrUndefined(value)) {
          ths.addElement(xmlProp.xmlSerializeName, value, tab, builder, option);
        }
      }

    }


  }

  private static addElementWithNamespace(tag, namespace, value, tab: number, builder: string[], option: any) {

    if (value == null || value === undefined) {
      this.appendNullTag(tag, tab, builder);
    } else {
      this.appendStartTagWithNamespace(tag, namespace, tab, builder);
      builder.push(value);
      this.appendFinishTag(tag, 0, builder, option);
      this.appendLine(builder);
    }

  }

  private static appendFinishTag(tag, tab: number, builder, option: any) {
    if (isNullOrUndefined(tag)) return;
    if (builder[builder.length - 2] === tag && option.removeNullTags === true) {
      builder.splice(-3, 3);
      return;
    }
    this.appendTab(tab, builder);
    builder.push('</');
    builder.push(tag);
    builder.push('>');
  }

  private static appendLine(builder) {
    //  builder.push('\r\n');
  }

  private static appendNullTag(tag, tab: number, builder) {
    if (isNullOrUndefined(tag)) return;
    this.appendTab(tab, builder);
    builder.push('<');
    builder.push(tag);
    builder.push(' />');
  }

  private static appendStartTag(tag, tab: number, builder) {
    if (isNullOrUndefined(tag)) return;
    this.appendTab(tab, builder);
    builder.push('<');
    builder.push(tag);
    builder.push('>');
  }

  private static appendStartTagWithNamespace(tag, namespace, tab: number, builder) {
    if (isNullOrUndefined(tag)) return;
    this.appendTab(tab, builder);
    builder.push('<');
    builder.push(tag);
    builder.push(' ');
    builder.push(namespace);
    builder.push(' ');
    builder.push('>');
  }

  private static appendTab(tab: number, builder) {
    for (let i = 0; i < tab; i++) {
      //  builder.push('\t');
    }
  }

  private static checkModelDecorate(obj, tag): boolean {
    let ths = this;
    let xmlArr: XmlProp[] = obj[this.xmlSerializeProp];
    if (!xmlArr) {
      return false;
    }

    let xmlProp = xmlArr.filter(xml => xml.decoratedPropertyName == tag)[0];
    if (xmlProp && xmlProp.modelProperties.length > 0) {
      return true;
    }
    return false;
  }

  private static getXmlName(obj, tag): string {
    let ths = this;
    let xmlArr: XmlProp[] = obj[this.xmlSerializeProp];
    if (!xmlArr) {
      return tag;
    }
    let xmlProp = xmlArr.filter(xml => xml.decoratedPropertyName == tag)[0];
    if (xmlProp && xmlProp.xmlSerializeName) {
      return xmlProp.xmlSerializeName;
    }
    return tag;
  }

  private static getXmlNamespace(obj, tag): string {
    let ths = this;
    let xmlArr: XmlProp[] = obj[this.xmlSerializeProp];
    if (!xmlArr) {
      return null;
    }
    let xmlProp = xmlArr.filter(xml => xml.decoratedPropertyName == tag)[0];
    if (xmlProp && xmlProp.xmlNamespace) {
      return xmlProp.xmlNamespace;
    }
    return null;
  }

  private static getXmlRootName(obj, tag): string {
    let ths = this;
    let xmlArr: XmlProp[] = obj[this.xmlSerializeProp];
    if (!xmlArr) {
      return null;
    }
    let xmlProp = xmlArr.filter(xml => xml.decoratedPropertyName == tag)[0];
    if (xmlProp && xmlProp.xmlRootName) {
      return xmlProp.xmlRootName;
    }
    return null;
  }

  private static toStringDateTimeT(val: Date): string {
    return moment(val).format('YYYY-MM-DDThh:mm:ss');
  }

}

export function DnXmlElement(xmlSerializeName: string) {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.xmlSerializeName = xmlSerializeName;
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.xmlSerializeName = xmlSerializeName;
    }
  };
}

export function DnXmlElementPascal() {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.xmlSerializeName = decoratedPropertyName[0].toUpperCase() + decoratedPropertyName.substring(1);
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.xmlSerializeName = decoratedPropertyName[0].toUpperCase() + decoratedPropertyName.substring(1);
    }
  };
}

export function DnXmlElementUpper() {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.xmlSerializeName = decoratedPropertyName.toUpperCase();
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.xmlSerializeName = decoratedPropertyName[0].toUpperCase();
    }
  };
}

export function DnXmlNamespace(namespace: string) {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.xmlNamespace = namespace;
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.xmlNamespace = namespace;
    }
  };
}


export function DnXmlRoot(xmlRootName: string) {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.xmlRootName = xmlRootName;
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.xmlRootName = xmlRootName;
    }
  };
}

export function DnXmlIgnore() {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.ignore = true;
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.ignore = true;
    }
  };
}

export function DnXmlModel(modelPropertyName: string, xmlSerializeName: string) {
  return function (target: Object, decoratedPropertyName: string): void {
    let xmlPropArr: XmlProp[] = target[DnXmlSerialize.xmlSerializeProp];
    if (!xmlPropArr) {
      xmlPropArr = [];
      target[DnXmlSerialize.xmlSerializeProp] = xmlPropArr;
    }

    let xmlProp: XmlProp = xmlPropArr.filter(prop => prop.decoratedPropertyName === decoratedPropertyName)[0];
    if (!xmlProp) {
      xmlProp = new XmlProp();
      xmlProp.decoratedPropertyName = decoratedPropertyName;
      xmlProp.modelProperties.push(new XmlPropModel({modelName: modelPropertyName, xmlName: xmlSerializeName}));
      xmlPropArr.push(xmlProp);
    } else {
      xmlProp.modelProperties.push(new XmlPropModel({modelName: modelPropertyName, xmlName: xmlSerializeName}));
    }
  };
}

export class XmlProp {
  decoratedPropertyName: string;
  modelProperties: XmlPropModel[];
  xmlSerializeName: string;
  xmlNamespace: string;
  xmlRootName: string;
  ignore: boolean;

  constructor(options: {} = {}) {
    this.decoratedPropertyName = options['decoratedPropertyName'];
    this.modelProperties = options['modelProperties'] || [];
    this.xmlSerializeName = options['xmlSerializeName'];
    this.xmlRootName = options['xmlRootName'];
    this.xmlNamespace = options['xmlNamespace'];
    this.ignore = options['ignore'];
  }
}

export class XmlPropModel {
  modelName: string;
  xmlName: string;

  constructor(options: {} = {}) {
    this.modelName = options['modelName'];
    this.xmlName = options['xmlName'];
  }
}
