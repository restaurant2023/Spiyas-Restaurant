import AddFood from './AddFoodForm';
import SideNav from './SideNav';
import bg from '../assets/bannerbackground.png';
import EditFood from './EditFoodForm';
import AdminDashboard from './AdminDashboard';
import { useState } from 'react';

const Admin = () => {
  //   const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null);

  const handleNavClick = (tabName: string, foodId?: string) => {
    setCurrentTab(tabName);
    setEditingFoodId(foodId || null);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'addfood':
        return <AddFood />;
      case 'editfood':
        return <EditFood foodId={editingFoodId} />;
      case 'dashboard':
      default:
        return <AdminDashboard onEditFood={handleNavClick} />;
    }
  };

  return (
    // <AuthProvider>
    <div
      className="w-screen h-screen bg-no-repeat bg-cover relative"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="flex">
        <div className="col-span-1">
          <SideNav onNavClick={handleNavClick} />
        </div>
        <div className="flex-1 max-w-screen-xl w-full p-4">
          <div className="my-24 px-6">
            {renderContent()}
            <div className="absolute top-[45%] left-[55%] transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
              {/* <h1 className=" text-blue-800 font-semibold text-[40px] animate-pulse ">
                Welcome Dear {user?.displayName?.toUpperCase()}
              </h1> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    // </AuthProvider>
  );
};

export default Admin;
