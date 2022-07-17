const getSavaedTodo = function () {
    const todoJSON = localStorage.getItem('todo')

if (todoJSON !== null) {
    return JSON.parse(todoJSON)
    }
    else {
        return []
    }
}

const saveTodo = function (todos) {
    localStorage.setItem('todo', JSON.stringify(todos))
}

const deleteTodo = function (id) {
    const todoIndex = todos.findIndex(function (todo) {
        return id === todo.id
    })
    if(todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

const finishTodo = function (id) {
    const todo = todos.find(function (todo) {
        return todo.id === id
    })
    if(todo !== undefined) {
        todo.completed = !todo.completed
    }
}

const generateTodoDom = function (todo) {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const textTodo = document.createElement('span')
    const removeButton = document.createElement('button')
    const checkbox = document.createElement('input')


    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)


    checkbox.addEventListener('change', function () {
        finishTodo(todo.id)
        saveTodo(todos)
        renderTodos(todos, filters)
    })

    textTodo.textContent = todo.text
    containerEl.appendChild(textTodo)


    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)



    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)


    removeButton.addEventListener('click', function () {
        deleteTodo(todo.id)
        saveTodo(todos)
        renderTodos(todos, filters)
    })
            
            return todoEl
}

const renderTodos = function (todos, filters) {
    let filterTodo = todos.filter(function (todo) {
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    filterTodo = filterTodo.filter(function (todo) {
        if(filters.hideCompleted){
            return !todo.completed
        }else {
            return true
        }
    })
    document.querySelector('#todos').innerHTML = ''
    const inCompleteTodos = filterTodo.filter(function (todo) {
        return !todo.completed
    })
    const newparagraph = generateSummaryDom(inCompleteTodos)
    document.querySelector('#todos').appendChild(newparagraph)

    if (filterTodo.length > 0) {
        filterTodo.forEach(function (todo) {
            const paragraph = generateTodoDom(todo)
            document.querySelector('#todos').appendChild(paragraph)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No to-dos to show'
        emptyMessage.classList.add('empty-message')
        document.querySelector('#todos').appendChild(emptyMessage)
    }
}

const generateSummaryDom = function (inCompleteTodos) {
    const summary = document.createElement('h2')
    const plural = inCompleteTodos.length === 1 ? '' : 's'
    summary.textContent = `you have ${inCompleteTodos.length} todo${plural} left`
    summary.classList.add('list-title')

    return summary
}

