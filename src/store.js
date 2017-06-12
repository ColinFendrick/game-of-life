import { observable, action } from 'mobx'

class Store {
  @observable size = {
    'width': 40,
    'height': 40
  }
  @observable active = [
    [6, 1],
    [1, 3],
    [1, 1]
  ]

  @observable searchArray = (arr, cell) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === cell[0] && arr[i][1] === cell[1]) {
        return i + 1
      }
    }
  }

  @action update = (arr, cell) => {
    if (this.searchArray(arr, cell)) {
      console.log('heetsds')
    } else {
      this.active.push(cell)
    }
  }
}

const store = new Store()
export default store
