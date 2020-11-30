"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutes = void 0;
var png = require("png-js");
var _ = require("lodash");
var TestRoutes = /** @class */ (function () {
    function TestRoutes() {
        this.png = 'test.png';
    }
    TestRoutes.prototype.routes = function (router) {
        var _this = this;
        router.get('/thermostat/temperatures', function (req, res) {
            png.decode(_this.png, function (pixels) {
                var retour = _.times(pixels.length / (4 * 8), _.constant(0));
                _.chunk(pixels, 4 * 8)
                    .forEach(function (eightPixelsRGBA, index) {
                    for (var pixelIndex = 0; pixelIndex < 8; pixelIndex++) {
                        if (eightPixelsRGBA[pixelIndex * 4] != 255 || eightPixelsRGBA[(pixelIndex * 4) + 1] != 255 || eightPixelsRGBA[(pixelIndex * 4) + 2] != 255) {
                            retour[index] = retour[index] + Math.pow(2, 7 - pixelIndex);
                        }
                    }
                });
                var hexString = '';
                retour.forEach(function (value) {
                    hexString += value.toString(16).padStart(2, '0');
                });
                console.log("Pixels pr\u00E9sents dans " + _this.png + " : " + pixels.length / 4);
                console.log("Nombre de caract\u00E8res dans le retour : " + hexString.length);
                res.send(hexString);
            });
        });
    };
    return TestRoutes;
}());
exports.TestRoutes = TestRoutes;
