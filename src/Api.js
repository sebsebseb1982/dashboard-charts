"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = 8012;
app_1.default.listen(port, function () {
    console.log("L'API \u00E9coute sur le port " + port);
});
