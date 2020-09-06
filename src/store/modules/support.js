export default {
  state: {
    supportRequests: [
      {
        id: 1,
        requestNumber: 110,
        requestBody: { title: 'Тема заявки', text: 'Lorem ipsum ta-ta-ta param pam pam ipsum lorem tra-ta-ta' },
        card: '0000 0000 0000 0000',
        userStatus: 'Заведение',
        requestStatus: 2, // 0 - завершена, 1 - в ожидании, 2 - Отменена
        expertName: "Почтальон Печкин",
        createDate: new Date(2020, 1, 21),
        closeDate: new Date()
      },
      {
        id: 2,
        requestNumber: 111,
        requestBody: { title: 'Das Thema der Forderung', text: 'Lorem ipsum ta-ta-ta param pam pam ipsum lorem tra-ta-ta' },
        card: '0000 0000 0000 0000',
        userStatus: 'Заведение',
        requestStatus: 0,
        expertName: "Дядя Фёдор",
        createDate: new Date(2020, 1, 25),
        closeDate: new Date()
      },
      {
        id: 3,
        requestNumber: 112,
        requestBody: { title: 'Request theme', text: 'Lorem ipsum ta-ta-ta param pam pam ipsum lorem tra-ta-ta' },
        card: '0000 0000 0000 0000',
        userStatus: 'Заведение',
        requestStatus: 1,
        expertName: "Кот Матроскин",
        createDate: new Date(2020, 1, 20),
        closeDate: new Date()
      },
      {
        id: 4,
        requestNumber: 113,
        requestBody: { title: 'Тэма заяўкi', text: 'Lorem ipsum ta-ta-ta param pam pam ipsum lorem tra-ta-ta' },
        card: '0000 0000 0000 0000',
        userStatus: 'Заведение',
        requestStatus: 2,
        expertName: "Шарик",
        createDate: new Date(2020, 1, 20),
        closeDate: new Date()
      },
      {
        id: 5,
        requestNumber: 114,
        requestBody: { title: 'Тема заявки', text: 'Lorem ipsum ta-ta-ta param pam pam ipsum lorem tra-ta-ta' },
        card: '0000 0000 0000 0000',
        userStatus: 'Заведение',
        requestStatus: 1,
        expertName: "Почтальон Печкин",
        createDate: new Date(2020, 1, 20),
        closeDate: new Date()
      },
      {
        id: 6,
        requestNumber: 115,
        requestBody: { title: 'Тема заявки', text: 'Lorem ipsum ta-ta-ta param pam pam ipsum lorem tra-ta-ta' },
        card: '0000 0000 0000 0000',
        userStatus: 'Заведение',
        requestStatus: 0,
        expertName: "Почтальон Печкин",
        createDate: new Date(2020, 1, 20),
        closeDate: new Date()
      },
    ]
  },
  getters: {
    allSupportRequests: state => state.supportRequests,
  },
  mutations: {
    changeSupportRequestStatus: (state, {id, status}) => state.supportRequests.find(el => el.id === id).requestStatus = status
  },
  actions: {

  }
}