import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import { Suspense, lazy, useEffect } from 'react';
import CustomizeLoading from './components/CustomizeLoading';


const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Search = lazy(() => import("./pages/Search"));
const Category = lazy(() => import("./pages/category"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const UpdatePost = lazy(() => import("./pages/UpdatePost"));
const PostPage = lazy(() => import("./pages/PostPage"));

export default function App() {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 90000);

  //   return () => clearTimeout(timer);
  // }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<CustomizeLoading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/post/:postSlug' element={<PostPage />} /> 
        <Route path='/category/:type' element={<Category />} /> 
      </Routes> 
      </Suspense>
      <Footer />
    </BrowserRouter>
  ); 
}
