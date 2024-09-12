import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome, Guidoume Adem!</h1>
                <p className="text-lg text-gray-700 mb-6">
                    You are now in your portfolio admin panel. Here you can manage your portfolio, update information, and customize your content.
                </p>
            
            </div>
        </div>
    );
}

export default Home;