"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var ShippySubscriber = /*#__PURE__*/(0, _createClass2["default"])(function ShippySubscriber(_ref) {
  var eventBusService = _ref.eventBusService,
      shippyFulfillmentService = _ref.shippyFulfillmentService;
  (0, _classCallCheck2["default"])(this, ShippySubscriber);
  (0, _defineProperty2["default"])(this, "handleShipment", /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
      var headers, body;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              headers = _ref2.headers, body = _ref2.body;

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
  this.shippyService = shippyFulfillmentService;
  eventBusService.subscribe("shippy.shipment", this.handleShipment);
});
var _default = ShippySubscriber;
exports["default"] = _default;