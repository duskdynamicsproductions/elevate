"use client";

import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { Camera, ShieldBan } from "lucide-react";

export default function DemoOne() {
  return (
    <div className="flex flex-col overflow-hidden bg-black text-white">
      <div className="pt-[40vh] pb-[40vh]">
        <ContainerScroll
          titleComponent={
            <>
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-widest uppercase text-white/80 backdrop-blur">
                <ShieldBan className="h-4 w-4" />
                Distractions Out
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
                Tried to open Instagram.
                <br />
                <span className="text-white/70">Blocked.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 md:text-lg">
                Focus session is active - the app prevents distracting launches and
                shows an animated block screen.
              </p>
            </>
          }
        >
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <div className="absolute left-1/2 top-3 z-20 h-2 w-2 -translate-x-1/2 rounded-full bg-white/20" />

            <ShaderAnimation className="absolute inset-0 h-full w-full" />

            <div className="absolute inset-0 bg-black/35" />

            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-6 md:p-10">
              <div className="w-full max-w-md rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5">
                    <Camera className="h-6 w-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-lg font-semibold">Instagram blocked</div>
                    <div className="mt-1 text-sm text-white/70">
                      Distractions Out mode is enabled
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-white/70">
                  Keep going - you can open it after your timer ends.
                </div>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </div>
    </div>
  );
}
