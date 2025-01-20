Initialisation of Project
=========================
13. Jänner 2025 - 09:23

* add file structure
* add src
    * components
        * scenes
            * MainMenu.ts
        * ui
            * button.js
            * ui.js     (UI Library)
    * fonts
        * Pixelify Sans
    * interfaces
    * modules
        * internals
            * audio.js
            * loadFont.js
        * scenemanagement
            * scene.js
            * scenemanager.js
        * ui
            * baseUIobj.js
        * global.js
    * main.ts
    * style.css
* add CHANGELOG.md
* add index.html
* README.md

END - 17:31

Rewriting everything into TypeScript
============================
14. Jänner 2025 - 10:27

Rewriting everything into TypeScript again,
and removing deprecated files.

Planning out further steps

Game Grid Desaster
==================
15. Jänner 2025 - 11:30

Implementing the game grid, but didn't work out as expected.
Error?: Nothing was placable on the grid.
Code was too chaotic and unstructured.

NEW AND SIMPLE GAME GRID
========================
16. Jänner 2025 - 11:30

Implementing a new, simple and originally provisional game grid.
Placing objects on the grid. Later in the evening, texture tests.

CONTROLS, COLLISIONS AND MOVEMENT
================================
17. Jänner 2025 - 12:20

Implementing controls, collisions and movement.
A special key handler for smooth movement via bitflags

bitflags arranged in the following manner

```typescript
enum Key {          // BINARY NUMS
                    // ===========
    UP = 1 << 0,    // 0001
    DOWN = 1 << 1,  // 0010
    LEFT = 1 << 2,  // 0100
    RIGHT = 1 << 3  // 1000
}

//in diagonal movement e.g. UP + LEFT, the bitflags would combine
// 0001 + 0100 = 0101
```

MINOR IMPROVEMENTS
==================
18. Jänner 2025

searching for bugs, implementing the main theme
implementing spritesheets and **DANCING CHAIRS!**

IMPLEMENTING THE COFFEE MACHINE
===============================
19. Jänner 2025

Implementation of the coffee machine mechanic
and the coffee machine itself.

Added a test spritesheet for the player.

Fixing the audio system

