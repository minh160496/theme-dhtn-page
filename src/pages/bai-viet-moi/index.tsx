"server only";

import ErrorBoundary from "@/components/ErrorBoundary";
import { LatestPost } from "@/features/latestPost";
import { NextSeo } from "next-seo";

export const getServerSideProps = async (context: any) => {
  try {
    const { query } = context;
    const page = query?.page || "1";

    const api_url = process.env.API_URL || "";
    const res = await fetch(
      `${api_url}/posts?_embed&per_page=10&status=publish&page=${page}`,
      {
        next: { revalidate: 5 },
      }
    );
    const errorCode = res.ok ? false : res.status;

    const totalPosts = res.headers.get("X-WP-Total");
    const posts = await res?.json();

    const postsWithFeaturedImages: any[] = posts?.map((post: any) => {
      const featured_image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

      return {
        ...post,
        featured_image,
      };
    });

    return {
      props: {
        errorCode: errorCode || null,
        posts: postsWithFeaturedImages || [],
        totalPosts: totalPosts || 0,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

interface IPostspage {
  errorCode: number | boolean;
  posts: any[];
  totalPosts: string | null;
}

const Page = (props: IPostspage) => {
  const { posts } = props;

  return (
    <>
      <NextSeo
        title="Tin tức tuyển sinh - Đại học Thái Nguyên"
        description="Đại học Thái Nguyên tuyển sinh năm 2023 - tổng hợp các tin tức tuyển sinh mới nhất của Đại học Thái Nguyên"
      />
      <ErrorBoundary fallback={<h1>Lỗi server</h1>}>
        <LatestPost posts={posts} />
      </ErrorBoundary>
    </>
  );
};

export default Page;
