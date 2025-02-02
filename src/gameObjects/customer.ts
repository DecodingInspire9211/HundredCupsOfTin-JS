import { BaseGameObj } from "../modules/gameobjs/baseGameObj.ts";
import { global } from "../modules/global.ts";
import { Key } from "../modules/input/keyHandler.ts";
import { Label } from "../components/ui/label.ts";
import { Player } from "./player.ts";

interface CoffeeOrder {
  loseMoney: number;
  earnMoney: number;
  timer: 0;
  maxTimer: 12;
}

export class Customer extends BaseGameObj {
  gap = 12;

  name: string = "Customer";

  triggerDistance: number = 0;
  hasCoffee: boolean = false;
  keyPressed: boolean = false;

  animationData = {
    animationSprites: [],
    timePerSprite: 0.08,
    currentSpriteElapsedTime: 0,
    firstSpriteIndex: 0,
    lastSpriteIndex: 0,
    currentSpriteIndex: 0,
  };

  actNotice: Label;

  orderTaken: boolean = false;
  served: boolean = false;
  earned: number = 0;
  order: CoffeeOrder | null = null;

  source: string;

  timer: number = 0;
  orderTimer: number = 0;
  orderID: number = 0;

  constructor(
    source: string,
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
    zOrder: number,
    trigDist: number = 15,
    collidable?: boolean,
    triggerable?: boolean,
  ) {
    super(name, x, y, width, height, zOrder);

    this.source = source;
    this.loadImagesFromSpritesheet(this.source, 1, 1);
    this.getBoxBounds();
    this.getTriggerBounds(trigDist);

    this.triggerDistance = trigDist;

    this.collidable = collidable;
    this.triggerable = triggerable;
    this.actNotice = new Label(
      this.x,
      this.y - 20,
      50,
      20,
      "",
      16,
      "white",
      "center",
    );
  }

  getBoxBounds = () => {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.y + (this.height - this.height / 3),
      bottom: this.y + this.height,
    };
  };

  getTriggerBounds = (triggerDistance: number) => {
    return {
      left: this.getBoxBounds().left - triggerDistance,
      right: this.getBoxBounds().right + triggerDistance,
      top: this.getBoxBounds().top - triggerDistance,
      bottom: this.getBoxBounds().bottom + triggerDistance,
    };
  };

  update = () => {
    if (!this.orderTaken) {
      this.actNotice.text = "";
    }

    this.orderTimer += global.deltaTime;

    if (this.orderTimer >= 1) {
      if (this.order) {
        this.order.timer++;
        if (this.order.timer > this.order.maxTimer) {
          global.economy.addExpenses(this.order.loseMoney);
          this.order = null;
          this.orderTaken = false;
        }
      }
      this.orderTimer = 0;
    }

    // if (this.orderTaken && !this.served) {
    //     this.timer += global.deltaTime;
    //
    //     this.actNotice.text = `Waiting... ${this.timer.toFixed(0)}s/12s`;
    //     if(this.served) {
    //         this.actNotice.text = "Thank you!";
    //         this.orderTaken = false;
    //         this.served = true;
    //         this.timer = 0;
    //     }
    //
    //     if (this.timer > 12) {
    //         this.actNotice.text = "Took too long... Lost money";
    //         this.loseMoney();
    //     }
    // }
  };

  ui = (ctx : any) => {
    this.actNotice.ui(ctx);
  };

  render = (ctx : any) => {
    let sprite = this.getNextSprite();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
  };

  completeOrder = (source : any) => {
    if (this.order) {
      global.economy.addIncome(this.order.earnMoney);
      this.order = null;
    }
    this.orderTaken = false;
    this.served = true;

    source.amountCoffee--;

    if (source.amountCoffee <= 0) {
        source.amountCoffee = 0;
    }
  };

  addOrder = () => {
    const order = {
      timer: 0,
      maxTimer: 12,
      loseMoney: 3.5,
      earnMoney: 4.5,
    } as CoffeeOrder;

    this.order = order;
  };

  reactToTrigger = (source : any) => {
    if (source instanceof Player) {

        // IF NO ORDER WAS TAKEN
        // TAKE ORDER TEXT DISPLAY AND VIA KEY.ACT, TAKE ORDER
      if (!this.orderTaken) {
        this.actNotice.text = "Take Order (E)";
        if (global.handleInput.keyBinary & Key.Act) {
          //this.orderID = source.addOrder();     // ADD ORDER BY ID
          this.addOrder(); // ADD ORDER BY OBJECT
          this.actNotice.text = "Order taken!";
          this.orderTaken = true;
        }


      }

        // IF ORDER WAS TAKEN. AND PLAYER HASNT COFFEE
        // DISPLAY WHERE IS MY COFFEE TEXT
      if (this.orderTaken && !source.hasCoffee) {
        this.actNotice.text = `Where is my coffee?`;
        this.served = false;
      }

      // IF ORDER WAS TAKEN AND PLAYER HAS COFFEE, YET ORDER WASNT SERVED
        // DISPLAY SERVE ORDER TEXT AND VIA KEY.ACT, SERVE ORDER
        // COMPLETE ORDER AND REMOVE COFFEE FROM PLAYER
      if (this.orderTaken && source.hasCoffee && !this.served) {
        this.actNotice.text = "Serve Order (E)";
        if (global.handleInput.keyBinary & Key.Act) {
          this.actNotice.text = "Thank you!";
          this.completeOrder(source); // COMPLETE ORDER BY OBJECT
        }
      }

      // IF ORDER WAS SERVED, DISPLAY EARN MONEY TEXT
        // VIA KEY.ACT, EARN MONEY
      if (this.served) {
        this.actNotice.text = "Earn Money (E)";
        if (global.handleInput.keyBinary & Key.Act) {
          if (!this.keyPressed) {
            this.served = false;
            this.orderTaken = false;
            this.keyPressed = true;
          } else {
            this.keyPressed = false;
          }
        }
      }

      // // START TEXT WHEN PLAYER IS NEAR CUSTOMER
      // if (!this.orderTaken) {
      //     this.checkForOrder();
      //
      //     // TAKE ORDER
      //     if (global.handleInput.keyBinary & Key.Act) {
      //         this.takeOrder();
      //     }
      // }
      //
      // // IDLE TEXT WHEN ORDER IS TAKEN BUT NOT SERVED YET
      // if (this.orderTaken && !this.served) {
      //     this.checkForServe();
      //     // SERVE ORDER
      //     if (this.orderTaken && (global.handleInput.keyBinary & Key.Act) && !this.served && !this.hasCoffee) {
      //         this.serveOrder(source);
      //     }
      // }
      //
      // if(this.served && this.hasCoffee) {
      //     this.actNotice.text = "Earn Money (E)";
      //     // EARN MONEY
      //     if ((global.handleInput.keyBinary & Key.Act) && this.served && this.hasCoffee) {
      //         this.earnMoney();
      //     }
      // }
    }
  };

  receiveCoffee = () => {
    this.hasCoffee = true;
    //console.log("Customer received coffee");
  };

  reactToCollision = () => {

  };
}
