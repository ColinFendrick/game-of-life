import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import cx from 'classnames'

export default observer(({ pos }) => {
  return <div className={cx('Cell', {active: store.searchArray(store.active, pos)})}
    style={{'gridRow': `${pos[0] + 1}`, 'gridColumn': `${pos[1] + 1}`}}
    onClick={() => store.update(pos)}
    // onClick={() => store.countNeighbors(pos)}
  />
})
