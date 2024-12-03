/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\cms\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import authorType from "./sanity/schemas/author";
import postType from "./sanity/schemas/post";
import employeeType from "./sanity/schemas/employee";
import settingsType from "./sanity/schemas/settings";
import serviceType from "./sanity/schemas/service";
import partnerType from "./sanity/schemas/partner";
import testimonialType from "./sanity/schemas/testimonial";
import categorytype from "./sanity/schemas/category";
import { settingsStructure } from "./plugins/settings";
import { previewDocumentNode } from "./plugins/previewPane";
import privacyPolicyType from "./sanity/schemas/privacy-policy";
import topCarType from "./sanity/schemas/topCar";
import linkType from "./sanity/schemas/link";
import aboutType from "./sanity/schemas/about";

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Plow-mart";

export default defineConfig({
  basePath: "/cms",
  projectId,
  dataset,
  title,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: {
    types: [
      // authorType,
      // postType,
      employeeType,
      testimonialType,
      topCarType,
      linkType,
      aboutType,
      // serviceType,
      // categorytype,
      privacyPolicyType,
    ],
  },
  plugins: [
    deskTool({
      // structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode(),
    }),

    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
