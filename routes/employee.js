'use strict';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var express_1 = require("express");
var common_1 = require("../utils/common");
var router = express_1.Router();
var hireDateRegx = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
var DATABASE = {};
/* GET employees listing. */
router.get('', function (req, res) {
    return res.send(DATABASE);
});
/* GET an employee. */
router.get('/:id', function (req, res) {
    var employee = DATABASE[req.params.id];
    if (employee) {
        return res.send(employee);
    }
    return res.status(404).send("Details are not found");
});
/* POST employee data. */
router.post('', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var employee, currentDate, givenDate, validRoles, isValidRole, result, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    employee = req.body;
                    if (!employee.firstName) {
                        return [2 /*return*/, res.status(400).send("firstName is required")];
                    }
                    if (!employee.lastName) {
                        return [2 /*return*/, res.status(400).send("lastName is required")];
                    }
                    if (!employee.hireDate) {
                        return [2 /*return*/, res.status(400).send("hireDate is required")];
                    }
                    if (!employee.role) {
                        return [2 /*return*/, res.status(400).send("role is required")];
                    }
                    if (!hireDateRegx.test(employee.hireDate)) {
                        return [2 /*return*/, res.status(400).send("hireDate should be in the format of YYYY-MM-DD")];
                    }
                    currentDate = new Date();
                    givenDate = new Date(employee.hireDate);
                    if (givenDate.getTime() > currentDate.getTime()) {
                        return [2 /*return*/, res.status(400).send("hireDate should be in the past")];
                    }
                    validRoles = ["CEO", "VP", "MANAGER", "LACKEY"];
                    isValidRole = (validRoles.indexOf(employee.role.toUpperCase()) > -1);
                    if (!isValidRole) {
                        return [2 /*return*/, res.status(400).send("'role' should exist and should be one of - " + validRoles.join(","))];
                    }
                    result = __assign({}, employee);
                    result._id = common_1.getRandomId();
                    _a = result;
                    return [4 /*yield*/, common_1.getFavoriteJoke()];
                case 1:
                    _a.favouriteJoke = _c.sent();
                    _b = result;
                    return [4 /*yield*/, common_1.getFavouriteQuote()];
                case 2:
                    _b.favouriteQuote = _c.sent();
                    DATABASE[result._id] = result;
                    return [2 /*return*/, res.send(result)];
            }
        });
    });
});
/* PUT update employee data. */
router.put('/:id', function (req, res) {
    var employee = DATABASE[req.params.id];
    if (!employee) {
        return res.status(404).send("Employee not found");
    }
    var employeeFromRequest = req.body;
    employee.firstName = employeeFromRequest.firstName || employee.firstName;
    employee.lastName = employeeFromRequest.lastName || employee.lastName;
    if (employeeFromRequest.hireDate && !hireDateRegx.test(employeeFromRequest.hireDate.toString())) {
        return res.status(400).send("hireDate should be in the format of YYYY-MM-DD");
    }
    employee.hireDate = employeeFromRequest.hireDate || employee.hireDate;
    employee.role = employeeFromRequest.role || employee.role;
    employee.favouriteJoke = employeeFromRequest.favouriteJoke || employee.favouriteJoke;
    employee.favouriteQuote = employeeFromRequest.favouriteQuote || employee.favouriteQuote;
    return res.send(employee);
});
/* DELETE employee. */
router.delete('/:id', function (req, res) {
    delete DATABASE[req.params.id];
    return res.send();
});
module.exports = router;
