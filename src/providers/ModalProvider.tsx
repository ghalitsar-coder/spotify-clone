"use client";
import { AuthModal, UploadModal } from "@/components";
import SubscribeModal from "@/components/Subscribe";
import { ProductWithPrice } from "@/types/stripe";
import React, { useEffect, useState } from "react";

interface IModalProvider {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<IModalProvider> = ({ products }) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UploadModal />
      <AuthModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
