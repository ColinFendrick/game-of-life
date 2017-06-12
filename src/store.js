import { observable, action } from 'mobx'
import _ from 'lodash'

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
    [5, 1]
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
    console.log(cell)
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
    let potentials = []
    let counts = {}

    for (let i = 0; i < arrRows.length; i++) {
      potentials.push([arrRows[i], arrCols[i] + 1])
      potentials.push([arrRows[i] + 1, arrCols[i] + 1])
      potentials.push([arrRows[i] + 1, arrCols[i]])
      potentials.push([arrRows[i] + 1, arrCols[i] - 1])
      potentials.push([arrRows[i], arrCols[i] - 1])
      potentials.push([arrRows[i] - 1, arrCols[i] - 1])
      potentials.push([arrRows[i] - 1, arrCols[i]])
      potentials.push([arrRows[i] - 1, arrCols[i] + 1])
    }
    for (let i = 0; i < potentials.length; i++) {
      let pos = potentials[i]
      counts[pos] = counts[pos] ? counts[pos] + 1 : 1
    }
    console.log(counts)

    // for (let i = 0; i <= this.size.rows; i++) {
    //   for (let j = 0; j <= this.size.cols; j++) {
    //     let prox = 0
    //     for (let k = 0; k < arrRows.length; k++) {
    //       if (arrRows[k] === i || arrRows[k] + 1 === i || arrRows[k] - 1 === i) {
    //         if (arrCols[k] === j || arrCols[k] + 1 === j || arrCols[k] - 1 === j) {
    //           prox++
    //         }
    //       }
    //       if (prox === 2 || prox === 3) {
    //         this.alive([i, j])
    //       }
    //     }
    //   }
    // }
  }
}

const store = new Store()
export default store
