/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { updateProfile } from '../../clients/user_client';
import { useSelector } from 'react-redux';
import { findPicById } from '../../utils/profilePicIdMap';
import ProfilePicModal from '../universal/profilePicModal';

export default function PersonalInfo({ profileId, profileUser, isCurrentUser, fetchUser }) {
  const currentUserSlice = useSelector(state => state.currentUser);

  const [profileDetails, setProfileDetails] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    email: '',
    profilePicId: '0',
  })
  const [isEditing, setIsEditing] = useState(false);
  const [showProfilePicModal, setShowProfilePicModal] = useState(false);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [bioInput, setBioInput] = useState('');
  const [pfpInput, setPfpInput]= useState('');

  useEffect(() => {
    if (profileUser) {
      const { email, firstName, lastName, bio, profilePicId } = profileUser;
      setProfileDetails({...profileDetails, email, firstName, lastName, profilePicId: profilePicId[0], bio: bio ? bio : ''});
    }
  }, [profileUser])
  
  const handleEditClicked = (e) => {
    e.preventDefault();
    setFirstNameInput(profileDetails.firstName);
    setLastNameInput(profileDetails.lastName);
    setBioInput(profileDetails.bio);
    setPfpInput(profileDetails.profilePicId);
    setIsEditing(true);
  }
  
  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUserFields = {
      firstName: firstNameInput,
      lastName: lastNameInput,
      bio: bioInput,
      profilePicId: pfpInput,
    }
    await updateProfile(profileId ? profileId : currentUserSlice.userId, updatedUserFields);
    setIsEditing(false);
    fetchUser(profileId ? profileId: currentUserSlice.userId);
  };
  
  const profilePicDisplay = () => {
    const picId = profileDetails.profilePicId;
    if (isEditing) {
      return findPicById(pfpInput);
    } else {
      return findPicById(picId);
    }
 
  }
  
  const handleProfilePicSubmission = pfpId => {
    setPfpInput(pfpId);
    setShowProfilePicModal(false);
  }
  
  return (
    <div className='flex flex-col items-center w-full'>
      <h1 className='mt-8 font-bold text-2xl'>
        Personal Information
      </h1>
      
      <div className='flex justify-center items-center mt-4'>
        <img 
          src={profilePicDisplay()} 
          alt='profile avatar'
          className='w-20 mr-4'
          style={{borderRadius: '50%'}}
        />
        {
          isEditing ? 
            <button
              className='bg-yellow-500 hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded'
              onClick={() => setShowProfilePicModal(true)}
            >
              Choose
            </button> :
            null
        }
      </div>
      
      <form className='mt-4 w-[60%]'>
        {
          isCurrentUser ?
            <div className="md:flex md:items-center mb-3">
              <div className="md:w-1/3 mr-2">
                <label>
                  Email:
                </label>
              </div>
              <div className='md:w-2/3'>
                <p className='rounded pl-1'> 
                  {profileDetails.email}
                </p> 
              </div>
            </div> :
            null
        }
     
        {
          !isEditing ?
            <div>
              <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/3 mr-2">
                  <label>
                    First Name:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <p className='rounded pl-1'> 
                    {profileDetails.firstName}
                  </p> 
                </div>
              </div>  
              <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/3 mr-2">
                  <label>
                    Last Name:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <p className='rounded pl-1'> 
                    {profileDetails.lastName}
                  </p> 
                </div>
              </div>  
              <div className="md:flex md:items-center mb-3">
                <div className="md:w-1/3 mr-2">
                  <label>
                    Biography:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <p className='rounded pl-1'> 
                    {profileDetails.bio ? profileDetails.bio : 'Nothing yet!'}
                  </p> 
                </div>
              </div>  
            </div>
              :
            <div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3 mr-2">
                  <label>
                    First Name:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input 
                    type='text'
                    value={isEditing ? firstNameInput : profileDetails.firstName}
                    onChange={e => setFirstNameInput(e.target.value)}
                    className='rounded pl-2'
                    disabled={!isEditing} 
                  />
                </div>
              </div>
              
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3 mr-2">
                  <label>
                    Last Name:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <input 
                    type='text'
                    value={isEditing ? lastNameInput : profileDetails.lastName}
                    onChange={e => setLastNameInput(e.target.value)}
                    className='rounded pl-2'
                    disabled={!isEditing} 
                  />
                </div>
              </div>
              
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3 mr-2">
                  <label>
                    Biography:
                  </label>
                </div>
                <div className='md:w-2/3'>
                  <textarea 
                    type='text'
                    value={isEditing ? bioInput : profileDetails.bio}
                    onChange={e => setBioInput(e.target.value)}
                    className='rounded pl-2 h-50 p-2'
                    disabled={!isEditing} 
                  />
                </div>
              </div>
            </div>
        }
        
        {
          isCurrentUser ?
            !isEditing ?
              <button
                className="bg-[#007bff] hover:bg-sky-400 focus:shadow-outline focus:outline-none text-white py-1 px-4 rounded"
                onClick={(e) => handleEditClicked(e)}
              >
                Edit
              </button> :
              <div className='flex mb-4'>
                <button
                  className="bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
                  onClick={e => handleSave(e)}
                >
                  Save
                </button>
                <button
                  className="ml-2 bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            :
            null
        }
      </form>
      { showProfilePicModal && <ProfilePicModal onClose={() => setShowProfilePicModal(false)} handleProfilePicSubmission={handleProfilePicSubmission}/>}
    </div>
  );
};