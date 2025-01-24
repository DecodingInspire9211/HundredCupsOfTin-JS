import {TILE_SIZE} from "../../../lib/constants.ts";
import {global} from "../global.ts";
import {LoseScreen} from "../../components/scenes/LoseScreen.ts";
import {WinScreen} from "../../components/scenes/WinScreen.ts";

export class Economy {
    // Current Amount of Money you possess
    money: number = 0;

    // Profit and Loss
    income: number = 0;
    expenses: number = 0;
    profit: number = 0;

    Currency = {
        name: "Zinnfeld Crown",
        symbol: "ZC",
    };

    timer = 0;

    moneyadded: boolean = false;
    //
    constructor() {
        this.money = 1000;
        this.income = 0;
        this.expenses = 0;
        this.profit = 0;
    }

    calculateProfit = () => {
        this.profit = this.income - this.expenses;
    }

    addIncome = (amount: number) => {
        this.income += amount;
    }

    addExpenses = (amount: number) => {
        this.expenses += amount;
    }

    addIntoMoney = () => {
        this.money += this.profit;
        this.moneyadded = true;
    }

    getStats = () => {
        return {
            money: this.money,
            income: this.income,
            expenses: this.expenses,
            profit: this.profit,
            currency: this.Currency
        }
    }

    setMoney = (amount: number) => {
        this.money = amount;
    }

    update = () => {
        this.timer += global.deltaTime;

        this.getStats();

        this.calculateProfit();

        //reset every 120 seconds
        if(this.timer >= 120)
        {
            this.addIntoMoney();
            if(this.moneyadded)
            {
                console.log(`Money: ${this.money}`);
                this.timer = 0;
                this.income = 0;
                this.expenses = 0;

                this.moneyadded = false;
            }
        }

        if(this.money <= 0)
        {
            global.sceneManager.changeScene(new LoseScreen());
        }

        if(this.money >= 2000)
        {
            global.sceneManager.changeScene(new WinScreen());
        }
    }
}