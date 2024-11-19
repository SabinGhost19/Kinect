// const socialLogos = {
//   LinkedIn: '/images/logos/linkedin.png',
//   Twitter: '/images/logos/twitter.png',
//   Facebook: '/images/logos/facebook.png',
//   Instagram: '/images/logos/instagram.png',
// };
import { Link } from 'react-router-dom';
interface ProfileViewProps {
  data: {
    firstName: string;
    profileImage?: string;
  };
}

const ProfileView = ({ data }: ProfileViewProps) => {
  const { firstName, profileImage } = data;

  return (
    <>
      <Link
        to={'/Profilesettings'}
        className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Settings
      </Link>
      <div className="flex flex-col items-center justify-center min-h-screen w-full px-4">
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center md:text-5xl lg:text-6xl dark:text-white">
          Get back to {firstName} growth with{' '}
          <span className="text-blue-600 dark:text-blue-500">the world&rsquo;s #1</span> CRM.
        </h1>
        <p className="text-lg font-normal text-center text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
          Here at Flowbite we focus on markets where technology, innovation, and capital can unlock
          long-term value and drive economic growth.
        </p>

        <img
          className="rounded-full w-72 h-72 sm:w-96 sm:h-96 mb-8"
          src={`data:image/png;base64,${profileImage}`}
          alt="Profile"
        />

        <div className="w-full max-w-4xl bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <ul className="space-y-4 p-6">
            <li className="w-full">
              <a
                href="#"
                className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <img
                  className="mr-4 rounded-full w-14 h-14"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="Jese Leos Avatar"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    New message from{' '}
                    <span className="font-medium text-gray-900 dark:text-white">Jese Leos</span>:
                    &quot;Hey, what&apos;s up? All set for the presentation?&quot;
                  </p>
                  <span className="text-xs text-blue-600 dark:text-blue-500">
                    a few moments ago
                  </span>
                </div>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#"
                className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <img
                  className="mr-4 rounded-full w-14 h-14"
                  src="/docs/images/people/profile-picture-2.jpg"
                  alt="Joseph McFall Avatar"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">Joseph McFall</span>{' '}
                    and <span className="font-medium text-gray-900 dark:text-white">5 others</span>{' '}
                    started following you.
                  </p>
                  <span className="text-xs text-blue-600 dark:text-blue-500">10 minutes ago</span>
                </div>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#"
                className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <img
                  className="mr-4 rounded-full w-14 h-14"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="Bonnie Green Avatar"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">Bonnie Green</span>{' '}
                    and{' '}
                    <span className="font-medium text-gray-900 dark:text-white">141 others</span>{' '}
                    love your story. See it and view more stories.
                  </p>
                  <span className="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
                </div>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#"
                className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <img
                  className="mr-4 rounded-full w-14 h-14"
                  src="/docs/images/people/profile-picture-4.jpg"
                  alt="Leslie Livingston Avatar"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Leslie Livingston
                    </span>{' '}
                    mentioned you in a comment:{' '}
                    <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      @bonnie.green
                    </span>{' '}
                    what do you say?
                  </p>
                  <span className="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
                </div>
              </a>
            </li>
            <li className="w-full">
              <a
                href="#"
                className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              >
                <img
                  className="mr-4 rounded-full w-14 h-14"
                  src="/docs/images/people/profile-picture-5.jpg"
                  alt="Robert Brown Avatar"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">Robert Brown</span>{' '}
                    posted a new video: Glassmorphism - learn how to implement the new design trend.{' '}
                  </p>
                  <span className="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default ProfileView;
