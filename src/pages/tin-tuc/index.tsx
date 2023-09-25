"server only";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Posts } from "@/features/posts";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const { query } = context;
    const page = query?.page || "1";

    const api_url = process.env.API_URL || "";

    //get all categories
    const resCats = await fetch(`${api_url}/categories`, {
      next: { revalidate: 1800 },
    });
    const cats: any[] = (await resCats.json()) || [];
    const newCat = cats?.find((cat) => cat.name === "Tin Tức");
    const idNew = newCat?.id;
    const notifiCat = cats?.find((cat) => cat.name === "Thông báo");
    const idNotifi = notifiCat?.id;

    //get posts category==='tin-tuc'
    const resNews = await fetch(
      `${api_url}/posts?_embed&per_page=10&status=publish&page=${page}&categories=${idNew}`,
      {
        next: { revalidate: 1800 },
      }
    );
    const totalNews = resNews.headers.get("X-WP-Total");
    const news: any[] = (await resNews?.json()) || [];
    const newsWithFeaturedImages: any[] =
      news?.length > 0
        ? news?.map((post: any) => {
            const featured_image =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return {
              ...post,
              featured_image,
            };
          })
        : [];

    //get posts category==='thong-bao'
    const resNotifis = await fetch(
      `${api_url}/posts?_embed&per_page=10&status=publish&page=${page}&categories=${idNotifi}`,
      {
        next: { revalidate: 1800 },
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
        news: newsWithFeaturedImages || [],
        notifis: motifisWithFeaturedImages || [],
        totalNews: totalNews || "0",
        totalNotifis: totalNotifis || "0",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        news: [],
        notifis: [],
        totalNews: "0",
        totalNotifis: "0",
      },
    };
  }
};

interface IPostspage {
  news: any[];
  notifis: any[];
  totalNews: string;
  totalNotifis: string;
}

const Page = (props: IPostspage) => {
  const { news, notifis, totalNews, totalNotifis } = props;

  return (
    <>
      <NextSeo
        title="Tin tức và thông báo tuyển sinh - Đại học Thái Nguyên"
        description="Đại học Thái Nguyên tuyển sinh năm 2023 - tổng hợp các tin tức tuyển sinh mới nhất của Đại học Thái Nguyên"
      />
      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <Posts
          news={news}
          totalNews={totalNews}
          notifis={notifis}
          totalNotifis={totalNotifis}
          title="Tin tức và thông báo"
        />
      </ErrorBoundary>
    </>
  );
};

export default Page;
