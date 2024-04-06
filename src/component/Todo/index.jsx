import { Card, CardContent, Typography, TextField, Button, Alert, List, ListItem, ListItemButton, ListItemText, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

function DisplayAlert({ variant, content }) {
  const [display, setDisplay] = useState(true);
  console.error('display', display)

  useEffect(() => {
    const countDown = setTimeout(() => {
      setDisplay(false)
    }, 3000)

    return () => {
      clearTimeout(countDown)
      setDisplay(true)
    }
  }, []);

  const alertStyle = { position: 'absolute', zIndex: '1', top: '5%', right: '5%' }
  return (
    <>
      {display ? <>
        {createPortal(
          <Alert style={alertStyle} severity={variant}>{content}</Alert>, document.getElementById('notification'))}
      </> : null}
    </>
  )
}

function TodoContent() {
  const [todosLength, setTodosLength] = useState(0)
  const [prevTodoLength, setPrevTodoLength] = useState(null)
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const titleStyle = {
    textAlign: 'center'
  }
  const textField = {
    width: '100%'
  }
  const textFieldContainer = {
    marginTop: '10px'
  }

  function handleInput(e) {
    setTodo(e.target.value)
  }

  function handleAddTodo() {
    setTodos([...todos, todo])
    setTodosLength((prevValue) => {
      setPrevTodoLength(prevValue);
      return prevValue + 1;
    })
    setTodo("")
  }

  console.error(prevTodoLength, todosLength)
  console.error(Boolean(prevTodoLength !== todosLength))
  return (
    <>
      {prevTodoLength < todosLength && <DisplayAlert
        variant='success'
        content='Successfully added new todo.'
      />}
      <Box component="section" style={{ borderBottom: '1px solid #333' }}>
        <CardContent>
          <Typography className="todo-title" style={titleStyle} variant="body1" color="initial">
            Todo Tracker
          </Typography>
          <div className="todo-text-container" style={textFieldContainer}>
            <TextField style={textField} value={todo} onChange={handleInput} id="outlined-basic" label="Create New Todo" variant="outlined" />
          </div>
          <Button onClick={handleAddTodo} style={{ marginTop: '10px', width: '100%' }} type="submit" variant="contained">Add Now</Button>
        </CardContent>
      </Box>
      <Box>
        <CardContent>
          <List>
            {todos.map((item, idx) => {
              return (
                <ListItem disablePadding key={idx} style={{ borderBottom: '1px solid #333'}}>
                  <ListItemText primary={item} />
                </ListItem>
              )
            })}

          </List>
        </CardContent>
      </Box>
    </>
  )
}

function Todo() {
  const cardStyle = {
    maxWidth: '500px',
    margin: '0 auto'
  }
  const text = 'Successfully added new todo'
  return (
    <Card style={cardStyle}>
      <TodoContent />
    </Card>
  )
}
export default Todo;