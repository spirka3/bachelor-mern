export const navLinks = [
  { title: `about us`, path: `/about-us` },
  { title: `product`, path: `/product` },
  { title: `blog`, path: `/blog` },
  { title: `contact`, path: `/contact` },
  { title: `faq`, path: `/faq` }
];

export const nav_routes = [
  {
    title: "One",
    path: "/one"
  }, {
    title: "Two",
    path: "/two"
  }, {
    title: "Three",
    path: "/three",
    drop: [
      {
        title: "Four",
        path: "/four"
      }, {
        title: "Five",
        path: "/five"
      }
    ]
  }
]

export const modules_1 = [
  {
    id: "1",
    page_id: "1",
    type: "card",
    title: "Title1",
    text: "Description1",
    img: "https://picsum.photos/200"
  },{
    id: "2",
    page_id: "1",
    type: "card",
    title: "Title2",
    text: "Description2",
    img: "https://picsum.photos/200"
  }, {
    id: "3",
    page_id: "1",
    type: "image",
    src: "https://picsum.photos/200",
    alt: "first_image",
    title: "Title to the image"
  }]

export const pages = [{
    id: '1',
    path: '/one',
    name: 'One',
    modules: modules_1,
    visible: true
  }, {
    id: '2',
    path: '/two',
    name: 'Two',
    modules: [],
    visible: true
  },{
    id: '4',
    path: '/four',
    name: 'Four',
    modules: [],
    visible: true
  }, {
    id: '5',
    path: '/five',
    name: 'Five',
    modules: [],
    visible: true
}]

export const image_module = [{
    name: "src",
    label: "source",
    required: true,
  }, {
    name: "alt",
    label: "alter",
    required: false,
  }, {
    name: "title",
    label: "title",
    required: false,
  }, {
    name: "style",
    label: "style",
    required: false,
}]

export const card_module = [{
    name: "title",
    label: "title",
    required: true,
  }, {
    name: "text",
    label: "text",
    required: false,
  }, {
    name: "style",
    label: "style",
    required: false,
}]

export const users = [{
    name: "admin",
    pass: "admin",
    image: "/avatar1.png"
  }, {
    name: "user",
    pass: "user"
  }, {
    name: "visitor",
    pass: "visitor"
}]