export default {
  state: {
    transactionsList: [
      {
        id: 1,
        type: 'admission',
        subType: 'referral',
        cardNumber: '1234 4321 0000 1130',
        date: new Date(2020, 1, 20),
        requestNumber: 'СB-134567-830',
        companyName: 'Дзедава карчма',
        companyCard: '0000 0000 0000 0000',
        requestSum: 1200,
        admissionSum: 1020,
        status: 'Ожидание'
      },
      {
        id: 2,
        type: 'admission',
        subType: 'referral',
        cardNumber: '1234 4321 0000 1130',
        date: new Date(2020, 2, 20),
        requestNumber: 'СB-134567-830',
        companyName: 'Дзедава карчма',
        companyCard: '0000 0000 0000 0000',
        referral: {
          name: 'Уася',
          card: '1234 4444 4444 4444',
          city: 'Москау',
        },
        requestSum: 1200,
        admissionSum: 120,
        status: 'Ожидание'
      },
      {
        id: 3,
        type: 'admission',
        subType: 'cash-back',
        cardNumber: '1234 4321 0000 1240',
        date: new Date(2020, 1, 20),
        requestNumber: 'СB-134567-830',
        companyName: 'Дзедава карчма',
        companyCard: '0000 0000 0000 0000',
        requestSum: 1200,
        admissionSum: 120,
        status: 'Ожидание'
      },
      {
        id: 4,
        type: 'admission',
        subType: 'cash-back',
        cardNumber: '1234 4321 0000 1130',
        date: new Date(2020, 1, 20),
        requestNumber: 'СB-134567-830',
        companyName: 'Дзедава карчма',
        companyCard: '0000 0000 0000 0000',
        requestSum: 1200,
        admissionSum: 120,
        status: 'Отмена, Галя!'
      },
      {
        id: 5,
        type: 'write-off',
        subType: 'cash-back',
        cardNumber: '1234 4321 0000 1130',
        date: new Date(2020, 1, 20),
        requestNumber: 'СB-134567-830',
        companyName: 'Дзедава карчма',
        companyCard: '0000 0000 0000 0000',
        requestSum: 1200,
        admissionSum: 120,
        status: 'Подтвержден'
      },
      {
        id: 5,
        type: 'write-off',
        subType: 'deduction',
        cardNumber: '1234 4321 0000 1130',
        date: new Date(2020, 1, 20),
        requestNumber: 'СB-134567-830',
        paymentSystem: 'Яндекс Деньги',
        accountNumber: '0000 0000 0000 0312',
        deductionSum: 120,
        status: 'Подтвержден'
      },
      {
        id: 5,
        type: 'write-off',
        subType: 'raketaStore',
        cardNumber: '1234 4321 0000 1130',
        date: new Date(2020, 1, 20),
        requestNumber: 'СB-134567-830',
        service: 'Тариф X2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cupiditate in molestias numquam porro soluta tempora! Ab, mollitia nostrum porro quam qui quia voluptatem! Esse nisi numquam quos rerum voluptate.',
        admissionSum: 120,
        status: 'Подтвержден'
      }
    ]
  },
  getters: {
    getTransitionsByParams: state => ({ transType = null, subType = null, cardNumber = null, startDate = null, endDate = null, company = null, startSum = null, endSum = null}) => {
      let list = []

      if ( transType === null && subType === null) {
        return 0
      } else {
        list = state.transactionsList.filter(el => {
          let bool = el.type.toLowerCase() === transType.toLowerCase()
          bool = bool ? subType !== null ? el.subType === subType : true  : false
          bool = bool ? cardNumber !== null ? el.cardNumber === cardNumber : true  : false
          bool = bool ? startDate !== null ? el.date >= startDate : true  : false
          bool = bool ? endDate !== null ? el.date <= endDate : true  : false
          bool = bool ? company !== null ? el.companyName.toLowerCase() === company.toLowerCase() : true  : false
          bool = bool ? startSum !== null ? (el.admissionSum || el.deductionSum) >= startSum : true  : false
          bool = bool ? endSum !== null ? (el.admissionSum || el.deductionSum) <= endSum : true  : false
          return bool
        })
        return list
      }
    },
    maxTransSum: state => {
      let max = 0
      state.transactionsList.forEach(el => {
        max = el.admissionSum > max ? el.admissionSum : max
      })
      return max
    }
  }
}