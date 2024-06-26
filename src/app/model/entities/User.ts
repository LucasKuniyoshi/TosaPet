// export default class User{
//     private _name: string;
//     private _id: string;
//     private _email: string;
//     private _phone: number;
//     private _senha: string;
//     private _downloadURL: any;
//     private _uid: string;
//     private _dogType: string;

//     constructor(name: string, email: string, phone: number, dogType: string, senha: string){
//         this._name = name;
//         this._email = email;
//         this._phone = phone;
//         this._dogType = dogType;
//         this._senha = senha;       
//     }

//     public get name(): string {
//         return this._name;
//     }
//     public set name(value: string) {
//         this._name = value;
//     }
//     public get id(): string {
//         return this._id;
//     }
//     public set id(value: string) {
//         this._id = value;
//     }
//     public get email(): string {
//         return this._email;
//     }
//     public set email(value: string) {
//         this._email = value;
//     }
//     public get phone(): number {
//         return this._phone;
//     }
//     public set phone(value: number) {
//         this._phone = value;
//     }
//     public get senha(): string {
//         return this._senha;
//     }
//     public set senha(value: string) {
//         this._senha = value;
//     }
//     public get downloadURL(): any {
//         return this._downloadURL;
//     }
//     public set downloadURL(value: any) {
//         this._downloadURL = value;
//     }
//     public get uid(): string {
//         return this._uid;
//     }
//     public set uid(value: string) {
//         this._uid = value;
//     }
//     public get dogType(): string {
//         return this._dogType;
//     }
//     public set dogType(value: string) {
//         this._dogType = value;
//     }
// }
export default class User {
  constructor(
    public userName: string,
    public email: string,
    public phone: string,
    public dogType: string,
    public senha: string,
    public uid?: string,
    public downloadURL?: string,
    public id?: string
  ) {}
}
