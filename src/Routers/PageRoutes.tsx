import { ROUTES } from "../Constants/Routes";
import { PAGE_TITLE } from "../Constants/PageTitle";
import Blog from "../Pages/Blog";
import Product from "../Pages/Product";
import Dashboard from "../Pages/Dashboard";
import UserPage from "../Pages/User/UserPage";
import Season from "../Pages/Seasons";
import Collection from "../Pages/Collections";
import Scent from "../Pages/Scent";
import Banner from "../Pages/Banner";
import Topbar from "../Pages/TopBar";
import TermsService from "../Pages/TermsService";
import InstagramPage from "../Pages/Instagram";
import TermsConditionsPage from "../Pages/TermsConditions";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import RefundPolicy from "../Pages/RefundPolice";
import ReturnExchange from "../Pages/ReturnExchange";
import ContactUs from "../Pages/ContactUs";
import Newsletter from "../Pages/Newsletter";
import RatingPage from "../Pages/Rating";
import SettingsPage from "../Pages/Settings";
import Orders from "../Pages/Order";
import OrderDetails from "../Components/Order/OrderDetail";
import ProfilePage from "../Pages/Profile/ProfilePage";



  export const PageRoutes = [
  { path: ROUTES.DASHBOARD, name: PAGE_TITLE.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.USERS.BASE, name: PAGE_TITLE.USERS.BASE, element: <UserPage /> },
  { path: ROUTES.SEASON.BASE, name: PAGE_TITLE.SEASON.BASE, element: <Season /> },
  { path: ROUTES.COLLECTION.BASE, name: PAGE_TITLE.COLLECTION.BASE, element: <Collection /> },
  { path: ROUTES.PRODUCT.BASE, name: PAGE_TITLE.PRODUCT, element: <Product /> },
  { path: ROUTES.SCENT.BASE, name: PAGE_TITLE.SCENT.BASE, element: <Scent/> },
  { path: ROUTES.BLOG.BASE, name: PAGE_TITLE.BLOG.BASE, element: <Blog /> },
  { path: ROUTES.BANNER.BASE, name: PAGE_TITLE.BANNER.BASE, element: < Banner/> },
  { path: ROUTES.TOPBAR.BASE, name: PAGE_TITLE.BANNER.BASE, element: < Topbar/> },
  { path: ROUTES.TERMS_SERVICE.BASE, name: PAGE_TITLE.TERMS_SERVICE.TITLE, element: < TermsService/> },
  { path: ROUTES.INSTAGRAM.BASE, name: PAGE_TITLE.INSTAGRAM.BASE ,element: < InstagramPage/> },
  { path: ROUTES.TERMS_CONDITIONS.BASE,element: < TermsConditionsPage/> },
  { path: ROUTES.PRIVACY_POLICY.BASE, name: PAGE_TITLE.PRIVACY_POLICY.TITLE , element :< PrivacyPolicy/> },
  { path: ROUTES.REFUND_POLICY.BASE, name: PAGE_TITLE.REFUND_POLICY.TITLE , element :< RefundPolicy/> },
  { path: ROUTES.RETURN_EXCHANGE.BASE, name: PAGE_TITLE.RETURN_EXCHANGE.TITLE , element :< ReturnExchange/> },
  { 
  path: ROUTES.CONTACT_US.BASE,
  name: PAGE_TITLE.CONTACT_US.BASE,
  element: <ContactUs />
},
  { 
  path: ROUTES.NEWSLETTER.BASE,
  name: PAGE_TITLE.NEWSLETTER.BASE,
  element: <Newsletter />
},
  { 
  path: ROUTES.RATING.BASE,
  name: PAGE_TITLE.RATING.BASE,
  element: <RatingPage />
},
  { 
  path: ROUTES.SETTINGS.BASE,
  name: "Setting",
  element: <SettingsPage />
},
  { 
  path: ROUTES.ORDERS,
  name: "Order",
  element: <Orders />
},
  { 
  path: ROUTES.ORDER_DETAILS,
  name: "Order_Details",
  element: <OrderDetails  />
},
  { 
  path: ROUTES.PROFILE.BASE,
  name: "Profile",
  element: <ProfilePage  />
},



];

