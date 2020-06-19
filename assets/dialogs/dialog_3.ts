export const dialog = [
  {
    type: "Text",
    id: "c5caa4ed-ca12-4ac8-ab0b-995684420fd3",
    actor: "girl",
    name:
      "Все началось с великого взрыва! Появилось пространство и время, а с ним и кофе, которое я собираюсь купить",
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
    name: "",
    choices: [
      "8e190f8c-720b-4f65-9ae5-74a1c011d021",
      "c60864d3-048c-4d31-9e9c-0db04d988e2e",
    ],
  },
  {
    type: "Choice",
    id: "8e190f8c-720b-4f65-9ae5-74a1c011d021",
    title: "",
    name: "Сказать спасибо",
    next: "5d94b52f-faaa-4795-8e5c-49f6433532e2",
  },
  {
    type: "Choice",
    id: "c60864d3-048c-4d31-9e9c-0db04d988e2e",
    title: "",
    name: "До свидания я",
    next: "5d94b52f-faaa-4795-8e5c-49f6433532e2",
  },
  {
    type: "Text",
    id: "5d94b52f-faaa-4795-8e5c-49f6433532e2",
    actor: "",
    name: "Это очень странное кафе",
    next: null,
  },
];
