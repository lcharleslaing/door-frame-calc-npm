class DoorInstallationCalculator {
    constructor(doorType, roughOpeningWidth, roughOpeningHeight, wallThickness = 4.5, frameThickness = 0.75, casingWidth = 2.25, doorWidth, doorHeight = 80) {
        this.doorType = doorType;
        this.roughOpeningWidth = roughOpeningWidth;
        this.roughOpeningHeight = roughOpeningHeight;
        this.wallThickness = wallThickness;
        this.frameThickness = frameThickness;
        this.casingWidth = casingWidth;
        this.doorWidth = doorWidth;
        this.doorHeight = doorHeight;
    }

    validateInput() {
        if (!this.doorType || !this.roughOpeningWidth || !this.roughOpeningHeight || !this.doorWidth) {
            throw new Error("Missing required input for calculation.");
        }
    }

    calculateMaxDoorSize() {
        return {
            width: this.roughOpeningWidth - 2,
            height: this.roughOpeningHeight - 2
        };
    }

    calculateFrameDimensions() {
        if (this.doorType === "bi-fold") {
            return {
                topFrameLength: this.doorWidth + 0.5, // 1/4" on each side
                sideFrameLength: this.doorHeight + 1.25
            };
        }
        return null;
    }

    calculateCasingCutLengths() {
        const dimensions = this.calculateFrameDimensions();
        let topLength, sideLength;
        if (dimensions) {
            topLength = dimensions.topFrameLength + 0.5; // 1/4" reveal on each side
            sideLength = dimensions.sideFrameLength + 0.25; // 1/4" reveal at the bottom
        } else {
            topLength = this.roughOpeningWidth - this.casingWidth + 0.5;
            sideLength = this.roughOpeningHeight - this.casingWidth + 0.25;
        }
        return { topLength, sideLength };
    }

    checkFitInRoughOpening() {
        const maxSizes = this.calculateMaxDoorSize();
        return this.doorWidth <= maxSizes.width && this.doorHeight <= maxSizes.height;
    }

    determineDoorAdjustments() {
        if (!this.checkFitInRoughOpening()) {
            return "Consider ordering a special-sized door or adjust the rough opening.";
        }
        return "Door fits in the rough opening, no special-sized door is needed.";
    }

    determineFrameMaterial() {
        if (this.wallThickness <= 5.25) {
            return "1\" x 6\"";
        } else if (this.wallThickness > 5.25 && this.wallThickness <= 7.25) {
            return "1\" x 8\"";
        } else {
            throw new Error("Wall thickness out of expected range.");
        }
    }

    calculateFrameOrderLengths(dimensions) {
        const lengths = [dimensions.topFrameLength, dimensions.sideFrameLength, dimensions.sideFrameLength];
        const nominalLengths = [8 * 12, 10 * 12, 12 * 12]; // Convert feet to inches
        let orderDetails = lengths.map(length => {
            let minLength = nominalLengths.find(nominal => nominal >= length);
            return minLength ? minLength / 12 : null; // Convert inches back to feet
        });
        return orderDetails.filter(length => length !== null);
    }

    determineCasingMaterial() {
        return this.casingWidth === 3.25 ? "3-1/4\" wide casing" : "2-1/4\" wide casing";
    }

    calculateCasingOrderLengths(cutLengths) {
        const nominalLengths = [7 * 12, 10 * 12, 12 * 12]; // Nominal lengths in inches
        const adjustedTopLength = cutLengths.topLength + 2 * this.casingWidth; // Total length for one top casing with reveals
        const adjustedSideLength = cutLengths.sideLength + this.casingWidth; // Total length for one side casing with reveal

        const findMinimumNominalLength = (length) => {
            return nominalLengths.find(nominal => nominal >= length) / 12; // Return the nominal length in feet
        };

        // Check if two top casings can fit into one nominal length piece
        let singleTopPieceFits = nominalLengths.some(nominal => nominal >= adjustedTopLength * 2);
        let topOrderLengths = singleTopPieceFits ? [findMinimumNominalLength(adjustedTopLength * 2)] : [findMinimumNominalLength(adjustedTopLength), findMinimumNominalLength(adjustedTopLength)];

        // Calculate and round up each side casing length to the nearest nominal length
        const sideOrderLengths = [adjustedSideLength, adjustedSideLength, adjustedSideLength, adjustedSideLength].map(length => {
            return findMinimumNominalLength(length);
        });

        return [...topOrderLengths, ...sideOrderLengths];
    }
}



// // Example of creating an instance and using the class
// const calculator = new DoorInstallationCalculator(
//     "bi-fold",
//     33,  // roughOpeningWidth
//     82,  // roughOpeningHeight
//     4.5, // wallThickness
//     0.75,// frameThickness
//     3.25,// casingWidth
//     32,  // doorWidth
//     80   // doorHeight
// );

// try {
//     calculator.validateInput();
//     const frameDimensions = calculator.calculateFrameDimensions();
//     const casingCutLengths = calculator.calculateCasingCutLengths();
//     const frameMaterial = calculator.determineFrameMaterial();
//     const frameOrderLengths = calculator.calculateFrameOrderLengths(frameDimensions);
//     const casingMaterial = calculator.determineCasingMaterial();
//     const casingOrderLengths = calculator.calculateCasingOrderLengths(casingCutLengths);
//     const fitsInOpening = calculator.checkFitInRoughOpening();
//     const doorAdjustments = calculator.determineDoorAdjustments();

//     console.log("Frame Dimensions: ", frameDimensions);
//     console.log("Casing Cut Lengths: ", casingCutLengths);
//     console.log("Frame Material: ", frameMaterial, "Order Lengths: ", frameOrderLengths);
//     console.log("Casing Material: ", casingMaterial, "Order Lengths: ", casingOrderLengths);
//     console.log("Fits in Rough Opening: ", fitsInOpening);
//     console.log("Door Adjustments: ", doorAdjustments);
// } catch (error) {
//     console.error("Error: ", error.message);
// }

module.exports = DoorInstallationCalculator; // This exports the class