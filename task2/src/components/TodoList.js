import React from 'react';
import TodoItem from './TodoItem';

export default function (props) {

    let allItems = props.items || [];

    let doneNumber = allItems.filter(item => item.isDone).length;

    return(<div>
        <ul className="list-group">
            {mapItem(allItems,props)}
            <li className="list-group-item count-label">
                <span className="label label-info">{doneNumber}已完成</span>
                &nbsp;/&nbsp;
                <span className="label label-info">{allItems.length}总数</span>
            </li>
        </ul>

    </div>)
}

function mapItem(obj,props) {
    return obj.map(item =>
        <TodoItem item={item} key={item.id}
                  onRemove={props.onDelete}
                  handleChange={props.handleChange}/>)
}