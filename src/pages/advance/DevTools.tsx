// import React, { useEffect, useState } from "react";

// const DevToolsBlocker: React.FC = () => {
//   const [timeLeft, setTimeLeft] = useState(4); // Developer Tools ochiq qolishi mumkin bo'lgan vaqt
//   const [isBlocked, setIsBlocked] = useState(false);
//   const [devToolsOpen, setDevToolsOpen] = useState(false);
//   const [responsiveCheckActive, setResponsiveCheckActive] = useState(false);

//   useEffect(() => {
//     const checkDevTools = () => {
//       const widthThreshold = window.outerWidth - window.innerWidth > 100;
//       const heightThreshold = window.outerHeight - window.innerHeight > 100;
//       const isResponsiveCheck = document.documentElement.clientWidth < 1024 && document.documentElement.clientHeight < 768; // Responsivlikni tekshirish uchun sharoit

//       const responsiveToggleButton = document.querySelector(
//         '[data-testid="responsive-toggle"]'
//       ) as HTMLElement | null;

//       const isResponsiveToggleActive =
//         responsiveToggleButton &&
//         responsiveToggleButton.getAttribute("aria-pressed") === "true";

//       if (responsiveToggleButton && isResponsiveToggleActive) {
//         // Agar responsivlik rejimi aktiv bo'lsa, uni o'chirish
//         responsiveToggleButton.setAttribute("aria-pressed", "false");
//         console.log("Responsivlik rejimi avtomatik ravishda o'chirildi.");
//       }

//       if (isResponsiveCheck || isResponsiveToggleActive) {
//         setResponsiveCheckActive(true);
//         setDevToolsOpen(true); // Responsivlik rejimida ham vaqt cheklovi ishlaydi
//       } else {
//         setResponsiveCheckActive(false);
//         if (widthThreshold || heightThreshold) {
//           setDevToolsOpen(true);
//         } else {
//           setDevToolsOpen(false);
//           setTimeLeft(10); // Developer Tools yopilganda vaqtni tiklash
//         }
//       }
//     };

//     const interval = setInterval(() => {
//       checkDevTools();
//       if (devToolsOpen) {
//         setTimeLeft((prev) => Math.max(prev - 1, 0));
//       }
//     }, 1000);

//     if (timeLeft <= 0) {
//       setIsBlocked(true);
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [devToolsOpen, responsiveCheckActive, timeLeft]);

//   useEffect(() => {
//     if (isBlocked) {
//       alert("Siz 10 soniyadan ortiq Developer Tools ochiq holda qoldirdingiz. Siz 1 soatga bloklandingiz.");
//       // Bloklashni amalga oshirish (masalan, foydalanuvchini boshqa sahifaga yo'naltirish yoki API chaqiruv)
//       window.location.href = "/detect"; // Misol uchun, bloklangan sahifaga yo'naltirish
//     }
//   }, [isBlocked]);

//   return (
//     <div style={{ textAlign: "center", paddingTop: "120px", color: "white" }}>
//       <h1>WORKOUT</h1>
//       <p>Sahifa ishlamoqda...</p>
//       {responsiveCheckActive ? (
//         <p>Responsivlikni tekshirish rejimi faol. Developer Tools ochiq deb hisoblanadi, {timeLeft} soniya ichida yopishingiz kerak.</p>
//       ) : devToolsOpen && !isBlocked ? (
//         <p>Developer Tools ochiq, {timeLeft} soniya ichida yopishingiz kerak.</p>
//       ) : (
//         <p>Developer Tools yopiq holatda.</p>
//       )}
//     </div>
//   );
// };

// export default DevToolsBlocker;
// import { useBreakRuleState } from "@/components/rules/breakRule";
import { useBreakRuleState } from "@/stores/break-rule";
import { useEffect, useState } from "react";

const DevToolsBlocker: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(1); // Developer Tools ochiq qolishi mumkin bo'lgan vaqt
  const [isBlocked, setIsBlocked] = useState(false);
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  const [responsiveCheckActive, setResponsiveCheckActive] = useState(false);
  const {setBreak} = useBreakRuleState()

  useEffect(() => {
    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 100;
      const heightThreshold = window.outerHeight - window.innerHeight > 100;
      const isResponsiveCheck = document.documentElement.clientWidth < 1024 && document.documentElement.clientHeight < 768; // Responsivlikni tekshirish uchun sharoit

      const responsiveToggleButton = document.querySelector('[data-testid="responsive-toggle"]');
      const isResponsiveToggleActive = responsiveToggleButton && responsiveToggleButton.getAttribute("aria-pressed") === "true";

      if (isResponsiveCheck || isResponsiveToggleActive) {
        setResponsiveCheckActive(true);
        setDevToolsOpen(true); // Responsivlik rejimida ham vaqt cheklovi ishlaydi
      } else {
        setResponsiveCheckActive(false);
        if (widthThreshold || heightThreshold) {
          setDevToolsOpen(true);
        } else {
          setDevToolsOpen(false);
          setTimeLeft(1); // Developer Tools yopilganda vaqtni tiklash
        }
      }
    };

    const interval = setInterval(() => {
      checkDevTools();
      if (devToolsOpen) {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    if (timeLeft <= 0) {
      setIsBlocked(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [devToolsOpen, responsiveCheckActive, timeLeft]);

  useEffect(() => {
    if (isBlocked) {
      window.location.href = "/detect"; // Misol uchun, bloklangan sahifaga yo'naltirish
      alert("Siz 1 soniyadan ortiq Developer Tools ochiq holda qoldirdingiz. Siz 1 soatga bloklandingiz.");
      setBreak("break")
      localStorage.setItem("break-rule", "breaked")
      // Bloklashni amalga oshirish (masalan, foydalanuvchini boshqa sahifaga yo'naltirish yoki API chaqiruv)
    }
  }, [isBlocked]);

  return (
    <div style={{ textAlign: "center", paddingTop: "120px", color: "white" }}>
      <h1>WORKOUT</h1>
      <p>Sahifa ishlamoqda...</p>
      {responsiveCheckActive ? (
        <p>Responsivlikni tekshirish rejimi faol. Developer Tools ochiq deb hisoblanadi, {timeLeft} soniya ichida yopishingiz kerak.</p>
      ) : devToolsOpen && !isBlocked ? (
        <p>Developer Tools ochiq, {timeLeft} soniya ichida yopishingiz kerak.</p>
      ) : (
        <p>Developer Tools yopiq holatda.</p>
      )}
    </div>
  );
};

export default DevToolsBlocker;
