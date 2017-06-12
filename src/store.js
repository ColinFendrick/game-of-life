import { observable, action } from 'mobx'

class Store {
  @observable size = {
    'rows': 30,
    'cols': 30
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

  @action change = (key, value) => {
    let newSize = {...this.size}
    newSize[key] = parseInt(value, 10)
    this.size = newSize
  }

  @action update = (arr, cell) => {
    if (this.searchArray(arr, cell)) {
      let index = this.searchArray(arr, cell)
      this.active.splice(index - 1, 1)
    } else {
      this.active.push(cell)
    }
  }
}

const store = new Store()
export default store
