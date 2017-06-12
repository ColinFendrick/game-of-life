import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import cx from 'classnames'

export default observer(({ pos }) => {
  const slicedStore = store.active.map(s => s.slice(0, 2))

  return <div className={cx('Cell', {active: store.searchArray(store.active, pos)})}
    style={{'gridRow': `${pos[0]}`, 'gridColumn': `${pos[1]}`}}
    onClick={() => store.update(slicedStore, pos)}
  >
    width: {pos[0]} height: {pos[1]}
  </div>
})
