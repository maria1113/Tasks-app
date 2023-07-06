import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'

function App() {
  const maxId = useRef(11)

  const createTodoItem = (label, addingTime, timer, editing = false) => {
    return {
      label,
      addingTime,
      timeToNow: formatDistanceToNow(new Date(addingTime), { includeSeconds: true, addSuffix: true }),
      id: maxId.current++,
      done: false,
      editing,
      timer,
    }
  }

  const [todoTasks, setTodoTasks] = useState(() => [
    createTodoItem('Task 1', '2023-01-11 10:35', 60),
    createTodoItem('Task 2', '2023-01-11 10:30', 60),
    createTodoItem('Task 3', '2023-01-11 10:40', 40),
  ])

  const [filter, setFilter] = useState('all')

  const tickFunc = () => {
    setTodoTasks((data) => {
      const newArray = data.map((elem) => {
        const { addingTime } = elem
        const newEl = { ...elem }
        newEl.timeToNow = formatDistanceToNow(new Date(addingTime), { includeSeconds: true, addSuffix: true })
        return newEl
      })
      return newArray
    })
  }

  useEffect(() => {
    const timerID = setInterval(() => tickFunc(), 1000)
    return () => clearInterval(timerID)
  }, [])

  const filterTasks = (filterValue) => {
    setFilter(filterValue)
  }

  const editTask = (id, label) => {
    setTodoTasks((data) => {
      const idx = data.findIndex((elem) => elem.id === id)
      const oldObj = data[idx]
      const newObj = oldObj.editing ? { ...oldObj, editing: false, label } : { ...oldObj, editing: true }

      const newArray = [...data.slice(0, idx), newObj, ...data.slice(idx + 1)]

      return newArray
    })
  }

  const toggleProp = (arr, id, propName) => {
    const idx = arr.findIndex((elem) => elem.id === id)
    const oldObj = arr[idx]
    const newObj = { ...oldObj, [propName]: !oldObj[propName] }
    return [...arr.slice(0, idx), newObj, ...arr.slice(idx + 1)]
  }

  const onToggleDone = (id) => {
    setTodoTasks((data) => toggleProp(data, id, 'done'))
  }

  const addTask = (text, addingTime, timer) => {
    const newItem = createTodoItem(text, addingTime, timer)
    setTodoTasks((data) => [...data, newItem])
  }

  const deleteDoneTasks = () => {
    setTodoTasks((data) => {
      const newArray = data.filter((el) => !el.done)
      return newArray
    })
  }

  const deleteTask = (id) => {
    setTodoTasks((data) => {
      const idx = data.findIndex((elem) => elem.id === id)
      const newArray = [...data.slice(0, idx), ...data.slice(idx + 1)]
      return newArray
    })
  }

  const filterFunc = (items, filterValue) => {
    const match = {
      all() {
        return items
      },
      active() {
        return items.filter((item) => !item.done)
      },
      completed() {
        return items.filter((item) => item.done)
      },
    }

    return match[filterValue] ? match[filterValue]() : items
  }

  const filteredTodoTasks = filterFunc(todoTasks, filter)

  const todoCount = todoTasks.length - todoTasks.filter((item) => item.done).length

  return (
    <section className="todoapp">
      <NewTaskForm onItemAdded={addTask} />
      <section className="main">
        <TaskList
          todos={filteredTodoTasks}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onItemEdit={editTask}
          onIconEdit={editTask}
        />
        <Footer todo={todoCount} onClearCompleted={deleteDoneTasks} onTasksFilter={filterTasks} />
      </section>
    </section>
  )
}

export default App
