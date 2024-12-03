import IndexPage, { type IndexPageProps } from "components/IndexPage";
import {
  indexQuery,
  type Post,
  type Settings,
  settingsQuery,
} from "@/sanity/lib/queries";
import { useLiveQuery } from "next-sanity/preview";

export default function PreviewIndexPage(props: IndexPageProps) {
  const [posts, loadingPosts] = useLiveQuery<Post[]>(props.posts, indexQuery);
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery
  );

  return (
    <IndexPage
      preview
      loading={loadingPosts || loadingSettings}
      posts={posts || []}
      settings={settings || {}}
    />
  );
}
