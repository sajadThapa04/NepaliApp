import Link from 'next/link';
import { 
  HiHome, 
  HiInformationCircle, 
  HiMail, 
  HiPhone,
  HiHeart 
} from 'react-icons/hi';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaFlag,
  FaMusic,
  FaBook
} from 'react-icons/fa';
import { GiMusicalNotes, GiScrollUnfurled } from 'react-icons/gi';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaFlag className="text-2xl text-red-500" />
              Nepali Cultural Hub
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Preserving and sharing Nepali culture through songs, proverbs, and traditions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <HiHome className="text-sm" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/songs" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <GiMusicalNotes className="text-sm" />
                  Nepali Songs
                </Link>
              </li>
              <li>
                <Link href="/ukhan" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <GiScrollUnfurled className="text-sm" />
                  Ukhan Tukka
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition flex items-center gap-2">
                  <HiInformationCircle className="text-sm" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Song Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/songs?category=pop" className="text-gray-400 hover:text-white transition">
                  Pop Songs
                </Link>
              </li>
              <li>
                <Link href="/songs?category=folk" className="text-gray-400 hover:text-white transition">
                  Folk Songs
                </Link>
              </li>
              <li>
                <Link href="/songs?category=patriotic" className="text-gray-400 hover:text-white transition">
                  Patriotic Songs
                </Link>
              </li>
              <li>
                <Link href="/songs?category=modern" className="text-gray-400 hover:text-white transition">
                  Modern Hits
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl">
                <FaYoutube />
              </a>
            </div>
            <div className="text-gray-400 text-sm space-y-2">
              <p className="flex items-center gap-2">
                <HiMail className="text-lg" />
                contact@nepaliculturalhub.com
              </p>
              <p className="flex items-center gap-2">
                <HiPhone className="text-lg" />
                +977-XXXXXXXXX
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Nepali Cultural Hub. All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Made with <HiHeart className="text-red-500 animate-pulse" /> for Nepali culture and heritage
          </p>
        </div>
      </div>
    </footer>
  );
};