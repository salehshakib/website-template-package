"use client";

import CommonImageShow from "../common/common-image-show";
import { Clock } from "./clock";

export function Header({
  websiteName,
  logo,
}: {
  websiteName: string;
  logo: string;
}) {
  return (
    <header className="container rounded-2xl border border-b border-white/10 bg-[#12132d]/5 shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-sm">
      <div className="mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-16 w-20">
              <CommonImageShow
                fileName={logo}
                type="avatar"
                className="h-16 w-16"
              />
            </div>
            <div className="text-xl text-white">
              {websiteName?.length > 0 ? websiteName : "No Name"}
            </div>
          </div>
          <Clock />
        </div>
      </div>
    </header>
  );
}
