import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

// --- 3D COMPONENT ---
function MicroChip({ position, color, speed }) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * speed;
    meshRef.current.rotation.y += delta * (speed * 0.5);
    if (hovered) meshRef.current.rotation.y += delta * 2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh 
        ref={meshRef} 
        position={position}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1.5, 1, 0.1]} /> 
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 3 : 1} wireframe={true} />
      </mesh>
    </Float>
  );
}

// --- DATA ---
const projects = [
  { id: 1, title: "Robot Arm", type: "video", src: "/asset/robot-arm.mp4", thumb: "/asset/robotarm-pic.jpeg" },
  { id: 2, title: "Smart Fan", type: "video", src: "/asset/fan-sensor.mp4", thumb: "/asset/sensor.jpg" },
  { id: 3, title: "Light Table", type: "video", src: "/asset/light-table.mp4", thumb: "/asset/lighttable.jpeg" },
  { id: 4, title: "House Demo", type: "video", src: "/asset/house-project.mp4", thumb: "/asset/house-pic.jpeg" }
];

const curriculum = [
  { id: 1, level: "Level 1", title: "Basics & Input", desc: "Button, gesture, touch, sound, variables & arrays.", color: "#0b66ff", time: "60 min" },
  { id: 2, level: "Beginner", title: "Buttons & Logic", desc: "Event-driven programming. Build a counter or game.", color: "#0b66ff", time: "60 min" },
  { id: 3, level: "Intermed", title: "Sensors & Data", desc: "Temperature, light, & accelerometer data reading.", color: "#0b66ff", time: "90 min" },
  { id: 4, level: "Intermed", title: "Sound & Music", desc: "Frequency, duration, tones. Creating alarms.", color: "#0b66ff", time: "90 min" },
  { id: 5, level: "Advanced", title: "Radio Comms", desc: "Wireless messaging between micro:bits.", color: "#d62828", time: "120 min" },
  { id: 6, level: "Advanced", title: "External Parts", desc: "Connecting servos, motors, and LED strips.", color: "#d62828", time: "120 min" },
  { id: 7, level: "Advanced", title: "Smart Systems", desc: "Automated home, weather station logic.", color: "#d62828", time: "120 min" },
  { id: 8, level: "Final", title: "Innovation", desc: "Design and plan a unique invention challenge.", color: "gold", time: "150 min" },
];

// --- ANIMATION SETTINGS ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// --- PAGE COMPONENTS ---

