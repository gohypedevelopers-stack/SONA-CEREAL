"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
   const router = useRouter();

   useEffect(() => {
      // Redirect to submissions as the default view
      router.replace("/admin/submissions");
   }, [router]);

   return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-zinc-200 border-t-[#CBA35C] animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 italic">Accessing Command Center...</span>
         </div>
      </div>
   );
}
