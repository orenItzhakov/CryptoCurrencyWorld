import { BoughtCoin } from "./boughtCoin";

export class User {
    id : number;
    firstName : string;
    lastName : string;
    email: string;
    balance: number;
    coins : Array<BoughtCoin>;
}
