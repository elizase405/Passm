import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-[#0d0f2c] to-[#0a0f1f] text-white">
      <header className="flex flex-col items-center justify-center py-16 sm:py-24 px-4 space-y-3 sm:space-y-4">
        <h1 className="text-4xl sm:text-6xl font-bold text-[#0099ff]">Passm</h1>
        <p className="sm:text-xl text-slate-300">Your secure password manager.</p>
        <p className="text-slate-300 text-sm sm:text-md md:w-2/3 lg:w-1/3 text-center">Passm uses industry-leading security practices to keep your information safe. With regular security audits and continuous monitoring, we ensure your data remains protected at all times.</p>
        <button className="cursor-pointer mt-4 bg-[#0099ff] hover:bg-blue-700 px-4 text-sm sm:text-lg sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg font-semibold transition" onClick={() => navigate("/register")}>Get Started</button>
      </header>

      <section className="py-6 sm:py-8 px-4 max-w-6xl mx-auto mb-12 sm:mb-26">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Passm?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'End-to-End Encryption', desc: 'Your passwords are encrypted and only you can access them.' },
            { title: 'Password Generator', desc: 'Create strong, unique passwords for all your accounts.' },
            { title: 'Lightning Fast', desc: 'Instant access to your passwords across all devices.' },
            { title: 'Cross-Platform', desc: 'Seamlessly sync across web, mobile, and desktop.' }
          ].map((feature, i) => (
            <div key={i} className="w-[250px] sm:w-full md:w-[360px] lg:w-full mx-auto justify-center bg-[#0d0f2c] border border-[#0099ff] p-6 rounded-lg hover:bg-[#0a0f1f] transition">
              <h3 className="text-md sm:text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-md text-slate-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 text-center bg-[#0d0f2f]">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">Security You Can Trust</h2>
        <p className="text-slate-300 text-sm sm:text-lg">Military-grade encryption protects your sensitive data 24/7.</p>
      </section>

      <footer className="py-8 px-4 text-center text-slate-400 border-">
        <p>&copy; 2024 Passm. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home