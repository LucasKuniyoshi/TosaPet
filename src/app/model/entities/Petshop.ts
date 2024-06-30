export default class Petshop{
    private _name!: string;
    private _id!: string;
    private _address!: string;
    private _contact!: string;
    private _openingHours!: string;
    private _hourEnding!: string;
    private _dogType!: string;
    private _rating!: string;
    private _price!: number;
    private _priceMax!: number;
    private _stamp!: string;
    private _downloadURL: any;
    private _uid!: string;
    
    constructor(name: string, dogType: string, address: string, contact: string, openingHours: string, hourEnding: string,
        rating: string, price: number, priceMax: number, stamp: string){
            this._name = name;
            this._dogType = dogType;
            this._address = address;
            this._contact = contact;
            this._openingHours = openingHours;
            this._hourEnding = hourEnding;
            this._rating = rating;
            this._price = price;
            this._priceMax = priceMax;
            this._stamp = stamp;
    }

    public get stamp(): string {
        return this._stamp;
    }
    public set stamp(value: string) {
        this._stamp = value;
    }
    
    public get priceMax(): number {
        return this._priceMax;
    }
    public set priceMax(value: number) {
        this._priceMax = value;
    }
    
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get address(): string {
        return this._address;
    }
    public set address(value: string) {
        this._address = value;
    }
    
    public get openingHours(): string {
        return this._openingHours;
    }
    public set openingHours(value: string) {
        this._openingHours = value;
    }

    public get hourEnding(): string {
        return this._hourEnding;
    }
    public set hourEnding(value: string) {
        this._hourEnding = value;
    }
    
    public get rating(): string {
        return this._rating;
    }
    public set rating(value: string) {
        this._rating = value;
    }
    
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    
    public get contact(): string {
        return this._contact;
    }
    public set contact(value: string) {
        this._contact = value;
    }

    public get downloadURL(): any {
        return this._downloadURL;
    }
    public set downloadURL(value: any) {
        this._downloadURL = value;
    }

    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }

    public get dogType(): string {
        return this._dogType;
    }
    public set dogType(value: string) {
        this._dogType = value;
    }
}