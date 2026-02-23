import { redirect } from "next/navigation";

import { ClientRoutes } from "@/shared";

export default function Page() {
  redirect(ClientRoutes.Login);
}
