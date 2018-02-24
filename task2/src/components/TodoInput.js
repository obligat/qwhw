import React from 'react';

export default class TodoInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            item:{
                text:'',
                id:null,
                isDone:false,
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            item: {
                text: e.target.value,
                id: new Date().getTime(),
                isDone: false,
            }
        })
    }

    handleSubmit(e){
        e.preventDefault();

        if (this.refs.item.value) {
            this.props.onFormSubmit(this.state.item);
            this.setState({
                item: {
                    text: '',
                    id: null,
                    isDone: false,
                }
            });
        }
        this.refs.item.focus();
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                        <label className="col-sm-2 col-form-label task">Task</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" ref="item" onChange={this.onChange}
                                   value={this.state.item.text}/>
                        </div>
                </div>
                <div>
                    <button className="btn btn-info float-right saveBtn"  onClick={this.handleSubmit}>Save Task</button>
                </div>
            </form>
        )
    }
}