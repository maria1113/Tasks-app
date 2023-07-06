import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'

function Task({ label, timer, onDeleted, timeToNow, onToggleDone, onIconEdit, done, editing, onItemEdit }) {
  const [keyword, setKeyword] = useState(label)
  const [play, setPlay] = useState(true)
  const [time, setTime] = useState(timer)

  const refObject = useRef(null)

  const updateTimer = () => {
    setTime((t) => {
      return t - 1
    })
  }

  useEffect(() => {
    if (play) {
      refObject.current = setInterval(updateTimer, 1000)
    }
    return () => {
      if (refObject.current) {
        clearInterval(refObject.current)
        refObject.current = null
      }
    }
  }, [play])

  useEffect(() => {
    if (time < 1) {
      setPlay(false)
    }
  }, [time])

  const inputChangedHandler = (event) => {
    setKeyword(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (keyword.search(/\S/) !== -1) onItemEdit(keyword)
  }

  const stopTimer = () => {
    if (!play) return
    setPlay(false)
  }

  const startTimer = () => {
    if (play) return
    setPlay(true)
  }

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60)
    let seconds = t % 60
    seconds = seconds < 10 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
  }

  let classNames = ''

  if (done) {
    classNames = 'completed'
  }

  const view = (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="title" onClick={onToggleDone} onKeyDown={onToggleDone}>
          {label}
        </span>
        <span className="description">
          <button type="button" aria-label="play" className="icon icon-play" onClick={startTimer} />
          <button type="button" aria-label="pause" className="icon icon-pause" onClick={stopTimer} />
          {formatTime(time)}
        </span>
        <span className="description">{timeToNow}</span>
      </label>
      <button type="button" className="icon icon-edit" aria-label="Edit" onClick={onIconEdit} />
      <button type="button" className="icon icon-destroy" aria-label="Destroy" onClick={onDeleted} />
    </div>
  )

  if (editing) {
    return (
      <li className="editing">
        {view}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            value={keyword}
            onChange={(event) => inputChangedHandler(event)}
            autoFocus
          />
        </form>
      </li>
    )
  }
  return <li className={classNames}>{view}</li>
}

Task.propTypes = {
  label: PropTypes.string.isRequired,
  onIconEdit: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  timeToNow: PropTypes.string.isRequired,
  timer: PropTypes.number.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}

export default Task
