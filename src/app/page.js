import Image from "next/image";
import Brain from "@/../public/images/brain.jpg";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 bg-black ">
      <Image
        src={Brain}
        alt="Artwork of feelings in the brain, created by 'smartboy10'"
        height={700}
        width={900}
      />
    </main>
  );
}
