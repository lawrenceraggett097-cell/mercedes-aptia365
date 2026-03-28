import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center">
      <div>
        <img src="/MERCED.jpg" className="h-8 sm:h-12" alt="" />
      </div>
      <div>
        <img
          src="/logo.png"
          className="w-[120px] sm:w-[150px]"
          alt="Aptia365 Logo"
        />
      </div>
    </header>
  );
}
