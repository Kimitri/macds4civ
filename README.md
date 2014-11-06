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
8. Enjoy!

On some systems the HID packages fail to install. I'm trying to figure out what's causing this but for the time being you're on your own. (I really don't know enough about node-gyp to troubleshoot this correctly.)


## Controller mapping

- Left stick: move mouse pointer
- D-pad: arrow keys (move map)
- Cross: left mouse button
- Square: enter (end turn)
- Triangle: space (select the "Do nothing" action for current unit)
- Circle: right mouse button
- Touchpad click: escape key
