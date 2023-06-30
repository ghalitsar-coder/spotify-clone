"use client";
import { BasicModal } from "@/components/Modal/BasicModal";
import { SIGN_IN } from "@/constants";
import useAuthModal from "@/utils/hooks/useAuthModal";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";


const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen, onOpen, authType } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
``
  return (
    <>
      <BasicModal title={authType} isOpen={isOpen} onChange={onChange}>
        <Auth
          theme="dark"
          magicLink
          view={authType === SIGN_IN ? "sign_in" : "sign_up"}
          providers={["github"]}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  brandAccent: "#22c55e",
                },
              },
            },
          }}
        />
      </BasicModal>
    </>
  );
};

export default AuthModal;
