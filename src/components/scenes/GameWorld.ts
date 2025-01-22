import { Scene } from "../../modules/scenemanagement/scene.ts";
import { Wall } from "../../gameObjects/env/wall.ts";
import { Button } from "../ui/button.ts";
import { Label } from "../ui/label.ts";
import { TILE_SIZE } from "../../../lib/constants.ts";
import { Floor } from "../../gameObjects/env/floor.ts";
import { global } from "../../modules/global.ts";
import { MainMenu } from "./MainMenu.ts";
import { Grid } from "../../modules/gameobjs/grid.ts";
import { Player } from "../../gameObjects/player.ts";
import { Counter } from "../../gameObjects/furniture/counter.ts";
import { WallCounter } from "../../gameObjects/furniture/wallcounter.ts";
import { Pseudo } from "../../gameObjects/pseudo.ts";
import { Chair } from "../../gameObjects/furniture/chair.ts";
import { Table } from "../../gameObjects/furniture/table.ts";
import { Coffeemachine } from "../../gameObjects/furniture/coffeemachine.ts";
import { BaseGameObj } from "../../modules/gameobjs/baseGameObj.ts";
import { Figtree } from "../../gameObjects/deco/plant1.ts";
import { ImageCl } from "../ui/image.ts";
import { Economy } from "../../modules/gameobjs/economy.ts";
import { Customer } from "../../gameObjects/customer.ts";

export class GameWorld extends Scene {
  gap = 12;
  player: Player;
  customer1: Customer;
  customer2: Customer;
  grid: Grid;
  coffeemachine: Coffeemachine;
  economy: Economy;
  sceneObjects: BaseGameObj[];

  player_zOrder: number = 2;

  constructor() {
    super();
    this.sceneName = "Game World";
    this.sceneObjects = [];
    this.grid = new Grid(12);

    this.grid.setPos(2, 2);
    this.player = new Player(
      "Player",
      "Knox",
      "Janáček",
      this.grid.margin_x,
      this.grid.margin_y,
      TILE_SIZE,
      TILE_SIZE * 2,
      this.grid.getTilePos().y,
      50,
      0,
      true,
      true,
    );
    this.economy = new Economy();

    this.customer1;
    this.customer2;
  }

  init = () => {
    this.createObjects();
    this.createUI();
    console.debug(`Scene ${this.sceneName} initialized`);
  };

  update = () => {
    this.player.update();
    this.coffeemachine.update();
  };

  render = (ctx: CanvasRenderingContext2D) => {
    //this.map.flat().forEach(tile => tile.node.render())
    this.player.update_player_zOrder_by_ytile(this.grid);
    this.sceneObjects.sort((a, b) => a.zOrder - b.zOrder);

    this.player.render(ctx);
    this.coffeemachine.render(ctx);

    for (let i = 0; i < this.sceneObjects.length; i++) {
      if (this.sceneObjects[i]!.active) {
        this.sceneObjects[i].storePositionOfPreviousFrame();
        this.sceneObjects[i].render(ctx);
        //console.log(`Object ${this.sceneObjects[i].name} rendered`);
      }
    }
  };

  interact = () => {
    for (let i = 0; i < this.sceneObjects.length; i++) {
      if (this.sceneObjects[i]!.active) {
        if (this.sceneObjects[i].collidable) {
          global.checkCollisionWithAnyOther(this.sceneObjects[i]);
        }

        if (this.sceneObjects[i].triggerable) {
          global.checkTriggerWithAnyOther(this.sceneObjects[i]);
        }
      }
    }
  };

  ui = (uictx: CanvasRenderingContext2D) => {
    this.player.ui(uictx);
    this.coffeemachine.ui(uictx);

    //global.uictx!.fillStyle = "beige";
    //global.uictx!.fillRect(this.gap, global.ui!.height - this.gap - 256, 256, 256);

    global.uictx!.fillStyle = "beige";
    global.uictx!.fillRect(
      this.gap + 128,
      global.ui!.height - this.gap - 64,
      256 + 64,
      64,
    );
    global.uictx!.strokeStyle = "black";
    global.uictx!.lineWidth = 4;
    global.uictx!.strokeRect(
      this.gap + 128,
      global.ui!.height - this.gap - 64,
      256 + 64,
      64,
    );

    for (let i = 0; i < this.uiIterator.length; i++) {
      this.uiIterator[i].ui(uictx);
    }
  };

  destroy = () => {
    if (this.destroyObjects()) {
      console.debug(`Scene ${this.sceneName} destroyed`);
    }
    this.sceneObjects.forEach((object) => {
      object.active = false;
    });
  };

  createUI = () => {
    global.audioManager.addTrack("/src/components/audio/tmhcot_theme_nes.ogg", {
      loop: true,
    });

    //TODO: Implement the game
    const ret = new Button(
      this.gap,
      this.gap,
      64,
      64,
      "<-",
      20,
      "black",
      "beige",
      () => {
        global.sceneManager.changeScene(new MainMenu());
      },
    );

    const profile = new ImageCl(
      "src/components/imgs/profile.png",
      this.gap,
      global.ui!.height - this.gap - 256,
      256,
      256,
    );

    const playername = new Label(
      this.gap + 300,
      global.ui!.height - this.gap - 56,
      64,
      64,
      this.player.getFullName(),
      24,
      "black",
    );
    const coffeeInHand = new Label(
      this.gap + 266,
      global.ui!.height - this.gap * 7.25,
      64,
      0,
      `Coffee in Hand: ${this.player.amountCoffee}`,
      12,
      "white",
    );
    const money = new Label(
      this.gap + 266,
      global.ui!.height - this.gap * 7.25,
      0,
      64,
      `${this.economy.Currency.symbol} ${this.economy.money}`,
      16,
      "black",
    );

    this.uiIterator.push(ret);
    this.uiIterator.push(coffeeInHand);
    this.uiIterator.push(money);
    this.uiIterator.push(profile);
    this.uiIterator.push(playername);
  };

