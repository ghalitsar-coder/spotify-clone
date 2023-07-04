"use client";

import { Box } from "@/components";
import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box className="h-full flex items-center justify-center ">
      <ScaleLoader color="#22c55e" height={40} width={40} />
    </Box>
  );
};

export default Loading;
