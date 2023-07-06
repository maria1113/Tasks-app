import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'

function Footer({ todo, onClearCompleted, onTasksFilter }) {
  return (
    <footer className="footer">
      <span className="tasks-count">{todo} items left</span>
      <TasksFilter onTasksFilter={onTasksFilter} />
      <button type="button" className="clear-tasks" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  todo: PropTypes.number.isRequired,
  onTasksFilter: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
