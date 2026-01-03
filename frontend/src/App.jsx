import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    // Trigger refresh of contact list
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Contact Management App
          </h1>
          <p className="text-gray-600">
            Manage your contacts efficiently with our MERN stack application
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <ContactForm onContactAdded={handleContactAdded} />
          </div>
        </div>

        <div>
          <ContactList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}

export default App;

