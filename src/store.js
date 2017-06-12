import { observable, action } from 'mobx'

class Store {
  @observable size = {
    'rows': 30,
    'cols': 30
  }

  @action change = (key, value) => {
    let newSize = {...this.size}
    newSize[key] = parseInt(value, 10)
    this.size = newSize
  }

  @observable active = [
    [2, 2],
    [2, 3],
    [3, 3],
    [3, 4],
    [4, 2],
    [4, 4],
    [22, 1]
  ]

  @observable searchArray = (arr, cell) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === cell[0] && arr[i][1] === cell[1]) {
        return i + 1
      }
    }
  }

  @action update = cell => {
    const arr = this.active.map(s => s.slice(0, 2))

    if (this.searchArray(arr, cell)) {
      let index = this.searchArray(arr, cell)
      this.active.splice(index - 1, 1)
    } else {
      this.active.push(cell)
    }
  }

  @action alive = cell => {
    this.active.push(cell)
  }

  @action start = () => {
    setTimeout(() => this.check(), 10)
  }

  @action check = () => {
    const arr = store.active.map(s => s.slice(0, 2))
    const arrRows = arr.map(x => x[0])
    const arrCols = arr.map(x => x[1])

    for (let i = 0; i <= this.size.rows; i++) {
      for (let j = 0; j <= this.size.cols; j++) {
        if (arrRows.includes(i) && arrCols.includes(j)) {
          this.alive([i, j])
        }
      }
    }
  }
}

const store = new Store()
export default store
