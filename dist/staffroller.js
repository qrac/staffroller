/*! Staffroller v0.2.3 MIT by Qrac */

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StaffRoller =
/*#__PURE__*/
function () {
  function StaffRoller() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, StaffRoller);

    var defaultOptions = {
      id: "staff",
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

  _createClass(StaffRoller, [{
    key: "init",
    value: function init() {
      if (Array.isArray(this.data)) {
        this.setData();
        this.setShow();
        this.setClose();
        this.setKeydown();
      }
    }
  }, {
    key: "setData",
    value: function setData() {
      var rows = this.data;
      var rowsObj = "";

      for (var row in rows) {
        var roles = rows[row].role;
        var rolesObj = "";

        if (Array.isArray(roles)) {
          for (var role in roles) {
            rolesObj = rolesObj + "<li class=\"staffroller-role\">".concat(roles[role], "</li>");
          }
        } else {
          rolesObj = rolesObj + "<li class=\"staffroller-role\">".concat(rows[row].role, "</li>");
        }

        rolesObj = "<dt><ul class=\"staffroller-roles\">".concat(rolesObj, "</ul></dt>");
        var names = rows[row].name;
        var namesObj = "";

        if (Array.isArray(names)) {
          for (var name in names) {
            namesObj = namesObj + "<li class=\"staffroller-name\">".concat(names[name], "</li>");
          }
        } else {
          namesObj = namesObj + "<li class=\"staffroller-name\">".concat(rows[row].name, "</li>");
        }

        namesObj = "<dd><ul class=\"staffroller-names\">".concat(namesObj, "</ul></dd>");
        rowsObj = rowsObj + rolesObj + namesObj;
      }

      rowsObj = "<div class=\"staffroller-row\">".concat(rowsObj, "</div>");
      var modal = "\n      <div id=\"".concat(this.id, "\" ").concat(this.modalAttr, "=\"").concat(this.id, "\" aria-hidden=\"true\" class=\"staffroller-modal\">\n        <div class=\"staffroller-overlay is-fade\"></div>\n        <div class=\"staffroller-wrapper\">\n          <div class=\"staffroller-container is-fade\">\n            <p class=\"staffroller-title\">").concat(this.title, "</p>\n            <dl class=\"staffroller-content\">").concat(rowsObj, "</dl>\n          </div>\n          <button type=\"button\" ").concat(this.closeAttr, "=\"").concat(this.id, "\" class=\"staffroller-close\"></button>\n        </div>\n      </div>\n    ");
      var body = document.querySelector("body");
      body.insertAdjacentHTML("beforeend", modal);
    }
  }, {
    key: "setShow",
    value: function setShow() {
      var _this = this;

      this.showEls.forEach(function (showEl) {
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
      closeEls.forEach(function (closeEl) {
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
      targetModals.forEach(function (targetModal) {
        targetModal.setAttribute("aria-hidden", "true");
      });
    }
  }, {
    key: "onKeydown",
    value: function onKeydown(event) {
      if (event.keyCode === 27) this.closeModal(event);
    }
  }]);

  return StaffRoller;
}();

if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
  module.exports = StaffRoller;
}