export class UsuarioModel {

  constructor(
    public USUARIO: string,
    public CREDENCIAL?: string,
    public ID_USUARIO?: number,
    public ACTIVO?: number,
    public USUARIO_ROOT?: number
  ) {
  }

}
