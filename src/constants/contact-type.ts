export interface IContactType {
  code?: string;
  description: string;
  payment?: boolean;
}
export const CContactTypes: IContactType[]  = [
  { code: 'PAGO_MANTENIMIENTO', description: 'Pago de Mantenimiento', payment: true },
  { code: 'ACTIVACION_TARJETA', description: 'Activación de Tarjeta', payment: true },
  { code: 'SECURITY', description: 'Reporte de Seguridad / Gurdias' },
  { code: 'REPORTE_AREAS_VERDES', description: 'Reporte de Áreas Verdes' },
  { code: 'REPORTE_ALBERCA', description: 'Reporte de Alberca' },
  { code: 'SUGERENCIA', description: 'Sugerencia' },
  { code: 'APP', description: 'Problema con el App' },
  { code: 'OTRO', description: 'Otro' },
];
export class ContactType {
  static readonly PAGO_MANTENIMIENTO       = new ContactType('PAGO_MANTENIMIENTO', { description: 'Pago de Mantenimiento' });
  static readonly REPORTE_AREAS_VERDES        = new ContactType('REPORTE_AREAS_VERDES', { description: 'Reporte de Áreas Verdes'});
  static readonly SUGERENCIA    = new ContactType('SUGERENCIA', { description: 'Sugerencia' });
  static readonly REPORTE_ALBERCA     = new ContactType('REPORTE_ALBERCA', { description: 'Reporte de Alberca' });
  static readonly ACTIVACION_TARJETA     = new ContactType('ACTIVACION_TARJETA', { description: 'Activación de Tarjeta' });
  static readonly APP     = new ContactType('APP', { description: 'Problema con el App' });
  static readonly SECURITY     = new ContactType('SECURITY', { description: 'Reporte de Seguridad / Guardias' });
  static readonly OTRO    = new ContactType('OTRO', { description: 'Otro' });

  // private to disallow creating other instances of this type
  private constructor(private readonly key: string, public readonly value: IContactType) {
  }

  toString() {
    return this.key;
  }
}
