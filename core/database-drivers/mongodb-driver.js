"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MongoDBDriver = void 0;
var mongoose_1 = require("mongoose");
var global_methods_helper_1 = require("core/helpers/global-methods-helper");
var core_module_interface_1 = require("../modules/core-module-interface");
/**
 * MongoDB Driver module
 */
var MongoDBDriver = /** @class */ (function (_super) {
    __extends(MongoDBDriver, _super);
    /**
     * Ctr
     * @param logger Console
     */
    function MongoDBDriver(logger) {
        var _this = _super.call(this, logger) || this;
        _this.models = {};
        return _this;
    }
    Object.defineProperty(MongoDBDriver.prototype, "db", {
        /**
         * Get db data
         */
        get: function () {
            return this._db;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Register method
     * @param payload any
     */
    MongoDBDriver.prototype.register = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.logger.log("Register Module: MongoDB-Driver");
                return [2 /*return*/, this];
            });
        });
    };
    /**
     * Boot method
     * @param payload any
     */
    MongoDBDriver.prototype.boot = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, global_methods_helper_1.GlobalMethods.importFile("configs/core/database")];
                    case 1:
                        config = (_a.sent()).config;
                        /* Try to connect */
                        return [4 /*yield*/, this.connect(config)];
                    case 2:
                        /* Try to connect */
                        _a.sent();
                        this.logger.log("DatabaseDriver: MongoDB-Driver");
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Get engine
     */
    MongoDBDriver.prototype.getEngine = function () {
        return this;
    };
    /**
     * Try to connect
     * @param config {DatabaseConfigType} database config
     */
    MongoDBDriver.prototype.connect = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var connectionString, connectionOptions, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        connectionString = this.prepareConnectionString(config);
                        connectionOptions = this.prepareConnectionOptions(config);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, mongoose_1["default"].connect(connectionString, connectionOptions)];
                    case 2:
                        _a._db = _b.sent();
                        this.logger.log("Database connection string\n                " + connectionString + "\n                " + JSON.stringify(connectionOptions, null, 2) + "\n            ");
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        this.logger.error("Connection to database failed");
                        this.logger.error(err_1);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Try to connect
     * @param config {DatabaseConfigType} database config
     */
    MongoDBDriver.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db.disconnect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Prepare connection string
     * @param config {DatabaseConfigType} database config
     */
    MongoDBDriver.prototype.prepareConnectionString = function (config) {
        var _a;
        var connectionString = "mongodb://";
        if ((_a = config.mongoose) === null || _a === void 0 ? void 0 : _a.connection) {
            var dbPath = config.mongoose.connection.dbHost + ":" + config.mongoose.connection.dbPort;
            connectionString += dbPath;
            if (config.mongoose.connection.dbName) {
                connectionString += "/" + config.mongoose.connection.dbName;
            }
        }
        return connectionString;
    };
    /**
     * Prepare connection options
     * @param config {DatabaseConfigType} database config
     */
    MongoDBDriver.prototype.prepareConnectionOptions = function (config) {
        var _a, _b, _c, _d;
        var options = {};
        if ((_b = (_a = config.mongoose) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.dbUser) {
            options.auth = {
                user: (_c = config.mongoose) === null || _c === void 0 ? void 0 : _c.connection.dbUser,
                password: ((_d = config.mongoose) === null || _d === void 0 ? void 0 : _d.connection.dbPassword) || ""
            };
        }
        return options;
    };
    return MongoDBDriver;
}(core_module_interface_1.CoreModule));
exports.MongoDBDriver = MongoDBDriver;
