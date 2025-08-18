class draggable {
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
  addDnDHandlers(element){
    element.setAttribute('draggable', true)

    element.addEventListener('dragstart', this.handleDragStart.bind(this))
    element.addEventListener('dragenter', this.handleDragEnter.bind(this))
    element.addEventListener('dragover', this.handleDragOver.bind(this))
    element.addEventListener('dragleave', this.handleDragLeave.bind(this))
    element.addEventListener('drop', this.handleDragDrop.bind(this))
    element.addEventListener('dragend', this.handleDragEnd.bind(this))
  }
  handleDragStart(e){
    console.log('drag start', e.target)
  }
  handleDragEnter(e){
    console.log('drag entered', e.target)
  }
  handleDragOver(e){
    console.log('drag over', e.target)
  }
  handleDragLeave(e){
    console.log('drag leave', e.target)
  }
  handleDragDrop(e){
    console.log('drag drop', e.target)
  }
  handleDragEnd(e){
    console.log('drag ended', e.target)
  }
}
