import LogoColSvg from '@/assets/images/home/logo-col.svg'
import { getVwByPx } from "@/lib/utils";
import HomeLoadingProgress from "@/components/home/showProgress";

function Home() {
  return (
    <div className="h-full flex-col justify-between">
      <div className="flex-1 flex-row-center">
        <LogoColSvg style={{ width: getVwByPx(180), height: getVwByPx(134) }} />
      </div>
      
      <div className="vw-pb-48 w-full flex-col-center">
        <HomeLoadingProgress />
        <p className="text-[#72638E] vw-text-14 font-[300] text-center">Crypto Champions Unleashed!</p>
      </div>
    </div>
  );
}

export default Home;