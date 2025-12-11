import { Link } from 'react-router'
import { FaBox } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Asset Sync Logo" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold text-gradient">
            Asset Sync
          </span>
        </Link>
    );
};

export default Logo;