const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  DIALOG: 'dialog',
  TODO_LIST: 'todo-list',
  TODO: 'todo',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

const e = React.createElement;

class App extends React.Component{

   constructor(){
    super()
    this.state={
      todos: [],
      open: false,
      unchecked: 0,
      id:0
    }
    this.handleChecked = this.handleChecked.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
   }

   handleChecked(e){
     const isChecked = e.target.checked
     let unchecked = this.state.unchecked
     if(isChecked){
       unchecked--
     }else {
       unchecked++
     }
     this.setState({unchecked})
   }

   handleDelete(id, checked) {
     const filteredToDos = this.state.todos.filter((el, idx) => el.id !== id )
     let unchecked = this.state.unchecked
     if(!checked) {
       unchecked--
     }

     this.setState({
       todos: filteredToDos,
       unchecked
     })
   }

   openDialog(){
     this.setState({
       open:true
     })
   }

   componentDidUpdate() {
     ReactDOM.render( this.state.todos.length, itemCountSpan );
     ReactDOM.render( this.state.unchecked, uncheckedCountSpan );
   }

   render(){
     const {  Dialog, DialogActions, TextField, Button, DialogContent } = MaterialUI;
     return (e('div', '','',
               e(Dialog, {open: this.state.open, onClose:() => this.setState({open: false})}, '',
                 e(DialogContent, '', '',
                    e(TextField,{label: 'Enter ToDo', id:'textfield'}, '')
                  ),
                 e(DialogActions, '', '' ,
                    e(Button, {color: 'primary', variant:'contained', onClick:() => {
                      const val = document.getElementById('textfield').value
                      this.setState({
                        open: false,
                        todos: this.state.todos.concat({id: `val-${this.state.id}`,val}) ,
                        unchecked: this.state.unchecked + 1,
                        id: this.state.id + 1
                      })
                    }} , 'Create')
                  )
                ),
                e(ToDoList,{todos: this.state.todos, onCheck: this.handleChecked, onDelete: this.handleDelete})
            ))
   }
}

function ToDoList(props) {
  return (e('div', {className: classNames.TODO_LIST},props.todos.map((todo, index) => {
    return e(ToDo,{key: `${todo.id}`, todo, onCheck: props.onCheck, onDelete: props.onDelete})
  })
))
}

function ToDo(props){
  return e('div', {className: classNames.TODO} , [e('input', {
    key: `checkbox-${props.todo.id}`,
    id:`checkbox-${props.todo.id}`,
    type: 'checkbox',
    className: classNames.TODO_CHECKBOX,
    onChange: props.onCheck,
  }),
  e('p', {key: `text-${props.todo.id}`,className: classNames.TODO_TEXT}, props.todo.val),
  e('button', {
    key: `button-${props.todo.id}`,
    className: classNames.TODO_DELETE,
    onClick: () => {props.onDelete(props.todo.id, document.getElementById(`checkbox-${props.todo.id}`).checked)}
  }, 'Delete')]
  );
}

function newTodo() {
 const x = ReactDOM.render(e(App),list)
 x.openDialog()
}
