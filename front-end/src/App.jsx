import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./userpages/Header";
import Footer from "./userpages/Footer";
import Home from "./userpages/Home";
import Register from "./userpages/Register";
import Login from "./userpages/Login";
import Checkout from "./userpages/Checkout";
import ProductDetail from "./userpages/ProductDetail";
import Cart from "./userpages/Cart";
import PaymentMethod from "./userpages/PaymentMethod";
import PaymentSuccess from "./userpages/PaymentSuccess";
import SideBar from "./managerpages/SideBar";
import Headerv2 from "./managerpages/Headerv2";
import Dashboard from "./adminpages/Dashboard";
import ListProduct from "./managerpages/ListProduct";
import AddProduct from "./managerpages/AddProduct";
import UpdateProduct from "./managerpages/UpdateProduct";
import ManagementUser from "./managerpages/ManagementUser";
import UserDetail from "./managerpages/UserDetail";

import OrderList from "./managerpages/OrderList";
import OrderDetail from "./managerpages/OrderDetail";
import ManagementVoucher from "./managerpages/ManagementVoucher";
import SideBarv2 from "./adminpages/SideBarv2";
import ManagementEmployees from "./adminpages/ManagementEmployees";
import StaffDetail from "./adminpages/StaffDetail";
import SideBarv3 from "./salestaffpages/SideBarv3";
import ListDiamond from "./salestaffpages/ListDiamond";
import OrderListForDelivery from "./deliverystaffpages/OrderListForDelivery";
import OrderListForSaleStaff from "./salestaffpages/OrderListForSaleStaff";
import Carousel from "./userpages/Carousel";
import ListProductForUser from "./userpages/ListProductForUser";
import UserInfo from "./userpages/UserInfo";
import OrderDetailForUser from "./userpages/OrderDetailForUser";
import Knowledge from "./userpages/Knowledge";
import Promotion from "./userpages/Promotion";
import OrderHistory from "./userpages/OrderHistory";
import ManagementStaff from "./managerpages/ManagementStaff";
import DiamondMount from "./managerpages/DiamondMount";
import Collection from "./userpages/Collection";
import Quotation from "./userpages/Quotation";
import ManagementCollection from "./managerpages/ManagementCollection";
import ListDiamondMount from "./salestaffpages/ListDiamondMount";
import Warranty from "./salestaffpages/Warranty";
import ForgotPassword from "./userpages/ForgotPassword";
import Certificate from "./managerpages/Certificate";
import ManagementDiamond from "./managerpages/ManagementDiamond";
import ProductPrice from "./managerpages/ProductPrice";
import ProductPromotion from "./managerpages/ProductPromotion";
import Promotions from "./managerpages/Promotion";
import ProductDiamond from "./managerpages/ProductDiamond";
import Inventory from "./managerpages/Inventory";
import ProtectedRoute from "./route/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Carousel />
              <Home />
              <Footer />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/order-history"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <OrderHistory />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <OrderDetailForUser />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <Checkout />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <Collection />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quotation"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <Quotation />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list-product"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <ListProductForUser />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <ProductDetail />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <Cart />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-method"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <PaymentMethod />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment-success"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <PaymentSuccess />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <UserInfo />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/knowledge"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <Knowledge />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/promotions"
          element={
            <ProtectedRoute allowedRoles={["Member"]}>
              <Header />
              <Promotion />
              <Footer />
            </ProtectedRoute>
          }
        />

        {/* Manager routes */}
        <Route
          path="/manager/list-products"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ListProduct />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/management-product-prices"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ProductPrice />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/add-product"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <AddProduct />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/product-diamond"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ProductDiamond />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/inventory"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <Inventory />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/update-product/:id"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <UpdateProduct />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/management-user"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ManagementUser />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/management-user/user-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <UserDetail />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/order-list"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <OrderList />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/order-list/order-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <OrderDetail />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/management-voucher"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ManagementVoucher />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/management-staff"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ManagementStaff />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/diamond-mount"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <DiamondMount />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/collection"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ManagementCollection />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/certificate"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <Certificate />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/management-diamond"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ManagementDiamond />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/promotion"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <Promotions />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/product-promotion"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <div className="flex">
                <SideBar />
                <div className="flex-1">
                  <Headerv2 />
                  <ProductPromotion />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        {/* Sale Staff routes */}
        <Route
          path="/staff/list-diamond"
          element={
            <ProtectedRoute allowedRoles={["Sales Staff"]}>
              <div className="flex">
                <SideBarv3 />
                <div className="flex-1">
                  <Headerv2 />
                  <ListDiamond />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/list-diamond-mount"
          element={
            <ProtectedRoute allowedRoles={["Sales Staff"]}>
              <div className="flex">
                <SideBarv3 />
                <div className="flex-1">
                  <Headerv2 />
                  <ListDiamondMount />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/order-list"
          element={
            <ProtectedRoute allowedRoles={["Sales Staff"]}>
              <div className="flex">
                <SideBarv3 />
                <div className="flex-1">
                  <Headerv2 />
                  <OrderListForSaleStaff />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/order-list/order-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Sales Staff"]}>
              <div className="flex">
                <SideBarv3 />
                <div className="flex-1">
                  <Headerv2 />
                  <OrderDetail />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/warranty"
          element={
            <ProtectedRoute allowedRoles={["Sales Staff"]}>
              <div className="flex">
                <SideBarv3 />
                <div className="flex-1">
                  <Headerv2 />
                  <Warranty />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        {/* Delivery Staff routes */}
        <Route
          path="/delivery"
          element={
            <ProtectedRoute allowedRoles={["Delivery Staff"]}>
              <div className="flex flex-col">
                <Headerv2 />
                <OrderListForDelivery />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery/order-list/order-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Delivery Staff"]}>
              <div className="flex flex-col">
                <Headerv2 />
                <OrderDetail />
              </div>
            </ProtectedRoute>
          }
        />
        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <div className="flex">
                <SideBarv2 />
                <div className="flex-1">
                  <Headerv2 />
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/management-employees"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <div className="flex">
                <SideBarv2 />
                <div className="flex-1">
                  <Headerv2 />
                  <ManagementEmployees />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/employees-detail/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <div className="flex">
                <SideBarv2 />
                <div className="flex-1">
                  <Headerv2 />
                  <StaffDetail />
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
