import { Label } from "./Label"
import { Tv, Smartphone } from 'lucide-react';
import { CopyR } from "../common/CopyR";

export const FooterLanding = () => {
  return (
    <div className=" w-full md:border-t md:border-gray-600/40  px-6 py-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 mt-auto">
      <div className="flex items-center gap-3">
        <Label icon={Tv} text="4K ULTRA HD" />
        <Label icon={Smartphone} text="MULTI-DISPOSITIVO" />
      </div>
      <div className="tracking-wide text-center md:text-right">
        <CopyR company="MovieApp Premium" />
      </div>
    </div>
  )
}
