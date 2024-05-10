
# Door Installation Calculator

This NPM package provides a comprehensive solution for calculating the necessary materials for door installations, specifically tailored for both bi-fold and pre-hung doors. It includes calculations for frame and casing dimensions, material requirements, and checks for fitting within rough openings.

## Features

- Calculate frame dimensions for bi-fold or pre-hung doors.
- Determine casing cut lengths based on door type.
- Check if a door fits in a specified rough opening.
- Suggest adjustments or special-sized doors if necessary.
- Calculate and round up material lengths for order based on standard lumber sizes.

## Installation

Install via npm:

```bash
npm install door-frame-calc
```

## Usage

Here is a quick example to get you started:

```javascript
const DoorInstallationCalculator = require('door-installation-calculator');

const calculator = new DoorInstallationCalculator(
    "bi-fold",  // Door type
    34,         // Rough opening width
    82,         // Rough opening height
    4.5,        // Wall thickness
    0.75,       // Frame thickness
    2.25,       // Casing width
    30,         // Door width
    80          // Door height
);

try {
    const results = calculator.getAllCalculations();
    console.log(results);
} catch (error) {
    console.error("Error:", error.message);
}
```

## API Reference

### Constructor

- `DoorInstallationCalculator(doorType, roughOpeningWidth, roughOpeningHeight, wallThickness, frameThickness, casingWidth, doorWidth, doorHeight)`
  - Initializes a new instance of the calculator with specified dimensions and preferences.

### Methods

- `validateInput()`: Validates the necessary inputs are provided.
- `calculateFrameDimensions()`: Returns frame dimensions for bi-fold doors.
- `calculateCasingCutLengths()`: Calculates and returns casing cut lengths.
- `checkFitInRoughOpening()`: Checks and returns if the door fits within the rough opening.
- `determineDoorAdjustments()`: Returns a message indicating if the door size is appropriate or adjustments are needed.
- `calculateFrameOrderLengths()`: Calculates and rounds up the frame material lengths required for order.
- `calculateCasingOrderLengths()`: Calculates and rounds up the casing material lengths required for order.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
