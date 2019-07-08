"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var ReactDOM = __importStar(require("react-dom"));
// Can't use this, since ts will complain that module is not found, but since this is css
//   and since we already added the boostrap dependency, we will know this will exist, so use "require" instead
// import * as Bootstrap from "bootstrap/dist/css/bootstrap.css";
var Bootstrap = require('bootstrap/dist/css/bootstrap.css');
var reactstrap_1 = require("reactstrap");
var IndexView = /** @class */ (function (_super) {
    __extends(IndexView, _super);
    function IndexView(props) {
        var _this = _super.call(this, props) || this;
        _this._newEmployee = { role: "CEO" };
        _this._toggle = function () {
            _this.setState({ isDialogOpen: !_this.state.isDialogOpen, error: "" });
        };
        _this._onSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                fetch("api/employees", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this._newEmployee)
                }).then(function (x) { return __awaiter(_this, void 0, void 0, function () {
                    var error;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(x.status == 200)) return [3 /*break*/, 1];
                                // done!
                                // reset data
                                this._newEmployee = {};
                                this._refresh();
                                this._toggle();
                                return [3 /*break*/, 4];
                            case 1:
                                if (!(x.status == 400)) return [3 /*break*/, 3];
                                return [4 /*yield*/, x.text()];
                            case 2:
                                error = _a.sent();
                                this.setState({
                                    error: error
                                });
                                return [3 /*break*/, 4];
                            case 3:
                                console.log(x.status);
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }).catch(function (x) {
                    console.log(x);
                });
                return [2 /*return*/];
            });
        }); };
        _this._onFirstNameChange = function (change) {
            _this._newEmployee.firstName = change.target.value;
        };
        _this._onLastNameChange = function (change) {
            _this._newEmployee.lastName = change.target.value;
        };
        _this._onHireDateChange = function (change) {
            _this._newEmployee.hireDate = change.target.value.replace("/", "-");
        };
        _this._onRoleChange = function (change) {
            _this._newEmployee.role = change.target.value;
        };
        _this.state = {
            employees: [],
            isDialogOpen: false,
            error: ""
        };
        return _this;
    }
    IndexView.prototype.componentDidMount = function () {
        this._refresh();
    };
    IndexView.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(EmployeeList, { employees: this.state.employees }),
            React.createElement(reactstrap_1.Button, { color: "primary", onClick: this._toggle }, "Create Employee"),
            React.createElement(reactstrap_1.Modal, { isOpen: this.state.isDialogOpen, toggle: this._toggle, autoFocus: false, fade: false },
                React.createElement(reactstrap_1.ModalHeader, { toggle: this._toggle }, "Create Employee"),
                React.createElement(reactstrap_1.ModalBody, null,
                    this.state.error && (React.createElement("div", { className: "alert alert-danger" }, this.state.error)),
                    React.createElement(reactstrap_1.Form, { onSubmit: this._onSubmit },
                        React.createElement(reactstrap_1.FormGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "firstName" }, "First name"),
                            React.createElement(reactstrap_1.Input, { onChange: this._onFirstNameChange, required: true, type: "text", name: "firstName", id: "firstName", placeholder: "Enter first name" })),
                        React.createElement(reactstrap_1.FormGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "lastName" }, "Last name"),
                            React.createElement(reactstrap_1.Input, { onChange: this._onLastNameChange, required: true, type: "text", name: "lastName", id: "lastName", placeholder: "Enter last name" })),
                        React.createElement(reactstrap_1.FormGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "date" }, "Hire date"),
                            React.createElement(reactstrap_1.Input, { onChange: this._onHireDateChange, required: true, type: "date", name: "date", id: "date", placeholder: "select hire date" })),
                        React.createElement(reactstrap_1.FormGroup, null,
                            React.createElement(reactstrap_1.Label, { for: "role" }, "Select role"),
                            React.createElement(reactstrap_1.Input, { onChange: this._onRoleChange, type: "select", name: "select", id: "role" },
                                React.createElement("option", null, "CEO"),
                                React.createElement("option", null, "VP"),
                                React.createElement("option", null, "MANAGER"),
                                React.createElement("option", null, "LACKEY"))))),
                React.createElement(reactstrap_1.ModalFooter, null,
                    React.createElement(reactstrap_1.Button, { color: "primary", onClick: this._onSubmit }, "Create"),
                    "\u00A0",
                    React.createElement(reactstrap_1.Button, { color: "secondary", onClick: this._toggle }, "Cancel"))));
    };
    IndexView.prototype._refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("api/employees")];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        this.setState({
                            employees: Object.values(result)
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return IndexView;
}(React.Component));
exports.IndexView = IndexView;
// This is a stateless component
var EmployeeList = /** @class */ (function (_super) {
    __extends(EmployeeList, _super);
    function EmployeeList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmployeeList.prototype.render = function () {
        return React.createElement(reactstrap_1.Table, null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Id"),
                    React.createElement("th", null, "First name"),
                    React.createElement("th", null, "Last name"),
                    React.createElement("th", null, "Hire date"),
                    React.createElement("th", null, "Role"),
                    React.createElement("th", null, "Favourite joke"),
                    React.createElement("th", null, "Favourite quote"))),
            React.createElement("tbody", null, this.props.employees.map(function (x) {
                return React.createElement("tr", null,
                    React.createElement("td", null, x._id),
                    React.createElement("td", null, x.firstName),
                    React.createElement("td", null, x.lastName),
                    React.createElement("td", null, x.hireDate),
                    React.createElement("td", null, x.role),
                    React.createElement("td", null, x.favouriteJoke),
                    React.createElement("td", null, x.favouriteQuote));
            })));
    };
    return EmployeeList;
}(React.PureComponent));
ReactDOM.render(React.createElement(IndexView, null), document.getElementById("index"));
