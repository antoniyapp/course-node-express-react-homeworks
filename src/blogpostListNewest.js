import React from 'react'


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
       <div className="title">Title:{blogpost.title}</div>
         <div> 
         Text: { blogpost.text.substring(0,summaryLength)}
        </div> 
        <div> Author:{blogpost.author}</div>
        <div>Tags:{blogpost.tags}</div>
         <div><img src={blogpost.url} alt=''/>Url:{blogpost.url}</div>
          <div>Status:{blogpost.Status}</div>
        <div> Date:{blogpost.date}</div>
       </li>) )
  }
  </ul>
  </div>
);

export default BlogpostListNewest;