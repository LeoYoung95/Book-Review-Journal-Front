import React, { useState } from 'react';
import ProfileAvatar from '../../images/profile-avatar.jpg';

export default function PersonalInfo({ profileUser, currentUser }) {
  
  const { firstName, lastName, email, bio } = profileUser

  const [isEditing, setIsEditing] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState(firstName);
  
  const handleSave = () => {
    console.log('save clicked');
  }
  
  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='mt-8 font-bold text-2xl'>
        Personal Information
      </h1>
      
      <img src={ProfileAvatar} alt='profile avatar'
        className='w-20 mt-4'
        style={{borderRadius: '50%'}}
      />
      
      <form className='mt-4'>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3 mr-2">
            <label>
              First Name
            </label>
          </div>
          <div className='md:w-2/3'>
            <input 
              type='text'
              value={isEditing ? firstNameInput : firstName}
              onChange={e => setFirstNameInput(e.target.value)}
              className='rounded pl-2'
              disabled={!isEditing} 
            />
          </div>
        </div>
        
        {
          isEditing ?
            <div className='flex'>
              <button
                className="bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="ml-2 bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div> :
            <button
              className="bg-sky-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
        }
      </form>
    </div>
  );
};