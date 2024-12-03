import { media } from "@/utils/media";
import Container from "components/BlogContainer";
import Layout from "components/BlogLayout";
import PostBody from "components/PostBody";
import PostTitle from "components/PostTitle";
import SectionSeparator from "components/SectionSeparator";
import * as demo from "lib/demo.data";
import type {
  Category,
  Post,
  PrivacyPolicy,
  Service,
  Settings,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import PrivacyPolicyHeader from "@/components/PrivacyPolicyHeader";
import { getClient, getPrivacyPolicy } from "@/sanity/lib/client";
import { ArticleWrapper } from "@/components/ArticleWrapper";
import { useTheme } from "next-themes";

export interface PostPageProps {
  preview?: boolean;
  loading?: boolean;
  doc: PrivacyPolicy[];
  settings?: Settings;
}

const NO_POSTS: Post[] = [];

const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
`;

export default function CopyrightPage(props: PostPageProps) {
  const { preview, loading, doc, settings } = props;
  const { theme }: any = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [policyList, setPolicyList] = useState<PrivacyPolicy[]>([]);

  useEffect(() => {
    const client = getClient();
    const fetchPolicies = async () => {
      const policies = await getPrivacyPolicy(client);
      setPolicyList(policies);
    };
    fetchPolicies();

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

  return (
    <>
      {/* <PostPageHead settings={settings} post={post} /> */}

      <Layout preview={preview} loading={loading}>
        <PrivacyPolicyPageWrapper>
          <div
            className="container justify-start
         mx-auto px-16 md:px-10"
          >
            {/* <BlogHeader title={title} level={2} /> */}
            {preview && !doc ? (
              <PostTitle>Loading…</PostTitle>
            ) : (
              <Wrapper>
                <ArticleWrapper theme={theme}>
                  {policyList
                    .filter((doc) => doc?.title === "Copyright")
                    .map((doc) => (
                      <PrivacyPolicyContainer>
                        <PrivacyPolicyHeader
                          title={doc?.title}
                          date={doc?.date}
                        />
                        <PostBody content={doc?.content} />
                      </PrivacyPolicyContainer>
                    ))}
                </ArticleWrapper>
                <SectionSeparator />
              </Wrapper>
            )}
          </div>
        </PrivacyPolicyPageWrapper>
      </Layout>
    </>
  );
}

const BackLink = styled(Link)`
  padding: 0 18rem;
  ${media("<=largeDesktop")} {
    padding: 0 5rem;
  }
  ${media("<tablet")} {
    padding: 0 0;
  }
`;
const PrivacyPolicyContainer = styled.div`
  margin: 18rem 0;
  display: flex;
  border: 2px solid rgb(var(--border));
  flex-direction: column;
  /* align-items: flex-start; */
  ${media("<tablet")} {
    flex-direction: column;
  }
`;
const PrivacyPolicyPageWrapper = styled(Container)``;
