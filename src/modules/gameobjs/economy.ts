import {TILE_SIZE} from "../../../lib/constants.ts";
import {global} from "../global.ts";

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

    //
    constructor(money: number, income: number, expenses: number, profit: number) {
        this.money = money;
        this.income = income;
        this.expenses = expenses;
        this.profit = profit;
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
    }

    update = () => {
        this.timer += global.deltaTime;

        this.calculateProfit();

        if(this.timer >= 120)
        {
            this.addIntoMoney();
            this.timer = 0;
        }
    }
}