// 1. HOME PAGE CONTENT
function HomePage({ setPage, onSelectProject }) {
  const [result, setResult] = useState(""); 
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);
    formData.append("access_key", "72aa3f80-2489-4c06-8c28-441a1a8ab058");
    const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
    const data = await response.json();
    if (data.success) { setResult("Success! We will contact you soon."); event.target.reset(); } 
    else { setResult("Error: " + data.message); }
  };

  return (
    <motion.div 
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      transition={{ duration: 0.5 }}
    >
      {/* HERO */}
      <section className="hero-section">
        <h1 className="title">MICRO<span className="gradient-text">INVENT</span></h1>
        <p className="subtitle">Inspiring young inventors with micro:bit. Hands-on coding, electronics, and creative problem solving.</p>
        <div className="cta-container">
          <button onClick={() => setPage('curriculum')} className="btn btn-primary">See Roadmap</button>
          <a href="#gallery" className="btn btn-secondary">Projects</a>
        </div>
      </section>

      {/* ABOUT AEG SECTION (With Auto-Play Videos) */}
      <section id="company" className="section">
        <div className="glass-card" style={{ textAlign: 'left', padding: '40px', borderLeft: '5px solid #d62828' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', border: 'none', padding: 0 }}>
            About <span className="gradient-text">AEG Global</span>
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '20px' }}>
            <strong>AEG Global (Advance Edutech Global)</strong> bridges the gap between theoretical school science and real-world engineering. 
            We believe that every student is an inventor waiting to happen.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Our mission is to empower the next generation. Through our curriculum, students don't just learn code—they cultivate 
            <strong> logic, creativity, and teamwork</strong>.
          </p>

          {/* Auto-Playing Videos Container */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <video 
              src="/asset/robot-arm.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ flex: '1 1 300px', width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', height: '200px', objectFit: 'cover' }} 
            />
            <video 
              src="/asset/video-project1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ flex: '1 1 300px', width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', height: '200px', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      {/* STEM SECTION */}
      <section id="about" className="section">
        <h2>What is STEM?</h2>
        <div className="glass-grid">
          <div className="glass-card"><div className="card-title">SCIENCE</div><p>Incorporating technology into scientific study. Biology, ecology, chemistry, and physics come alive.</p></div>
          <div className="glass-card"><div className="card-title">TECHNOLOGY</div><p>Digital modeling, prototyping, 3D printing, and IoT. Real tech creation.</p></div>
          <div className="glass-card"><div className="card-title">ENGINEERING</div><p>Civil, electronics, and robotics. Subjects many parents never imagined studying this early.</p></div>
          <div className="glass-card"><div className="card-title">MATH</div><p>Applied mathematics. Combining concepts with real-world applications.</p></div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <h2 style={{ textAlign: 'center', border: 'none', fontSize: '2rem', marginBottom: '40px' }}>Why Choose AEG?</h2>
        <div className="glass-grid">
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🛠️</div>
              <h3>Real Hardware</h3>
              <p>No simulations. Students build with real chips, sensors, and wires from Day 1.</p>
           </div>
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>👨‍💻</div>
              <h3>Industry Skills</h3>
              <p>We teach logic used by real engineers, from Python basics to Circuit Design.</p>
           </div>
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🚀</div>
              <h3>Future Ready</h3>
              <p>Preparing students for a world driven by AI, Robotics, and IoT.</p>
           </div>
        </div>
      </section>

      {/* MEET THE MICRO:BIT */}
      <section className="section">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Meet the <span style={{ color: '#0b66ff' }}>Micro:bit</span></h2>
        
        <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.2rem', color: '#ccc' }}>
          A pocket-sized programmable micro-computer designed to spark interest in coding and electronics.
        </p>

        {/* TOP ROW: 3 CARDS */}
        <div className="glass-grid">
           {/* 1. Hardware Specs */}
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <img src="/asset/MicrobitBgRemove.png" alt="Microbit Hardware" style={{ height: '120px', marginBottom: '15px', objectFit: 'contain' }} />
              <h3>Hardware Power</h3>
              <ul style={{ textAlign: 'left', color: '#aaa', lineHeight: '1.8' }}>
                <li><strong>ARM Processor:</strong> Handles complex logic</li>
                <li><strong>5x5 LED Matrix:</strong> Displays text & numbers</li>
                <li><strong>Sensors:</strong> Compass, Temp & Accelerometer</li>
                <li><strong>Connectivity:</strong> Bluetooth & Radio</li>
              </ul>
           </div>

           {/* 2. Real World Applications */}
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <img src="/asset/RoboticMicro.png" alt="Real Projects" style={{ height: '120px', marginBottom: '15px', objectFit: 'contain' }} />
              <h3>Real Projects</h3>
              <ul style={{ textAlign: 'left', color: '#aaa', lineHeight: '1.8' }}>
                <li><strong>Smart Traffic Lights:</strong> Using logic & timing</li>
                <li><strong>Step Counters:</strong> Using the accelerometer</li>
                <li><strong>AI Integration:</strong> Voice recognition & Robots</li>
                <li><strong>IoT:</strong> Smart Home & City networks</li>
              </ul>
           </div>
           
           {/* 3. Programming */}
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <img src="/asset/MakeCode.png" alt="MakeCode Editor" style={{ height: '120px', marginBottom: '15px', objectFit: 'contain' }} />
              <h3>From Blocks to Text</h3>
              <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '10px', textAlign: 'left' }}>
                We start with <strong>MakeCode</strong> (Graphical Blocks) for beginners.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '15px', textAlign: 'left' }}>
                Advanced students move to <strong>Python & JavaScript</strong> to handle complex text-based coding.
              </p>
           </div>
        </div>

        {/* BOTTOM ROW: 2 WIDE CARDS */}
        <div className="glass-grid" style={{ marginTop: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
           {/* 4. Game Development */}
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎮</div>
              <h3>Game Development</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                Beyond basic code, students create interactive games like Rock-Paper-Scissors and retro arcade styles.
              </p>
           </div>

           {/* 5. Science Experiments */}
           <div className="glass-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔬</div>
              <h3>Science Experiments</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                We use the built-in sensors for real-world data logging, temperature tracking, and physics experiments.
              </p>
           </div>
        </div>

        {/* NEW: Purple Gradient Button */}
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button 
            onClick={() => setPage('microbit')} 
            style={{
              padding: '15px 40px',
              borderRadius: '30px',
              background: 'linear-gradient(90deg, #8e2de2, #4a00e0)',
              color: 'white',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(142, 45, 226, 0.4)',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Learn more about Micro:bit →
          </button>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section">
         <h2>Student Projects</h2>
         <div className="glass-grid">
           {projects.map((proj) => (
             <div key={proj.id} className="glass-card" onClick={() => onSelectProject(proj)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <img src={proj.thumb} alt={proj.title} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} onError={(e) => {e.target.style.display='none'}} />
                <div className="card-title" style={{fontSize: '1.2rem'}}>{proj.title}</div>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>Click to Watch ▶</span>
             </div>
           ))}
         </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2>Book a Workshop</h2>
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
           <p style={{ textAlign: 'center', marginBottom: '20px', color: '#aaa' }}>
             Ready to bring STEM to your school? Fill out the form below.
           </p>
           <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
             {/* Row 1: Name & Phone */}
             <div style={{ display: 'flex', gap: '15px' }}>
               <input type="text" name="name" placeholder="Your Name" required style={{ flex: 1, padding: '15px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
               <input type="tel" name="phone" placeholder="Phone / WhatsApp" required style={{ flex: 1, padding: '15px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
             </div>
             {/* Row 2: Email & Organization */}
             <div style={{ display: 'flex', gap: '15px' }}>
                <input type="email" name="email" placeholder="Email Address" required style={{ flex: 1, padding: '15px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
                <input type="text" name="school" placeholder="School / Org Name" style={{ flex: 1, padding: '15px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }} />
             </div>
             {/* Row 3: Message */}
             <textarea name="message" rows="4" placeholder="Preferred Dates, number of students, or any specific questions..." required style={{ padding: '15px', borderRadius: '8px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}></textarea>
             <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>Send Enquiry</button>
             {result && <div style={{ marginTop: '10px', textAlign: 'center', color: result.includes('Success') ? '#4caf50' : '#f44336' }}>{result}</div>}
           </form>
        </div>
      </section>
    </motion.div>
  );
}

// 2. CURRICULUM PAGE CONTENT
function CurriculumPage({ setPage }) {
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <motion.div 
      className="section" 
      style={{ paddingTop: '150px' }}
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', marginBottom: '20px', fontSize: '1rem' }}>← Back to Home</button>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>The <span className="gradient-text">Roadmap</span></h1>
      <p className="subtitle" style={{ marginBottom: '50px' }}>Our step-by-step curriculum takes students from absolute beginners to confident inventors.</p>
      
      {/* ROADMAP GRID */}
      <div className="glass-grid">
        {curriculum.map((lesson) => (
          <div key={lesson.id} className="glass-card" style={{ position: 'relative', paddingLeft: '20px' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: lesson.color, color: 'white', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{lesson.id}</div>
            <span style={{ background: `rgba(${lesson.color === '#d62828' ? '214, 40, 40' : '11, 102, 255'}, 0.2)`, color: lesson.color, padding: '4px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>{lesson.level}</span>
            <h3 style={{ marginTop: '10px', marginBottom: '5px' }}>{lesson.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#aaa' }}>{lesson.desc}</p>
            <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>⏱ {lesson.time}</div>
          </div>
        ))}
      </div>

      {/* TEACHING METHOD */}
      <div style={{ marginTop: '80px', marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px' }}>
          Our Teaching <span className="gradient-text">Process</span>
        </h2>
        <div className="glass-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
           {/* Step 1 */}
           <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #0b66ff' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎯</div>
              <h3>1. Theme</h3>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Select engaging topics like Robots or Smart Homes.</p>
           </div>
           {/* Step 2 */}
           <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #d62828' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>✏️</div>
              <h3>2. Design</h3>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Break down complex problems into manageable steps.</p>
           </div>
           {/* Step 3 */}
           <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #0b66ff' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>💻</div>
              <h3>3. Code</h3>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Write logic, test, and debug in real-time.</p>
           </div>
           {/* Step 4 */}
           <div className="glass-card" style={{ textAlign: 'center', borderTop: '4px solid #d62828' }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏆</div>
              <h3>4. Showcase</h3>
              <p style={{ fontSize: '0.9rem', color: '#aaa' }}>Present inventions to build confidence.</p>
           </div>
        </div>
      </div>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>Ready to start?</h2>
        <button onClick={() => setPage('home', 'contact')} className="btn btn-primary">Book Now</button>
      </div>
    </motion.div>
  );
}

// 3. ACTIVITIES PAGE CONTENT
function ActivitiesPage({ setPage }) {
  useEffect(() => { window.scrollTo(0,0); }, []);
  
  const activityImages = Array.from({ length: 12 }, (_, i) => `/asset/Gambar${i + 1}.jpeg`);

  return (
    <motion.div 
      className="section" 
      style={{ paddingTop: '150px' }}
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', marginBottom: '20px', fontSize: '1rem' }}>← Back to Home</button>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px', textAlign: 'center' }}>Classroom <span className="gradient-text">Moments</span></h1>
      
      <p className="subtitle" style={{ textAlign: 'center', margin: '0 auto 30px auto' }}>
        Capturing the excitement of STEM discovery in schools across Johor.
      </p>

      {/* Featured Moment Video (Smaller Size - 500px) */}
      <div style={{ maxWidth: '500px', margin: '0 auto 50px auto', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
         <video 
           src="/asset/VideoMoment.mp4" 
           autoPlay 
           loop 
           muted 
           playsInline 
           style={{ width: '100%', borderRadius: '10px', display: 'block' }} 
         />
      </div>
      
      <div className="glass-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {activityImages.map((src, index) => (
          <div key={index} className="glass-card" style={{ padding: '10px', overflow: 'hidden' }}>
            <img 
              src={src} 
              alt={`Activity ${index + 1}`} 
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
              onError={(e) => e.target.style.display = 'none'} 
            />
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>Want to join the fun?</h2>
        <button onClick={() => setPage('home', 'contact')} className="btn btn-primary">Book Now</button>
      </div>
    </motion.div>
  );
}

// 4. MICROBIT PAGE CONTENT
function MicrobitPage({ setPage }) {
  useEffect(() => { window.scrollTo(0,0); }, []);

  return (
    <motion.div 
      className="section" 
      style={{ paddingTop: '150px' }}
      variants={pageVariants} 
      initial="initial" 
      animate="animate" 
      exit="exit" 
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => setPage('home')} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', marginBottom: '20px', fontSize: '1rem' }}>← Back to Home</button>
      <h1 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center' }}>The Power of <span style={{ color: '#0b66ff' }}>Micro:bit</span></h1>

      {/* 1. ABOUT MICROBIT */}
      <section className="section" style={{ padding: '0' }}>
        <div className="glass-card" style={{ textAlign: 'center' }}>
           <img src="/asset/MicrobitBgRemove.png" alt="Microbit" style={{ height: '180px', marginBottom: '20px' }} />
           <h2 style={{ border: 'none', marginBottom: '15px' }}>What is Micro:bit?</h2>
           <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: '#ddd' }}>
             The BBC micro:bit is a pocket-sized programmable micro-computer designed to spark interest in coding and electronics. 
             It is the perfect brain for robots, musical instruments, and digital pets.
           </p>
        </div>
      </section>

      {/* 2. SPECIFICATIONS */}
      <section className="section">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Technical <span className="gradient-text">Specs</span></h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
           <img src="/asset/microbitNoBg.png" alt="Specs" style={{ height: '250px', objectFit: 'contain' }} />
           <ul style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '2', color: '#ccc' }}>
             <li>🧠 <strong>Processor:</strong> 32-bit ARM Cortex M0 CPU</li>
             <li>💡 <strong>Display:</strong> 5x5 Red LED Matrix (25 LEDs)</li>
             <li>🔘 <strong>Inputs:</strong> 2 Programmable Buttons (A & B)</li>
             <li>📡 <strong>Sensors:</strong> Accelerometer, Compass, Temperature</li>
             <li>📶 <strong>Connectivity:</strong> Bluetooth Low Energy (BLE) & Radio</li>
           </ul>
        </div>
      </section>

      {/* 3. DIAGRAM CONNECTION */}
      <section className="section">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Pin <span className="gradient-text">Diagram</span></h2>
        <div className="glass-card" style={{ padding: '10px', textAlign: 'center' }}>
           <img src="/asset/MICROBIT PIN.jpeg" alt="Pinout Diagram" style={{ width: '100%', maxWidth: '800px', borderRadius: '10px' }} />
        </div>
      </section>

      {/* 4. EXAMPLES & APPLICATION VIDEOS */}
      <section className="section">
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Real World <span className="gradient-text">Applications</span></h2>
        <div className="glass-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
           
           <div className="glass-card" style={{ padding: '10px' }}>
             <video src="/asset/microbitdizplay.mp4" autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '10px' }} />
             <h3 style={{ textAlign: 'center', marginTop: '10px', fontSize: '1.2rem' }}>LED Display</h3>
           </div>

           <div className="glass-card" style={{ padding: '10px' }}>
             <video src="/asset/sensor-bin.mp4" autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '10px' }} />
             <h3 style={{ textAlign: 'center', marginTop: '10px', fontSize: '1.2rem' }}>Smart Sensor Bin</h3>
           </div>

           <div className="glass-card" style={{ padding: '10px' }}>
             <video src="/asset/microbitrobot.mp4" autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '10px' }} />
             <h3 style={{ textAlign: 'center', marginTop: '10px', fontSize: '1.2rem' }}>Robot Control</h3>
           </div>

           <div className="glass-card" style={{ padding: '10px' }}>
             <video src="/asset/MicrobitZenzor.mp4" autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '10px' }} />
             <h3 style={{ textAlign: 'center', marginTop: '10px', fontSize: '1.2rem' }}>Sensor Data Log</h3>
           </div>

        </div>
      </section>

      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem' }}>Start building today!</h2>
        <button onClick={() => setPage('home', 'contact')} className="btn btn-primary">Book Now</button>
      </div>
    </motion.div>
  );
}

// --- MAIN APP ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null); 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page, sectionId = null) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      <div id="canvas-container">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <MicroChip position={[-3, 2, -2]} color="#0b66ff" speed={0.4} />
          <MicroChip position={[4, -2, -3]} color="#0b66ff" speed={0.3} />
          <MicroChip position={[3, 1, -1]} color="#d62828" speed={0.5} />
          <MicroChip position={[-4, -1, -2]} color="#d62828" speed={0.2} />
          <EffectComposer><Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} intensity={1.5} /></EffectComposer>
        </Canvas>
      </div>

      <div id="content-scroll">
        <nav style={{
          position: 'fixed', top: 0, left: 0, width: '100%', padding: '20px 40px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100,
          background: 'rgba(5, 5, 5, 0.8)', backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.1)', boxSizing: 'border-box'
        }}>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => handleNav('home')}>
            <img src="/asset/Aeg logo.png" alt="Logo" style={{ height: '35px' }} /> 
            MICRO<span style={{ color: '#0b66ff' }}>INVENT</span>
          </div>

          <div className="desktop-menu" style={{ display: 'flex', gap: '20px', fontWeight: 600 }}>
            <span onClick={() => handleNav('home')} style={{ color: 'white', cursor: 'pointer' }}>Home</span>
            <span onClick={() => handleNav('curriculum')} style={{ color: 'white', cursor: 'pointer' }}>Curriculum</span>
            <span onClick={() => handleNav('activities')} style={{ color: 'white', cursor: 'pointer' }}>Activities</span>
            <span onClick={() => handleNav('microbit')} style={{ color: 'white', cursor: 'pointer' }}>Microbit</span>
            <span onClick={() => handleNav('home', 'contact')} style={{ color: '#d62828', textDecoration: 'none', cursor: 'pointer' }}>Contact</span>
          </div>

          <div className="mobile-menu-btn" style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? '✕' : '☰'}
          </div>
        </nav>

        {mobileMenuOpen && (
          <div style={{
            position: 'fixed', top: '75px', left: 0, width: '100%', height: '100vh',
            background: 'rgba(0,0,0,0.95)', zIndex: 99, display: 'flex', flexDirection: 'column',
            alignItems: 'center', paddingTop: '50px', gap: '30px', fontSize: '1.5rem', fontWeight: 'bold'
          }}>
            <span onClick={() => handleNav('home')} style={{ color: 'white' }}>Home</span>
            <span onClick={() => handleNav('curriculum')} style={{ color: 'white' }}>Curriculum</span>
            <span onClick={() => handleNav('activities')} style={{ color: 'white' }}>Activities</span>
            <span onClick={() => handleNav('microbit')} style={{ color: 'white' }}>Microbit</span>
            <span onClick={() => handleNav('home', 'contact')} style={{ color: '#d62828', textDecoration: 'none' }}>Contact</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" setPage={handleNav} onSelectProject={setSelectedProject} />}
          {currentPage === 'curriculum' && <CurriculumPage key="curriculum" setPage={handleNav} />}
          {currentPage === 'activities' && <ActivitiesPage key="activities" setPage={handleNav} />}
          {currentPage === 'microbit' && <MicrobitPage key="microbit" setPage={handleNav} />}
        </AnimatePresence>

        {/* --- FOOTER (END RIBBON) --- */}
        <footer style={{ 
          marginTop: '80px',
          padding: '40px 20px', 
          background: 'linear-gradient(to top, #000000, rgba(11, 102, 255, 0.1))', 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#aaa',
          fontSize: '0.9rem',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            
            <div style={{ textAlign: 'left', flex: '1 1 300px' }}>
              <h3 style={{ color: 'white', marginBottom: '10px', fontSize: '1.2rem' }}>AEG Global</h3>
              <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Advance Edutech Global</p>
              <p style={{ margin: '5px 0', maxWidth: '300px', lineHeight: '1.5' }}>
                G-17,1-17,2-17, Block C, Jalan Permas Utara,<br/> 
                Bandar Baru Permas Jaya, 81750 Masai, Johor.
              </p>
            </div>

            <div style={{ textAlign: 'left', flex: '1 1 200px' }}>
              <h4 style={{ color: 'white', marginBottom: '10px' }}>Contact Us</h4>
              <p style={{ margin: '5px 0' }}>📞 012-512 3026</p>
              <p style={{ margin: '5px 0' }}>✉️ aeg.johor@gmail.com</p>
            </div>

          </div>
          
          <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem' }}>
            © 2025 AEG Global. All Rights Reserved.
          </div>
        </footer>
      </div>

      {selectedProject && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} onClick={() => setSelectedProject(null)}>
          <div style={{ padding: '20px', maxWidth: '380px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '10px', textAlign: 'center', fontSize: '1.5rem' }}>{selectedProject.title}</h2>
            {selectedProject.type === 'video' ? (
              <video controls autoPlay style={{ width: '100%', borderRadius: '10px', boxShadow: '0 0 20px rgba(11,102,255,0.3)' }}><source src={selectedProject.src} type="video/mp4" /></video>
            ) : (
              <img src={selectedProject.src} alt="Project" style={{ width: '100%', borderRadius: '10px', boxShadow: '0 0 20px rgba(11,102,255,0.3)' }} />
            )}
            <button onClick={() => setSelectedProject(null)} className="btn btn-secondary" style={{ marginTop: '20px', width: '100%', padding: '10px' }}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}