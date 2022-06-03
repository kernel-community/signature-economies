import { useState } from 'react';
import Share from './Share';
import Wait from './Wait';

const MintModal = () => {

  //change this to true to see the share screen
  const [isMinted, setIsMinted] = useState(false);

  return (
   
      
       isMinted ? <Share /> : <Wait /> 
     
    
  );
}

export default MintModal;