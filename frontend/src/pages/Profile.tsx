import ProfileView from '../components/ProfileView';
import useFetchProfile from '../hooks/useFetchProfile';

const Profile = () => {
  const { data, error, isLoading } = useFetchProfile('data/profile');

  if (isLoading) {
    return <p>Loading profile...</p>;
  }
  if (error) {
    return <p>Error loading profile: {error}</p>;
  }
  return (
    <>
      <ProfileView data={data} />
    </>
  );
};

export default Profile;
