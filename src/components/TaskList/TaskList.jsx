import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

export default function TaskList({ todos, onDeleted, onToggleDone, onIconEdit, onItemEdit }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <Task
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onItemEdit={(keyword) => onItemEdit(id, keyword)}
        onIconEdit={() => onIconEdit(id)}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TaskList.propTypes = {
  onIconEdit: PropTypes.func.isRequired,
  onItemEdit: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}
