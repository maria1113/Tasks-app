import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '../FilterButton'

function TasksFilter({ onTasksFilter }) {
  const [buttons, setButtons] = useState([
    { type: 'all', selected: true, id: 1 },
    { type: 'active', selected: false, id: 2 },
    { type: 'completed', selected: false, id: 3 },
  ])

  const onToggleSelected = (id) => {
    setButtons((items) => {
      const newArray = items.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.selected = false
        return item
      })
      const idx = items.findIndex((elem) => elem.id === id)
      newArray[idx].selected = true
      return newArray
    })
  }

  const elements = buttons.map((button) => {
    const { id, ...itemProps } = button
    return (
      <li key={id}>
        <Button {...itemProps} id={id} onTasksFilter={onTasksFilter} onToggleSelected={onToggleSelected} />
      </li>
    )
  })

  return <ul className="filters">{elements}</ul>
}

TasksFilter.propTypes = {
  onTasksFilter: PropTypes.func.isRequired,
}

export default TasksFilter
