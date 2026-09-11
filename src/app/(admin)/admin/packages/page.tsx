"use client";

import { useEffect, useState } from "react";
import { getTours, deleteTour, createTour, updateTour, uploadTourImage } from "@/lib/firebase/tours";
import { Tour, tours as localTours } from "@/lib/data/tours";
import { Plus, Edit2, Trash2, X } from "lucide-react";

export default function PackagesManagement() {
  const [packages, setPackages] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Tour>>({
    title: "", duration: "", locations: "", desc: "", longDesc: "", bestFor: "", img: "", price: 0
  });
  const [tagsInput, setTagsInput] = useState("");
  const [includesInput, setIncludesInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    const { success, data } = await getTours();
    if (success && data && data.length > 0) {
      setPackages(data);
    } else {
      setPackages(localTours);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      const res = await deleteTour(id);
      if (res.success) {
        setPackages(packages.filter(p => p.id !== id));
      } else {
        alert("Failed to delete package (might be a local-only tour).");
      }
    }
  };

  const openModal = (pkg?: Tour) => {
    setImageFile(null);
    if (pkg) {
      setEditingId(pkg.id);
      setFormData(pkg);
      setTagsInput(pkg.tags?.join(", ") || "");
      setIncludesInput(pkg.includes?.join("\n") || "");
    } else {
      setEditingId(null);
      setFormData({ title: "", duration: "", locations: "", desc: "", longDesc: "", bestFor: "", img: "", price: 0 });
      setTagsInput("");
      setIncludesInput("");
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    const tagsArray = tagsInput.split(",").map(t => t.trim()).filter(t => t !== "");
    const includesArray = includesInput.split("\n").map(t => t.trim()).filter(t => t !== "");
    
    let imageUrl = formData.img;
    if (imageFile) {
      try {
        imageUrl = await uploadTourImage(imageFile);
      } catch (err) {
        alert("Failed to upload image.");
        setIsSaving(false);
        return;
      }
    }

    const finalData = { ...formData, img: imageUrl, tags: tagsArray, includes: includesArray } as Tour;

    if (editingId) {
      const res = await updateTour(editingId, finalData);
      if (res.success) {
        setPackages(packages.map(p => p.id === editingId ? { ...p, ...finalData } : p));
        setIsModalOpen(false);
      } else {
        alert("Failed to update");
      }
    } else {
      const res = await createTour(finalData);
      if (res.success && res.id) {
        setPackages([...packages, { ...finalData, id: res.id }]);
        setIsModalOpen(false);
      } else {
        alert("Failed to create");
      }
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Packages Management</h1>
          <p className="text-stone-500">Create, edit, and manage safari tours shown on the website.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-none font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-none shadow-sm border border-stone-100 overflow-hidden flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-bold text-emerald-700">
                Rs. {pkg.price?.toLocaleString()}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-stone-900 mb-1">{pkg.title}</h3>
              <p className="text-sm text-stone-500 mb-2 font-medium">
                {pkg.duration} {pkg.locations ? `• ${pkg.locations}` : ""}
              </p>
              <p className="text-sm text-stone-600 mb-4 line-clamp-2">{pkg.desc}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {pkg.tags?.map(t => <span key={t} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">{t}</span>)}
              </div>

              <div className="mt-auto flex justify-end space-x-2 border-t border-stone-100 pt-4">
                <button onClick={() => openModal(pkg)} className="px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-emerald-700 bg-stone-50 hover:bg-emerald-50 rounded transition-colors flex items-center">
                  <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
                </button>
                <button onClick={() => handleDelete(pkg.id)} className="px-3 py-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded transition-colors flex items-center">
                  <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-none shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-stone-100 sticky top-0 bg-white z-10">
              <h2 className="text-xl font-bold text-stone-900">{editingId ? "Edit Package" : "Create New Package"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Package Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Price (Rs.)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Duration (e.g. Full Day)</label>
                  <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Package Image</label>
                  {formData.img && !imageFile && (
                    <div className="mb-2 h-24 w-40 overflow-hidden border border-stone-200">
                      <img src={formData.img} alt="Current" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={e => { if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]) }} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Short Description</label>
                  <textarea required rows={2} value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Best For</label>
                  <input type="text" value={formData.bestFor || ""} onChange={e => setFormData({...formData, bestFor: e.target.value})} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" placeholder="e.g., Serious Wildlife Enthusiasts" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Package Includes (One per line)</label>
                  <textarea rows={4} value={includesInput} onChange={e => setIncludesInput(e.target.value)} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" placeholder="Full-Day Safari&#10;Safari Jeep&#10;Experienced Driver" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-1">Tags (Comma separated)</label>
                  <input type="text" value={tagsInput} onChange={e => setTagsInput(e.target.value)} className="w-full p-2 border border-stone-200 rounded focus:ring-emerald-500 focus:border-emerald-500" placeholder="Wildlife, Nature, Morning" />
                </div>
              </div>

              <div className="pt-6 border-t border-stone-100 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 text-white bg-emerald-700 hover:bg-emerald-800 rounded font-medium transition-colors disabled:opacity-50">
                  {isSaving ? "Saving..." : "Save Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
