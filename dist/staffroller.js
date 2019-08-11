/*! Staffroller v0.5.0 MIT by Qrac */

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
      data: null,
      dataFile: null,
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
      if (this.data) {
        this.setData();
      } else if (this.dataFile) {
        this.setDataFile();
      }
    }
  }, {
    key: "setData",
    value: function setData() {
      this.setTemplate(this.data);
      this.setShow();
      this.setClose();
      this.setKeydown();
    }
  }, {
    key: "setDataFile",
    value: function setDataFile() {
      var _this = this;

      fetch(this.dataFile).then(function (response) {
        return response.json();
      }).then(function (jsonData) {
        _this.setTemplate(jsonData);

        _this.setShow();

        _this.setClose();

        _this.setKeydown();
      });
    }
  }, {
    key: "setTemplate",
    value: function setTemplate(props) {
      var rows = props;
      var rowsObj = "";
      rows.forEach(function (row) {
        var roles = row.role;
        var rolesObj = "";

        if (Array.isArray(roles)) {
          roles.forEach(function (role) {
            rolesObj = rolesObj + "<li class=\"staffroller-role\">".concat(role, "</li>");
          });
        } else {
          rolesObj = rolesObj + "<li class=\"staffroller-role\">".concat(row.role, "</li>");
        }

        rolesObj = "<dt><ul class=\"staffroller-roles\">".concat(rolesObj, "</ul></dt>");
        var members = row.members;
        var membersObj = "";
        members.forEach(function (member) {
          var memberText = member.url ? "<p class=\"staffroller-name\"><a href=\"".concat(member.url, "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"staffroller-link\">").concat(member.name, "</a></p>") : "<p class=\"staffroller-name\"><span>".concat(member.name, "</span></p>");
          var memberImage = member.image ? "<img class=\"staffroller-image\" src=\"".concat(member.image, "\" alt=\"").concat(member.name, "\">") : "";
          membersObj = membersObj + "<li class=\"staffroller-member\">".concat(memberImage).concat(memberText, "</li>");
        });
        membersObj = "<dd><ul class=\"staffroller-members\">".concat(membersObj, "</ul></dd>");
        rowsObj = rowsObj + rolesObj + membersObj;
      });
      rowsObj = "<div class=\"staffroller-row\">".concat(rowsObj, "</div>");
      var modal = "\n      <div id=\"".concat(this.id, "\" ").concat(this.modalAttr, "=\"").concat(this.id, "\" aria-hidden=\"true\" class=\"staffroller-modal\">\n        <div class=\"staffroller-overlay is-fade\"></div>\n        <div class=\"staffroller-wrapper\">\n          <div class=\"staffroller-container is-fade\">\n            <p class=\"staffroller-title\">").concat(this.title, "</p>\n            <dl class=\"staffroller-content\">").concat(rowsObj, "</dl>\n          </div>\n          <button type=\"button\" ").concat(this.closeAttr, "=\"").concat(this.id, "\" class=\"staffroller-close\"></button>\n        </div>\n      </div>\n    ");
      var body = document.querySelector("body");
      body.insertAdjacentHTML("beforeend", modal);
    }
  }, {
    key: "setShow",
    value: function setShow() {
      var _this2 = this;

      this.showEls.forEach(function (showEl) {
        var showId = showEl.getAttribute(_this2.showAttr);
        showEl.addEventListener("click", function (event) {
          return _this2.showModal(event, showId);
        });
      });
    }
  }, {
    key: "setClose",
    value: function setClose() {
      var _this3 = this;

      var closeEls = document.querySelectorAll("[".concat(this.closeAttr, "=\"").concat(this.id, "\"]"));
      closeEls.forEach(function (closeEl) {
        var closeId = closeEl.getAttribute(_this3.closeAttr);
        closeEl.addEventListener("click", function (event) {
          return _this3.closeModal(event, closeId);
        });
      });
    }
  }, {
    key: "setKeydown",
    value: function setKeydown() {
      var _this4 = this;

      document.addEventListener("keydown", function (event) {
        return _this4.onKeydown(event);
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
    value: function closeModal(event, closeId) {
      event.preventDefault();

      if (closeId) {
        var targetModal = document.getElementById(closeId);
        targetModal.setAttribute("aria-hidden", "true");
      } else {
        var targetModals = document.querySelectorAll("[".concat(this.modalAttr, "]"));
        targetModals.forEach(function (targetModal) {
          targetModal.setAttribute("aria-hidden", "true");
        });
      }
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