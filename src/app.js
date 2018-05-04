import React ,{ Component } from 'react';
import { Route, Link ,NavLink} from 'react-router-dom';

import BlogPostListAll from './blogpostListAll';
import BlogpostListNewest from './blogpostListNewest';
import FormBlogPost from './formBlogPost';
import EditForm from './editForm';


class App extends Component {
    constructor(props){
        super(props);
      this.state = {
     blogposts: [
         {date: Date.now(),id:1,title:'Sofia best coffee shops',text:'aaaaaaasaaaaaa',author:'AP',tags:['Sofia','coffee','places'],url:'',status:'active'}
      ] ,
        summaryLength:150
      ,
      postToEdit: {date:'',id:1,title:'',author:'',text:'',tags:[],url:'',status:''}
      ,
      firedSubmit:false
      ,
     filter: 'all'
  }; 
  this.handleFilterChange=this.handleFilterChange.bind(this);
  this.handleDelete=this.handleDelete.bind(this);
  this.handleBlogPostSubmit=this.handleBlogPostSubmit.bind(this); 
  this.handleEdit=this.handleEdit.bind(this);  
  this.handleEditSubmit=this.handleEditSubmit.bind(this);  
    }
 
  handleFilterChange(e){
   this.setState({filter:e.target.value})
   
  }
  handleDelete (blogID) {
     this.setState( prevState => {
      const blogposts = prevState.blogposts.filter(blogpost => blogpost.id!==blogID);
      return {blogposts};
    })

  }
  handleEdit(blogID) {
    const [postToEdit] = this.state.blogposts.filter(blogpost => blogpost.id === Number(blogID));
    return postToEdit;
  }
  handleEditSubmit(id,newTitle,newAuthor,newText,newTags,newUrl,newStatus) {
 
    this.setState(prevState => {
     const blogposts = prevState.blogposts.map(
       blogpost => 
       blogpost.id===id ? Object.assign({}, blogpost, {  
          date:blogpost.date,
          id: blogpost.id,
          title:newTitle,
          author:newAuthor,
          text: newText.trim(),
          tags:typeof newTags === String? newTags.split(/\s,/g):newTags,
          url:newUrl,
          status: newStatus }) : blogpost    
     );

     return {blogposts};
    });
  }
  handleBlogPostSubmit(newDate,newTitle,newAuthor,newText,newTags,newUrl,newStatus) {
  
  this.setState(prevState => ({
      blogposts: [
        ...prevState.blogposts,
        { 
          date:newDate,
          id: Date.now()+prevState.blogposts.length,
          title:newTitle,
          author:newAuthor,
          text: newText.trim(),
          tags:newTags,
          url:newUrl,
          status: newStatus
        }
      ]
    }));
}

render() {
    return (
      <div className="container">
        <ul className="main-menu">
          <li><Link to="/all">All Posts</Link></li>
          <li><Link to="/newest">Newest Posts</Link></li>
          <li><Link to="/create">Add a new Post</Link></li>
        </ul>
        <hr />
        <Route exact path="/" render={ props => (<BlogpostListNewest {...props} filter={this.state.filter} blogposts = {this.state.blogposts} summaryLength={this.state.summaryLength} FilterChange={this.handleFilterChange}/>)} />
        <Route path="/all" render={ props => (<BlogPostListAll {...props} element={<NavLink to='/edit' >Edit</NavLink>} blogposts={this.state.blogposts} OnDelete={this.handleDelete}/>)} />
        <Route path="/newest" render={ props => (<BlogpostListNewest {...props} filter={this.state.filter} blogposts = {this.state.blogposts} summaryLength={this.state.summaryLength} FilterChange={this.handleFilterChange}/>)} />
        <Route path="/create" render={props => (<FormBlogPost {...props} postToEdit={{}} onSubmit = {this.handleBlogPostSubmit} />)} />
        <Route path="/edit/:id" render={props => (<EditForm {...props} postToEdit={this.handleEdit(props.match.params.id)}  onEditSubmit = {this.handleEditSubmit} />)} />
      </div>
    );
  }
}

  export default App;