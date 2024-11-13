const Profile = () => {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Get back to growth with{' '}
        <span className="text-blue-600 dark:text-blue-500">the world&rsquo;s #1</span> CRM.
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Here at Flowbite we focus on markets where technology, innovation, and capital can unlock
        long-term value and drive economic growth.
      </p>

      <img className="rounded-full w-96 h-96" src="/src/assets/mang.jpg" alt="image description" />
      {/* //description */}
      {/* <p className="text-center text-gray-500 dark:text-gray-400">
        Get started with an enterprise-level, professionally designed, fully responsive, and HTML
        semantic set of web pages, sections and over 400+ components crafted with the utility
        classes from Tailwind CSS and based on the Flowbite component library
      </p> */}
      <div className="relative w-full max-w-sm overflow-y-scroll bg-white border border-gray-100 rounded-lg dark:bg-gray-700 dark:border-gray-600 h-96">
        <ul>
          <li className="border-b border:gray-100 dark:border-gray-600">
            <a
              href="#"
              className="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <img
                className="me-3 rounded-full w-11 h-11"
                src="/docs/images/people/profile-picture-1.jpg"
                alt="Jese Leos Avatar"
              />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  New message from{' '}
                  <span className="font-medium text-gray-900 dark:text-white">Jese Leos</span>:
                  &quot;Hey, what&apos;s up? All set for the presentation?&quot;
                </p>
                <span className="text-xs text-blue-600 dark:text-blue-500">a few moments ago</span>
              </div>
            </a>
          </li>
          <li className="border-b border:gray-100 dark:border-gray-600">
            <a
              href="#"
              className="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <img
                className="me-3 rounded-full w-11 h-11"
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
          <li className="border-b border:gray-100 dark:border-gray-600">
            <a
              href="#"
              className="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <img
                className="me-3 rounded-full w-11 h-11"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie Green Avatar"
              />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-gray-900 dark:text-white">Bonnie Green</span>{' '}
                  and <span className="font-medium text-gray-900 dark:text-white">141 others</span>{' '}
                  love your story. See it and view more stories.
                </p>
                <span className="text-xs text-blue-600 dark:text-blue-500">23 minutes ago</span>
              </div>
            </a>
          </li>
          <li className="border-b border:gray-100 dark:border-gray-600">
            <a
              href="#"
              className="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <img
                className="me-3 rounded-full w-11 h-11"
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
          <li>
            <a
              href="#"
              className="flex items-center justify-center w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <img
                className="me-3 rounded-full w-11 h-11"
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
  );
};

export default Profile;
