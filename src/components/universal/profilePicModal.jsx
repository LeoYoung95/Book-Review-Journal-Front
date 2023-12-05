import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.css';
import { profilePicIdMap } from '../../utils/profilePicIdMap';

export default function ProfilePicModal({ onClose, handleProfilePicSubmission }) {
  
  const [selectedPfp, setSelectedPfp] = useState('0'); 

  const submitSelection = (e) => {
    e.preventDefault();
    handleProfilePicSubmission(selectedPfp);
    onClose();
  }
  
  return ReactDOM.createPortal(
    <div className='modal-backdrop w-[100vw]'>
      <div className='modal-content flex flex-col justify-between items-center overflow-y-scroll'>
        
        <div className='flex flex-wrap flex justify-center'>
          {
            profilePicIdMap.map((pfp, i) => {
              return (
                <div key={i} >
                  <img 
                    src={pfp.pic}
                    alt='profile pic option'
                    className={`${selectedPfp === pfp.id ? 'border border-blue-500 border-2 p-2' : ''} m-3 w-[100px] sm:w-[150px] md:w-[200px] hover:cursor-pointer`}
                    onClick={() => setSelectedPfp(pfp.id)}
                  />
                  <p className={`${selectedPfp === pfp.id ? 'font-bold' : ''}`}>
                    {pfp.id}  
                  </p>
                </div>
              )
            })
          }
        </div>
        
        <div className='flex justify-center'>
          <button
            className='bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mr-3 rounded'
            onClick={onClose}>
            Cancel
          </button>

          <button
            className={`${selectedPfp === 0 ? 'bg-sky-300' : 'bg-sky-500 hover:bg-sky-400'}  focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
            onClick={(e) => submitSelection(e)}
            disabled={selectedPfp === 0}
          >  
            Submit selection
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );

}