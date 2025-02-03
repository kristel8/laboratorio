import { LocaleSettings } from "primeng/calendar";

export class ConstanteGlobales {
  public static _FORMATO_IMAGEN_JPG_DESDE_BASE_64 = 'data:image/jpg;base64,';
  public static _FORMATO_IMAGEN_PNG_DESDE_BASE_64 = 'data:image/png;base64,';
  public static _FORMATO_FECHA_BD = 'yyyy-MM-dd';
  public static _FORMATO_FECHA_BD_T = 'yyyy-MM-ddT';
  public static _FORMATO_HORA_BD = 'HH:mm:ss';
  public static _FORMATO_HORA_VISTA = 'HH:mm:ss';
  public static _FORMATO_FECHA_Y_HORA_BD = 'yyyy-MM-ddTHH:mm:ss';
  public static _FORMATO_FECHA_HORA_CON_MILIS_BD = 'yyyy-MM-ddTHH:mm:ss.SSS';
  public static _FORMATO_MINUTO_Y_SEGUNDO = 'mm:ss';
  public static _FORMATO_FECHA_HORA_UUID = 'yyyyMMddTHHmmssSSS';
  public static _FORMATO_FECHA_Y_HORA_VISTA = 'dd-MM-yyyy HH:mm:ss';
  public static _FORMATO_FECHA_VISTA = 'dd-MM-yyyy';

}

export const MENU = {
  Paciente: 1,
  Antecedente: 2,
  Examen: 3
}

export class Constantes {
  public static ES_CALENDARIO: LocaleSettings = {
    firstDayOfWeek: 1,
    dayNames: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    monthNames: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Setiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthNamesShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    today: 'Hoy',
    clear: 'Borrar',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sem'
  };
}
