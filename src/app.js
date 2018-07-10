import React ,{ Component } from 'react';
import { Route, Link ,NavLink} from 'react-router-dom';
import axios from 'axios';
import './app.css';

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
      // postToEdit: {date:'',id:1,title:'',author:'',text:'',tags:'',url:'',status:''}
      // ,
      firedSubmit:false
      ,
     filter: 'all',
      errors: undefined, 
    messages: undefined,
    showMessages: false,
    showErrors: false
  }; 
  this.handleFilterChange=this.handleFilterChange.bind(this);
  this.handleDelete=this.handleDelete.bind(this);
  this.handleBlogPostSubmit=this.handleBlogPostSubmit.bind(this); 
  //this.handleEdit=this.handleEdit.bind(this);  
  this.handleEditSubmit=this.handleEditSubmit.bind(this);  
  this.loadPostsFromServer=this.loadPostsFromServer.bind(this);
    }
 loadPostsFromServer = () =>   axios.get('/api/posts')
      .then(({ data: blogposts }) => {
        // console.log("GET" , posts);
        this.setState({
          blogposts: blogposts.reverse()
        });
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined,
            showMessages: false,
            showErrors: true
          });
          console.error(this.props.url, err.response.data);
        }})
      

   componentDidMount = () => {
    this.loadPostsFromServer();
    setInterval(this.loadPostsFromServer,5000);
  }

  handleFilterChange(e){
   this.setState({filter:e.target.value})
   
  }
  handleDelete = async function (postID) {
    // delete post optimistically
     this.setState( prevState => {
      const blogposts = prevState.blogposts.filter(blogpost => blogpost.id!==postID);
      return {blogposts};
    })

    //AJAX DELETE request
    try {
      let data = await axios.delete(this.props.url + "/" + postID);
      console.log(data.message);
     this.setState({
        errors: undefined,
        messages: `Post was deleted successfully.`,
        showMessages: true,
        showErrors: false
      });
      console.log(`POST with ID=${postID} deleted successfully.`);
    } catch (err) {
     
        console.error(this.props.url, err.response.data);
        this.loadPostsFromServer();
      }
  }.bind(this);
    

  
  // handleEdit(blogID) {
  //   const [postToEdit] = this.state.blogposts.filter(blogpost => blogpost.id === Number(blogID));
  //   return postToEdit;
  // }
  handleEditSubmit(id,newTitle,newAuthor,newText,newTags,newUrl,newStatus) {
  let editedBlogpost={
      id: id,
      title:newTitle,
      author:newAuthor,
      text:newText.trim(),
      tags:newTags,
      url:newUrl,
      status:newStatus
    };
   axios.put('/api/posts/'+ id ,editedBlogpost)
   .then(({data:editedBlogpost}) => 
     {
        this.setState(prevState => {
     const blogposts = prevState.blogposts.map(
       blogpost => 
       blogpost.id===id ? Object.assign({}, blogpost, {  
          date:blogpost.date,
          id: blogpost.id,
          title:editedBlogpost.title,
          author:editedBlogpost.author,
          text: editedBlogpost.text,
          tags: typeof editedBlogpost.tags === String? newTags.split(/\s,/g): editedBlogpost.tags,
          url:editedBlogpost.url,
          status: editedBlogpost.status }) : blogpost    
     );

     return {blogposts};
    });
    this.setState({ errors: undefined,
      messages: `Post has been edited: ${editedBlogpost.text}`,
      showMessages: true,
      showErrors: false})
  
   })
   .catch((err) => {
         if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined,
            showMessages: false,
            showErrors: true
          });
          console.error(this.props.url, err.response.data);
        
        }})
      
    }
  
  handleBlogPostSubmit(newDate,newTitle,newAuthor,newText,newTags,newUrl,newStatus) {
    let blogpost={
      date:newDate,
      id: Date.now()+this.state.blogposts.length,
      title:newTitle,
      author:newAuthor,
      text:newText.trim(),
      tags:newTags,
      url:newUrl,
      status:newStatus
    }
  axios.post('/api/posts', blogpost)
      .then(({ data: blogpost }) => {
       this.setState(prevState => ({
      blogposts: [
        ...prevState.blogposts,
        { 
          date:blogpost.date,
          id: Date.now()+prevState.blogposts.length,
          title:blogpost.title,
          author:blogpost.author,
          text: blogpost.text,
          tags: typeof blogpost.tags === String? newTags.split(/\s,/g): blogpost.tags,
          url: blogpost.url,
          status:  blogpost.status
        }
      ],
       errors: undefined,
      messages: `New post added: ${blogpost.text}`,
      showMessages: true,
      showErrors: false
    }));
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined,
            showMessages: false,
            showErrors: true
          });
          console.error(this.props.url, err.response.data);
        }
      }
      );
  
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
        <Route path="/all" render={ props => (<BlogPostListAll {...props} element={<NavLink to='/edit' >Edit</NavLink>} blogposts={this.state.blogposts} OnDelete={this.handleDelete} messages={this.state.messages} showMessages={this.state.showMessages} errors={this.state.errors} showMessage={this.state.showErrors}/>)} />
        <Route path="/newest" render={ props => (<BlogpostListNewest {...props} filter={this.state.filter} blogposts = {this.state.blogposts} summaryLength={this.state.summaryLength} FilterChange={this.handleFilterChange}/>)} />
        <Route path="/create" render={props => (<FormBlogPost {...props} postToEdit={{}} onSubmit = {this.handleBlogPostSubmit} />)} />
        <Route path="/edit/:id" render={props => (<EditForm {...props} postToEdit={props.match.params.id}  onEditSubmit = {this.handleEditSubmit} />)} />
      </div>
    );
  }
}

  export default App;