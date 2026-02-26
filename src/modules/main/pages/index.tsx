import { Header, Separator } from "@/shared";

import { MainContent } from "../components";

export const MainPage = () => {
  return (
    <div className="flex h-screen grow flex-col">
      <Header />
      <Separator />
      <MainContent />
    </div>
  );
};
