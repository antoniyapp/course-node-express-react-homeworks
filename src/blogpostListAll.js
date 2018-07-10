import React from 'react';
import {Link} from 'react-router-dom';
import ShowMessages from './showMessages';


const BlogPostListAll = ({element,blogposts,OnDelete,messages,showMessages,errors,showErrors,...rest}) => (

  <div>
  <ShowMessages messages={messages} errors={errors} displayMessage={showMessages} displayErrors={showErrors} />
        <ul>
        {
            
          blogposts
          .map(blogpost =>
          (<li key={blogpost.date}> 
            <div className="title">Title:{blogpost.title}</div>
            <div>Text:{blogpost.text}</div>
              <div> Author:{blogpost.author}</div>
              <div> Tags:{blogpost.tags}</div>
              <div> <img src={blogpost.url} alt=''/>URL:{blogpost.url}</div>
              <div> Status:{blogpost.status}</div>
               <div>Date:{blogpost.date}</div>
              <Link to={'/edit/'+blogpost.id} ><button>Edit</button></Link>
              <button onClick={() => OnDelete(blogpost.id)}>Delete</button>
            </li>) )
        }
        </ul>
  </div>

);



export default BlogPostListAll;