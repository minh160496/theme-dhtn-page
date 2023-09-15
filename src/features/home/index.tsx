"use client";

import { Loading } from "@/components/Loading";
import { useDisclosure } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Event = dynamic(() => import("./Event").then((mod) => mod.Event), {
  loading: () => <Loading />,
});

export const Home = ({ posts }: { posts: any[] }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      onOpen();
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Event posts={posts} />;
};
