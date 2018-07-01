import { BoughtCoin } from "./boughtCoin";

export class User {
    public _id : string;
    public firstName : string;
    public lastName : string;
    public email: string;
    public balance: number = 5000;
    public coins : Array<BoughtCoin> = [];
}
