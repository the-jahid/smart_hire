// import Link from "next/link"
// import { Mic } from "lucide-react"
// import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
// import { Button } from "@/components/ui/button"

// export default function Header() {
//   return (
//     <header className="bg-white">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <div className="flex items-center gap-2">
//           <Mic className="h-6 w-6 text-primary" />
//           <span className="text-xl font-bold">Ariana</span>
//         </div>
//         <nav className="hidden md:flex items-center gap-8">
//           <Link href="/features" className="text-sm font-medium text-gray-600 hover:text-black">
//             Features
//           </Link>
//           <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-black">
//             Pricing
//           </Link>
//           <Link href="/affiliate" className="text-sm font-medium text-gray-600 hover:text-black">
//             Affiliate
//           </Link>
//           <Link href="/blog" className="text-sm font-medium text-gray-600 hover:text-black">
//             Blog
//           </Link>
//         </nav>
//         <div className="flex items-center gap-4">
//           <SignedOut>
//             <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-black">
//               <SignInButton />
//             </Button>
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//               <SignUpButton />
//             </Button>
//           </SignedOut>
//           <SignedIn>
//             <Link href="/dashboard/chatbot">
//               <Button className="bg-blue-600 hover:bg-blue-700 text-white">Dashboard</Button>
//             </Link>
//             <UserButton />
//           </SignedIn>
//         </div>
//       </div>
//     </header>
//   )
// }


"use client";

import { useState } from "react";
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "../Home/resizable-navbar";

export function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      
            
      {/* Navbar */}
    </div>
  );
}


