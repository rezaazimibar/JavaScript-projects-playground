const data = [
  {
    id: 1,
    title: "1st item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 2,
    title: "2sd item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 3,
    title: "3rd item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 4,
    title: "4th item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 5,
    title: "5th item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 6,
    title: "7th item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 7,
    title: "6th item",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
];

new draggable({
  el: document.querySelector("#list"),
  list: data,
  template: (item) => {
    return `<div class="list-item" id="${item.id}">
        <div class="list-item_head">
            <span class="head-id">${item.id}</span>
        </div>
         <div class="list-item_content">
            <span class="item-title">${item.title}</span>
            <p>${item.text}</p>
         </div>
    </div>`;
  },
  update: (list) => {
    console.log(list);
  },
});
console.log()