"use client";

import { useState, useEffect } from 'react';
import { Vehicle, getVehicles, uploadVehicleImage, deleteVehicle } from '@/lib/firebase/vehicles';
import { Upload, Trash2, Plus, X, Truck } from 'lucide-react';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const fetchedVehicles = await getVehicles();
      setVehicles(fetchedVehicles);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
      alert('Failed to load vehicles.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      alert('Please provide a file and title.');
      return;
    }

    try {
      setUploading(true);
      await uploadVehicleImage(file, title);
      
      // Reset form
      setFile(null);
      setTitle('');
      setShowUploadModal(false);
      
      // Refresh list
      await fetchVehicles();
    } catch (error) {
      console.error('Failed to upload vehicle image:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!window.confirm('Are you sure you want to delete this vehicle?')) return;
    
    try {
      setLoading(true);
      await deleteVehicle(id, storagePath);
      await fetchVehicles();
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
      alert('Failed to delete vehicle.');
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase text-stone-900 tracking-wider">Vehicle Management</h1>
          <p className="mt-1 text-sm text-stone-500">Upload and manage your fleet of safari jeeps.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-[#314a1c] hover:bg-[#1a2b0e] text-white font-medium py-2 px-4 rounded-none flex items-center gap-2 transition shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add New Vehicle
        </button>
      </div>

      {loading && vehicles.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-[#314a1c]"></div>
        </div>
      ) : vehicles.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-none p-12 text-center text-stone-500 shadow-sm flex flex-col items-center">
          <Truck className="w-16 h-16 text-stone-300 mb-4" />
          <p className="text-lg font-medium text-stone-700">No vehicles in the fleet</p>
          <p className="mt-2 text-sm">Click the "Add New Vehicle" button to start populating your fleet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-none overflow-hidden shadow-sm border border-stone-200 flex flex-col group">
              <div className="relative h-48 bg-stone-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={vehicle.url} 
                  alt={vehicle.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <button
                  onClick={() => handleDelete(vehicle.id, vehicle.storagePath)}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  title="Delete Vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-stone-800 mb-1">{vehicle.title}</h3>
                <div className="mt-4 text-xs text-stone-400 font-medium">
                  Added: {new Date(vehicle.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg overflow-hidden border border-stone-200">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h2 className="text-lg font-bold text-stone-800">Add New Vehicle</h2>
              <button 
                onClick={() => !uploading && setShowUploadModal(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
                disabled={uploading}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Vehicle Image *</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-none bg-stone-50 hover:bg-stone-100 transition relative">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-stone-400" />
                      <div className="flex text-sm text-stone-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-none font-medium text-[#314a1c] hover:text-[#1a2b0e] px-2 py-1 shadow-sm border border-stone-200">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} disabled={uploading} required />
                        </label>
                      </div>
                      <p className="text-xs text-stone-500 mt-2">
                        {file ? file.name : "PNG, JPG, WEBP up to 5MB"}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Vehicle Title/Model *</label>
                  <input
                    type="text"
                    required
                    disabled={uploading}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#314a1c] focus:border-[#314a1c]"
                    placeholder="E.g., Luxury Toyota Hilux 4x4"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  disabled={uploading}
                  className="px-4 py-2 border border-stone-300 rounded-none text-stone-700 font-medium hover:bg-stone-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !file || !title}
                  className="px-4 py-2 bg-[#ffcc00] hover:bg-yellow-500 text-stone-900 rounded-none font-bold disabled:opacity-50 flex items-center gap-2 shadow-md transition"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-none h-4 w-4 border-b-2 border-stone-900"></div>
                      Uploading...
                    </>
                  ) : (
                    'Save Vehicle'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}