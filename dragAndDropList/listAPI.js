const data = [
  {
    id: 1,
    title: "1st item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 2,
    title: "2sd item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 3,
    title: "3rd item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 4,
    title: "4th item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 5,
    title: "5th item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 6,
    title: "7th item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
  {
    id: 7,
    title: "6th item",
    Text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed",
  },
];

new draggable({
  el: document.querySelector("#list"),
  list: data,
  template: (item) => {
    return `
    <div class="list_item" id="${item.id}">
    <div class="list_item_head">
        <span class="head_id">${item.id}</span>
    </div>
    <div class="list_item_content">
        <span class="item_title">${item.title}</span>
        <p class="text">${item.Text}</p>
    </div>
</div>
    
    `;
  },
  update : (list )=>{
    console.log(list)
  }
});
