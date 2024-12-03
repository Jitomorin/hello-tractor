import { media } from "@/utils/media";
import Layout from "components/BlogLayout";
import MoreBlogs from "components/MoreBlogs";
import PostBody from "components/PostBody";
import PostHeader from "components/PostHeader";
import PostPageHead from "components/PostPageHead";
import PostTitle from "components/PostTitle";
import SectionSeparator from "components/SectionSeparator";
import * as demo from "lib/demo.data";
import type { Category, Post, Settings } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import styled from "styled-components";
import CategorySidebar from "./CategorySidebar";
import Link from "next/link";
import { BackIcon } from "./BackIcon";
import { useEffect, useState } from "react";

export interface PostPageProps {
  preview?: boolean;
  loading?: boolean;
  post: Post;
  categories: Category[];
  morePosts: Post[];
  settings?: Settings;
}

const NO_POSTS: Post[] = [];

const Wrapper = styled.div`
  margin: 5rem 0;
  display: flex;
  flex-direction: column;
  ${media("<largeDesktop")} {
    max-width: 90%;
  }
  ${media("<tablet")} {
    max-width: 100%;
    align-items: center;
    justify-content: center;
  }
  ${media("<=tablet")} {
    margin: 0rem 0;
  }
`;

export default function PostPage(props: PostPageProps) {
  const { preview, loading, morePosts = NO_POSTS, post, settings } = props;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add event listener to check screen width on mount and resize
    function handleResize() {
      setIsMobile(window.innerWidth <= 1024); // Adjust the breakpoint as needed
    }

    handleResize(); // Call the function initially

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const slug = post?.slug;
  if (!slug && !preview) {
    notFound();
  }

  return (
    <>
      <PostPageHead settings={settings} post={post} />

      <Layout preview={preview} loading={loading}>
        <div className="flex mx-auto px-0 md:px-0">
          {/* <BlogHeader title={title} level={2} /> */}
          {preview && !post ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <Wrapper className="mx-auto">
              <BackLink href="/posts" className="hover:text-[#f3bb2a] mr-auto">
                <BackIcon
                  width={isMobile ? 30 : 50}
                  height={isMobile ? 30 : 50}
                />
              </BackLink>
              <ArticleWrapper className="">
                <PostContainer>
                  <PostHeader
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                    categories={post.categories}
                  />
                  <PostBody content={post.content} />
                </PostContainer>

                <CategorySidebar categories={props.categories} />
              </ArticleWrapper>
              <SectionSeparator />
              {morePosts?.length > 0 && <MoreBlogs posts={morePosts} />}
            </Wrapper>
          )}
        </div>
      </Layout>
    </>
  );
}

const ArticleWrapper = styled.article`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  ${media("<tablet")} {
    flex-direction: column;
    /* margin-left: 5rem; */
  }
`;
const PostContainer = styled.div`
  display: flex;
  border: 2px solid rgb(var(--border));
  flex-direction: column;
  /* align-items: flex-start; */

  ${media("<=tablet")} {
    justify-content: center;
    align-items: center;
  }
`;
const BackLink = styled(Link)`
  padding: 0 18rem;
  ${media("<=largeDesktop")} {
    padding: 0 5rem;
  }
  ${media("<tablet")} {
    padding: 0 0;
  }
`;
