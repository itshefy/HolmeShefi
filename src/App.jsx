// src/App.jsx
import { PasswordProtection } from './components/auth/PasswordProtection';
import SalesDashboard from './components/SalesTools';

function App() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <PasswordProtection>
        <SalesDashboard />
      </PasswordProtection>
    </div>
  );
}

export default App;