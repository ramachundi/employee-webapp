'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var employee_1 = __importDefault(require("./routes/employee"));
var app = express_1.default();
var port = parseInt(process.env.PORT || '3000');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/api/employees', employee_1.default);
// Fail over route
app.use(function (req, res) {
    res.status(404).send('Not found');
});
// listen for requests
app.listen(port, function () {
    console.log("Server is listening on port " + port);
});
module.exports = app;
