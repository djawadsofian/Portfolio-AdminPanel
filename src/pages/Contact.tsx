import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from "firebase/database";
import { database } from '../firebase';

// Define the contact interface
interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  timestamp: string;
}

const Contact: React.FC = () => {
  // Define the state with the correct type
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const contactsRef = ref(database, 'contact');

    // Listen for updates from Firebase
    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedContacts: ContactMessage[] = [];
      for (const id in data) {
        loadedContacts.push({ id, ...data[id] });
      }
      setContacts(loadedContacts);
    });
  }, []);

  const handleDelete = (id: string) => {
    const contactRef = ref(database, `contact/${id}`);

    // Remove the contact from Firebase
    remove(contactRef)
      .then(() => {
        alert('Contact deleted');
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting contact: ", error);
      });
  };

  return (
    <div className="contact-section pt-[120px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Messages</h2>
      {contacts.length === 0 ? (
        <p className="text-center text-gray-500">No messages found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Message:</strong> {contact.message}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Sent on:</strong> {contact.timestamp}
              </p>
              <button
                onClick={() => handleDelete(contact.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all mt-4"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Contact;


