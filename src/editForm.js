import React, { Component } from 'react';
import {	withRouter } from 'react-router-dom'; 
 

class EditForm extends Component {

constructor(props) {
    super(props);
    this.state = {
    date:props.postToEdit.date ,
    id:props.postToEdit.id,
    title:props.postToEdit.title,
    author:props.postToEdit.author ,
    text:props.postToEdit.text,
    tags:props.postToEdit.tags,
    url:props.postToEdit.url ,
    status:props.postToEdit.status
  };
    this.handleInputChange = this.handleInputChange.bind(this);
}
handleInputChange(e){
    const value = e.target.value;
    const name = e.target.name;
    if(name==='tags'){
       this.setState({
      [name]: value.split(/\s,/)
    });
    }
    else {
       this.setState({
      [name]: value
    });
    }
}

render () {
 
  return (
      <form onSubmit={(e) => {
          e.preventDefault();
          this.props.history.push('/all');
          return  this.props.onEditSubmit(this.state.id,this.state.title,this.state.author,this.state.text,this.state.tags,this.state.url,this.state.status)}}>
          
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the date"
                  name="date"
                  disabled="true"
                  value={this.state.date}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  name="title"
                  onChange={this.handleInputChange}
                  value={this.state.title}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  name="author"
                  onChange={this.handleInputChange}
                  value={this.state.author}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Text"
                  name="text"
                  onChange={this.handleInputChange}
                  value={this.state.text}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="tags"
                  name="tags"
                  onChange={this.handleInputChange}
                  value={this.state.tags}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Url-image"
                  name="url"
                  onChange={this.handleInputChange}
                  value={this.state.url}
                />
                 <select name="status" defaultValue="active">
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>
                     </select>
                <span className="input-group-btn">
                 <button type="submit" className="btn btn-primary">Submit</button>
                </span>
              </div>
  </form>
  )
}

 } 
 export default withRouter(EditForm);
