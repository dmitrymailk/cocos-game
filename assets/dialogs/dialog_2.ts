export const dialog = [
  {
    type: "Text",
    id: "c5caa4ed-ca12-4ac8-ab0b-995684420fd3",
    actor: "girl",
    name: "Всем привет, время купить кофе",
    choices: [
      "219eae4b-b66e-41e5-839e-2ca073ffc9db",
      "7f9c01fe-5126-4390-9425-85e7ea2fff57",
    ],
  },
  {
    type: "Choice",
    id: "219eae4b-b66e-41e5-839e-2ca073ffc9db",
    title: "",
    name: "Поздороваться с продавцом",
    next: "d2537966-5c99-4163-897a-5f35f2d28644",
  },
  {
    type: "Choice",
    id: "7f9c01fe-5126-4390-9425-85e7ea2fff57",
    title: "",
    name: "Сделать заказ",
    next: "8958d5df-8bb8-458e-aae3-e6acec809bd7",
  },
  {
    type: "Text",
    id: "d2537966-5c99-4163-897a-5f35f2d28644",
    actor: "",
    name: "Привет, ты это я или я это ты?",
    next: "ac743820-515f-45aa-aaa1-3dde169a7c5c",
  },
  {
    type: "Text",
    id: "8958d5df-8bb8-458e-aae3-e6acec809bd7",
    actor: "",
    name: "Дай мне кофе, ты",
    next: "ac743820-515f-45aa-aaa1-3dde169a7c5c",
  },
  {
    type: "Text",
    id: "ac743820-515f-45aa-aaa1-3dde169a7c5c",
    actor: "",
    name: "Как же я люблю свежий кофе по утрам",
    next: null,
  },
];
