"use client";

import { useState, useEffect } from 'react';
import { GalleryImage, getGalleryImages, addGalleryImage, deleteGalleryImage } from '@/lib/firebase/gallery';
import { Upload, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form states
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const fetchedImages = await getGalleryImages();
      setImages(fetchedImages);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      alert('Failed to load gallery images.');
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
      await addGalleryImage(file, title, description, (progress) => {
        setUploadProgress(progress);
      });
      
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setShowUploadModal(false);
      setUploadProgress(0);
      
      // Refresh list
      await fetchImages();
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, fileName: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      setLoading(true);
      await deleteGalleryImage(id, fileName);
      await fetchImages();
    } catch (error) {
      console.error('Failed to delete image:', error);
      alert('Failed to delete image.');
      setLoading(false); // Reset loading state if error occurs
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold uppercase text-stone-900 tracking-wider">Gallery Management</h1>
          <p className="mt-1 text-sm text-stone-500">Upload and manage images for the public gallery.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition"
        >
          <Plus className="w-5 h-5" />
          Add New Image
        </button>
      </div>

      {loading && images.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-none p-12 text-center text-stone-500 shadow-sm flex flex-col items-center">
          <ImageIcon className="w-16 h-16 text-stone-300 mb-4" />
          <p className="text-lg font-medium text-stone-700">No images in gallery</p>
          <p className="mt-2 text-sm">Click the "Add New Image" button to start populating your gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image.id} className="bg-white rounded-none overflow-hidden shadow-sm border border-stone-200 flex flex-col group">
              <div className="relative h-48 bg-stone-100 flex items-center justify-center overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <button
                  onClick={() => handleDelete(image.id, image.fileName)}
                  className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-none opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="font-bold text-stone-800 mb-1 line-clamp-1">{image.title}</h3>
                <p className="text-sm text-stone-500 line-clamp-2 flex-grow">{image.description}</p>
                <div className="mt-4 text-xs text-stone-400 font-medium">
                  {new Date(image.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-stone-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-none shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-stone-100 flex justify-between items-center bg-stone-50">
              <h2 className="text-lg font-bold text-stone-800">Upload Gallery Image</h2>
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
                  <label className="block text-sm font-medium text-stone-700 mb-1">Image File *</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-none bg-stone-50 hover:bg-stone-100 transition relative">
                    <div className="space-y-1 text-center">
                      <Upload className="mx-auto h-12 w-12 text-stone-400" />
                      <div className="flex text-sm text-stone-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-none font-medium text-emerald-600 hover:text-emerald-500 px-2 py-1 shadow-sm border border-stone-200">
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
                  <label className="block text-sm font-medium text-stone-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    disabled={uploading}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="E.g., Leopard sighting at block 1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    disabled={uploading}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    placeholder="Add details about this image..."
                  />
                </div>
              </div>

              {uploading && (
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-stone-500 mb-1">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-none h-2 overflow-hidden">
                    <div 
                      className="bg-emerald-600 h-2 rounded-none transition-all duration-300 ease-out" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

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
                  className="px-4 py-2 bg-emerald-600 text-white rounded-none font-medium hover:bg-emerald-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-none h-4 w-4 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    'Save Image'
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