import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Logo from '../../components/Logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './UserPage.css';
import { FaUserAlt, FaCheck, FaCircle } from 'react-icons/fa';
const UserPage = () => {
  const { userData, isLoading } = useContext(AuthContext);
  const fullName = userData.name;
  const defaultName = 'John Doe';
  const displayName = fullName
    ? fullName
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ')
    : defaultName
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ');
  const navigate = useNavigate();
  return (
    <div className="user-page flex">
      <div className="user-page-top">
        <div
          className="user-page-top-logo"
          onClick={() => navigate('/')}>
          <Logo no_text={true} />
        </div>
        <div className="user-page-top-details">
          <div className="user-page-top-texts">
            <p>My Dashboard</p>
            <p>Hello {userData.username}</p>
          </div>
          <div className="user-menu flex">
            <p>{displayName}</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader
          width="100px"
          height="100px"
        />
      ) : (
        <div className="user-page-contents">
          <FaUserAlt className="icon" />
          <h2>{userData.name}</h2>
          <hr />
          <h3>My Profile</h3>
          <p>
            My name <span>{userData.name}</span>
          </p>
          <hr />
          <p>
            My email <span>{userData.email}</span>
          </p>
          <hr />
          <p>
            My username <span>{userData.username}</span>
          </p>
          <hr />
          <p>
            Verified email{' '}
            <span>
              {userData.verifiedAccount ? (
                <FaCheck className="check" />
              ) : (
                <FaCircle />
              )}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
export default UserPage;
