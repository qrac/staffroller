/*! Staffroller v0.1.0 MIT by Qrac */

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Staffroller =
/*#__PURE__*/
function () {
  function Staffroller() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Staffroller);

    var defaultOptions = {
      id: "staffroller-modal",
      title: "STAFF",
      data: "",
      nameSpace: "staffroller",
      showAttr: "data-".concat(options.nameSpace || "staffroller", "-show"),
      closeAttr: "data-".concat(options.nameSpace || "staffroller", "-close"),
      modalAttr: "data-".concat(options.nameSpace || "staffroller", "-modal")
    };
    Object.assign(this, defaultOptions, options);
    this.showEls = document.querySelectorAll("[".concat(this.showAttr, "]"));
    this.init();
  }

  _createClass(Staffroller, [{
    key: "init",
    value: function init() {
      if (Array.isArray(this.data)) {
        this.setStyle();
        this.setData();
        this.setShow();
        this.setClose();
        this.setKeydown();
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle() {
      var head = document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      var css = "\n      .staffroller-modal[aria-hidden=true] {\n        visibility: hidden;\n      }\n      .staffroller-modal .is-fade {\n        transition: 0.3s cubic-bezier(0, 0, 0.2, 1);\n      }\n      .staffroller-modal[aria-hidden=true] .is-fade {\n        opacity: 0;\n      }\n      .staffroller-modal {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        z-index: 1000;\n        transition: 0.32s;\n      }\n      .staffroller-overlay {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.9);\n        z-index: 1;\n      }\n      .staffroller-close {\n        cursor: pointer;\n        position: fixed;\n        top: 0;\n        right: 0;\n        width: 64px;\n        height: 64px;\n        background: none;\n        border: none;\n        box-shadow: none;\n        opacity: 0.5;\n        z-index: 3;\n      }\n      .staffroller-close:before,\n      .staffroller-close:after {\n        content: \"\";\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        width: 32px;\n        height: 2px;\n        background: #fff;\n        border-radius: 1px;\n      }\n      .staffroller-close:before {\n        transform: translate(-50%, -50%) rotate(45deg);\n      }\n      .staffroller-close:after {\n        transform: translate(-50%, -50%) rotate(-45deg);\n      }\n      .staffroller-wrapper {\n        position: absolute;\n        top: 0;\n        left: 0;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 100%;\n        height: 100%;\n        z-index: 2;\n        overflow: hidden;\n      }\n      .staffroller-container {\n        width: 100%;\n        max-height: 100vh;\n        padding: 48px 16px 160px;\n        overflow-y: auto;\n        -webkit-overflow-scrolling: touch;\n      }\n      .staffroller-container:after {\n        content: \"\";\n        display: block;\n        width: 100%;\n        padding-bottom: constant(safe-area-inset-bottom);\n        padding-bottom: env(safe-area-inset-bottom);\n      }\n      .staffroller-title {\n        padding: 1.25em;\n        color: #fff;\n        font-size: 1.25em;\n        font-weight: 700;\n        text-align: center;\n      }\n      .staffroller-row {\n        display: flex;\n        flex-wrap: wrap;\n      }\n      .staffroller-row > dt,\n      .staffroller-row > dd {\n        flex: 0 0 50%;\n        padding: 0.5em;\n      }\n      .staffroller-role {\n        color: #fff;\n        font-size: 1em;\n        font-weight: 400;\n        text-align: right;\n      }\n      .staffroller-name {\n        color: #fff;\n        font-size: 1em;\n        font-weight: 500;\n        text-align: left;\n      }\n    ";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }, {
    key: "setData",
    value: function setData() {
      //console.log(this.data)
      var target = document.getElementsByTagName("body")[0];
      var app = document.createDocumentFragment();
      var modal = document.createElement("div");
      var overlay = document.createElement("div");
      var wrapper = document.createElement("div");
      var container = document.createElement("div");
      var content = document.createElement("dl");
      modal.setAttribute("id", this.id);
      modal.setAttribute("data-".concat(this.nameSpace || "staffroller", "-modal"), this.id);
      modal.setAttribute("aria-hidden", "true");
      modal.classList.add("staffroller-modal");
      overlay.classList.add("staffroller-overlay", "is-fade");
      wrapper.classList.add("staffroller-wrapper");
      container.classList.add("staffroller-container", "is-fade");
      content.classList.add("staffroller-content");
      app.appendChild(modal);
      modal.appendChild(overlay);
      modal.appendChild(wrapper);
      wrapper.appendChild(container);
      container.appendChild(content);
      container.insertAdjacentHTML("afterbegin", "<p class=\"staffroller-title\">".concat(this.title, "</p>"));
      container.insertAdjacentHTML("beforeend", "<button type=\"button\" ".concat(this.closeAttr, "=\"").concat(this.id, "\" class=\"staffroller-close\"></button>"));
      var rows = this.data;
      var rowsObj = "";

      for (var row in rows) {
        //console.log(rows[row].role)
        var roles = rows[row].role;
        var rolesObj = "";

        if (Array.isArray(roles)) {
          for (var role in roles) {
            //console.log(roles[role])
            rolesObj = rolesObj + "<li class=\"staffroller-role\">".concat(roles[role], "</li>");
          }
        } else {
          //console.log(rows[row].role)
          rolesObj = rolesObj + "<li class=\"staffroller-role\">".concat(rows[row].role, "</li>");
        }

        rolesObj = "<dt><ul class=\"staffroller-roles\">".concat(rolesObj, "</ul></dt>"); //console.log(rows[row].name)

        var names = rows[row].name;
        var namesObj = "";

        if (Array.isArray(names)) {
          for (var name in names) {
            //console.log(names[name])
            namesObj = namesObj + "<li class=\"staffroller-name\">".concat(names[name], "</li>");
          }
        } else {
          //console.log(rows[row].name)
          namesObj = namesObj + "<li class=\"staffroller-name\">".concat(rows[row].name, "</li>");
        }

        namesObj = "<dd><ul class=\"staffroller-names\">".concat(namesObj, "</ul></dd>");
        rowsObj = rowsObj + rolesObj + namesObj;
      }

      rowsObj = "<div class=\"staffroller-row\">".concat(rowsObj, "</div>");
      content.insertAdjacentHTML("beforeend", rowsObj);
      target.appendChild(app);
    }
  }, {
    key: "setShow",
    value: function setShow() {
      var _this = this;

      Array.prototype.slice.call(this.showEls).forEach(function (showEl) {
        var showId = showEl.getAttribute(_this.showAttr);
        showEl.addEventListener("click", function (event) {
          return _this.showModal(event, showId);
        });
      });
    }
  }, {
    key: "setClose",
    value: function setClose() {
      var _this2 = this;

      var closeEls = document.querySelectorAll("[".concat(this.closeAttr, "]"));
      Array.prototype.slice.call(closeEls).forEach(function (closeEl) {
        closeEl.addEventListener("click", function (event) {
          return _this2.closeModal(event);
        });
      });
    }
  }, {
    key: "setKeydown",
    value: function setKeydown() {
      var _this3 = this;

      document.addEventListener("keydown", function (event) {
        return _this3.onKeydown(event);
      });
    }
  }, {
    key: "showModal",
    value: function showModal(event, showId) {
      event.preventDefault();
      var targetModal = document.getElementById(showId);
      targetModal.setAttribute("aria-hidden", "false");
    }
  }, {
    key: "closeModal",
    value: function closeModal(event) {
      event.preventDefault();
      var targetModals = document.querySelectorAll("[".concat(this.modalAttr, "]"));
      Array.prototype.slice.call(targetModals).forEach(function (targetModal) {
        targetModal.setAttribute("aria-hidden", "true");
      });
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(event) {
      if (event.keyCode === 27) this.closeModal(event);
    }
  }]);

  return Staffroller;
}();

if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
  module.exports = Staffroller;
}