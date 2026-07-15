/* eslint-disable @next/next/no-img-element */
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";
import Footer from "@/modules/home/components/footer";
import Header from "@/modules/home/components/header";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: {
    template: "Online Code Editor",
    default: "AI Powered Code Editor for vibe coders",
  },
};

export default function HomeLayout({ children }: { children: React.ReactNode }){
  return (
    <>
      <Header />
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
      <main className="z-20 relative w-full pt-0 md:pt-0">{children}</main>
      <Footer />
    </>
  );
};


