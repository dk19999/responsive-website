"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React, { ComponentType } from "react";

const withAuth = (WrappedComponent: ComponentType) => {
  const AuthenticatedComponent: React.FC = (props) => {
    const router = useRouter();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!token) {
        router.replace("/login");
      }
    }, [router, token]);

    return token ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
