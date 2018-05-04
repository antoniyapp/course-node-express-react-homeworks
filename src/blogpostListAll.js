import React from 'react';
import {Link} from 'react-router-dom';


const BlogPostListAll = ({element,blogposts,OnEdit,OnDelete,...rest}) => (
  <ul>
  {
      
    blogposts
    .map(blogpost =>
     (<li key={blogpost.date}> 
       <div>Title:{blogpost.title}</div>
        <div> Author:{blogpost.author}</div>
         <Link to={'/edit/'+blogpost.id} ><button>Edit</button></Link>
         <button onClick={() => OnDelete(blogpost.id)}>Delete</button>
       </li>) )
  }
  </ul>
);



export default BlogPostListAll;