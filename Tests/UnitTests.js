var chai = require("chai");

var expect = chai.expect;

// Start testing
describe('Testing Initial Point', () => {

    // Start testing  the encription functionality 
    describe('Testing Encription', () => {
        var encryption = require("../server/utilities/encryption");

        // Testing if we always get random string 
        describe('Module: Encryption -> Method: generateSalt()', () => {
            it('Should return always random string', () => {

                // Arrange 
                var arrayOfRandomStrings = [];

                // Act
                for (var index = 0; index < 3; index++) {
                    arrayOfRandomStrings.push(encryption.generateSalt());
                }

                // Assert (Expect)
                for (var index = 0; index < 3; index++) {
                    var currentElement = arrayOfRandomStrings.shift();
                    expect(arrayOfRandomStrings).to.not.include(currentElement);
                }
            });
        });
    });

    //TODO: Continue the encryption Tests

    // Testing the validation functionalty
    describe('Testing Validation', () => {
        var validation = require("../server/utilities/validation");

        // Testing for correct behavior of path validation 
        describe('Module: Validation -> Method: checkIfPathExists()', () => {
            it('ShoulfReturnFalseIfPathIsNull', () => {
                expect(validation.checkIfPathExists(null)).to.be.false;
            });
            it('ShouldreturnFalseIfPathIsUndefined', () => {
                expect(validation.checkIfPathExists(undefined)).to.be.false;
            });
            it('ShouldReturnFalseIfPathIsWrong', () => {
                expect(validation.checkIfPathExists("Test")).to.be.false;
            });
            it('ShouldReturnFalseIfPathIsToFile', () => {
                expect(validation.checkIfPathExists("UnitTests.js")).to.be.false;
            });
            it('ShouldReturnTrueForCorrectPath', () => {
                expect(validation.checkIfPathExists("../Tests")).to.be.true;
            });

        });
    });
});