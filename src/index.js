class Staffroller {
  constructor(options = {}) {
    const defaultOptions = {
      nameSpace: "staffroller",
      id: "staffroller-modal",
      title: "STAFF",
      data: "",
      showAttr: `data-${options.nameSpace || "staffroller"}-show`,
      closeAttr: `data-${options.nameSpace || "staffroller"}-close`,
      modalAttr: `data-${options.nameSpace || "staffroller"}-modal`
    }
    Object.assign(this, defaultOptions, options)
    this.showEls = document.querySelectorAll(`[${this.showAttr}]`)
    this.init()
  }
  init() {
    if (Array.isArray(this.data)) {
      this.setStyle()
      this.setData()
      this.setShow()
      this.setClose()
      this.setKeydown()
    }
  }

  setStyle() {
    const head = document.getElementsByTagName("head")[0]
    const style = document.createElement("style")
    const css = `
      .staffroller-modal[aria-hidden=true] {
        visibility: hidden;
      }
      .staffroller-modal .is-fade {
        transition: 0.3s cubic-bezier(0, 0, 0.2, 1);
      }
      .staffroller-modal[aria-hidden=true] .is-fade {
        opacity: 0;
      }
      .staffroller-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        transition: 0.32s;
      }
      .staffroller-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 1;
      }
      .staffroller-close {
        cursor: pointer;
        position: fixed;
        top: 0;
        right: 0;
        width: 64px;
        height: 64px;
        background: none;
        border: none;
        box-shadow: none;
        opacity: 0.5;
        z-index: 3;
      }
      .staffroller-close:before,
      .staffroller-close:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 32px;
        height: 2px;
        background: #fff;
        border-radius: 1px;
      }
      .staffroller-close:before {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      .staffroller-close:after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      .staffroller-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        z-index: 2;
        overflow: hidden;
      }
      .staffroller-container {
        width: 100%;
        max-height: 100vh;
        padding: 48px 16px 160px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }
      .staffroller-container:after {
        content: "";
        display: block;
        width: 100%;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
      }
      .staffroller-title {
        padding: 1.25em;
        color: #fff;
        font-size: 1.25em;
        font-weight: 700;
        text-align: center;
      }
      .staffroller-row {
        display: flex;
        flex-wrap: wrap;
      }
      .staffroller-row > dt,
      .staffroller-row > dd {
        flex: 0 0 50%;
        padding: 0.5em;
      }
      .staffroller-role {
        color: #fff;
        font-size: 1em;
        font-weight: 400;
        text-align: right;
      }
      .staffroller-name {
        color: #fff;
        font-size: 1em;
        font-weight: 500;
        text-align: left;
      }
    `
    style.appendChild(document.createTextNode(css))
    head.appendChild(style)
  }

  setData() {
    //console.log(this.data)
    const target = document.getElementsByTagName("body")[0]
    const app = document.createDocumentFragment()

    const modal = document.createElement("div")
    const overlay = document.createElement("div")
    const wrapper = document.createElement("div")
    const container = document.createElement("div")
    const content = document.createElement("dl")

    modal.setAttribute("id", this.id)
    modal.setAttribute(`data-${this.nameSpace || "staffroller"}-modal`, this.id)
    modal.setAttribute("aria-hidden", "true")
    modal.classList.add("staffroller-modal")
    overlay.classList.add("staffroller-overlay", "is-fade")
    wrapper.classList.add("staffroller-wrapper")
    container.classList.add("staffroller-container", "is-fade")
    content.classList.add("staffroller-content")

    app.appendChild(modal)
    modal.appendChild(overlay)
    modal.appendChild(wrapper)
    wrapper.appendChild(container)
    container.appendChild(content)

    container.insertAdjacentHTML(
      "afterbegin",
      `<p class="staffroller-title">${this.title}</p>`
    )

    container.insertAdjacentHTML(
      "beforeend",
      `<button type="button" ${this.closeAttr}="${
        this.id
      }" class="staffroller-close"></button>`
    )

    const rows = this.data
    let rowsObj = ""

    for (let row in rows) {
      //console.log(rows[row].role)
      let roles = rows[row].role
      let rolesObj = ""
      if (Array.isArray(roles)) {
        for (let role in roles) {
          //console.log(roles[role])
          rolesObj =
            rolesObj + `<li class="staffroller-role">${roles[role]}</li>`
        }
      } else {
        //console.log(rows[row].role)
        rolesObj =
          rolesObj + `<li class="staffroller-role">${rows[row].role}</li>`
      }
      rolesObj = `<dt><ul class="staffroller-roles">${rolesObj}</ul></dt>`

      //console.log(rows[row].name)
      let names = rows[row].name
      let namesObj = ""
      if (Array.isArray(names)) {
        for (let name in names) {
          //console.log(names[name])
          namesObj =
            namesObj + `<li class="staffroller-name">${names[name]}</li>`
        }
      } else {
        //console.log(rows[row].name)
        namesObj =
          namesObj + `<li class="staffroller-name">${rows[row].name}</li>`
      }
      namesObj = `<dd><ul class="staffroller-names">${namesObj}</ul></dd>`

      rowsObj = rowsObj + rolesObj + namesObj
    }
    rowsObj = `<div class="staffroller-row">${rowsObj}</div>`
    content.insertAdjacentHTML("beforeend", rowsObj)

    target.appendChild(app)
  }

  setShow() {
    Array.prototype.slice.call(this.showEls).forEach(showEl => {
      const showId = showEl.getAttribute(this.showAttr)
      showEl.addEventListener("click", event => this.showModal(event, showId))
    })
  }

  setClose() {
    const closeEls = document.querySelectorAll(`[${this.closeAttr}]`)
    Array.prototype.slice.call(closeEls).forEach(closeEl => {
      closeEl.addEventListener("click", event => this.closeModal(event))
    })
  }

  setKeydown() {
    document.addEventListener("keydown", event => this.onKeydown(event))
  }

  showModal(event, showId) {
    event.preventDefault()
    const targetModal = document.getElementById(showId)
    targetModal.setAttribute("aria-hidden", "false")
  }

  closeModal(event) {
    event.preventDefault()
    const targetModals = document.querySelectorAll(`[${this.modalAttr}]`)
    Array.prototype.slice.call(targetModals).forEach(targetModal => {
      targetModal.setAttribute("aria-hidden", "true")
    })
  }

  onKeydown(event) {
    if (event.keyCode === 27) this.closeModal(event)
  }
}

if (typeof module === "object") {
  module.exports = Staffroller
}
