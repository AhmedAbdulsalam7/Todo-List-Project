const todos = getSavaedTodo()
const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters)

document.querySelector('#todo-filter').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

    const addTodos = function (todos, thing) {
        todos.push({
            id: uuidv4(),
            text: thing,
            completed: false
        })
    }

    renderTodos(todos, filters)
    document.querySelector('#text-todo').addEventListener('submit', function (e) {
        e.preventDefault()
        let text = e.target.elements.addTodo.value.trim()
        if(text.length > 0){
            addTodos(todos, text)
        saveTodo(todos)
        renderTodos(todos, filters)
        e.target.elements.addTodo.value = ''
        } else {
            renderTodos(todos, filters)
        }
        
    })
    document.querySelector('#hide-appear').addEventListener('change', function (e) {
        filters.hideCompleted = e.target.checked
        renderTodos(todos, filters)
    })
    




