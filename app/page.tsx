
import { Button } from "@/components/ui/button";
import UserButton from "@/modules/auth/components/user-button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">      
      <Button >Getting Started</Button>
      <UserButton/>
    </div>
  );
}
