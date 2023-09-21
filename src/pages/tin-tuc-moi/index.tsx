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
      next: { revalidate: 5 },
    });
    const cats: any[] = (await resCats.json()) || [];
    const newCat = cats?.find((cat) => cat.name === "tin-tuc");
    const idNew = newCat?.id;
    const notifiCat = cats?.find((cat) => cat.name === "thong-bao");
    const idNotifi = notifiCat?.id;

    //get posts category==='tin-tuc'
    const resNews = await fetch(
      `${api_url}/posts?_embed&per_page=9&status=publish&page=${1}&categories=${idNew}`,
      {
        next: { revalidate: 5 },
      }
    );
    const totalNews = resNews.headers.get("X-WP-Total");
    const news: any[] = (await resNews?.json()) || [];
    const newsWithFeaturedImages: any[] = news?.map((post: any) => {
      const featured_image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      return {
        ...post,
        featured_image,
      };
    });

    return {
      props: {
        news: newsWithFeaturedImages || [],
        totalNews: totalNews || "0",
      },
      revalidate: 5,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        news: [],
        totalNews: "0",
      },
    };
  }
};

interface IPostspage {
  news: any[];
  totalNews: string;
}

const Page = (props: IPostspage) => {
  const { news } = props;

  return (
    <>
      <NextSeo
        title="Tin tức tuyển sinh mới nhất - Đại học Thái Nguyên"
        description="Đại học Thái Nguyên tuyển sinh năm 2023 - tổng hợp các tin tức tuyển sinh mới nhất của Đại học Thái Nguyên"
      />
      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <LatestPost posts={news} />
      </ErrorBoundary>
    </>
  );
};

export default Page;
