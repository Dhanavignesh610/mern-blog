import { Footer } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";

export default function FooterCom() {
  const navigate = useNavigate();

  return (
    <Footer
      container
      className=" border-gray-200 dark:border-gray-700 rounded-none"
      style={{ borderTopWidth: "2px" }}
    >
      <div className="w-full max-w-7xl px-2 mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-4">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              {/* <span className="py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Techbytes
              </span>  */}
              <span className="py-1">
                Techbytes
              </span> 
            </Link>
            <p className="text-sm mt-4 mb-5">
              Exploring the latest trends and innovations in technology.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-4 sm:gap-6">
            <div>
              <Footer.Title title="Quick Links" />
              <Footer.LinkGroup col className="pb-4">
                <Footer.Link href="/">Home</Footer.Link>
                <Footer.Link href="/about">AI</Footer.Link>
                <Footer.Link href="#">BLOCKCHAIN</Footer.Link>
                <Footer.Link href="/">BIG DATA</Footer.Link>
              </Footer.LinkGroup>  
              <Footer.LinkGroup col className="sm:hidden">
            <Footer.Link href="/about">CLOUDS</Footer.Link>
            <Footer.Link href="#">WEB APPs</Footer.Link>
            <Footer.Link href="#">IOT</Footer.Link>
            <Footer.Link href="/">TRENDS</Footer.Link>
            </Footer.LinkGroup>            
            </div>
            <div className="hidden sm:block ">
            <Footer.Title title="Quick Links" className="invisible"/>
            <Footer.LinkGroup col>
            <Footer.Link href="/about">CLOUDS</Footer.Link>
            <Footer.Link href="#">WEB APPs</Footer.Link>
            <Footer.Link href="#">IOT</Footer.Link>
            <Footer.Link href="/">TRENDS</Footer.Link>
            </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/dhanavignesh610"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link onClick={() => {}}>Facebook</Footer.Link>
                <Footer.Link onClick={() => {}}>Instagram</Footer.Link>
                <Footer.Link onClick={() => {}}>Twitter</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link onClick={() => {}}>Privacy Policy</Footer.Link>
                <Footer.Link onClick={() => {}}>
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            onClick={() => {}}
            by="Techbytes"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon
              href="https://github.com/dhanavignesh610"
              icon={BsGithub}
            />
            <Footer.Icon onClick={() => {}} icon={BsFacebook} />
            <Footer.Icon onClick={() => {}} icon={BsInstagram} />
            <Footer.Icon onClick={() => {}} icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
