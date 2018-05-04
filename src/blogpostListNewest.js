import React from 'react'
import Text from './text'

const BlogpostListNewest = ({filter,blogposts,summaryLength,FilterChange,...rest}) => (
  <div>
  <div className="col-lg-2">
            <select
              className="status-filter form-control col-lg-3"
              value={filter}
              onChange={(e) => FilterChange(e)}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

  <ul>
  {
    
    blogposts
    .sort((a,b) => a.date - b.date ).reverse().slice(0,15)
    .filter(blogpost => filter === 'all' ? true : blogpost.status === filter)
    .map(blogpost =>
     (<li key={blogpost.date}> 
       <div>Title:{blogpost.title}</div>
       <Text  text = {blogpost.text} summaryLength ={summaryLength}/>
        <div> Author:{blogpost.author}</div>
       </li>) )
  }
  </ul>
  </div>
);

export default BlogpostListNewest;