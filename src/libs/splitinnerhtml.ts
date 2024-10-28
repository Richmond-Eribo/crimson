class SplitInnerText {
  originalText: string
  words: NodeListOf<HTMLElement>
  chars: NodeListOf<HTMLElement>
  spaces: NodeListOf<HTMLElement>

  constructor(_target: HTMLElement) {
    this.validateTarget(_target) // validating target

    // local variable
    const splitted = this.split(_target)

    this.originalText = _target.innerText
    this.words = splitted.querySelectorAll(".SplitInnerText-wrapper")
    this.chars = splitted.querySelectorAll(".SplitInnerText-char")
    this.spaces = splitted.querySelectorAll(".SplitInnerText-spacer")
  }

  createSpan(_class: string) {
    let span = document.createElement("span")
    span.style.display = "inline-block"
    span.className = _class
    return span
  }

  split(_target: HTMLElement) {
    let arrayOfSpanElements: HTMLSpanElement[] = []

    const splittedWord = _target.innerText.split(/(\s+)/) // _target = "This is a test" expect  ["this", " ", "is", " ", "a", " ", "test"]

    splittedWord.map(word => {
      const wrapper = this.createSpan("SplitInnerText-wrapper")

      if (word.trim() === "") {
        let space = this.createSpan("SplitInnerText-char SplitInnerText-spacer")
        space.innerHTML = "&nbsp;" //non blocking space
        arrayOfSpanElements.push(space)
      } else {
        word.split(/(?!^)/).map(char => {
          let el = this.createSpan("SplitInnerText-char")
          el.innerText = char
          wrapper.appendChild(el)
        })

        arrayOfSpanElements.push(wrapper)
      }
    })

    _target.innerHTML = ""
    arrayOfSpanElements.forEach(child => {
      _target.appendChild(child)
    })
    return _target
  }

  private validateTarget(_target: HTMLElement): void {
    if (!_target) {
      throw new Error("Target element is required")
    }

    if (!_target.innerText) {
      throw new Error("Target element has no text content")
    }

    if (_target.innerText.trim().length === 0) {
      throw new Error("Target element contains only whitespace")
    }
  }
}
export default SplitInnerText
