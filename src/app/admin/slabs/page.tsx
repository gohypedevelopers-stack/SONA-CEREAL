"use client";

import React, { useState, useEffect, useRef } from "react";

export default function AdminSlabsPage() {
  const [slabs, setSlabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    level: "",
    target: "",
    giftA: "",
    giftAImg: "",
    giftB: "",
    giftBImg: ""
  });

  const fileInputARef = useRef<HTMLInputElement>(null);
  const fileInputBRef = useRef<HTMLInputElement>(null);

  const fetchSlabs = async () => {
    try {
      const res = await fetch("/api/slabs");
      const data = await res.json();
      setSlabs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlabs();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'giftAImg' | 'giftBImg') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          setForm(prev => ({ ...prev, [field]: compressedBase64 }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        target: parseInt(form.target),
        id: editId
      };

      const res = await fetch("/api/slabs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        resetForm();
        fetchSlabs();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setForm({ level: "", target: "", giftA: "", giftAImg: "", giftB: "", giftBImg: "" });
    setEditId(null);
    if (fileInputARef.current) fileInputARef.current.value = "";
    if (fileInputBRef.current) fileInputBRef.current.value = "";
  };

  const handleEdit = (slab: any) => {
    setEditId(slab.id);
    setForm({
      level: slab.level,
      target: slab.target.toString(),
      giftA: slab.giftA,
      giftAImg: slab.giftAImg || "",
      giftB: slab.giftB,
      giftBImg: slab.giftBImg || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this slab?")) return;
    try {
      await fetch(`/api/slabs?id=${id}`, { method: "DELETE" });
      fetchSlabs();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-4xl font-headline font-black italic uppercase tracking-tighter">Manage <span className="text-[#CBA35C]">Slabs</span></h1>
          <p className="text-zinc-500 font-bold text-xs uppercase tracking-[0.3em] mt-2">Elite Reward Infrastructure</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Form Container */}
        <div className="lg:col-span-5">
           <div className="bg-white p-10 rounded-[3rem] shadow-2xl border border-zinc-100 sticky top-8">
            <div className="flex justify-between items-center mb-10">
               <div>
                  <h2 className="text-2xl font-headline font-black uppercase italic leading-none">{editId ? 'Update' : 'Add New'} Slab</h2>
                  <p className="text-[10px] font-black text-[#CBA35C] uppercase tracking-[0.4em] mt-2">{editId ? 'Modify existing tier level' : 'Create a new reward milestone'}</p>
               </div>
               {editId && (
                  <button onClick={resetForm} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black">Cancel Edit</button>
               )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Slab Level</label>
                    <input required value={form.level} onChange={e => setForm({...form, level: e.target.value})} className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-bold" placeholder="01" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Target Quantity (QTL)</label>
                    <input required type="number" value={form.target} onChange={e => setForm({...form, target: e.target.value})} className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-bold" placeholder="200" />
                  </div>
               </div>

               <div className="space-y-6 pt-6 border-t border-zinc-100">
                  <div className="grid gap-6">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-950 block italic">Reward Option A</label>
                          {form.giftAImg && <span className="text-[9px] font-black text-green-600 uppercase">Image Uploaded</span>}
                       </div>
                       <input required value={form.giftA} onChange={e => setForm({...form, giftA: e.target.value})} className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-bold" placeholder="Gift Name (e.g. Microwave)" />
                       
                       <div className="relative group">
                          <input 
                            type="file" 
                            ref={fileInputARef}
                            onChange={e => handleImageUpload(e, 'giftAImg')} 
                            className="hidden" 
                            accept="image/*"
                          />
                          {form.giftAImg ? (
                             <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#CBA35C] group/preview">
                                <img src={form.giftAImg} className="w-full h-full object-contain bg-zinc-50" alt="Preview" />
                                <div 
                                   onClick={() => fileInputARef.current?.click()}
                                   className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                >
                                   <span className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                      <span className="material-symbols-outlined italic text-sm">cached</span> Replace Image
                                   </span>
                                </div>
                             </div>
                          ) : (
                             <div 
                                onClick={() => fileInputARef.current?.click()}
                                className="w-full p-4 rounded-xl border-2 border-dashed border-zinc-200 hover:border-[#CBA35C]/50 transition-all cursor-pointer flex items-center justify-center gap-3 bg-zinc-50/50"
                             >
                                <span className="material-symbols-outlined text-zinc-400">add_photo_alternate</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Upload Gift Image</span>
                             </div>
                          )}
                       </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-zinc-100">
                       <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-950 block italic">Reward Option B</label>
                          {form.giftBImg && <span className="text-[9px] font-black text-green-600 uppercase">Image Uploaded</span>}
                       </div>
                       <input required value={form.giftB} onChange={e => setForm({...form, giftB: e.target.value})} className="w-full p-5 rounded-2xl bg-zinc-50 border border-zinc-100 outline-none focus:border-[#CBA35C] font-bold" placeholder="Gift Name (e.g. JBL Speaker)" />
                       
                       <div className="relative group">
                          <input 
                            type="file" 
                            ref={fileInputBRef}
                            onChange={e => handleImageUpload(e, 'giftBImg')} 
                            className="hidden" 
                            accept="image/*"
                          />
                          {form.giftBImg ? (
                             <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-[#CBA35C] group/preview">
                                <img src={form.giftBImg} className="w-full h-full object-contain bg-zinc-50" alt="Preview" />
                                <div 
                                   onClick={() => fileInputBRef.current?.click()}
                                   className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                >
                                   <span className="text-white font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                                      <span className="material-symbols-outlined italic text-sm">cached</span> Replace Image
                                   </span>
                                </div>
                             </div>
                          ) : (
                             <div 
                                onClick={() => fileInputBRef.current?.click()}
                                className="w-full p-4 rounded-xl border-2 border-dashed border-zinc-200 hover:border-[#CBA35C]/50 transition-all cursor-pointer flex items-center justify-center gap-3 bg-zinc-50/50"
                             >
                                <span className="material-symbols-outlined text-zinc-400">add_photo_alternate</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Upload Gift Image</span>
                             </div>
                          )}
                       </div>
                    </div>
                  </div>
               </div>

               <button className="w-full bg-zinc-900 text-[#CBA35C] font-headline font-black uppercase py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl mt-8 flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined italic text-xl">{editId ? 'save_as' : 'add_task'}</span>
                  {editId ? 'Sync Updates' : 'Establish Slab'}
               </button>
            </form>
           </div>
        </div>

        {/* List Container */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-headline font-black uppercase italic">Existing Slabs</h2>
            <span className="px-5 py-1.5 bg-zinc-100 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">{slabs.length} Total Tiers</span>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-zinc-100">
                <div className="w-12 h-12 border-4 border-zinc-100 border-t-[#CBA35C] rounded-full animate-spin"></div>
                <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Retrieving Slabs...</p>
             </div>
          ) : slabs.length === 0 ? (
             <div className="text-center py-32 bg-white rounded-[3rem] border border-zinc-100 flex flex-col items-center justify-center gap-4">
                <span className="material-symbols-outlined text-6xl text-zinc-100">inventory_2</span>
                <p className="text-zinc-400 font-headline font-black text-2xl uppercase italic tracking-tighter">No slabs configured yet.</p>
             </div>
          ) : (
            <div className="grid gap-6">
              {slabs.map((slab, idx) => (
                <div key={slab.id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-zinc-100 flex items-center justify-between group hover:border-[#CBA35C]/30 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-50 rounded-bl-[4rem] -z-0 opacity-50 group-hover:bg-[#CBA35C]/5 transition-colors"></div>
                  
                  <div className="flex items-center gap-8 relative z-10">
                    <div className="h-20 w-20 bg-zinc-900 text-[#CBA35C] flex flex-col items-center justify-center rounded-[1.5rem] shadow-2xl">
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-50 leading-none mb-1">Tier</span>
                      <span className="font-headline font-black text-3xl italic leading-none">{slab.level}</span>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <h3 className="font-headline font-black text-4xl italic uppercase tracking-tighter text-zinc-900">{slab.target}</h3>
                        <span className="text-[10px] font-black text-zinc-400 not-italic uppercase tracking-widest">Quintal Target</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="w-2 h-2 bg-[#CBA35C] rounded-full"></span>
                         <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{slab.giftA} <span className="opacity-30 italic px-2">/</span> {slab.giftB}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 relative z-10">
                    <button onClick={() => handleEdit(slab)} className="w-12 h-12 flex items-center justify-center text-zinc-400 hover:bg-zinc-900 hover:text-[#CBA35C] rounded-2xl transition-all shadow-sm hover:shadow-xl">
                      <span className="material-symbols-outlined text-xl">edit_note</span>
                    </button>
                    <button onClick={() => handleDelete(slab.id)} className="w-12 h-12 flex items-center justify-center text-red-300 hover:bg-red-600 hover:text-white rounded-2xl transition-all shadow-sm">
                      <span className="material-symbols-outlined text-xl">delete_forever</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
