import { observable, action, computed } from 'mobx'
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
    [5, 2],
    [6, 1],
    [6, 3],
    [15, 1],
    [15, 2],
    [16, 1],
    [16, 3],
    [22, 9]
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

  @action birth = cell => {
    this.active.push(cell)
  }

  @action kill = cell => {
    const arr = this.active.map(s => s.slice(0, 2))
    let index = this.searchArray(arr, cell)
    this.active.splice(index - 1, 1)
  }

  // Kill living cells
  @action countNeighbors = cell => {
    const arr = this.active.map(s => s.slice(0, 2))
    let neighbors = 0
    for (let i = 0; i < arr.length; i++) {
      if (
        (arr[i][0] + 1 === cell[0] &&
        (arr[i][1] === cell[1] ||
        arr[i][1] + 1 === cell[1] ||
        arr[i][1] - 1 === cell[1])) ||

        (arr[i][0] - 1 === cell[0] &&
        (arr[i][1] === cell[1] ||
        arr[i][1] + 1 === cell[1] ||
        arr[i][1] - 1 === cell[1])) ||

        (arr[i][0] === cell[0] &&
        (arr[i][1] + 1 === cell[1] ||
        arr[i][1] - 1 === cell[1]))
      ) {
        neighbors++
      }
    }
    if (neighbors < 2 || neighbors > 3) {
      this.kill(cell)
    }
  }
  // Recursively kill all living cells w/ bad neighbors
  @action check = () => {
    this.checkBirth()
    let arr = this.active.map(s => s.slice(0, 2))
    for (let j = 0; j < arr.length; j++) {
      this.countNeighbors(arr[j])
    }
  }

  @action start = () => {
    setTimeout(() => this.check(), 10)
  }

  @action checkBirth = () => {
    const arr = this.active.map(s => s.slice(0, 2))
    const arrRows = arr.map(x => x[0])
    const arrCols = arr.map(x => x[1])
    const counts = {}
    const potentials = []
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
    let trios = _.pickBy(counts, v => v === 3)
    // Put trios into array of arrays
    let trioArr = []
    for (let i = 0; i < Object.keys(trios).length; i++) {
      let trioKey = Object.keys(trios)[i].split(',')
      let key0 = parseInt(trioKey[0])
      let key1 = parseInt(trioKey[1])
      trioArr.push([key0, key1])
    }
    console.log(trioArr)
    // // All dead trios live!
    // for (let i = 0; i < trioArr.length; i++) {
    //   this.alive([trioArr[i][0], trioArr[i][1]])
    // }
  }

  //   // Kill living cells w/ less than two neighbors
  //   let alone = _.pickBy(this.counts, v => v < 2)
  //   let aloneArr = []
  //   for (let i = 0; i < Object.keys(alone).length; i++) {
  //     aloneArr.push([parseInt(Object.keys(alone)[i][0]), parseInt(Object.keys(alone)[i][2])])
  //   }
  //   for (let i = 0; i < aloneArr.length; i++) {
  //     for (let j = 0; j < arr.length; j++) {
  //       if (aloneArr[i][0] === arr[j][0] && aloneArr[i][1] === arr[j][1]) {
  //         this.kill([aloneArr[i][0], aloneArr[i][1]])
  //       }
  //     }
  //   }
  //
  //   // Create arrays where the trios occur
  //   let trios = _.pickBy(this.counts, v => v === 3)
  //   // Put trios into array of arrays
  //   let trioArr = []
  //   for (let i = 0; i < Object.keys(trios).length; i++) {
  //     console.log(Object.keys(trios))
  //     trioArr.push([parseInt(Object.keys(trios)[i][0]), parseInt(Object.keys(trios)[i][2])])
  //   }
  //   // All dead trios live!
  //   for (let i = 0; i < trioArr.length; i++) {
  //     this.alive([trioArr[i][0], trioArr[i][1]])
  //   }
  // }
}

const store = new Store()
export default store
