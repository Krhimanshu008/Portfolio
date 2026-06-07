import React, { useState, useRef } from 'react';
import './index.css';

function App() {
  const [showDebate, setShowDebate] = useState(false);
  const [showNovelModal, setShowNovelModal] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const videoRef = useRef(null);

  const handleDebateClick = () => {
    setShowDebate(true);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('_replyto'),
      message: formData.get('message')
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setFormSuccess(true);
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeDebate = () => {
    setShowDebate(false);
  };

  const handleLaptopClick = () => {
    setIsZooming(true);
    setTimeout(() => {
      window.location.href = "https://os.krhimanshu.in";
    }, 600);
  };

  return (
    <div className="dashboard-container" style={{ flexDirection: 'column', height: 'auto', display: 'block' }}>
      
      {/* =========================================
          HERO SECTION (100vh)
          ========================================= */}
      <section className="hero-section">
        {/* CSS Blended Portrait Layer */}
        <div className="hero-portrait">
          <div className="portrait-image"></div>
          <div className="portrait-overlay"></div>
        </div>

        {/* 2D UI Overlay Layer */}
        <div className="ui-layer">
          
          {/* Left Column */}
          <div className="left-col">
            <div className="greeting-wrapper">
              <h1 className="greeting">
                Hi,<br/>
                I'm <span className="greeting-name">Himanshu</span>
              </h1>
            </div>

            <h2 className="role">Finance Professional & Tech Enthusiast</h2>
            
            <a href="#resume" className="hire-btn">
             About Me <span>&darr;</span>
            </a>
            
            <div className="socials">
              <a href="https://www.linkedin.com/in/himanshu-kumar-807598142" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-col">
            <p className="expert-tag">Expert on</p>
            <h3 className="bio-heading">
              Finance, Compliance & Automation<br/>
              
            </h3>
            
            <p className="bio-text">
              Looking for a professional who bridges the gap between complex financial operations and modern tech automation? Let's shake hands.
            </p>

            {/* Laptop SVG */}
            <div className="laptop-wrapper" onClick={handleLaptopClick}>
              <svg className="laptop-svg" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Laptop Body/Screen Border */}
                <rect x="50" y="20" width="700" height="420" rx="20" fill="#2c2c2c" stroke="#444" strokeWidth="4"/>
                <rect x="70" y="40" width="660" height="380" rx="10" fill="#050505" />
                {/* Base */}
                <path d="M20 450 L780 450 A 20 20 0 0 1 800 470 L0 470 A 20 20 0 0 1 20 450 Z" fill="#333" />
                <path d="M350 450 L450 450 L460 460 L340 460 Z" fill="#222" />
                {/* Notch / Camera */}
                <circle cx="400" cy="30" r="4" fill="#000" />
                {/* Screen Content */}
                <foreignObject x="70" y="40" width="660" height="380">
                  <div xmlns="http://www.w3.org/1999/xhtml" className="laptop-screen-html">
                    <div className="os-logo-container">
                      <h3 className="os-logo-text">Experience the Ultimate Web OS</h3>
                    </div>
                    <p className="os-boot-text">Click screen to boot</p>
                  </div>
                </foreignObject>
              </svg>
            </div>

            <div className="chat-bubble" onClick={() => setShowContact(true)}>
              <span>Let's Chat</span>
              <div className="chat-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          RESUME SECTION (Lower Page)
          ========================================= */}
      <section id="resume" className="resume-section">
        {/* Parallax Background */}
        <div className="resume-bg"></div>
        
        <div className="resume-content">
          
          <div className="resume-block">
            <h3>About Me</h3>
            <h4 className="developer-title">Self Proclaimed Developer & Finance Professional</h4>
            <p className="about-text">
              I'm a finance professional who genuinely enjoys the detail work — whether that's untangling a messy ledger, navigating a statutory audit, or building a cleaner compliance process. With 5+ years across CA firms and industry, I've worked across accounting, auditing, taxation, budgeting, MIS reporting, and cost analysis. I'm currently pursuing CA and have a parallel interest in tech — I build tools to automate the repetitive parts of finance work.
            </p>
          </div>

          <div className="resume-block">
            <h3>Types of Work & Results</h3>
            <div className="works-grid">
              
              <div className="work-card">
                <div className="work-header">
                  <h4>Statutory Audits & Financial Ops</h4>
                  <span className="status success">Succeeded</span>
                </div>
                <p>Managed end-to-end statutory audits for corporate clients and oversaw full-cycle financial operations, from books of accounts to audit readiness.</p>
                <div className="result-text"><strong>Result:</strong> Built robust compliance processes and ensured highly accurate regulatory filings.</div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <h4>Tax Compliances & Regulatory Filings</h4>
                  <span className="status success">Succeeded</span>
                </div>
                <p>Handled Multiples of Compliances for Corporates, Individuals and LLPs which includes MCA filings, TDS returns, and GST filings across diverse industries.</p>
                <div className="result-text"><strong>Result:</strong> Achieved timely regulatory compliance and maintained financial integrity for 20+ & 200+ indivuduals clients .</div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <h4>The Failure That Sparked Everything</h4>
                  <span className="status mixed">Failed, but learnt a lot!</span>
                </div>
                <p>Attempted to build complex automated workflows for billing, data entry, and revenue tracking right off the bat.</p>
                <div className="result-text"><strong>Result:</strong> Early iterations struggled with complex edge cases. This pushed me to deeply study coding, fueling my journey as a <strong>Self Proclaimed Developer</strong>!</div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <h4>Management Reporting</h4>
                  <span className="status success">Succeeded</span>
                </div>
                <p>Prepared product-wise profitability statements and revenue analyses presented directly to senior leadership & CEO.</p>
                <div className="result-text"><strong>Result:</strong> Enabled data-driven decisions and streamlined cross-functional workflows.</div>
              </div>

              <div className="work-card">
                <div className="work-header">
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Novel Visualiser — AI Manga Studio
                  </h4>
                  <span className="status mixed">Failed v1 — Active Rebuild</span>
                </div>
                <p>An ambitious pipeline that converts raw novels (EPUB, PDF, TXT) into interactive audio-visual Webtoon experiences — automated scene extraction, AI-generated artwork, and TTS narration.</p>
                <div className="result-text">
                  <strong>Current Status:</strong> Rebuilding with better orchestration. Core database and NLP pipeline functional. <br/>
                  <button onClick={() => setShowNovelModal(true)} style={{ background: 'transparent', border: 'none', color: 'var(--accent-coral)', textDecoration: 'underline', marginTop: '10px', display: 'inline-block', cursor: 'pointer', padding: 0, fontSize: '0.95rem', fontFamily: 'inherit' }}>Read full project details &rarr;</button>
                </div>
              </div>

            </div>
          </div>

          <div className="resume-block">
            <h3>Skills & Tools</h3>
            <div className="skills-grid">
              <div className="skill-category">
                <h4>Financial Ops & Audit</h4>
                <p>Budgeting, forecasting, cost analysis, ratio analysis, MIS reporting, Statutory, Tax, Bank, and Stock audits.</p>
              </div>
              <div className="skill-category">
                <h4>Taxation & Compliance</h4>
                <p>GST compliance & filing, Income Tax (e-filing, audits), TDS/TCS, MCA filings, company incorporation.</p>
              </div>
              <div className="skill-category">
                <h4>Accounting Software</h4>
                <p>Zoho Books, Tally, Busy, Marg, MS Office, LibreOffice.</p>
              </div>
              <div className="skill-category">
                <h4>Tech & Automation</h4>
                <p>Python, JavaScript, HTML/CSS, SQL, RAG, COMFYUI — actively developing.</p>
              </div>
              <div className="skill-category debate-skill-card" onClick={handleDebateClick}>
                <h4>Debate Skill 🎤</h4>
                <p>Click to see my debate in action!</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Debate Skill Mini Tab */}
      {showDebate && (
        <div className="debate-mini-tab">
          <div className="mini-tab-header">
            <h4>Debate Skill 🎤</h4>
            <button className="mini-tab-close" onClick={closeDebate}>&times;</button>
          </div>
          <div className="mini-tab-body">
            <div className="volume-warning" style={{ marginBottom: '10px' }}>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>
                🔊 When i start to loosing debates!
              </p>
            </div>
            <video 
              ref={videoRef}
              src="/Debate Skill.mp4" 
              controls 
              autoPlay 
              className="debate-video"
              style={{ width: '100%', borderRadius: '8px', background: '#000', border: '1px solid rgba(255,255,255,0.1)' }}
            ></video>
          </div>
        </div>
      )}

      {/* Novel Visualiser Modal */}
      {showNovelModal && (
        <div className="project-modal-overlay" onClick={() => setShowNovelModal(false)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setShowNovelModal(false)}>&times;</button>
            <h3>Novel Visualiser — AI Manga Studio</h3>
            <span className="status mixed" style={{ marginBottom: '25px', display: 'inline-block' }}>Failed v1 — Active Rebuild</span>
            
            <p style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '30px' }}>
              An ambitious pipeline that converts raw novels (EPUB, PDF, TXT) into interactive audio-visual Webtoon experiences — automated scene extraction, AI-generated artwork, and TTS narration.
            </p>

            <h4>What Was Built</h4>
            <ul>
              <li><strong>NLP Extraction Pipeline</strong> — spaCy-based extraction of characters, locations, plot events, and mood from raw EPUB files using HTML p-tag parsing and named entity recognition.</li>
              <li><strong>Structured SQLite Schema</strong> — story timeline database storing scenes in sequence order, character state logs (tracking appearance changes across the story), location visual metadata, and media asset references.</li>
              <li><strong>RAG Pipeline (v1 &rarr; v2 architectural shift)</strong> — Initially built a vector-based RAG system using LangChain, with text chunking strategies (recursive character splitting, token-based chunking) and embedding models (OpenAI text-embedding-ada-002 / Google Embedding 2) stored in a vector DB. Hit a core problem: retrieved chunks lost narrative position — the AI had no idea if a scene was chapter 1 or chapter 20, generating contextually wrong image prompts. Rebuilt as a vectorless RAG system using pure SQL context assembly — per-scene snapshots with character current appearance, prev/next scene summaries, mood, and story_progress (0.0–1.0) — eliminating the embedding cost entirely while producing more accurate, story-aware prompts.</li>
              <li><strong>ComfyUI Image Generation</strong> — cloud-accelerated on GCP L4 GPU (24GB VRAM), custom LoRA training with Animagine XL, NetaYume, Pony Diffusion.</li>
              <li><strong>Edge-TTS Integration</strong> — scene-level audio narration generation.</li>
            </ul>

            <h4>What I Learned</h4>
            <ul>
              <li>EPUB internals: spine structure, p-tag extraction, front/back matter filtering.</li>
              <li>spaCy NER limitations and AI validation strategies to correct them.</li>
              <li>Designing databases for narrative data (timeline sequencing, character state over time).</li>
              <li>Why vectorless RAG outperforms vector search for ordered narrative retrieval.</li>
              <li>GCP GPU provisioning, ComfyUI API, LoRA training workflows.</li>
            </ul>

            <h4>Why It Failed</h4>
            <p>
              Orchestrating four independent systems (NLP pipeline, SQL retrieval, ComfyUI API, TTS, web frontend) into a single real-time pipeline exceeded the infrastructure complexity I had planned for. Individual components worked in isolation.
            </p>

            <h4>Current Status</h4>
            <p style={{ marginBottom: 0 }}>
              Rebuilding with better orchestration. Core database and NLP pipeline functional.
            </p>
          </div>
        </div>
      )}

      {/* Zoom Redirect Overlay */}
      {isZooming && (
        <div className="zoom-in-overlay"></div>
      )}

      {/* Contact Form Modal */}
      {showContact && (
        <div className="project-modal-overlay" onClick={() => setShowContact(false)}>
          <div className="contact-modal-content project-modal-content" onClick={(e) => e.stopPropagation()}>
            {formSuccess ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', animation: 'fadeIn 0.5s ease-in', userSelect: 'none', cursor: 'default' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b6b, #ff4757)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(255, 107, 107, 0.3)' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '10px', fontFamily: 'Playfair Display' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '30px' }}>Thank you for reaching out. I'll get back to you shortly.</p>
                <button type="button" onClick={() => { setShowContact(false); setFormSuccess(false); }} className="contact-submit-btn" style={{ cursor: 'pointer', background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b' }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <button className="close-modal-btn" onClick={() => setShowContact(false)}>&times;</button>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '10px', color: '#fff' }}>Let's Chat</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem' }}>
                  Have a project in mind or want to discuss an opportunity? Drop a message below and it will be sent directly to my email!
                </p>
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Your Name" required className="contact-input" />
                  </div>
                  <div className="form-group">
                    <input type="email" name="_replyto" placeholder="Your Email Address" required className="contact-input" />
                  </div>
                  <div className="form-group">
                    <textarea name="message" placeholder="How can I help you?" rows="5" required className="contact-textarea"></textarea>
                  </div>
                  <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message \u2192'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
