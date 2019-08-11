class StaffRoller {
  constructor(options = {}) {
    const defaultOptions = {
      id: "staff",
      title: "STAFF",
      data: null,
      dataFile: null,
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
    if (this.data) {
      this.setData()
    } else if (this.dataFile) {
      this.setDataFile()
    }
  }

  setData() {
    this.setTemplate(this.data)
    this.setShow()
    this.setClose()
    this.setKeydown()
  }

  setDataFile() {
    fetch(this.dataFile)
      .then(response => response.json())
      .then(jsonData => {
        this.setTemplate(jsonData)
        this.setShow()
        this.setClose()
        this.setKeydown()
      })
  }

  setTemplate(props) {
    const rows = props
    let rowsObj = ""

    rows.forEach(row => {
      let roles = row.role
      let rolesObj = ""
      if (Array.isArray(roles)) {
        roles.forEach(role => {
          rolesObj = rolesObj + `<li class="staffroller-role">${role}</li>`
        })
      } else {
        rolesObj = rolesObj + `<li class="staffroller-role">${row.role}</li>`
      }
      rolesObj = `<dt><ul class="staffroller-roles">${rolesObj}</ul></dt>`

      let names = row.name
      let namesObj = ""
      if (Array.isArray(names)) {
        names.forEach(name => {
          namesObj = namesObj + `<li class="staffroller-name">${name}</li>`
        })
      } else {
        namesObj = namesObj + `<li class="staffroller-name">${row.name}</li>`
      }
      namesObj = `<dd><ul class="staffroller-names">${namesObj}</ul></dd>`

      rowsObj = rowsObj + rolesObj + namesObj
    })
    rowsObj = `<div class="staffroller-row">${rowsObj}</div>`

    const modal = `
      <div id="${this.id}" ${this.modalAttr}="${
      this.id
    }" aria-hidden="true" class="staffroller-modal">
        <div class="staffroller-overlay is-fade"></div>
        <div class="staffroller-wrapper">
          <div class="staffroller-container is-fade">
            <p class="staffroller-title">${this.title}</p>
            <dl class="staffroller-content">${rowsObj}</dl>
          </div>
          <button type="button" ${this.closeAttr}="${
      this.id
    }" class="staffroller-close"></button>
        </div>
      </div>
    `

    const body = document.querySelector("body")
    body.insertAdjacentHTML("beforeend", modal)
  }

  setShow() {
    this.showEls.forEach(showEl => {
      const showId = showEl.getAttribute(this.showAttr)
      showEl.addEventListener("click", event => this.showModal(event, showId))
    })
  }

  setClose() {
    const closeEls = document.querySelectorAll(
      `[${this.closeAttr}="${this.id}"]`
    )
    closeEls.forEach(closeEl => {
      const closeId = closeEl.getAttribute(this.closeAttr)
      closeEl.addEventListener("click", event =>
        this.closeModal(event, closeId)
      )
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

  closeModal(event, closeId) {
    event.preventDefault()
    if (closeId) {
      const targetModal = document.getElementById(closeId)
      targetModal.setAttribute("aria-hidden", "true")
    } else {
      const targetModals = document.querySelectorAll(`[${this.modalAttr}]`)
      targetModals.forEach(targetModal => {
        targetModal.setAttribute("aria-hidden", "true")
      })
    }
  }

  onKeydown(event) {
    if (event.keyCode === 27) this.closeModal(event)
  }
}

if (typeof module === "object") {
  module.exports = StaffRoller
}
