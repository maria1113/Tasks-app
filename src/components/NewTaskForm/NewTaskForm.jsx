import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const formatTime = (min, sec) => {
    return Number(min) * 60 + Number(sec)
  }

  const validateForm = (value, min, sec) => {
    let result = true
    if (value.search(/\S/) === -1) result = false
    if (min.search(/\S/) === -1 && sec.search(/\S/) === -1) result = false
    if (typeof +min !== 'number' || typeof +sec !== 'number') result = false
    if (Number.isNaN(+min) || Number.isNaN(+sec)) result = false
    return result
  }

  const validateNumberValue = (value) => {
    let result = true
    if (Number.isNaN(+value)) result = false
    return result
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (validateForm(label, minutes, seconds)) {
      const time = formatTime(minutes, seconds)
      onItemAdded(label, Date.now(), time)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit} className="new-task-form">
        <input
          className="new-task"
          placeholder="Task"
          onChange={(event) => setLabel(event.target.value)}
          value={label}
          autoFocus
          name="label"
        />
        <input
          className="new-task-form__timer"
          placeholder="Min"
          autoFocus
          name="minutes"
          onChange={(event) => {
            if (validateNumberValue(event.target.value)) setMinutes(event.target.value)
          }}
          value={minutes}
        />
        <input
          className="new-task-form__timer"
          placeholder="Sec"
          autoFocus
          name="seconds"
          onChange={(event) => {
            if (validateNumberValue(event.target.value)) setSeconds(event.target.value)
          }}
          value={seconds}
        />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
