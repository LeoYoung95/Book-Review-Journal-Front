import { Link, useLocation } from 'react-router-dom';

export default function NavBarProfile() {
  const { pathname } = useLocation();

  // this is a stub. delete later
  const currentUser = {
    name: 'test user',
    email: 'test@test.com',
    role: 'reader',
  }

  return(
    <nav className="content-center-profile-tab border-b border-grey-500">
      <div className="max-w-screen-xl px-4 py-3 mx-auto ">
        <div className="">
          <ul className="flex text-ml ">
            {
              
              <li>
                <Link className={`block px-4 py-2 ${pathname.includes("personal-info") ? "text-blue-700" : ""}`}
                  to="/profile/personal-info">Personal Information</Link>
              </li>
            }
            {
              currentUser.role === 'reader' ?
              <li>
                <Link className={`block px-4 py-2  ${pathname.includes("liked-reviews") ? "text-blue-700" : ""}`}
                  to="/profile/liked-reviews">Liked Reviews</Link>
              </li> :
              null
            }
            {
                currentUser.role === 'writer' ? 
                <li>
                  <Link className={`block px-4 py-2  ${pathname.includes("liked-reviews") ? "text-blue-700" : ""}`}
                    to="/profile/liked-reviews">My Reviews</Link>
                </li> : 
                null
            }
          </ul>
        </div>
      </div>
    </nav>)
};