  createObjects = () => {
    for (let y = 0; y < this.grid.tiles; y++) {
      for (let x = 0; x < this.grid.tiles; x++) {
        this.grid.setPos(x, y);
        let floor = new Floor(
          `Floor`,
          this.grid.x,
          this.grid.y,
          TILE_SIZE,
          TILE_SIZE,
        );
        this.sceneObjects.push(floor);
      }
    }

    for (let x = 0; x < this.grid.tiles; x++) {
      this.grid.setPos(x, 0);
      let wall = new Wall(
        `Wall`,
        this.grid.x,
        this.grid.y - TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE * 2,
        -1,
        undefined,
        true,
        false,
      );
      this.sceneObjects.push(wall);
    }

    for (let x = 6; x < this.grid.tiles; x++) {
      this.grid.setPos(x, 0.5);
      let wallCounter = new WallCounter(
        `WallCounter`,
        this.grid.x,
        this.grid.y - TILE_SIZE * 1.5,
        TILE_SIZE,
        TILE_SIZE * 2.5,
        0,
        true,
        false,
      );
      this.sceneObjects.push(wallCounter);
    }

    for (let x = 6; x < this.grid.tiles; x++) {
      this.grid.setPos(x, 3);
      let pseudo = new Pseudo(
        `Pseudo`,
        this.grid.x,
        this.grid.y - (TILE_SIZE / 2 - TILE_SIZE / 2),
        TILE_SIZE,
        TILE_SIZE * 0.5,
        0,
        true,
        false,
      );
      let counter = new Counter(
        `Counter`,
        this.grid.x,
        this.grid.y - TILE_SIZE / 2,
        TILE_SIZE,
        TILE_SIZE * 1.5,
        2.5,
        false,
        false,
      );
      this.sceneObjects.push(pseudo);
      this.sceneObjects.push(counter);
    }
    this.grid.setPos(3, 1);
    let spinny = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      0,
      true,
      true,
    );
    this.grid.setPos(2, 1);
    let spinny1 = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      0,
      true,
      true,
    );

    this.grid.setPos(10, 10);
    let chair = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      10,
      1,
      true,
      true,
    );

    this.grid.setPos(9, 10);
    let table = new Table(
      `Table`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      10,
      true,
      true,
    );

    this.grid.setPos(8, 10);
    let chair1 = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      10,
      0,
      true,
      true,
    );

    this.grid.setPos(9, 4);
    let chair2 = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      4,
      3,
      true,
      true,
    );

    this.grid.setPos(7, 4);
    let chair3 = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      4,
      3,
      true,
      true,
    );

    this.grid.setPos(4, 8);
    let chair4 = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      8,
      1,
      true,
      true,
    );
    this.grid.setPos(3, 8);
    let table3 = new Table(
      `Table`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      8,
      true,
      true,
    );

    this.grid.setPos(2, 8);
    let chair5 = new Chair(
      `Chair`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      8,
      0,
      true,
      true,
    );

    this.grid.setPos(10, 3);
    this.coffeemachine = new Coffeemachine(
      `Coffeemachine`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE,
      2.5,
      false,
      true,
    );

    this.grid.setPos(5, -0.5);
    let figtree = new Figtree(
      `Figtree`,
      this.grid.x,
      this.grid.y,
      TILE_SIZE,
      TILE_SIZE * 2,
      0,
      false,
      false,
    );

    this.grid.setPos(10, 10);
    this.customer1 = new Customer(
      `Customer`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      10,
      10,
      true,
      true,
    );

    this.grid.setPos(8, 10);
    this.customer2 = new Customer(
      `Customer`,
      this.grid.x,
      this.grid.y - TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE * 2,
      10,
      10,
      true,
      true,
    );

    this.sceneObjects.push(spinny);
    this.sceneObjects.push(spinny1);

    this.sceneObjects.push(chair);

    this.sceneObjects.push(table);
    this.sceneObjects.push(chair1);
    this.sceneObjects.push(chair2);
    this.sceneObjects.push(chair3);
    this.sceneObjects.push(chair4);
    this.sceneObjects.push(table3);
    this.sceneObjects.push(chair5);
    this.sceneObjects.push(figtree);

    this.sceneObjects.push(this.player);

    this.sceneObjects.push(this.coffeemachine);
    this.uiIterator.push(this.coffeemachine.timerLabel!);

    this.sceneObjects.push(this.customer1);
    this.sceneObjects.push(this.customer2);
    this.uiIterator.push(this.customer1!);
    this.uiIterator.push(this.customer2!);

    this.sceneObjects.sort((a, b) => a.zOrder - b.zOrder);

    // this.sceneObjects.forEach(object => {
    //     //console.log(`Object ${object} created`);
    //     //this.sceneObjects[object].active = true;
    // });
  };

  destroyObjects = () => {
    // Check if there are objects in the scene
    if (this.sceneObjects.length > 0) {
      // Destroy each object
      this.sceneObjects.forEach((object) => {
        object.destroy();
      });

      // Clear the sceneObjects array
      this.sceneObjects = [];
      return true;
    }
  };
}
