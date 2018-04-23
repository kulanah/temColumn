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

---
## Documentation

### Functions

For all componentNumber arguments indexing starts at 0.

|Function|Variables|Description|Applicable Class|
---------|---------|-----------|----------------|
|focusColumn | componentNumber | Focuses the canvas on the selected component number. Throws error if the component is out of bounds.|Column instance the user creates|
|updateFocalLength | componentNumber, newFocalLength | Updates the focal length for the supplied component.|All lenses|
|updateLeftBoundry | componentNumber, newLeftValue | Sets new x value for the left end of the split beam lenses.|AngledLens|
|updateRightBoundry | componentNumber, newRightValue | Sets new x value for the right end of the split beam lenses.|AngledLens|
|updateBotRadius | componentNumber, newCylinderRadius| Sets the new radius for the cylinder shaped lens above the specimen.|CylinderLens|
|updateAperture | componentNumber, newWidthPercentage | Sets the width to the chosen aperture to the new value.  Each value is a percentage of the total width that the aperture starts at.|Aperture|
|toggleValve|none|Toggles the column valve.  Changes background image and clears most of the column rays when off|Column instance the user creates|

### Column Components

Decimals are sub numbers that can be used to access the specific sub components.

|Number|Title|Class|
|------|-----|----|
|0|Electron Gun|Gun|
|1|Electron Extractor|ExtractorBeam|
|1.0|Label|Label|
|1.1|Label|Label|
|2|Condensor Lens 1|SimpleLens|
|2.0|Condensor 1 Aperture|Aperture|
|2.1|Label|Label|
|2.2|Label|Label|
|3|Condensor Lens 2|SimpleLens|
|3.0|Condensor 2 Aperture|Aperture|
|3.1|Label|Label|
|4.0|Minicondensor Lens|SimpleLens|
|4.1|Label|Label|
|4.2|Label|Label|
|5|EDX Detector|CylinderLens|
|6|Specimen|Specimen|
|7|Lower Objective Lens|LowerObjectiveLens|
|8|Diffraction Lens|OverhangLens|
|8.0|Label|Label|
|8.1|Label|Label|
|8.2|Label|Label|
|8.3|Label|Label|
|9|Fifth Lens|AngledLens|
|10|Fifth Lens|AngledLens|
|11|Fifth Lens|AngledLens|
|12|Screen|Screen|

