"server only";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Post } from "@/features/post";
import { LayoutPost } from "@/layouts/layoutPost";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

const api_url = process.env.API_URL || "";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const params = context.params;
    const slug = params?.slug || "";
    const res = await fetch(`${api_url}/posts?slug=${slug}`, {
      next: { revalidate: 3 },
    });
    const posts = await res.json();
    const post = posts ? posts[0] : null;
    const categoryId = post?.categories[0] || null; // Giả sử mỗi bài viết chỉ thuộc về một thể loại

    let postsWithFeaturedImages: any[] = [];
    if (categoryId) {
      // Lấy danh sách các bài viết cùng thể loại
      const resRelatedPosts = await fetch(
        `${api_url}/posts?categories=${categoryId}&exclude=${post?.id}&per_page=3&_embed`,
        { next: { revalidate: 3 } }
      );

      const relatedPosts: any[] = await resRelatedPosts.json();

      postsWithFeaturedImages = relatedPosts?.map((relatedPost: any) => {
        const featured_image =
          relatedPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

        return {
          ...relatedPost,
          featured_image,
        };
      });
    }

    return {
      props: { post: post || null, samePosts: postsWithFeaturedImages || [] },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { post: null, samePosts: [] },
    };
  }
};

interface IPostPage {
  post: any;
  samePosts: any[];
}

const Page = (props: IPostPage) => {
  const { post, samePosts } = props;
  return (
    <>
      <NextSeo
        title={
          post?.title?.rendered || "Đại học Thái Nguyên - tuyển sinh hệ từ xa"
        }
        description={
          post?.excerpt?.rendered ||
          "Đại học Thái Nguyên - tuyển sinh hệ từ xa, học tập tiết kiệm thời gian và chi phí bằng cử nhân do Bộ Giáo dục cấp"
        }
      />
      <ErrorBoundary fallback={<h1>Lỗi phía máy chủ</h1>}>
        <Post post={post} relatedPosts={samePosts} />
      </ErrorBoundary>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <LayoutPost>{page}</LayoutPost>;
};

export default Page;
