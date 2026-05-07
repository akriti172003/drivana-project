import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle2, FileText, CreditCard } from 'lucide-react';

const EChallan = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [challanData, setChallanData] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (vehicleNumber.toUpperCase().includes('DL')) {
        setChallanData([
          { id: 'CH-8821', date: '2026-03-12', violation: 'Over Speeding', amount: 2000, status: 'Pending' },
          { id: 'CH-4512', date: '2026-01-05', violation: 'Wrong Parking', amount: 500, status: 'Paid' }
        ]);
      } else {
        setChallanData([]); // No challans found
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="pt-24 pb-12 px-6 min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            E-Challan Verification
          </h1>
          <p className="text-slate-400">Verify and pay traffic violations using your vehicle registration number.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-md mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text"
                placeholder="Enter Vehicle Number (e.g. DL01AB1234)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none transition-all uppercase tracking-widest"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? "Searching..." : "Check Status"}
            </button>
          </form>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {challanData && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {challanData.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <AlertCircle size={20} />
                  <span className="font-semibold">{challanData.filter(c => c.status === 'Pending').length} Pending Violations Found</span>
                </div>
                
                {challanData.map((challan) => (
                  <div key={challan.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-slate-800 p-3 rounded-lg">
                        <FileText className="text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{challan.violation}</h4>
                        <p className="text-slate-400 text-sm">ID: {challan.id} | Date: {challan.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                      <div className="text-right">
                        <p className="text-xl font-bold">₹{challan.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${challan.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                          {challan.status}
                        </span>
                      </div>
                      {challan.status === 'Pending' && (
                        <button className="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-slate-200 flex items-center gap-2">
                          <CreditCard size={18} /> Pay
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-10 text-center">
                <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-500">No Pending Challans</h3>
                <p className="text-slate-400">Great! Your vehicle record is clean.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EChallan;