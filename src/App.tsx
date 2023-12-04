import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import FoodDetailScreen from './Screens/FoodDetailScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import './App.css';
import './tailwind.css';
import AuthRoute from './components/AuthNavigation/AuthRouter';
import PublicRoute from './components/Route-Type/PublicRoute';
import ErrorScreen from './Screens/ErrorScreen';
import OrderSuccessfulScreen from './Screens/OrderSuccessfulScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderProvider from './context/OrderProvider';
import DeliveryProvider from './context/DeliveryProvider';
import ProtectedAdminRoute from './components/Route-Type/ProtectedAdminRoute';
import Admin from './Admin/Admin';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OrderProvider>
          <DeliveryProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route
                  path="/about"
                  element={
                    <PublicRoute>
                      <About />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signin"
                  element={
                    <PublicRoute>
                      <SignInScreen />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <SignUpScreen />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/foods/:name"
                  element={
                    <AuthRoute>
                      <FoodDetailScreen />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <AuthRoute>
                      <PlaceOrderScreen />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <AuthRoute>
                      <PlaceOrderScreen />
                    </AuthRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <Admin />
                    </ProtectedAdminRoute>
                  }
                />

                <Route
                  path="/order-successful"
                  element={<OrderSuccessfulScreen />}
                />

                <Route
                  path="/order-history"
                  element={
                    <AuthRoute>
                      <OrderHistoryScreen />
                    </AuthRoute>
                  }
                />

                <Route path="*" element={<ErrorScreen />}></Route>
              </Route>
            </Routes>
          </DeliveryProvider>
        </OrderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
