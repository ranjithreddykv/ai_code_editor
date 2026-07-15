import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
      <div className="flex flex-col justify-center items-center my-5">
        <Image src={"/hero.svg"} alt="Hero-Section" height={300} width={500} />

        <h1 className=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-500 to-pink-800 dark:from-blue-400 dark:via-blue-400 dark:to-pink-400 tracking-tight leading-[1.3] ">
          Code Online With Ingteligence
        </h1>
      </div>

      <p className="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
        The ultimate playground for vibe coders. Launch full-stack projects in
        seconds with one-click project setups, collaborate seamlessly, and let
        AI assist with code generation, debugging, refactoring, and
        explanations. From quick prototypes to complete applications, stay in
        the flow without worrying about configuration or local setup.
      </p>
      <Link href={"/dashboard"}>
        <Button variant={"brand"} className="mb-4" size={"lg"}>
          Get Started
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
