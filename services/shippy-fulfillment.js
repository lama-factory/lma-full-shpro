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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _medusaInterfaces = require("medusa-interfaces");

var _shippy = _interopRequireDefault(require("../utils/shippy"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ShippyFulfillmentService = /*#__PURE__*/function (_FulfillmentService) {
  (0, _inherits2["default"])(ShippyFulfillmentService, _FulfillmentService);

  var _super = _createSuper(ShippyFulfillmentService);

  function ShippyFulfillmentService(_ref, options) {
    var _this;

    var logger = _ref.logger;
    (0, _classCallCheck2["default"])(this, ShippyFulfillmentService);
    _this = _super.call(this);
    _this.options_ = options;
    /** @private @const {logger} */

    _this.logger_ = logger;
    /** @private @const {AxiosClient} */

    _this.client_ = new _shippy["default"]({
      apiKey: _this.options_.api_key
    });
    return _this;
  }

  (0, _createClass2["default"])(ShippyFulfillmentService, [{
    key: "registerInvoiceGenerator",
    value: function registerInvoiceGenerator(service) {
      if (typeof service.createInvoice === "function") {
        this.invoiceGenerator_ = service;
      }
    }
  }, {
    key: "getFulfillmentOptions",
    value: function () {
      var _getFulfillmentOptions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var rates, carriers, options;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.client_.shippingRates.list();

              case 2:
                rates = _context.sent;
                this.logger_.warn(rates);
                carriers = rates.Carriers;
                options = [];
                Object.keys(carriers).forEach(function (carrier) {
                  carriers[carrier].forEach(function (option) {
                    options.push({
                      id: option.Label,
                      shippy_id: option.CarrierID,
                      name: option.Label + " - " + option.CarrierService,
                      service_name: option.CarrierService,
                      require_drop_point: false,
                      carrier_id: option.CarrierID,
                      is_return: false,
                      logo: option.CarrierLogo
                    });
                  });
                });
                this.logger_.warn(options);
                return _context.abrupt("return", options);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getFulfillmentOptions() {
        return _getFulfillmentOptions.apply(this, arguments);
      }

      return getFulfillmentOptions;
    }()
  }, {
    key: "validateFulfillmentData",
    value: function () {
      var _validateFulfillmentData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(optionData, data, _) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!optionData.require_drop_point) {
                  _context2.next = 5;
                  break;
                }

                if (data.drop_point_id) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("Must have drop point id");

              case 5:
                return _context2.abrupt("return", _objectSpread(_objectSpread({}, optionData), data));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function validateFulfillmentData(_x, _x2, _x3) {
        return _validateFulfillmentData.apply(this, arguments);
      }

      return validateFulfillmentData;
    }()
  }, {
    key: "validateOption",
    value: function () {
      var _validateOption = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", true);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function validateOption(_x4) {
        return _validateOption.apply(this, arguments);
      }

      return validateOption;
    }()
  }, {
    key: "canCalculate",
    value: function canCalculate() {
      // Return whether or not we are able to calculate dynamically
      return false;
    }
  }, {
    key: "calculatePrice",
    value: function calculatePrice() {// Calculate prices
    }
  }, {
    key: "createFulfillment",
    value: function () {
      var _createFulfillment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(methodData, fulfillmentItems, fromOrder, fulfillment) {
        var existing, shippyOrder, shipping_address, id, visible_ref, ext_ref, newOrder;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                existing = fromOrder.metadata && fromOrder.metadata.shippy_order_id;

                if (!existing) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 4;
                return this.client_.orders.retrieve(existing);

              case 4:
                shippyOrder = _context4.sent;

              case 5:
                shipping_address = fromOrder.shipping_address;

                if (shippyOrder) {
                  _context4.next = 13;
                  break;
                }

                id = fulfillment.id;
                visible_ref = "".concat(fromOrder.display_id, "-").concat(id.substr(id.length - 4));
                ext_ref = "".concat(fromOrder.id, ".").concat(fulfillment.id);

                if (fromOrder.is_swap) {
                  ext_ref = "".concat(fromOrder.id, ".").concat(fulfillment.id);
                  visible_ref = "S-".concat(fromOrder.display_id);
                }

                newOrder = {
                  to_address: {
                    name: shipping_address.first_name + " " + shipping_address.last_name,
                    company: shipping_address.company,
                    street1: shipping_address.address_1,
                    street2: shipping_address.address_2,
                    city: shipping_address.city,
                    state: shipping_address.province,
                    zip: String(shipping_address.postal_code),
                    country: shipping_address.country_code,
                    phone: shipping_address.phone,
                    email: shipping_address.metadata.email
                  },
                  items: fromOrder.items.map(function (item) {
                    return {
                      title: item.variant.product.title,
                      imageurl: item.variant.metadata.projection_img_url || item.thumbnail,
                      quantity: item.quantity,
                      price: item.unit_price * item.quantity / 100,
                      sku: item.variant.id
                    };
                  }),
                  parcels: [{
                    length: 5,
                    width: 5,
                    height: 5,
                    weight: 10
                  }],
                  TransactionID: String(fromOrder.display_id),
                  Date: Number(String(new Date(fromOrder.created_at).getTime()).slice(0, 10)),
                  Currency: fromOrder.currency_code.toUpperCase(),
                  ItemsCount: fromOrder.items.reduce(function (total, item) {
                    return total + item.quantity;
                  }, 0),
                  ContentDescription: "Frames and prints",
                  Total: fromOrder.total / 100,
                  Status: "Paid",
                  APIOrdersID: 2437,
                  ShipmentAmountPaid: fromOrder.shipping_total / 100,
                  Incoterm: "DAP",
                  BillAccountNumber: "",
                  PaymentMethod: "Stripe",
                  ShippingService: methodData.service_name,
                  Note: ""
                };
                return _context4.abrupt("return", this.client_.orders.create(newOrder).then(function (result) {
                  return result.data;
                })["catch"](function (err) {
                  console.log(err);
                  throw err;
                }));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function createFulfillment(_x5, _x6, _x7, _x8) {
        return _createFulfillment.apply(this, arguments);
      }

      return createFulfillment;
    }() //   /**
    //    * Cancels a fulfillment. If the fulfillment has already been canceled this
    //    * is idemptotent. Can only cancel pending orders.
    //    * @param {object} data - the fulfilment data
    //    * @return {Promise<object>} the result of the cancellation
    //    */
    //   async cancelFulfillment(data) {
    //     if (Array.isArray(data)) {
    //       data = data[0];
    //     }
    //     const order = await this.client_.orders
    //       .retrieve(data.id)
    //       .catch(() => undefined);
    //     // if order does not exist, we resolve gracefully
    //     if (!order) {
    //       return Promise.resolve();
    //     }
    //     if (order) {
    //       if (
    //         order.data.attributes.status !== "pending" &&
    //         order.data.attributes.status !== "missing_rate"
    //       ) {
    //         if (order.data.attributes.status === "cancelled") {
    //           return Promise.resolve(order);
    //         }
    //         throw new Error("Cannot cancel order");
    //       }
    //     }
    //     return this.client_.orders.delete(data.id);
    //   }

  }]);
  return ShippyFulfillmentService;
}(_medusaInterfaces.FulfillmentService);

(0, _defineProperty2["default"])(ShippyFulfillmentService, "identifier", "shippy");
var _default = ShippyFulfillmentService;
exports["default"] = _default;