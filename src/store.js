import { observable } from 'mobx'

class Store {
  @observable size = {
    'width': 40,
    'height': 40
  }
  @observable active= [
    [6, 1],
    [7, 4]
  ]
}

const store = new Store()
export default store
