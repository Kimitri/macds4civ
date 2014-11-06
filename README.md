# macds4civ - Use DualShock 4 controllers with Civilization on Mac

This is just a piece of glue code to map DualShock 4 controls to generic HID inputs on OS X. It's intended for playing Civilization but can be used to control pretty much anything.

Uses [mac-vhid](https://www.npmjs.org/package/mac-vhid) and [ds4](https://www.npmjs.org/package/ds4).

## Controller mapping

- Left stick: move mouse pointer
- D-pad: arrow keys (move map)
- Cross: left mouse button
- Square: enter (end turn)
- Triangle: space (select the "Do nothing" action for current unit)
- Circle: right mouse button
- Touchpad click: escape key
