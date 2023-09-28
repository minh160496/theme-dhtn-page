"server only";

import ErrorBoundary from "@/components/ErrorBoundary";
import { LatestPost } from "@/features/latestPost";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";

export const getStaticProps: GetStaticProps = async () => {
  try {
    const api_url = process.env.API_URL || "";

    //get all categories
    const resCats = await fetch(`${api_url}/categories`, {
      next: { revalidate: 1 },
    });
    const cats: any[] = (await resCats.json()) || [];
    const notifiCat = cats?.find((cat) => cat.name === "Thông báo");
    const idNotifi = notifiCat?.id;

    //get posts category==='thong-bao'
    const resNotifis = await fetch(
      `${api_url}/posts?_embed&per_page=9&status=publish&page=${1}&categories=${idNotifi}`,
      {
        next: { revalidate: 1 },
      }
    );
    const totalNotifis = resNotifis.headers.get("X-WP-Total");
    const notifis: any[] = (await resNotifis?.json()) || [];
    const motifisWithFeaturedImages: any[] =
      notifis?.length > 0
        ? notifis?.map((notifi: any) => {
            const featured_image =
              notifi._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return {
              ...notifi,
              featured_image,
            };
          })
        : [];

    return {
      props: {
        notifis: motifisWithFeaturedImages || [],
        totalNotifis: totalNotifis || "0",
      },
      revalidate: 5,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        notifis: [],
        totalNotifis: "0",
      },
    };
  }
};

interface IPostspage {
  notifis: any[];
  totalNotifis: string;
}

const Page = (props: IPostspage) => {
  const { notifis } = props;

  return (
    <>
      <NextSeo
        title="Thông báo tuyển tuyển sinh mới nhất - Đại học Thái Nguyên"
        description="Đại học Thái Nguyên tuyển sinh năm 2023 - tổng hợp các tin tức tuyển sinh mới nhất của Đại học Thái Nguyên"
      />
      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <LatestPost posts={notifis} />
      </ErrorBoundary>
    </>
  );
};

export default Page;
