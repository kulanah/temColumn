# TEM Column Simulator

## General Info
---

TEMColumn is a library for creating 3d representations of research grade microscopy light beams.  The library provides a simple way to create and modify these columns. 

## Getting Started
---

### Installlation
1. Download bundle.js as well as all required libraries in the dist folder.  
2. Include in your index.html
3. Create a div for the column with the size and position you want.
4. Call the following code in your app.js or index.html 

`columnVar = new temColumn.MicroscopeColumn('divName')`

### Functions

#### Base Column
For all componentNumber arguments indexing starts at 0.

|Function|Variables|Description|
---------|---------|-----------|
|focusColumn | componentNumber | Focuses the canvas on the selected component number. Throws error if the component is out of bounds.|
|updateFocalLength | componentNumber, newFocalLength | Updates the focal length for the supplied component.|
|updateLeftBoundry | componentNumber, newLeftValue | Sets new x value for the left end of the split beam lenses.|
|updateRightBoundry | componentNumber, newRightValue | Sets new x value for the right end of the split beam lenses.|
|updateBotRadius | componentNumber, newCylinderRadius| Sets the new radius for the cylinder shaped lens above the specimen.|
|updateAperture | componentNumber, newWidthPercentage | Sets the width to the chosen aperture to the new value.  Each value is a percentage of the total width that the aperture starts at.|