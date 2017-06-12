import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

export default observer(({ test }) => (
  <div className='Cell'>
    {test}
    {store.size.width}
  </div>
))
