import { BoughtCoin } from "./boughtCoin";

export class User {
    _id : string;
    firstName : string;
    lastName : string;
    email: string;
    balance: number;
    coins : Array<BoughtCoin>;
}
