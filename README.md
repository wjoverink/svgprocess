# ProcessSvg
Create random svg images based on variables set as id's in the svg's

## Pre-requisite
- [Git](https://git-scm.com)
- [Node](https://nodejs.org)

### Set up frontend
1. Git clone this repo: `git clone`
1. Install dependencies: `npm install` 
1. Start frontend server: `npm start`

## License
Readable is released under the [MIT License](https://opensource.org/licenses/MIT).

## Possible tags in ID 

### Element ID
- dontTouch:element isnt allowed to change
- palleteColor: random color from palette
- mainColor: use main color
- secondaryColor: use secondary color
- lastUsedColor: use last used color
- colorContrast: get color from palette with a higher contrast difference from last used color
- colorContrastMain:  get color from palette with a higher contrast difference from main color
- colorContrastMainSecondary: get color from palette with a higher contrast difference from main color and Secondary 
color
- isSecondaryColor:  set the last used color as secondary color
- isMainColor: set the last used color as main color

example: <rect id="colorMaxContrastMain;isSecondaryColor" 
sets a color with a higher contrast difference from main color and make it the secondary color