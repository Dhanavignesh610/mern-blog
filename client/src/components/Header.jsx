import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <>
    <Navbar className="border-b-2 orbitan">
      <div className="flex items-center justify-start">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-md sm:text-xl font-bold dark:text-white"
        >
          {/* <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Techbytes
        </span> */}
          <span className="px-2 py-1 orbitron text-black dark:text-white">Techbytes</span>
        </Link>
      </div>
      <div className="flex gap-2 md:order-2">
        {/* <form onSubmit={handleSubmit} className="ml-4">
          <TextInput
            type="text"
            placeholder="Search..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form> */}
        <Button className="w-12 h-10 hidden sm:inline !p-0" color="gray" pill >
        {<AiOutlineSearch  className="!p-0" />}
        </Button>
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
        <Navbar.Collapse className="orbitron text-xs md:hidden lg:hidden xl:flex" > 
          <Navbar.Link active={path === '/'} as={'div'}><Link to='/'>HOME</Link></Navbar.Link>
          <Navbar.Link active={path === '/ai'} as={'div'}><Link to={`/category/ai`}>AI</Link></Navbar.Link>
          <Navbar.Link active={path === '/blockchain'} as={'div'}><Link to={`/category/blockchain`}>BLOCKCHAIN</Link></Navbar.Link>
          <Navbar.Link active={path === '/security'} as={'div'}><Link to={`/category/security`}>SECURITY</Link></Navbar.Link>
          <Navbar.Link active={path === '/clouds'} as={'div'}><Link to={`/category/clouds`}>CLOUDS</Link></Navbar.Link>
          <Navbar.Link active={path === '/webapps'} as={'div'}><Link to={`/category/webapps`}>WEB APPS</Link></Navbar.Link>
          <Navbar.Link active={path === '/iot'} as={'div'}><Link to={`/category/iot`}>IOT</Link></Navbar.Link>
          <Navbar.Link active={path === '/trends'} as={'div'}><Link to={`/category/trends`}>TRENDS</Link></Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
    <div className="border-b-2 !orbitron m-auto justify-center hidden  md:flex lg:flex xl:hidden">
   <Navbar>
      <Navbar.Collapse className="orbitron text-xs" > 
      <Navbar.Link active={path === '/'} as={'div'}><Link to='/'>HOME</Link></Navbar.Link>
      <Navbar.Link active={path === '/ai'} as={'div'}><Link to={`/category/ai`}>AI</Link></Navbar.Link>
      <Navbar.Link active={path === '/blockchain'} as={'div'}><Link to={`/category/blockchain`}>BLOCKCHAIN</Link></Navbar.Link>
      <Navbar.Link active={path === '/security'} as={'div'}><Link to={`/category/security`}>SECURITY</Link></Navbar.Link>
      <Navbar.Link active={path === '/clouds'} as={'div'}><Link to={`/category/clouds`}>CLOUDS</Link></Navbar.Link>
      <Navbar.Link active={path === '/webapps'} as={'div'}><Link to={`/category/webapps`}>WEB APPS</Link></Navbar.Link>
      <Navbar.Link active={path === '/iot'} as={'div'}><Link to={`/category/iot`}>IOT</Link></Navbar.Link>
      <Navbar.Link active={path === '/trends'} as={'div'}><Link to={`/category/trends`}>TRENDS</Link></Navbar.Link>
      </Navbar.Collapse>
      </Navbar>
</div>

      </>
  );
}
