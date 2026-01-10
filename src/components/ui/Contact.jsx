import Navbar from "./Navbar";

export default function Contact() {
  return (
    <div className="min-h-screen px-6 pb-20">
      <Navbar />

      {/* Title */}
      <h1 className="text-4xl neon-title text-center mt-16 mb-10 font-extrabold">
        Contact Drivana
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Contact Info */}
        <div className="glass-card p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-sky-400">
            Get in Touch
          </h2>

          <p className="text-gray-300 mb-6">
            Have questions, partnership ideas, or feedback?  
            Reach out — we’d love to hear from you.
          </p>

          <div className="space-y-4 text-sm">
            <p>
              📍 <span className="font-semibold">Address:</span>  
              <br />
              Drivana HQ, Tech Park, Bengaluru, India
            </p>

            <p>
              📧 <span className="font-semibold">Email:</span>  
              <br />
              support@drivana.ai
            </p>

            <p>
              📞 <span className="font-semibold">Phone:</span>  
              <br />
              +91 98765 43210
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Drivana Location"
            src="https://www.google.com/maps?q=Bangalore%20India&output=embed"
            className="w-full h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
