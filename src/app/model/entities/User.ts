export default class User {
  constructor(
    public userName: string,
    public email: string,
    public phone: string,
    public dogType: string,
    public size: string,
    public behavior: string,
    public senha: string,
    public uid?: string,
    public downloadURL?: string,
    public id?: string,
    public favorites?: string[]
  ) {}
}
