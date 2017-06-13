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
    [5, 1],
    [5, 2]
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

  @action kill = cell => {
    const arr = this.active.map(s => s.slice(0, 2))
    let index = this.searchArray(arr, cell)
    this.active.splice(index - 1, 1)
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

    // Put all neighbors of active cells into an array
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
    // Count occurances of those neighbors
    for (let i = 0; i < potentials.length; i++) {
      let pos = potentials[i]
      counts[pos] = counts[pos] ? counts[pos] + 1 : 1
    }
    // Kill living cells w/ less than two neighbors
    let alone = _.pickBy(counts, v => v < 2)
    let aloneArr = []
    for (let i = 0; i < Object.keys(alone).length; i++) {
      aloneArr.push([parseInt(Object.keys(alone)[i][0]), parseInt(Object.keys(alone)[i][2])])
    }
    for (let i = 0; i < aloneArr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (aloneArr[i][0] === arr[j][0] && aloneArr[i][1] === arr[j][1]) {
          this.kill([aloneArr[i][0], aloneArr[i][1]])
        }
      }
    }
    // Create arrays where the duos and trios occur
    let duos = _.pickBy(counts, v => v === 2)
    let trios = _.pickBy(counts, v => v === 3)
    // Put duos and trios into array of arrays
    let duoArr = []
    let trioArr = []
    for (let i = 0; i < Object.keys(duos).length; i++) {
      duoArr.push([parseInt(Object.keys(duos)[i][0]), parseInt(Object.keys(duos)[i][2])])
    }
    for (let i = 0; i < Object.keys(trios).length; i++) {
      trioArr.push([parseInt(Object.keys(trios)[i][0]), parseInt(Object.keys(trios)[i][2])])
    }
    // Check duos and trios for active cells

    // Create a unique array of strings of the neighboring potential cells
    let uniques = []
    for (let i = 0; i < potentials.length; i++) {
      uniques.push(`${potentials[i][0]},${potentials[i][1]}`)
    }
    uniques = _.uniq(uniques)

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
