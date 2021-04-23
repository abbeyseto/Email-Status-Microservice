/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/sendEmail/handler.ts":
/*!********************************************!*\
  !*** ./src/functions/sendEmail/handler.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n\n\n\nconst formData = __webpack_require__(/*! form-data */ \"form-data\");\nconst Mailgun = __webpack_require__(/*! mailgun.js */ \"mailgun.js\");\nconst mailgun = new Mailgun(formData);\nconst mg = mailgun.client({\n    username: \"api\",\n    key: process.env.MAILGUN_API_KEY ||\n        \"eac12ebb4c5e4e8d23e8dd07df69e788-0d2e38f7-5cbc535f\",\n});\nconst domain = process.env.MAILGUN_DOMAIN || \"mailgun.senergyeglobal.com\";\nconst sendEmail = async (event) => {\n    return mg.messages\n        .create(domain, event.body)\n        .then((msg) => {\n        return _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse._200(msg);\n    })\n        .catch((err) => {\n        return _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse._400(err);\n    });\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(sendEmail);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3NlbmRFbWFpbC9oYW5kbGVyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1haWwtc2VydmljZS8uL3NyYy9mdW5jdGlvbnMvc2VuZEVtYWlsL2hhbmRsZXIudHM/YjhhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXJcIjtcblxuaW1wb3J0IHR5cGUgeyBWYWxpZGF0ZWRFdmVudEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSBcIkBsaWJzL2FwaUdhdGV3YXlcIjtcbmltcG9ydCB7IGZvcm1hdEpTT05SZXNwb25zZSB9IGZyb20gXCJAbGlicy9hcGlHYXRld2F5XCI7XG5pbXBvcnQgeyBtaWRkeWZ5IH0gZnJvbSBcIkBsaWJzL2xhbWJkYVwiO1xuXG5pbXBvcnQgc2NoZW1hIGZyb20gXCIuL3NjaGVtYVwiO1xuXG5jb25zdCBmb3JtRGF0YSA9IHJlcXVpcmUoXCJmb3JtLWRhdGFcIik7XG5jb25zdCBNYWlsZ3VuID0gcmVxdWlyZShcIm1haWxndW4uanNcIik7XG5jb25zdCBtYWlsZ3VuID0gbmV3IE1haWxndW4oZm9ybURhdGEpO1xuY29uc3QgbWcgPSBtYWlsZ3VuLmNsaWVudCh7XG4gIHVzZXJuYW1lOiBcImFwaVwiLFxuICBrZXk6XG4gICAgcHJvY2Vzcy5lbnYuTUFJTEdVTl9BUElfS0VZIHx8XG4gICAgXCJlYWMxMmViYjRjNWU0ZThkMjNlOGRkMDdkZjY5ZTc4OC0wZDJlMzhmNy01Y2JjNTM1ZlwiLFxufSk7XG5jb25zdCBkb21haW4gPSBwcm9jZXNzLmVudi5NQUlMR1VOX0RPTUFJTiB8fCBcIm1haWxndW4uc2VuZXJneWVnbG9iYWwuY29tXCI7XG5jb25zdCBzZW5kRW1haWw6IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQ8dHlwZW9mIHNjaGVtYT4gPSBhc3luYyAoXG4gIGV2ZW50XG4pID0+IHtcbiAgcmV0dXJuIG1nLm1lc3NhZ2VzXG4gICAgLmNyZWF0ZShkb21haW4sIGV2ZW50LmJvZHkpXG4gICAgLnRoZW4oKG1zZykgPT4ge1xuICAgICAgcmV0dXJuIGZvcm1hdEpTT05SZXNwb25zZS5fMjAwKG1zZyk7XG4gICAgfSkgLy8gbG9ncyByZXNwb25zZSBkYXRhXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UuXzQwMChlcnIpO1xuICAgIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IG1haW4gPSBtaWRkeWZ5KHNlbmRFbWFpbCk7XG5cbi8vIGludGVyZmFjZSBBcGlSZXNwb25zZXMge1xuLy8gICBkYXRhPzogb2JqZWN0O1xuLy8gICBlcnJvcj86IG9iamVjdDtcbi8vIH1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/sendEmail/handler.ts\n");

/***/ }),

