export interface IVisitType {
  code?: string;
  description: string;
  color: string;
}
export const CVisitTypes: IVisitType[]  = [
  { code: 'VISIT', description: 'Visita Personal', color: 'primary' },
  { code: 'FOOD', description: 'Entrega de Comida', color: 'secondary' },
  { code: 'COURIER', description: 'Paquetería', color: 'warning' },
  { code: 'SERVICE', description: 'Servicios', color: 'dark' },
  { code: 'PROVIDER', description: 'Proveedores', color: 'danger' },
];
export class VisitType {
  static readonly VISIT       = new VisitType('VISIT', { description: 'Visita Personal', color: 'primary' });
  static readonly FOOD        = new VisitType('FOOD', { description: 'Entrega de Comida', color: 'secondary' });
  static readonly COURIER     = new VisitType('COURIER', { description: 'Paquetería', color: 'warning' });
  static readonly SERVICE     = new VisitType('SERVICE', { description: 'Servicios', color: 'success' });
  static readonly PROVIDER    = new VisitType('PROVIDER', { description: 'Proveedores', color: 'danger' });

  // private to disallow creating other instances of this type
  private constructor(private readonly key: string, public readonly value: IVisitType) {
  }

  toString() {
    return this.key;
  }
}
