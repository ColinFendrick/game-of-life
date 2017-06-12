import { observable, action } from 'mobx'

class Store {
  @observable size = {
    'width': 40,
    'height': 40
  }
  @observable active = [
    [6, 1],
    [7, 4],
    [1, 3]
  ]

  @observable searchArray = (arr, cell) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === cell[0] && arr[i][1] === cell[1]) {
        return true
      }
    }
  }

  @action update = (arr, cell) => {
    if (this.searchArray(arr, cell)) {
      console.log('test')
    }
  }
}

const store = new Store()
export default store
