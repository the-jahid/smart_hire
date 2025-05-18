"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation";

export default function UserProfileForm() {
  const [jobTitle, setJobTitle] = useState("")
  const [industry, setIndustry] = useState("")
  const [website, setWebsite] = useState("")
  const [products, setProducts] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [profileData, setProfileData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!jobTitle.trim()) newErrors.jobTitle = "Job title is required"
    if (!industry.trim()) newErrors.industry = "Industry is required"
    if (!website.trim()) newErrors.website = "Website is required"
    else if (!/^https?:\/\/.+/.test(website)) newErrors.website = "Website must start with http:// or https://"
    if (!products.trim()) newErrors.products = "Products are required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const userProfile = {
      jobTitle,
      industry,
      website,
      products: products.split(",").map((p) => p.trim()),
    }

    localStorage.setItem("userProfile", JSON.stringify(userProfile))
    

    setIsSubmitted(true)
    // setProfileData(userProfile);

    // setTimeout(() => {
    //   router.push('/');
    // }, 1000);

    // Reset form after submission
    setTimeout(() => {
      setJobTitle("")
      setIndustry("")
      setWebsite("")
      setProducts("")
      setIsSubmitted(false)
    }, 3000)

    window.location.reload()
    router.push('/');
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-4 flex-col">
      

      {profileData ? (
        <div className="text-white text-center mt-4">
          Ai voice conversation
        </div>
      ) : (
        <div className="w-full max-w-xl rounded-xl border border-gray-800 bg-gray-950/80 backdrop-blur-sm shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-center text-white mb-1">Professional Profile</h2>
          <p className="text-white/80 text-center text-sm">Complete your profile to personalize your experience</p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-white">
                Job Title
              </label>
              <input
                id="jobTitle"
                type="text"
                placeholder="e.g. Senior Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={`w-full bg-gray-900/70 text-white border ${
                  errors.jobTitle ? "border-red-600" : "border-gray-800"
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500`}
              />
              {errors.jobTitle && <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="industry" className="block text-sm font-medium text-white">
                Industry
              </label>
              <input
                id="industry"
                type="text"
                placeholder="e.g. Technology"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={`w-full bg-gray-900/70 text-white border ${
                  errors.industry ? "border-red-600" : "border-gray-800"
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500`}
              />
              {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-medium text-white">
                Website
              </label>
              <input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={`w-full bg-gray-900/70 text-white border ${
                  errors.website ? "border-red-600" : "border-gray-800"
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500`}
              />
              {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="products" className="block text-sm font-medium text-white">
                Products Offered
              </label>
              <textarea
                id="products"
                placeholder="e.g. Web Development, Mobile Apps, UI/UX Design"
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                className={`w-full bg-gray-900/70 text-white border ${
                  errors.products ? "border-red-600" : "border-gray-800"
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500 min-h-[100px] resize-none`}
              />
              <p className="text-xs text-white/70">Separate multiple products with commas</p>
              {errors.products && <p className="text-red-500 text-xs mt-1">{errors.products}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 mt-6 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="border-t border-gray-800 bg-gray-900/50 py-4 px-6 flex items-center justify-center gap-2 animate-[fadeIn_0.3s_ease-out]">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <span className="text-white font-medium">Profile saved successfully!</span>
          </div>
        )}
      </div>
      )}

     {
      profileData &&  <div className="flex justify-center bg-amber-300 w-10/12 "
      dangerouslySetInnerHTML={{
        __html:
          '<elevenlabs-convai agent-id="2LYD5Ox33ApwHwKhskUX"></elevenlabs-convai>',
      }}
    />
     }
    </div>
  )
}











