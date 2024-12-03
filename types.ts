export type SingleNavItem = { title: string; href: string; outlined?: boolean };

export type NavItems = SingleNavItem[];

// export type SingleArticle = {
//   title: string;
//   slug: string;
//   content: string;
//   meta: {
//     title: string;
//     description: string;
//     date: string;
//     tags: string;
//     imageUrl: string;
//   };
// };

type AuthorReference = {
  _ref: string;
  _type: "reference";
};

type Slug = {
  current: string;
  _type: "slug";
};

type ImageAsset = {
  alt: string;
  asset: AuthorReference;
  _type: "image";
};

type Block = {
  _type: "block";
  style: string;
  _key: string;
  markDefs: string[];
  children: {
    _type: "span";
    marks: string[];
    text: string;
    _key: string;
  }[];
};

type ListItem = {
  listItem: string;
  markDefs: string[];
  children: Block[];
  level: number;
  _type: "block";
  style: string;
  _key: string;
};

export type Post = {
  slug: Slug;
  mainImage: ImageAsset;
  publishedAt: string;
  author: AuthorReference;
  _createdAt: string;
  _rev: string;
  _updatedAt: string;
  _type: "post";
  _id: string;
  description: string;
  body: (Block | ListItem)[];
  title: string;
};

// type declaration for Sanity's image asset
type Asset = {
  _ref: string; // Unique identifier for the image (Sanity schema-specific)
  _type: "image"; // Type indicating it's an image (Sanity schema-specific)
};
export type SingleArticle = {
  _id: string; // Unique identifier for the blog entry
  _type: "blog"; // Type indicating it's a blog entry (Sanity schema-specific)

  title: string; // Title of the blog post
  slug: {
    _type: "slug"; // Type indicating it's a slug (Sanity schema-specific)
    current: string; // A URL-friendly version of the title
  };
  mainImage: {
    asset: {
      _ref: string; // Unique identifier for the image (Sanity schema-specific)
      _type: "image"; // Type indicating it's an image (Sanity schema-specific)
    }; // Reference to the image asset
    alt: string; // Alt text for the image
    _type: "image"; // Type indicating it's an image (Sanity schema-specific)
  };

  // Author information (You can define an Author interface as well)
  author: {
    name: string; // Name of the author
    bio: string; // Author's bio or description
    // You can include more author-related fields if needed
  };

  publishedAt: string; // Date and time when the blog post was published (in ISO 8601 format)
  excerpt: string; // A short excerpt or summary of the blog post
  content: string; // The main content of the blog post (HTML or Markdown)

  // You can include additional fields as needed for your specific blog schema
};

export type NonNullableChildren<T> = {
  [P in keyof T]: Required<NonNullable<T[P]>>;
};

export type NonNullableChildrenDeep<T> = {
  [P in keyof T]-?: NonNullableChildrenDeep<NonNullable<T[P]>>;
};
