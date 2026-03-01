"use client";

import { useRouter } from "@bprogress/next/app";
import { BaseHandlerAction } from "@common";

import { Breadcrumb, ClientRoutes, getDetailRoute, Skeleton, useGetBreadcrumbs } from "@/shared";
import type { TLoginSession } from "@/shared/types";

type MainBreadcrumbProps = {
  folderId?: string;
  loginSession: TLoginSession;
};

export const MainBreadcrumb = ({ folderId, loginSession }: MainBreadcrumbProps) => {
  const router = useRouter();

  const { data, isLoading } = useGetBreadcrumbs({
    input: {
      action: BaseHandlerAction.GET_BREADCRUMBS,
      email: loginSession.email,
      sessionToken: loginSession.sessionToken,
      folderId,
    },
  });

  const breadcrumbs = (data?.breadcrumbs ?? []).map((breadcrumb, index) => ({
    id: breadcrumb.id,
    name: breadcrumb.name,
    active: index === (data?.breadcrumbs ?? []).length - 1,
  }));

  const handleNavigateToFolder = (folderId: string) => {
    router.push(getDetailRoute(ClientRoutes.Folder, folderId));
  };

  if (isLoading) {
    return <Skeleton className="h-6 w-80" />;
  }

  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb) => (
        <Breadcrumb.Item
          key={breadcrumb.id}
          onClick={() => handleNavigateToFolder(breadcrumb.id)}
          active={breadcrumb.active}
          className="px-0"
        >
          {breadcrumb.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
