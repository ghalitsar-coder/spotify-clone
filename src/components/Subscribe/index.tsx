"use client";

import React, { use, useState } from "react";
import { BasicModal } from "../Modal/BasicModal";
import Button from "../Button";
import { Price, ProductWithPrice } from "@/types/stripe";
import { useUser } from "@/utils/hooks/useUser";
import { toast } from "react-hot-toast";
import { postData } from "@/lib/helpers";
import { getStripe } from "@/lib/stripeClient";
import useSubscribeModal from "@/utils/hooks/useSubscribeModal";

interface ISubscribeModal {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);
  return priceString;
};

const SubscribeModal: React.FC<ISubscribeModal> = ({ products }) => {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const { user, isLoading, subscription } = useUser();
  const { isOpen, onClose } = useSubscribeModal();

  const onChange = (open: boolean) => {
    if (!open && !priceIdLoading) {
      onClose();
    }
    
  };

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);
    if (!user) {
      setPriceIdLoading(undefined);
      return toast.error("Must be logged in");
    }

    if (subscription) {
      setPriceIdLoading(undefined);
      return toast.success("Already subscribed");
    }
    try {
      const { sessionId } = await postData({
        url: "/api/create-checkout-session",
        data: { price },
      });

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      toast.error((err as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  let content = <div className="text-center">No Products available.</div>;
  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}> No Prices available </div>;
          }
          return product.prices?.map((price) => (
            <Button
              key={price.id}
              onClick={() => {
                handleCheckout(price);
              }}
              disabled={isLoading || price.id === priceIdLoading}
            >
              Subscibe for {formatPrice(price)} a {price.interval}
            </Button>
          ));
        })}
      </div>
    );
  }

  if (subscription) {
    content = <div className="text-center">Already Subscribed</div>;
  }

  return (
    <BasicModal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={isOpen}
      onChange={onChange}
    >
      {content}
    </BasicModal>
  );
};

export default SubscribeModal;
