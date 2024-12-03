// import Avatar from "components/AuthorAvatar";
// import CoverImage from "components/CoverImage";
// import Date from "components/PostDate";
// import PostTitle from "components/PostTitle";
// import type { Post } from "@/sanity/lib/queries";
// import Link from "next/link";
// import styled from "styled-components";
// import { media } from "@/utils/media";

// export default function PostHeader(
//   props: Pick<
//     Post,
//     "title" | "coverImage" | "date" | "author" | "slug" | "categories"
//   >
// ) {
//   const { title, coverImage, date, author, slug, categories } = props;
//   return (
//     <Wrapper>
//       <PostTitle>{title}</PostTitle>
//       <div className="hidden md:mb-12 md:block">
//         {author && <Avatar name={author.name} picture={author.picture} />}
//       </div>
//       <div className="hidden md:mb-2 md:block text-lg">
//         <Date dateString={date!} />
//       </div>
//       <div className="md:flex hidden md:mb-12">
//         {categories.map((category) => (
//           <Link
//             href={`/posts/category/${category.slug?.current}`}
//             key={category.slug?.current}
//             className="hover:text-[#f5bb28]"
//           >
//             <p className=" text-xl leading-relaxed mr-2">
//               {" " + category.title + ","}
//             </p>
//           </Link>
//         ))}
//       </div>
//       <div className="mb-8 sm:mx-0 md:mb-16 rounded-lg">
//         <CoverImage title={title!} image={coverImage} priority slug={slug} />
//       </div>
//       <div className=" max-w-2xl">
//         <div className="mb-6 block md:hidden">
//           {author && <Avatar name={author.name} picture={author.picture} />}
//         </div>
//         <div className="mb-6 block md:hidden">
//           <Date dateString={date!} />
//         </div>
//         <div className="flex md:hidden">
//           {categories.map((category) => (
//             <Link
//               href={`/posts/category/${category.slug?.current}`}
//               key={category.slug?.current}
//               className="hover:text-[#f5bb28]"
//             >
//               <p className=" text-lg leading-relaxed mr-2">
//                 {" " + category.title + ","}
//               </p>
//             </Link>
//           ))}
//         </div>
//         {/* <div className="mb-6 text-lg">
//           <Date dateString={date} />
//         </div> */}
//       </div>
//     </Wrapper>
//   );
// }

// const Wrapper = styled.div`
//   margin: 0 18rem;
//   ${media("<=largeDesktop")} {
//     margin: 0 5rem;
//   }
//   ${media("<tablet")} {
//     margin: 0 0;
//   }
// `;