/***/ "./src/libs/apiGateway.ts":
/*!********************************!*\
  !*** ./src/libs/apiGateway.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"formatJSONResponse\": () => (/* binding */ formatJSONResponse)\n/* harmony export */ });\nconst formatJSONResponse = {\n    _200: (body) => {\n        return {\n            statusCode: 200,\n            body: JSON.stringify(body, null, 2),\n        };\n    },\n    _400: (body) => {\n        return {\n            statusCode: 400,\n            body: JSON.stringify(body, null, 2),\n        };\n    },\n    _404: (body) => {\n        return {\n            statusCode: 404,\n            body: JSON.stringify(body, null, 2),\n        };\n    },\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9hcGlHYXRld2F5LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZW1haWwtc2VydmljZS8uL3NyYy9saWJzL2FwaUdhdGV3YXkudHM/NjI1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7XG4gIEFQSUdhdGV3YXlQcm94eUV2ZW50LFxuICBBUElHYXRld2F5UHJveHlSZXN1bHQsXG4gIEhhbmRsZXIsXG59IGZyb20gXCJhd3MtbGFtYmRhXCI7XG5pbXBvcnQgdHlwZSB7IEZyb21TY2hlbWEgfSBmcm9tIFwianNvbi1zY2hlbWEtdG8tdHNcIjtcblxudHlwZSBWYWxpZGF0ZWRBUElHYXRld2F5UHJveHlFdmVudDxTPiA9IE9taXQ8QVBJR2F0ZXdheVByb3h5RXZlbnQsIFwiYm9keVwiPiAmIHtcbiAgYm9keTogRnJvbVNjaGVtYTxTPjtcbn07XG5leHBvcnQgdHlwZSBWYWxpZGF0ZWRFdmVudEFQSUdhdGV3YXlQcm94eUV2ZW50PFM+ID0gSGFuZGxlcjxcbiAgVmFsaWRhdGVkQVBJR2F0ZXdheVByb3h5RXZlbnQ8Uz4sXG4gIEFQSUdhdGV3YXlQcm94eVJlc3VsdFxuPjtcblxuLy8gZXhwb3J0IGNvbnN0IGZvcm1hdEpTT05SZXNwb25zZSA9IChyZXNwb25zZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbi8vICAgcmV0dXJuIHtcbi8vICAgICBzdGF0dXNDb2RlOiAyMDAsXG4vLyAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpXG4vLyAgIH1cbi8vIH1cblxuZXhwb3J0IGNvbnN0IGZvcm1hdEpTT05SZXNwb25zZSA9IHtcbiAgXzIwMDogKGJvZHk6IHsgW2tleTogc3RyaW5nXTogb2JqZWN0IHwgc3RyaW5nIH0pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSwgbnVsbCwgMiksXG4gICAgfTtcbiAgfSxcbiAgXzQwMDogKGJvZHk6IHsgW2tleTogc3RyaW5nXTogb2JqZWN0IHwgc3RyaW5nIH0pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNDAwLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSwgbnVsbCwgMiksXG4gICAgfTtcbiAgfSxcbiAgXzQwNDogKGJvZHk6IHsgW2tleTogc3RyaW5nXTogb2JqZWN0IHwgc3RyaW5nIH0pID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogNDA0LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoYm9keSwgbnVsbCwgMiksXG4gICAgfTtcbiAgfSxcbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7QUFzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/libs/apiGateway.ts\n");

/***/ }),

/***/ "./src/libs/lambda.ts":
/*!****************************!*\
  !*** ./src/libs/lambda.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"middyfy\": () => (/* binding */ middyfy)\n/* harmony export */ });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-json-body-parser */ \"@middy/http-json-body-parser\");\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst middyfy = (handler) => {\n    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default()());\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9sYW1iZGEudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lbWFpbC1zZXJ2aWNlLy4vc3JjL2xpYnMvbGFtYmRhLnRzPzZiMjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1pZGR5IGZyb20gXCJAbWlkZHkvY29yZVwiO1xuaW1wb3J0IG1pZGR5SnNvbkJvZHlQYXJzZXIgZnJvbSBcIkBtaWRkeS9odHRwLWpzb24tYm9keS1wYXJzZXJcIjtcblxuZXhwb3J0IGNvbnN0IG1pZGR5ZnkgPSAoaGFuZGxlcikgPT4ge1xuICByZXR1cm4gbWlkZHkoaGFuZGxlcikudXNlKG1pZGR5SnNvbkJvZHlQYXJzZXIoKSk7XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/libs/lambda.ts\n");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@middy/core");;

/***/ }),

/***/ "@middy/http-json-body-parser":
/*!***********************************************!*\
  !*** external "@middy/http-json-body-parser" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@middy/http-json-body-parser");;

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("form-data");;

/***/ }),

/***/ "mailgun.js":
/*!*****************************!*\
  !*** external "mailgun.js" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("mailgun.js");;

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/sendEmail/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;