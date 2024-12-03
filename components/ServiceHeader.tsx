import CoverImage from "components/CoverImage";
import Date from "components/PostDate";
import PostTitle from "components/PostTitle";
import type { Post } from "@/sanity/lib/queries";
import styled from "styled-components";
import { media } from "@/utils/media";

export default function ServiceHeader(
  props: Pick<Post, "title" | "coverImage" | "slug">
) {
  const { title, coverImage, slug } = props;
  return (
    <Wrapper>
      <div className="mb-8 sm:mx-0 md:mb-16 h-auto">
        <CoverImage title={title!} image={coverImage} priority slug={slug} />
      </div>
      <h1 className="mb-12 text-center text-5xl font-bold leading-tight tracking-tighter md:text-left md:text-6xl md:leading-none lg:text-7xl">
        {title}
      </h1>
      {/* <div className="hidden md:mb-12 md:block">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="hidden md:mb-12 md:block text-lg">
        <Date dateString={date} />
      </div> */}

      {/* <div className=" max-w-2xl">
        <div className="mb-6 block md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className="mb-6 block md:hidden">
          <Date dateString={date} />
        </div>
       
      </div> */}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 0 18rem;
  ${media("<=largeDesktop")} {
    margin: 0 5rem;
  }
  ${media("<tablet")} {
    margin: 0 0;
  }
`;
