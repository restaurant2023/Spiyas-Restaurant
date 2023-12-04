import React from 'react';
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="flex justify-between items-center py-2 mx-10">
        <div className="flex-1  tracking-wider text-left">
          <p>Toronto, Ontario</p>
          <p>+123 456 7890</p>
          <p>Mon-Fri: 9AM - 5PM</p>
        </div>

        <div className="flex-1 text-center">
          <a
            href="https://www.google.com/maps/place/164+Eglinton+Ave+E,+Toronto,+ON+M4P+1A6/@43.7079784,-79.3959832,17z/data=!3m1!4b1!4m6!3m5!1s0x882b33253c6d7e83:0x6eb563f38bdd57ad!8m2!3d43.7079784!4d-79.3934083!16s%2Fg%2F11bz_0wc23?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white flex items-center justify-center"
          >
            <FaMapMarkerAlt size={30} color="white" />
            <span className="ml-2">Hey, we are here!</span>
          </a>
        </div>

        <div className="flex-1 ">
          <div className="flex space-x-4 justify-end">
            <FaInstagram className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaFacebookF className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="text-center border-t border-gray-700 mt-4 pt-2">
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
