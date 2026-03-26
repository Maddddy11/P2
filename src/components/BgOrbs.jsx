import React from 'react';

export default function BgOrbs() {
  return (
    <div aria-hidden="true" style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
      {/* Neumorphic Soft Orbs - New Color Palette */}
      <div className="bg-orb anim-float" style={{ width:550,height:550,top:-160,right:-120,background:'radial-gradient(circle,rgba(0,149,255,0.2),transparent 70%)' }} />
      <div className="bg-orb anim-float" style={{ width:480,height:480,bottom:-100,left:-130,background:'radial-gradient(circle,rgba(255,0,98,0.15),transparent 70%)', animationDelay:'-2s' }} />
      <div className="bg-orb anim-float" style={{ width:420,height:420,top:'40%',left:'55%',background:'radial-gradient(circle,rgba(255,166,0,0.18),transparent 70%)',transform:'translate(-50%,-50%)', animationDelay:'-4s' }} />
      <div className="bg-orb anim-float" style={{ width:280,height:280,top:'20%',left:'12%',background:'radial-gradient(circle,rgba(102,191,255,0.2),transparent 70%)', animationDelay:'-1s' }} />
      <div className="bg-orb anim-float" style={{ width:320,height:320,bottom:'18%',right:'8%',background:'radial-gradient(circle,rgba(46,112,41,0.15),transparent 70%)', animationDelay:'-3s' }} />

      {/* Subtle dot grid - softer */}
      <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.025 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="#001524" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>
  );
}
