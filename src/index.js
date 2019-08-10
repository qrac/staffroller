class Staffroller {
  constructor(options = {}) {
    const defaultOptions = {
      id: "staffroller-modal",
      title: "STAFF",
      data: "",
      nameSpace: "staffroller",
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
      this.setData()
      this.setShow()
      this.setClose()
      this.setKeydown()
    }
  }

  setData() {
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

    wrapper.insertAdjacentHTML(
      "beforeend",
      `<button type="button" ${this.closeAttr}="${
        this.id
      }" class="staffroller-close"></button>`
    )

    const rows = this.data
    let rowsObj = ""

    for (let row in rows) {
      let roles = rows[row].role
      let rolesObj = ""
      if (Array.isArray(roles)) {
        for (let role in roles) {
          rolesObj =
            rolesObj + `<li class="staffroller-role">${roles[role]}</li>`
        }
      } else {
        rolesObj =
          rolesObj + `<li class="staffroller-role">${rows[row].role}</li>`
      }
      rolesObj = `<dt><ul class="staffroller-roles">${rolesObj}</ul></dt>`

      let names = rows[row].name
      let namesObj = ""
      if (Array.isArray(names)) {
        for (let name in names) {
          namesObj =
            namesObj + `<li class="staffroller-name">${names[name]}</li>`
        }
      } else {
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
