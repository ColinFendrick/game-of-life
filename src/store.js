import { observable } from 'mobx'

class Store {
  @observable initial: {
    'cells': 0
  }
}

const store = new Store()
export default store
