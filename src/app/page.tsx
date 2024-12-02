import Feature from "@/components/Feature";
import Header from "@/components/Header";
import Start from "@/components/Start";

export default function Home() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-zinc-950 from-70% to-gray-800 to-100% text-white">
      <div className="h-full w-full">
        
      <Header />
        <Start />
        <Feature />
      </div>
    </div>
  );
}
