"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _userRoute = _interopRequireDefault(require("./routes/userRoute"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _productRoute = _interopRequireDefault(require("./routes/productRoute"));

var _orderRoute = _interopRequireDefault(require("./routes/orderRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongodbUrl = _config.default.MONGODB_URL;

_mongoose.default.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = (0, _express.default)();
app.use(_bodyParser.default.json());
app.use("/api/users", _userRoute.default);
app.use("/api/products", _productRoute.default);
app.use("/api/orders", _orderRoute.default);
app.get("/api/config/paypal", (req, res) => {
  res.send(_config.default.PAYPAL_CLIENT_ID);
});
app.use("/uploads", _express.default.static(_path.default.join(__dirname, "/../uploads")));
app.use(_express.default.static(_path.default.join(__dirname, "/../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(_path.default.join(`${__dirname}/../frontend/build/index.html`));
});
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at http://localhost:5000");
});