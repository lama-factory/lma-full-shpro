"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _axios = _interopRequireDefault(require("axios"));

var Shippy = /*#__PURE__*/function () {
  function Shippy(_ref) {
    var _this = this;

    var apiKey = _ref.apiKey;
    (0, _classCallCheck2["default"])(this, Shippy);
    (0, _defineProperty2["default"])(this, "buildShippingRateEndpoints_", function () {
      return {
        retrieve: function () {
          var _retrieve = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
            var path, _yield$_this$client_, data;

            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    path = "/v1";
                    _context.next = 3;
                    return _this.client_({
                      method: "POST",
                      url: path,
                      data: {
                        Method: "GetCarriers",
                        Params: {
                          Active: 1
                        }
                      }
                    });

                  case 3:
                    _yield$_this$client_ = _context.sent;
                    data = _yield$_this$client_.data;
                    return _context.abrupt("return", data);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function retrieve(_x) {
            return _retrieve.apply(this, arguments);
          }

          return retrieve;
        }(),
        list: function () {
          var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
            return _regenerator["default"].wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _this.call("GetCarriers", {
                      Active: 1
                    });

                  case 2:
                    return _context2.abrupt("return", _context2.sent);

                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function list() {
            return _list.apply(this, arguments);
          }

          return list;
        }()
      };
    });
    (0, _defineProperty2["default"])(this, "buildOrderEndpoints_", function () {
      return {
        retrieve: function () {
          var _retrieve2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return _this.call("GetOrder", {
                      OrderID: id
                    });

                  case 2:
                    return _context3.abrupt("return", _context3.sent);

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function retrieve(_x2) {
            return _retrieve2.apply(this, arguments);
          }

          return retrieve;
        }(),
        create: function () {
          var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(data) {
            return _regenerator["default"].wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _this.call("PutOrder", data);

                  case 2:
                    return _context4.abrupt("return", _context4.sent);

                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function create(_x3) {
            return _create.apply(this, arguments);
          }

          return create;
        }() //   delete: async (id) => {
        //     const path = `/v2/orders/${id}`;
        //     return this.client_({
        //       method: "DELETE",
        //       url: path,
        //     }).then(({ data }) => data);
        //   },

      };
    });
    this.apiKey = apiKey;
    this.client_ = _axios["default"].create({
      baseURL: "https://www.shippypro.com/api",
      headers: {
        "content-type": "application/json",
        Authorization: "Basic ".concat(apiKey)
      }
    });
    this.shippingRates = this.buildShippingRateEndpoints_();
    this.orders = this.buildOrderEndpoints_();
  }

  (0, _createClass2["default"])(Shippy, [{
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(data) {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this.client_(data).then(function (_ref2) {
                  var data = _ref2.data;
                  return data;
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function request(_x4) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
  }, {
    key: "call",
    value: function () {
      var _call = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(method) {
        var params,
            _yield$this$client_,
            data,
            _args6 = arguments;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                _context6.next = 3;
                return this.client_({
                  method: "POST",
                  url: "/v1",
                  data: {
                    Method: method,
                    Params: params
                  }
                });

              case 3:
                _yield$this$client_ = _context6.sent;
                data = _yield$this$client_.data;
                return _context6.abrupt("return", data);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function call(_x5) {
        return _call.apply(this, arguments);
      }

      return call;
    }()
  }]);
  return Shippy;
}();

var _default = Shippy;
exports["default"] = _default;