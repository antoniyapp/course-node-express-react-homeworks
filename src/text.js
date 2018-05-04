import React from 'react';

const Text = ({text,summaryLength}) => {
    return (
        <div> 
         { text.substring(0,summaryLength)}
        </div> 
    )
}
export default Text;