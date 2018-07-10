import React from 'react';

const ShowMessages = ({messages,showMessages,errors,showErrors}) => {
 let displayMess= showMessages === true ? {display: 'block'} : {display:'none'} ;
  let displayErr= showErrors === true ? {display: 'block'} : {display:'none'}  ;
 return ( <div>
      <div className="messageContainer" style={displayMess}> {messages} +'</div>    
      <div className="errorsContainer" style={displayErr}>'+ {errors} + '</div>
 </div>);

    
}

export default ShowMessages;