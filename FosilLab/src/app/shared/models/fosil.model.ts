export class FosilModel {

  constructor(
    public ID_FOSIL: number,
    public MUESTRA: string,
    public GRUPO: string,
    public NOMBRE: string,
    public ID_PAIS: number,
    public NOMBRE_PAIS: string,
    public ID_ESTADO: number,
    public NOMBRE_ESTADO: string,
    public ID_MUNICIPIO: number,
    public NOMBRE_MUNICIPIO: string,
    public ID_EON: number,
    public NOMBRE_EON: string,
    public ID_ERA: number,
    public NOMBRE_ERA: string,
    public ID_EPOCA: number,
    public NOMBRE_EPOCA: string,
    public ID_PERIODO: number,
    public NOMBRE_PERIODO: string,
    public ID_ALTA?: number,
    public USUARIO_ALTA?: string,
    public FORMACION?: string,
    public COMENTARIOS?: string,
    public ID_MODIF?: number,
    public USUARIO_MODIFICA?: string) {
  }

}
