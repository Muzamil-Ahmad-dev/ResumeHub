import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

/**
 * Global Footer Component
 * - Provides company branding, quick navigation links, and social media presence.
 * - Built with Tailwind CSS and optimized for accessibility and maintainability.
 */
export default function Footer() {
  return (
    <footer className="bg-black/95 backdrop-blur-md text-gray-200 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* -------------------------------------------------------------------------- */}
        {/* About Section: Branding and short description */}
        {/* -------------------------------------------------------------------------- */}
        <div className="space-y-4">
          {/* Brand Logo + Name */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              R
            </div>
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              ResumeHub
            </Link>
          </div>

          {/* Short brand description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Build your professional resume in minutes. Choose templates, customize your style, and export easily.
          </p>
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* Quick Links Section: Core navigation routes */}
        {/* -------------------------------------------------------------------------- */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Quick Links
          </h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            {[
              { name: "Home", href: "/" },
              { name: "Templates", href: "/templates" },
              { name: "About", href: "/about" },
              { name: "Login", href: "/login" },
              { name: "Register", href: "/register" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-purple-400 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* Social Media Section: External social links */}
        {/* -------------------------------------------------------------------------- */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Follow Us
          </h3>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4">
            {[
              { icon: FaFacebookF, href: "#", label: "Facebook" },
              { icon: FaTwitter, href: "#", label: "Twitter" },
              { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              { icon: FaGithub, href: "#", label: "GitHub" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label} // Improves accessibility for screen readers
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-purple-500/20 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* Footer Bottom: Copyright Notice */}
      {/* -------------------------------------------------------------------------- */}
      <div className="border-t border-white/10 mt-8 pt-6 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} ResumeHub. Built by Muzamil Ahmad. All rights reserved.
      </div>
    </footer>
  );
}
