import { useState, useEffect, useCallback } from "react";

const ShareButton = () => {
  const [isIOS, setIsIOS] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent || "";
      setIsIOS(
        /iPad|iPhone|iPod/.test(ua) || navigator.platform === "MacIntel"
      );
      setCanShare(typeof window.navigator.share === "function");
    }
  }, []);

  const shareData = {
    title: "Museum of Her",
    text: `TW: SA, SH
Hello! I found a website that I thought you'd appreciate - 'Museum of Her'
It's a place where women in India can anonymously share their stories of sexual assault and harrassment.
It's like a wall - makes you feel a quiet solidarity. You can share yourself, or you can just read the experiences of others..

Check it out here: https://museum-of-her.pages.dev`,
    url: "https://museum-of-her.pages.dev",
  };

  const handleShare = useCallback(() => {
    navigator.share?.(shareData).catch((err) => {
      console.error("Error sharing", err);
    });
  }, []);

  if (!canShare) return null;

  return (
    <button className="btn" onClick={handleShare}>
      {isIOS ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#000"
        >
          <path d="M252.31-60Q222-60 201-81q-21-21-21-51.31v-415.38Q180-578 201-599q21-21 51.31-21h102.3v60h-102.3q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v415.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-415.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85h-102.3v-60h102.3Q738-620 759-599q21 21 21 51.31v415.38Q780-102 759-81q-21 21-51.31 21H252.31ZM450-330v-441.23l-74 74L333.85-740 480-886.15 626.15-740 584-697.23l-74-74V-330h-60Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#000"
        >
          <path d="M672.22-100q-44.91 0-76.26-31.41-31.34-31.41-31.34-76.28 0-6 4.15-29.16L284.31-404.31q-14.46 15-34.36 23.5t-42.64 8.5q-44.71 0-76.01-31.54Q100-435.39 100-480q0-44.61 31.3-76.15 31.3-31.54 76.01-31.54 22.74 0 42.64 8.5 19.9 8.5 34.36 23.5l284.46-167.08q-2.38-7.38-3.27-14.46-.88-7.08-.88-15.08 0-44.87 31.43-76.28Q627.49-860 672.4-860t76.25 31.44Q780-797.13 780-752.22q0 44.91-31.41 76.26-31.41 31.34-76.28 31.34-22.85 0-42.5-8.69Q610.15-662 595.69-677L311.23-509.54q2.38 7.39 3.27 14.46.88 7.08.88 15.08t-.88 15.08q-.89 7.07-3.27 14.46L595.69-283q14.46-15 34.12-23.69 19.65-8.69 42.5-8.69 44.87 0 76.28 31.43Q780-252.51 780-207.6t-31.44 76.25Q717.13-100 672.22-100Z" />
        </svg>
      )}
    </button>
  );
};

export default ShareButton;
