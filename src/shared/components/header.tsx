import Image from "next/image";

export const Header = () => {
  return (
    <div className="py-xl px-2xl flex items-center justify-center">
      <Image src={"/images/ktancpa-logo.png"} alt="Reviva" width={100} height={28} priority />
    </div>
  );
};
