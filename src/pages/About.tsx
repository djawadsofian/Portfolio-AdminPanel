import React, { useState, useEffect } from "react";
import { database } from "../firebase"; // Import your Firebase configuration
import { ref, onValue, set } from "firebase/database";

const About: React.FC = () => {
    const [aboutInfo, setAboutInfo] = useState<string>("");
    const [editing, setEditing] = useState<boolean>(false);
    const [newInfo, setNewInfo] = useState<string>("");

    // Firebase database reference
    const aboutRef = ref(database, "about");

    useEffect(() => {
        // Fetch the existing "About" information from Firebase
        const fetchAboutInfo = () => {
            onValue(aboutRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setAboutInfo(data);
                }
            });
        };

        fetchAboutInfo();
    }, []);

    const handleEditClick = () => {
        setEditing(true);
        setNewInfo(aboutInfo);
    };

    const handleSaveClick = async () => {
        await set(aboutRef, newInfo); // Save the new info to Firebase
        setAboutInfo(newInfo); // Update local state
        setEditing(false); // Exit editing mode
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewInfo(event.target.value);
    };

    return (
        <div className="p-4 pt-28 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">About Page</h1>
            {editing ? (
                <div>
                    <textarea
                        className="w-full p-2 border rounded"
                        value={newInfo}
                        onChange={handleChange}
                        rows={10}
                    />
                    <button
                        onClick={handleSaveClick}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <p>{aboutInfo}</p>
                    <button
                        onClick={handleEditClick}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default About;
