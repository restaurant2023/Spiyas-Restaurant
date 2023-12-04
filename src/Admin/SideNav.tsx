import { useState } from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { useAuth } from '../context/useAuth';

type SideNavProps = {
  onNavClick: (tabName: string) => void;
};

const SideNav: React.FC<SideNavProps> = ({ onNavClick }) => {
  const { user } = useAuth();
  const [sidenav, setSidenav] = useState(true);
  console.log(user);

  //toggling the side nav
  const handlenav = () => {
    setSidenav(!sidenav);
  };

  // auto hide
  window.addEventListener('resize', () => {
    if (window.innerWidth < 1098) {
      setSidenav(false);
    } else {
      setSidenav(true);
    }
  });
  const menu = [
    { id: 1, text: 'Food List' },
    { id: 2, text: 'Add Food' },
  ];

  return (
    <div className="relative">
      {sidenav && (
        <>
          <nav className="flex fixed flex-col w-72 navBar h-screen px-4">
            <div className="flex flex-col items-center justify-center flex-wrap mt-8 pt-12">
              <div className="">
                {/* <img
                                    src={user?.photoURL}
                                    className="mx-auto w-20 h-20 rounded-full"
                                    alt={user?.displayName}
                                /> */}
              </div>
            </div>
            <div className="mt-20 ">
              <ul className="flex flex-col items-center  justify-start w-full">
                {menu.map((item) => (
                  <li className="flex items-center" key={item.id}>
                    <div
                      className="p-3 cursor-pointer"
                      onClick={() => {
                        onNavClick(item.text.toLowerCase().replace(/\s+/g, ''));
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        {/* <span>
                                            <item.icon className="text-2xl text-white" />
                                        </span> */}
                        <span className="ml-2 text-white poppins">
                          {item.text}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-0 w-full flex justify-center items-center pb-4">
              <span className="font-semibold text-md text-white">
                {user?.email}
              </span>
            </div>
          </nav>
        </>
      )}

      {/* //menu icons  */}
      <div
        className="lg:hidden block fixed bottom-10 left-10 bg-white p-2 rounded-full cursor-pointer shadow-xl border border-primary"
        onClick={handlenav}
      >
        <MdOutlineArrowForwardIos className="text-2xl text-primary" />
      </div>
    </div>
  );
};

export default SideNav;
