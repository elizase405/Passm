import React from 'react'

export default function ComingSoon({ onClose }) {

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative flex items-center justify-center bg-white/5 backdrop-blur-md border border-[#0099ff]/30 rounded-2xl w-1/5 h-2/6" >
        <h2 className="text-xl text-[#0099ff] font-semibold mb-4">Coming Soon</h2>
      </div>
    </div>
  );
}
