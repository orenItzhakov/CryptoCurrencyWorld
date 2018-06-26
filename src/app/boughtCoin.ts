export class BoughtCoin {
    id : number;
    amount: number;
    name :string ;
    currentPrice: number;
    date : Date;
    isActive : boolean;
    constructor(id : number,amount: number, name :string ,currentPrice: number, date : Date, isActive : boolean){
        this.id = id;
        this.amount = amount;
        this.name = name;
        this.currentPrice = currentPrice;
        this.date = date;
        this.isActive = isActive;
    }
}
