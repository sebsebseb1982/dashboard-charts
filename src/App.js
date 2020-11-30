"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var Test_1 = require("./Test");
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.config();
        // Filters
        var router = express.Router();
        // Routes
        new Test_1.TestRoutes().routes(router);
        this.app.use('/test', router);
    }
    App.prototype.config = function () {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    };
    return App;
}());
exports.default = new App().app;
