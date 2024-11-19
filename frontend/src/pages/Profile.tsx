import ProfileView from '../components/ProfileView';
import { useEffect, useState } from 'react';
import { customAxios } from '../utils/axiosFetchInstance';

interface UserProfile {
  firstName: string;
  profileImage?: string;
}

const Profile = () => {
  const [data, setData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const handleFetching = async () => {
      try {
        const response = await customAxios.get('data/profile');
        if (response.status === 200) {
          console.log(response.data[0]);
          setData(response.data[0]);
        }
      } catch (error) {
        console.log('ERRORRR:.....', error);
      }
    };
    handleFetching();
  }, []);

  return <>{data ? <ProfileView data={data} /> : <p>Loading profile...</p>}</>;
};

export default Profile;
