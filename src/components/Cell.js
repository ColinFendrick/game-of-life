import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import cx from 'classnames'

export default observer(({ pos }) => (
  <div className={cx('Cell', {active: store.active.includes(pos)})}
    style={{'gridRow': `${pos[0]}`, 'gridColumn': `${pos[1]}`}}
    onClick={() => console.log(pos, store.active)}
  >
    {pos}
  </div>
))
