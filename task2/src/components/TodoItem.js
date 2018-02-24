import React from 'react';

export default function (props) {
    return (<li className={props.item.isDone ? "list-group-item todo-item-li list-group-item-success" : "list-group-item todo-item-li"}>
        <div>
            <input type="checkbox"
                   onChange={(e) => props.handleChange(props.item.id, e)}
                   checked={props.item.isDone}/>
            <span className="todo-item-text" style={{textDecoration: props.item.isDone ? "line-through" : ""}}>
            {props.item.text}
        </span>
        </div>
        <div>
            <button type="button"
                    className="close"
                    style={{display:props.item.isDone?"block":"none"}}
                    onClick={() => props.onRemove(props.item.id)}>&times;</button>
        </div>
    </li>)
}