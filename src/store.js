import { observable, action } from 'mobx'
import _ from 'lodash'

class Store {
  @observable size = {
    'rows': 30,
    'cols': 30
  }

  @observable counts = {}
  @observable potentials = []

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
    this.counts = {}
    this.potentials = []

    // Put all neighbors of active cells into an array
    for (let i = 0; i < arrRows.length; i++) {
      this.potentials.push([arrRows[i], arrCols[i] + 1])
      this.potentials.push([arrRows[i] + 1, arrCols[i] + 1])
      this.potentials.push([arrRows[i] + 1, arrCols[i]])
      this.potentials.push([arrRows[i] + 1, arrCols[i] - 1])
      this.potentials.push([arrRows[i], arrCols[i] - 1])
      this.potentials.push([arrRows[i] - 1, arrCols[i] - 1])
      this.potentials.push([arrRows[i] - 1, arrCols[i]])
      this.potentials.push([arrRows[i] - 1, arrCols[i] + 1])
    }
    // Count occurances of those neighbors
    for (let i = 0; i < this.potentials.length; i++) {
      let pos = this.potentials[i]
      this.counts[pos] = this.counts[pos] ? this.counts[pos] + 1 : 1
    }
    // Kill singleton living cells
    // Kill living cells w/ less than two neighbors
    let alone = _.pickBy(this.counts, v => v < 2)
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
    // Kill living cells w/ greater than 3 neighbors
    let overPop = _.pickBy(this.counts, v => v > 3)
    let overPopArr = []
    for (let i = 0; i < Object.keys(overPop).length; i++) {
      overPopArr.push([parseInt(Object.keys(overPop)[i][0]), parseInt(Object.keys(overPop)[i][2])])
    }
    for (let i = 0; i < overPopArr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (overPopArr[i][0] === arr[j][0] && overPopArr[i][1] === arr[j][1]) {
          this.kill([overPopArr[i][0], overPopArr[i][1]])
        }
      }
    }
    // Create arrays where the trios occur
    let trios = _.pickBy(this.counts, v => v === 3)
    // Put trios into array of arrays
    let trioArr = []
    for (let i = 0; i < Object.keys(trios).length; i++) {
      console.log(Object.keys(trios))
      trioArr.push([parseInt(Object.keys(trios)[i][0]), parseInt(Object.keys(trios)[i][2])])
    }
    // All dead trios live!
    for (let i = 0; i < trioArr.length; i++) {
      this.alive([trioArr[i][0], trioArr[i][1]])
    }
  }
}

const store = new Store()
export default store
