"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _crypto = _interopRequireDefault(require("crypto"));

var _cors = _interopRequireDefault(require("cors"));

var _medusaCoreUtils = require("medusa-core-utils");

var _default = function _default(rootDirectory) {
  var app = (0, _express.Router)();

  var _getConfigFile = (0, _medusaCoreUtils.getConfigFile)(rootDirectory, "medusa-config"),
      configModule = _getConfigFile.configModule;

  var projectConfig = configModule.projectConfig;
  var corsOptions = {
    origin: projectConfig.store_cors.split(","),
    credentials: true
  };
  return app;
};

exports["default"] = _default;