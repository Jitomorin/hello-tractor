// import Avatar from "components/AuthorAvatar";
// import CoverImage from "components/CoverImage";
// import Date from "components/PostDate";
// import type { Post } from "@/sanity/lib/queries";
// import Link from "next/link";

// export default function PostPreview({
//   title,
//   coverImage,
//   date,
//   excerpt,
//   author,
//   slug,
//   categories,
// }: Omit<Post, "_id">) {
//   return (
//     <div>
//       <div className="mb-5">
//         <CoverImage
//           slug={slug}
//           title={title!}
//           image={coverImage}
//           priority={false}
//         />
//       </div>
//       <h3 className="mb-3 text-3xl font-bold leading-snug">
//         <Link href={`/posts/${slug}`} className="hover:underline">
//           {title}
//         </Link>
//       </h3>
//       <div className="mb-4 text-lg flex flex-col">
//         <Date dateString={date!} />
//         <div className="flex">
//           {categories.map((category) => (
//             <Link
//               href={`/posts/category/${category.slug?.current}`}
//               key={category.slug?.current}
//               className="hover:text-[#f5bb28]"
//             >
//               <p className=" text-xl leading-relaxed mr-2">
//                 {" " + category.title + ","}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </div>
//       {excerpt && <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>}
//       {author && <Avatar name={author.name} picture={author.picture} />}
//     </div>
//   );
// }
