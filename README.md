# macds4civ - Use DualShock 4 controllers with Civilization on Mac

This is just a piece of glue code to map DualShock 4 controls to generic HID inputs on OS X. It's intended for playing Civilization but can be used to control pretty much anything.

Uses [mac-vhid](https://www.npmjs.org/package/mac-vhid) and [ds4](https://www.npmjs.org/package/ds4).


## Installation and usage

1. Install [Node.js](http://nodejs.org/) if you don't have it already.
2. Install [Git](http://git-scm.com/) if you don't have it already.
3. Clone this repository: `git clone https://github.com/Kimitri/macds4civ.git`
4. Go to the `macds4civ` directory: `cd macds4civ`
5. Install required packages: `npm install`
6. Plug in you DualShock 4 controller and push the PS button on it.
7. Start macds4civ: `./index.js`
8. Push the "Options" button on your DualShock 4 controller to detect the screen resolution.
9. Enjoy!

On some systems the HID packages fail to install. This is very likely due to incompatible Python installation. If this happens to you, try upgrading your system's Python to 2.7.x.

The screen resolution detection is rather finicky and may fail occasionally. Should the resolution detection fail, move the mouse pointer to the lower right corner of the screen (as far as it goes) and press the screen detection button ("Options" by default) again. Check the application output in the terminal to see if the resolution was detected correctly.


## Default controller mapping

- Left stick: move mouse pointer
- D-pad: arrow keys (move map)
- Cross: left mouse button
- Square: enter (end turn)
- Triangle: space (select the "Do nothing" action for current unit)
- Circle: right mouse button
- Touchpad click: escape key
- Options: screen resolution autodetection
- L1: jump to near the top left corner of the screen (top of build and research lists)
- L2: jump to near the bottom left corner of the screen (unit command list)
- R1: jump to near the top right corner of the screen (culture menu)
- R2: jump to near the bottom right corner of the screen (suggested action button)
- R3: jump to the center of the screen
