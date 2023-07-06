import React from 'react'
import PropTypes from 'prop-types'

function Button({ onTasksFilter, onToggleSelected, id, type, selected }) {
  const onClick = (ID, tasksType) => {
    onTasksFilter(tasksType)
    onToggleSelected(ID)
  }

  let classNames = ''
  const label = type[0].toUpperCase() + type.slice(1)

  if (selected) {
    classNames = 'selected'
  }

  return (
    <button type="button" className={classNames} onClick={() => onClick(id, type)}>
      {label}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onToggleSelected: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  onTasksFilter: PropTypes.func.isRequired,
}

export default Button
