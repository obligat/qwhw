import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';


import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

class TodoApp extends React.Component {
    constructor(props){
        super(props);

        let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

        /*
        * this.state ={
        *   todoItems:[]
        * }
        *
        * */
        this.state={
            TodoItems:todoItems
        };

        this.updateItems = this.updateItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    updateItems(newItem) {
        let allItems = this.state.TodoItems.concat(newItem);

        localStorage.setItem('todoItems', JSON.stringify(allItems));
        this.setState({
            TodoItems: allItems,
        })
    }

    handleChange(id, e) {
        let isChecked = e.target.checked;
        let items = this.state.TodoItems;
        let item = items.filter(item => item.id === id);
        item[0].isDone = isChecked;

        this.setState({
            TodoItems: [...items]
        });

        localStorage.setItem('todoItems', JSON.stringify(this.state.TodoItems));
    }

    deleteItem(id) {
        let copyItems = this.state.TodoItems.slice();
        let newItems = copyItems.filter(item => item.id !== id);

        localStorage.setItem('todoItems', JSON.stringify(newItems));
        this.setState({
            TodoItems: newItems,
        })
    }

    render(){
        return(<div className="container">
            <h1>React Todo</h1>
            <TodoList items={this.state.TodoItems} handleChange={this.handleChange}
                      onDelete={this.deleteItem}/>
            <hr/>
            <TodoInput onFormSubmit={this.updateItems}/>
        </div>)
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));
