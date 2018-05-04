import React, { Component } from 'react';
import BlogpostListNewest from './blogpostListNewest';
import BlogpostListAll from './blogpostListAll';
import FormBlogPost from './formBlogPost';

export default class BlogPosts extends Component {
  constructor(props){
      super(props)
      this.state = { blogposts: [
          {date: Date.now(),id:1,title:'Sofia best coffee shops',text:'aaaaaaasaaaaaa',author:'AP',tags:['Sofia','coffee','places'],url:'',status:'active'},
          {date: Date.now()+1,id:2,title:'How to be more motivative',text:'ss',author:'AP',tags:['motivation','slef-improving'],url:'',status:'active'},
                    {date: Date.now()+2,id:3,title:'Sofia best coffee shops',text:'aaaaaaaaaaaaaaaa',author:'AP',tags:['Sofia','coffee','places'],url:'',status:'inactive'},
          {date: Date.now()+3,id:4,title:'How to be more motivative',text:'ssaaaaaaaaaaaaas',author:'AP',tags:['motivation','slef-improving'],url:'',status:'active'},
                    {date: Date.now()+4,id:5,title:'Sofia best coffee shops',text:'ssaaaaaaaaaaaaass',author:'AP',tags:['Sofia','coffee','places'],url:'',status:'active'},
          {date: Date.now()+5,id:6,title:'How to be more motivative',author:'AP',text:'aaaaaaaaaaaaaaaaaaa',tags:['motivation','slef-improving'],url:'',status:'inactive'},
      ] ,
     summaryLength:150
      ,
     filter: 'all'
};
  this.handleFilterChange=this.handleFilterChange.bind(this);
  this.handleDelete=this.handleDelete.bind(this);
  this.handleBlogPostSubmit=this.handleBlogPostSubmit.bind(this);
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
  handleBlogPostSubmit(newDate,newTitle,newAuthor,newText,newTags,newUrl,newStatus) {
   // e.preventDefault();
  this.setState(prevState => ({
      blogposts: [
        ...prevState.blogposts,
        { 
          date:newDate,
          id: Date.now()+prevState.blogposts.length,
          title:newTitle,
          author:newAuthor,
          text: newText.trim(),
          url:newUrl,
          status: newStatus
        }
      ]
    }));
}

  render () {
    console.log(this.state.filter)
      return (
          <div>
          <div className="col-lg-2">
            <select
              className="status-filter form-control col-lg-3"
              value={this.state.filter}
              onChange={this.handleFilterChange}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
               <BlogpostListNewest filter={this.state.filter} blogposts = {this.state.blogposts} summaryLength={this.state.summaryLength}/>
          </div>
          <div>
            <BlogpostListAll blogposts={this.state.blogposts} OnDelete={this.handleDelete}/>

            </div>
            <div>
          <FormBlogPost onSubmit = {this.handleBlogPostSubmit}/>
          </div>
          </div>
      )
  }
}