"use client";

import { Loading } from "@/components/Loading";
import dynamic from "next/dynamic";
import { NextSeo } from "next-seo";

const LichKg = dynamic(
  () => import("@/features/lich-khai-giang").then((mod) => mod.LichKg),
  {
    loading: () => <Loading />,
  }
);

const Page = () => {
  return (
    <>
      <NextSeo
        title="Lịch khải Giảng - Đại học Thái Nguyên"
        description="Lịch khải giảng hệ đào tạo từ xa trường Đại học Thái nguyên - hệ đại học từ xa"
      />
      <LichKg />
    </>
  );
};

export default Page;
