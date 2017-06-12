import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import cx from 'classnames'

export default observer(({ pos }) => {
  const slicedStore = store.active.map(s => s.slice(0, 2))

  return <div className={cx('Cell', {active: store.searchArray(slicedStore, pos)})}
    style={{'gridRow': `${pos[0]}`, 'gridColumn': `${pos[1]}`}}
    onClick={() => console.log(slicedStore, pos)}
  >
    {pos}
  </div>
})
