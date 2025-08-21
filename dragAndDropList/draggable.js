class draggable {
  dragScrEl;

  constructor(options) {
    this.setupList(options);

    for (let listItem of options.el.children) {
      this.addDnDHandlers(listItem);
    }
  }
  setupList(options) {
    let { list, el: element, template } = options;
    if (!element) throw Error("the list not exists");
    if (!list) throw Error("the data is not exists");
    if (!Array.isArray(list))
      throw Error("the list is not an array, please insert an array");
    if (!template) throw Error("please add template function");
    if (typeof template !== "function")
      throw Error("please add a function as a template");

    list.forEach((item) => (element.innerHTML += template(item)));
  }
  addDnDHandlers(element) {
    element.setAttribute("draggable", true);

    element.addEventListener("dragstart", this.handleDragStart.bind(this));
    element.addEventListener("dragenter", this.handleDragEnter.bind(this));
    element.addEventListener("dragover", this.handleDragOver.bind(this));
    element.addEventListener("dragleave", this.handleDragLeave.bind(this));
    element.addEventListener("drop", this.handleDragDrop.bind(this));
    element.addEventListener("dragend", this.handleDragEnd.bind(this));
  }
  handleDragStart(e) {
    this.dragScrEl = e.target;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.target.classList.add("dragElem");
  }
  handleDragEnter(e) {}
  handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();

    e.target.classList.add("over");
  }
  handleDragLeave(e) {
    e.target.classList.remove("over");
  }
  handleDragDrop(e) {
    let target = e.target.closest(".list-item");

    if (this.dragScrEl !== target) {
      let dropHTML = e.dataTransfer.getData("text/html");
      target.insertAdjacentHTML("beforebegin", dropHTML);
      target.parentNode.removeChild(this.dragScrEl);
      this.addDnDHandlers(target.previousSibling);
    }
    e.target.classList.remove("over");
  }
  handleDragEnd(e) {
    e.target.classList.remove("dragElem");
  }
}
