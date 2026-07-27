"use client";

import React, { memo } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaBehance,
  FaDribbble,
  FaTwitter,
  FaMedium,
  FaStackOverflow,
  FaYoutube,
} from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";

const SocialIcon = memo(function SocialIcon({ platform = "", url = "", className = "text-current" }) {
  const query = (platform || url || "").toLowerCase();

  if (query.includes("github")) return <FaGithub className={className} />;
  if (query.includes("linkedin")) return <FaLinkedin className={className} />;
  if (query.includes("behance")) return <FaBehance className={className} />;
  if (query.includes("dribbble")) return <FaDribbble className={className} />;
  if (query.includes("twitter") || query.includes("x.com")) return <FaTwitter className={className} />;
  if (query.includes("medium")) return <FaMedium className={className} />;
  if (query.includes("stackoverflow") || query.includes("stack overflow"))
    return <FaStackOverflow className={className} />;
  if (query.includes("youtube")) return <FaYoutube className={className} />;

  return <FiGlobe className={className} />;
});

export default SocialIcon;
