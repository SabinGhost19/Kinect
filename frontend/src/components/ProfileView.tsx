import { Link } from 'react-router-dom';

interface SocialLink {
  platform: string;
  url: string;
}

interface ProfileViewProps {
  data: {
    firstName: string;
    profileImage?: string;
    description?: string;
    socialLinks: SocialLink[];
  };
}

const ProfileView = ({ data }: ProfileViewProps) => {
  const { firstName, profileImage, description, socialLinks } = data;

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
          Get back to {firstName}&apos;s growth with{' '}
          <span className="text-blue-600 dark:text-blue-500">the world&rsquo;s #1</span> CRM.
        </h1>
        <p className="text-lg font-normal text-center text-gray-500 lg:text-xl dark:text-gray-400 mb-6">
          {description}
        </p>

        {profileImage ? (
          <img
            className="rounded-full w-72 h-72 sm:w-96 sm:h-96 mb-8"
            src={`data:image/png;base64,${profileImage}`}
            alt="Profile"
          />
        ) : (
          <div className="rounded-full w-72 h-72 sm:w-96 sm:h-96 mb-8 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="w-full max-w-4xl bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <ul className="space-y-4 p-6">
            {socialLinks.map((socialLink, index) => (
              <li key={index} className="flex items-center">
                <img
                  className="mr-4 rounded-full w-14 h-14"
                  src={`/public/images/${socialLink.platform.toLowerCase()}.svg`}
                  alt={`${socialLink.platform} Logo`}
                />
                <label>{socialLink.platform} </label>
                <div>
                  <a
                    href={socialLink.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {socialLink.url}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileView;
