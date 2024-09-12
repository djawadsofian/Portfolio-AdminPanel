import React, { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, listAll, ListResult } from 'firebase/storage'; // Firebase imports

const Portfolio: React.FC = () => {
    
    const [pictures, setPictures] = useState<string[]>([]);
    const [videos, setVideos] = useState<string[]>([]);
    const storage = getStorage();// Initialize Firebase storage

    

    useEffect(() => {
        const fetchFiles = async (path: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
          try {
            const listRef = ref(storage, path);
            const result = await listAll(listRef);
            const urls = await Promise.all(result.items.map((item) => getDownloadURL(item)));
            setter(urls);
          } catch (error) {
            console.error('Error fetching files:', error);
          }
        };
    
        fetchFiles('images', setPictures);
        fetchFiles('videos', setVideos);
      }, []); // Empty dependency array to run once on mount
    

    

    // Function to handle file upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const storageRef = ref(storage, `${type}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Progress can be monitored here if needed
            },
            (error) => {
                console.error('Error uploading file:', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    if (type === 'images') {
                        setPictures((prev) => [...prev, downloadURL]);
                    } else if (type === 'videos') {
                        setVideos((prev) => [...prev, downloadURL]);
                    }
                });
            }
        );
    };

    // Function to remove file from Firebase and UI
    const handleRemove = (url: string, type: string) => {
        const storageRef = ref(storage, url);

        deleteObject(storageRef)
            .then(() => {
                if (type === 'images') {
                    setPictures((prev) => prev.filter((pic) => pic !== url));
                } else if (type === 'videos') {
                    setVideos((prev) => prev.filter((vid) => vid !== url));
                }
            })
            .catch((error) => {
                console.error('Error removing file:', error);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5 lg:px-20">
            {/* Video Section */}
            <section className="mb-16">
                <div className="flex justify-between items-center mb-6 mt-12 lg:mt-16">
                    <h2 className="text-2xl font-semibold">Videos</h2>
                    <div>
                        <label htmlFor="video-upload" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer">
                            Add Video
                        </label>
                        <input
                            type="file"
                            id="video-upload"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'videos')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((videoUrl, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <video className="w-full h-48 object-cover" controls>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="p-4">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                                    onClick={() => handleRemove(videoUrl, 'videos')}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Picture Section */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Pictures</h2>
                    <div>
                        <label htmlFor="picture-upload" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer">
                            Add Picture
                        </label>
                        <input
                            type="file"
                            id="picture-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, 'images')}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pictures.map((pictureUrl, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={pictureUrl}
                                alt={`Picture ${index}`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
                                    onClick={() => handleRemove(pictureUrl, 'images')}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Portfolio;












