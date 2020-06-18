export const dialog = [
  {
    type: "Text",
    id: "553cfcfc-776e-4484-837b-c1029c188434",
    actor: "girl",
    name: "Привет, приятно познакомится, сейчас я собираюсь купить кофе\n",
    choices: [
      "c45a11c9-8f72-4094-94b2-016f770bdd2f",
      "c42e456b-a0cc-4fdb-b395-dc4a70d2205a",
    ],
  },
  {
    type: "Choice",
    id: "c45a11c9-8f72-4094-94b2-016f770bdd2f",
    title: "",
    name: "Поздороваться с продавцом",
    next: "a1770e61-18c1-4ac0-a4cd-02f91ed574b6",
  },
  {
    type: "Choice",
    id: "c42e456b-a0cc-4fdb-b395-dc4a70d2205a",
    title: "",
    name: "Просто заказать кофе",
    next: "b18c6302-d640-4485-b319-96654ce7b375",
  },
  {
    type: "Text",
    id: "a1770e61-18c1-4ac0-a4cd-02f91ed574b6",
    actor: "girl",
    name: "Странно, но я только сейчас заметила, тут никого нет!",
    next: null,
  },
  {
    type: "Text",
    id: "b18c6302-d640-4485-b319-96654ce7b375",
    actor: "",
    name: "Добрый день, один миликано в гранулах",
    next: null,
  },
];
