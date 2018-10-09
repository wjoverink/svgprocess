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
### SVG ID
- colorPalette: get a random palette from the colorpalettes
- randomPaletteColor: gets random color from palette

example:  <svg id="colorPalette:colorPalette;mainColor:randomPaletteColor"
the variable colorPalette has now a random color palette and the variable mainColor is a random palette color

### Element ID
- palleteColor: random color from palette
- isMainColor: set the last used color as main color
- mainColor: use main color
- isSecondaryColor:  set the last used color as secondary color
- secondaryColor: use secondary color
- lastUsedColor: use last used color
- colorMaxContrast: get color from palette with a higher contrast difference from last used color
- colorMaxContrastMain:  get color from palette with a higher contrast difference from main color
- colorMaxContrastMainSecondary: get color from palette with a higher contrast difference from main color and Secondary color

example: <rect id="colorMaxContrastMain;isSecondaryColor" 
sets a color with a higher contrast difference from main color and make it the secondary color