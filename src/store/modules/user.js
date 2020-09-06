export default {
  state: {
    userInfo: {
      id: 1,
      name: "Питер",
      surname: "Гриффин"
    },
    companyName: 'ООО "Божий промысел"',
    userStatus: 'user',
    isLoggedIn: true,
    myCards: [
      {id: 1, balance: 12800, awaitingBalance: 2400, status: 1, userStatus: 'Агент', name: 'SERGEY FOBESKO', number: '1234 4321 0000 1230', loyaltyProgramType: 'Закрытый', type: 'simple', customImage: ''},
      {id: 2, balance: 13009, awaitingBalance: 2100, status: 1, userStatus: 'Клиент', name: 'SERGEY FOBESKO', number: '1234 4321 0000 3230', loyaltyProgramType: 'Закрытый', type: 'double', customImage: ''},
      {id: 4, balance: 5300, awaitingBalance: 3400, status: 0, userStatus: 'Клиент', name: 'SERGEY FOBESKO', number: '1234 4321 0000 1430', loyaltyProgramType: 'Закрытый', type: 'custom', customImage: 'https://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png'},
    ]
  },
  getters: {
    userId: state => state.userInfo.id,
    companyName: state => state.companyName,
    fullName: state => state.userInfo.name + ' ' + state.userInfo.surname,
    allCards: state => state.myCards,
    userStatus: state => state.userStatus,
    balance: state => {
      let sum = 0
      state.myCards.forEach(el => {
        sum += el.balance
      })
      return sum
    },
    getCardById: state => id => state.myCards.find(el => el.id === id)
  },
  mutations: {
    changeUserStatus(state, newStatus) {
      state.userStatus = newStatus
      console.log('user status was changed to ' + newStatus)
    }
  },
  actions: {

  }
}