const DoorInstallationCalculator = require('../module');

describe('DoorInstallationCalculator', () => {
    let calculator;

    beforeEach(() => {
        // Setup calculator with default parameters before each test
        calculator = new DoorInstallationCalculator("bi-fold", 34, 82, 4.5, 0.75, 2.25, 30, 80);
    });

    test('should correctly calculate frame dimensions for bi-fold doors', () => {
        expect(calculator.calculateFrameDimensions()).toEqual({
            topFrameLength: 30.5,
            sideFrameLength: 81.25
        });
    });

    test('should correctly determine if door fits in the rough opening', () => {
        expect(calculator.checkFitInRoughOpening()).toBe(true);
    });

    test('should return correct adjustments when door fits', () => {
        expect(calculator.determineDoorAdjustments()).toBe("Door fits in the rough opening, no special-sized door is needed.");
    });

    test('should calculate correct casing order lengths', () => {
        const cutLengths = { topLength: 31, sideLength: 81.5 };
        calculator.calculateFrameDimensions(); // to ensure internal state is set if needed
        expect(calculator.calculateCasingOrderLengths(cutLengths)).toEqual([7, 7, 7, 7, 7]);
    });

    // Add more tests as necessary
});
