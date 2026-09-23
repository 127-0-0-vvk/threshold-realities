import type { Metadata } from "next";
import { ConsoleLogin } from "@/components/console/console-login";
import { ConsoleShell } from "@/components/console/console-shell";
import { Container } from "@/components/ui";
import { isConfigured, isSignedIn } from "@/lib/admin-auth";
import { getPosts, storageStatus } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Console",
  // Never index the console.
  robots: { index: false, follow: false, nocache: true },
};
export const dynamic = "force-dynamic";

export default async function ConsolePage() {
  const configured = isConfigured();
  const signedIn = configured && (await isSignedIn());

  if (!signedIn) {
    return (
      <Container className="py-16 pt-32">
        <ConsoleLogin configured={configured} />
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <ConsoleShell posts={await getPosts()} storage={await storageStatus()} />
    </Container>
  );
}
