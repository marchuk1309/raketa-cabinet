export const companiesList = [
  {
    id: 1,
    type: 'offline',
    name: 'Дзедава карчма',
    category: 'Кафе и рестораны'
  },
  {
    id: 2,
    type: 'online',
    name: '21 vek',
    category: 'Интернет магазин'
  },
  {
    id: 3,
    type: 'offline',
    name: 'SilverStar',
    category: 'Кинотеатры'
  },
  {
    id: 4,
    type: 'offline',
    name: 'Пятёрочка',
    category: 'Магазины'
  },
  {
    id: 5,
    type: 'online',
    name: 'Пьяная устрица',
    category: 'Кафе и рестораны'
  },
  {
    id: 6,
    type: 'offline',
    name: 'Ватные головы',
    category: 'Гос организации'
  },
  {
    id: 7,
    type: 'offline',
    name: 'ООО "Божий промысел"',
    category: 'Ритуальные услуги'
  },
  {
    id: 8,
    type: 'online',
    name: '21 vek',
    category: 'Интернет магазин'
  },
  {
    id: 9,
    type: 'offline',
    name: 'SilverStar',
    category: 'Кинотеатры'
  },
  {
    id: 10,
    type: 'offline',
    name: 'Пятёрочка',
    category: 'Магазины'
  },
  {
    id: 11,
    type: 'online',
    name: 'Пьяная устрица',
    category: 'Кафе и рестораны'
  },
  {
    id: 12,
    type: 'offline',
    name: 'Ватные головы',
    category: 'Гос организации'
  },
  {
    id: 13,
    type: 'offline',
    name: 'Дзедава карчма',
    category: 'Кафе и рестораны'
  },
  {
    id: 14,
    type: 'online',
    name: '21 vek',
    category: 'Интернет магазин'
  },
  {
    id: 2,
    type: 'offline',
    name: 'SilverStar',
    category: 'Кинотеатры'
  },
  {
    id: 3,
    type: 'offline',
    name: 'Пятёрочка',
    category: 'Магазины'
  },
  {
    id: 4,
    type: 'online',
    name: 'Пьяная устрица',
    category: 'Кафе и рестораны'
  },
  {
    id: 5,
    type: 'offline',
    name: 'Ватные головы',
    category: 'Гос организации'
  }
]

export const companyCategories = [
  'Кафе',
  'Продукты',
  'Развлечение',
  'Канцелярия',
  'Топливо',
  'Дом и хозяйство'
]

export const companyFormats = [
  'Формат 1',
  'Формат 2',
  'Формат 3',
  'Формат 4'
]
export const collabStatuses = [
  'Статус 1',
  'Статус 2',
  'Статус 3',
  'Статус 4'
]

export const loyaltyProgramTypes = [
  'Закрытая',
  'Коалиционная'
]

export const aggregators = [
  'Агрегатор 1',
  'Агрегатор 2',
  'Агрегатор 3',
  'Агрегатор 4'
]

export const currencies = [
  'RUB',
  'EUR',
  'BYN',
  'USD'
]

export const cardTemplates = [
  'Шаблон 1',
  'Шаблон 2',
  'Шаблон 3',
  'Шаблон 4'
]

export const staffData = [
  {
    name: 'Иван Иванов',
    email: 'ivan@mail.ru',
    accessType: 'Администратор'
  },
  {
    name: 'Иван Иванов',
    email: 'ivan@mail.ru',
    accessType: 'Кассир'
  },
]

export const taxationTypes = [
  'ОСН',
  'УСН',
  'ЕНВД',
  'ПАТЕНТ',
  'ЕСХН'
]

export const tarifs = [
  'Стандарт',
  '2Х',
  'Индивидуальный'
]

export const taxRates = [
  'Без НДС',
  '10%',
  '20%',
]


export const clientsDatabase = [
  {
    id: 1,
    name: 'Иван Иванов',
    tel: '+375259999999',
    email: 'ivanov123@gmail.com',
    cards: [
      {id: 1, balance: 12800, awaitingBalance: 2400, status: 1, name: 'IVAN IVANOV', number: '1234 4321 0000 1230', type: 'simple'},
      {id: 2, balance: 13009, awaitingBalance: 2100, status: 1, name: 'IVAN IVANOV', number: '1234 4321 0000 3230', type: 'double'},
      {id: 3, balance: 5300, awaitingBalance: 3400, status: 0, name: 'IVAN IVANOV', number: '1234 4321 0000 1430', type: 'custom'},
    ]
  },
  {
    id: 2,
    name: 'Пётр Петров',
    tel: '+375252222222',
    email: 'petrov123@gmail.com',
    cards: [
      {id: 1, balance: 12800, awaitingBalance: 2400, status: 1, name: 'PETR PETROV', number: '1324 4321 0000 1230', type: 'simple'},
      {id: 2, balance: 13009, awaitingBalance: 2100, status: 1, name: 'PETR PETROV', number: '1324 4321 0000 3210', type: 'double'},
      {id: 3, balance: 5300, awaitingBalance: 3400, status: 0, name: 'PETR PETROV', number: '1325 4321 0000 1430', type: 'custom'},
    ]
  },
  {
    id: 3,
    name: 'Василий Васильев',
    tel: '+375253333333',
    email: 'vasilyev123@gmail.com',
    cards: [
      {id: 1, balance: 12800, awaitingBalance: 2400, status: 1, name: 'VASILY VASILYEV', number: '1324 4321 0000 1213', type: 'simple'},
      {id: 2, balance: 13009, awaitingBalance: 2100, status: 1, name: 'VASILY VASILYEV', number: '1324 4321 0000 3333', type: 'double'},
      {id: 3, balance: 5300, awaitingBalance: 3400, status: 0, name: 'VASILY VASILYEV', number: '1325 4321 0000 9876', type: 'custom'},
    ]
  }
]