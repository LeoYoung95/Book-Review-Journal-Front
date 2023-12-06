import p1 from '../images/profile_pics/p1.jpg';
import p2 from '../images/profile_pics/p2.jpg';
import p3 from '../images/profile_pics/p3.jpg';
import p4 from '../images/profile_pics/p4.jpg';
import p5 from '../images/profile_pics/p5.jpg';
import p6 from '../images/profile_pics/p6.jpg';
import p7 from '../images/profile_pics/p7.jpg';
import p8 from '../images/profile_pics/p8.jpg';
import p9 from '../images/profile_pics/p9.jpg';
import ProfileAvatar from '../images/profile-avatar.jpg';

export const profilePicIdMap = [
  {
    id: '1',
    pic: p1,
  },
  {
    id: '2',
    pic: p2,
  },
  {
    id: '3',
    pic: p3,
  },
  {
    id: '4',
    pic: p4,
  },
  {
    id: '5',
    pic: p5,
  },
  {
    id: '6',
    pic: p6,
  },
  {
    id: '7',
    pic: p7,
  },
  {
    id: '8',
    pic: p8,
  },
  {
    id: '9',
    pic: p9,
  },
]

export const findPicById = id => {
  const pfpObject = profilePicIdMap.find(p => p.id === id);
  if (pfpObject) {
    return pfpObject.pic;
  } else {
    return ProfileAvatar;
  }
}