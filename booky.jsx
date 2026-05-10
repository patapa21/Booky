import { useState } from "react";

const BRANCHES = [
  { id: "b1", name: "BGC Flagship", address: "Lower Ground Floor, SM Aura Premier, BGC, Taguig City", phone: "63915-484-7080", hours: "Mon – Sun  10:00 AM – 10:00 PM" },
  { id: "b2", name: "Makati Glorietta", address: "Level 3, Glorietta 4, Ayala Center, Makati City", phone: "63917-321-5500", hours: "Mon – Sun  10:00 AM – 9:00 PM" },
  { id: "b3", name: "Ortigas Megamall", address: "Building A, Level 4, SM Megamall, Ortigas Center, Mandaluyong", phone: "63918-845-2200", hours: "Mon – Sun  10:00 AM – 9:30 PM" },
  { id: "b4", name: "Quezon City Trinoma", address: "Level 2, TriNoma Mall, North EDSA, Quezon City", phone: "63916-774-9900", hours: "Mon – Sun  10:00 AM – 9:00 PM" },
  { id: "b5", name: "Alabang Town Center", address: "Ground Floor, Alabang Town Center, Muntinlupa City", phone: "63919-663-1100", hours: "Mon – Sun  10:00 AM – 9:00 PM" },
];

const SERVICES_CATEGORIES = [
  { id: "consultation", label: "Consultation", services: [
    { id: "s1", name: "Color Consultation", price: 0, duration: 15, desc: "Speak with one of our color experts about your hair goals and the steps needed to achieve them." },
    { id: "s2", name: "Cut & Color Consultation", price: 0, duration: 15, desc: "A full makeover consultation — our experts guide you through both cut and color goals." },
    { id: "s3", name: "Cut Consultation", price: 0, duration: 15, desc: "Our expert will walk you through the steps to achieve your ideal cut." },
  ]},
  { id: "finish", label: "Signature Finish", services: [
    { id: "s4", name: "Blowout & Style", price: 0, duration: 45, desc: "A professional blowout tailored to your hair type and style preference." },
    { id: "s5", name: "Special Occasion Updo", price: 0, duration: 60, desc: "Elegant updo styling for weddings, galas, or any special event." },
  ]},
  { id: "cut", label: "Signature Cut", services: [
    { id: "s6", name: "Women's Cut", price: 0, duration: 60, desc: "A precision cut by our expert stylists, tailored to your face shape and lifestyle." },
    { id: "s7", name: "Men's Cut", price: 0, duration: 30, desc: "A clean, precise cut designed to complement your style." },
  ]},
  { id: "colour", label: "Signature Colour", services: [
    { id: "s8", name: "Full Colour", price: 0, duration: 90, desc: "All-over colour application for a completely refreshed look." },
    { id: "s9", name: "Root Touch-Up", price: 0, duration: 60, desc: "Targeted colour application to seamlessly blend regrowth." },
  ]},
  { id: "highlights", label: "Highlights", services: [
    { id: "s10", name: "Full Highlights", price: 0, duration: 120, desc: "Dimensional highlights throughout for a sun-kissed or bold effect." },
    { id: "s11", name: "Partial Highlights", price: 0, duration: 75, desc: "Strategic highlights framing the face and top sections." },
    { id: "s12", name: "Balayage", price: 0, duration: 150, desc: "Hand-painted colour for a natural, blended gradient look." },
  ]},
  { id: "texture", label: "Texture", services: [
    { id: "s13", name: "Keratin Treatment", price: 0, duration: 120, desc: "Smooth and strengthen hair with a professional keratin treatment." },
    { id: "s14", name: "Perm", price: 0, duration: 150, desc: "Add lasting waves or curls with a professional perm service." },
  ]},
  { id: "treatments", label: "Treatments", services: [
    { id: "s15", name: "Deep Conditioning", price: 0, duration: 30, desc: "Intensive moisture treatment to restore shine and softness." },
    { id: "s16", name: "Scalp Treatment", price: 0, duration: 45, desc: "Targeted scalp care to promote health and balance." },
  ]},
];

const PROVIDERS = [
  { id: "any", name: "Any Available" },
  { id: "p1", name: "Bless" },
  { id: "p2", name: "Gian" },
  { id: "p3", name: "Hazel Jane Baradia" },
  { id: "p4", name: "Jessica Riva" },
  { id: "p5", name: "Maricel Bernales" },
  { id: "p6", name: "Zaldie Junio" },
];

const DAYS_SHORT = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const DAYS_LONG  = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function generateTimeSlots() {
  const slots = [];
  for (let h = 10; h <= 21; h++) {
    for (let m = 0; m < 60; m += 15) {
      const ampm = h < 12 ? "AM" : "PM";
      const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const min  = String(m).padStart(2, "0");
      slots.push(`${hour}:${min} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS    = generateTimeSlots();
const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
const getFirstDay    = (y, m) => new Date(y, m, 1).getDay();

const BTN = {
  primary:   { background:"#000", color:"#fff", border:"1px solid #000", borderRadius:0, padding:"11px 28px", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer" },
  secondary: { background:"transparent", color:"var(--color-text-primary)", border:"1px solid var(--color-border-primary)", borderRadius:0, padding:"11px 20px", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"pointer" },
  disabled:  { background:"var(--color-background-secondary)", color:"var(--color-text-secondary)", border:"1px solid var(--color-border-tertiary)", borderRadius:0, padding:"11px 28px", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", cursor:"not-allowed" },
};
const LABEL = { fontSize:10, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--color-text-secondary)", margin:"0 0 6px", display:"block" };
const DIVIDER_ROW = { display:"flex", alignItems:"center", gap:12, margin:"0 0 14px" };
const DIVIDER_LINE = { flex:1, height:1, background:"var(--color-border-tertiary)" };
const SECTION_TITLE = { fontSize:10, fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--color-text-primary)", margin:0 };

export default function Booky() {
  const today = new Date();
  const [step, setStep]                   = useState(1);
  const [branch, setBranch]               = useState(BRANCHES[0]);
  const [branchOpen, setBranchOpen]       = useState(false);
  const [activeCategory, setActiveCategory] = useState("consultation");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [calYear, setCalYear]             = useState(today.getFullYear());
  const [calMonth, setCalMonth]           = useState(today.getMonth());
  const [selectedDay, setSelectedDay]     = useState(
    today.getDate() + 1 <= getDaysInMonth(today.getFullYear(), today.getMonth())
      ? today.getDate() + 1 : today.getDate()
  );
  const [selectedTime, setSelectedTime]   = useState("10:00 AM");
  const [note, setNote]                   = useState("");
  const [confirmed, setConfirmed]         = useState(false);

  const currentCat   = SERVICES_CATEGORIES.find(c => c.id === activeCategory);
  const daysInMonth  = getDaysInMonth(calYear, calMonth);
  const firstDay     = getFirstDay(calYear, calMonth);
  const canPrevMonth = !(calYear === today.getFullYear() && calMonth === today.getMonth());

  const prevMonth = () => {
    if (!canPrevMonth) return;
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else setCalMonth(m => m - 1);
    setSelectedDay(1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else setCalMonth(m => m + 1);
    setSelectedDay(1);
  };
  const isDisabled = (day) =>
    new Date(calYear, calMonth, day) <= new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const formatDate = () => {
    const d = new Date(calYear, calMonth, selectedDay);
    return `${DAYS_LONG[d.getDay()]}, ${selectedDay} ${MONTHS[calMonth]} ${calYear}`;
  };

  const reset = () => { setConfirmed(false); setStep(1); setSelectedService(null); setSelectedProvider(null); setNote(""); };

  /* ── CONFIRMED ── */
  if (confirmed) return (
    <div style={{minHeight:"100vh", background:"#f4f3f0", fontFamily:"var(--font-sans)"}}>
      <nav style={{background:"#000",height:44,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",borderBottom:"1px solid #1a1a1a"}}>
        <span style={{color:"#fff",fontWeight:700,fontSize:15,letterSpacing:"0.16em"}}>BOOKY</span>
        <div style={{display:"flex",gap:28}}>{["Services","Find Us","Sign In"].map(l=><span key={l} style={{color:"rgba(255,255,255,0.45)",fontSize:10,letterSpacing:"0.12em",cursor:"pointer",textTransform:"uppercase"}}>{l}</span>)}</div>
      </nav>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"4rem 2rem",minHeight:"calc(100vh - 44px)"}}>
        <div style={{background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)",borderRadius:0,padding:"3rem",maxWidth:460,width:"100%"}}>
          <div style={{width:36,height:36,background:"#000",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.5rem"}}>
            <i className="ti ti-check" style={{color:"#fff",fontSize:16}} aria-hidden="true"></i>
          </div>
          <span style={{...LABEL, marginBottom:6}}>Appointment requested</span>
          <h2 style={{fontSize:22,fontWeight:500,margin:"0 0 2rem",color:"var(--color-text-primary)",lineHeight:1.25}}>We'll confirm your booking shortly.</h2>
          <div style={{borderTop:"1px solid var(--color-border-tertiary)",paddingTop:"1.25rem",marginBottom:"2rem"}}>
            {[["Branch",branch.name],["Service",selectedService?.name],["Provider",PROVIDERS.find(p=>p.id===selectedProvider)?.name],["When",`${formatDate()} · ${selectedTime}`],note&&["Note",note]].filter(Boolean).map(([k,v])=>(
              <div key={k} style={{display:"flex",gap:16,padding:"9px 0",borderBottom:"1px solid var(--color-border-tertiary)"}}>
                <span style={{fontSize:10,color:"var(--color-text-secondary)",letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:700,width:68,flexShrink:0,paddingTop:1}}>{k}</span>
                <span style={{fontSize:13,color:"var(--color-text-primary)",fontWeight:500,lineHeight:1.4}}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={reset} style={BTN.primary}>Book Another Appointment</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#f4f3f0",fontFamily:"var(--font-sans)"}}>
      {/* NAV */}
      <nav style={{background:"#000",height:44,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 2rem",borderBottom:"1px solid #1a1a1a"}}>
        <span style={{color:"#fff",fontWeight:700,fontSize:15,letterSpacing:"0.16em"}}>BOOKY</span>
        <div style={{display:"flex",gap:28}}>{["Services","Find Us","Sign In"].map(l=><span key={l} style={{color:"rgba(255,255,255,0.45)",fontSize:10,letterSpacing:"0.12em",cursor:"pointer",textTransform:"uppercase"}}>{l}</span>)}</div>
      </nav>

      <div style={{maxWidth:1080,margin:"0 auto",padding:"2rem 1.5rem",display:"grid",gridTemplateColumns:"1fr 272px",gap:"2rem",alignItems:"start"}}>

        {/* ── MAIN ── */}
        <div>
          {/* Branch selector */}
          <div style={{marginBottom:"2rem",position:"relative"}}>
            <span style={LABEL}>Branch</span>
            <div onClick={()=>setBranchOpen(o=>!o)}
              style={{background:"var(--color-background-primary)",border:`1px solid ${branchOpen?"#000":"var(--color-border-tertiary)"}`,borderRadius:0,
                padding:"12px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",
                transition:"border-color 0.15s"}}>
              <div>
                <p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)",letterSpacing:"0.02em"}}>{branch.name}</p>
                <p style={{margin:"3px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>{branch.address}</p>
              </div>
              <i className={`ti ti-chevron-${branchOpen?"up":"down"}`} style={{fontSize:14,color:"var(--color-text-secondary)",flexShrink:0,marginLeft:12}} aria-hidden="true"></i>
            </div>
            {branchOpen && (
              <div style={{position:"absolute",top:"calc(100% - 1px)",left:0,right:0,zIndex:999,
                background:"#fff",border:"1px solid #000",borderTop:"1px solid #ddd",
                boxShadow:"0 8px 24px rgba(0,0,0,0.18)"}}>
                {BRANCHES.map((b,i)=>{
                  const sel = branch.id===b.id;
                  return (
                    <div key={b.id} onClick={()=>{setBranch(b);setBranchOpen(false);}}
                      style={{padding:"12px 16px",borderBottom:i<BRANCHES.length-1?"1px solid var(--color-border-tertiary)":"none",
                        cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",
                        background:sel?"#000":"transparent",transition:"background 0.1s"}}>
                      <div>
                        <p style={{margin:0,fontSize:12,fontWeight:700,color:sel?"#fff":"var(--color-text-primary)",letterSpacing:"0.02em"}}>{b.name}</p>
                        <p style={{margin:"3px 0 0",fontSize:11,color:sel?"rgba(255,255,255,0.5)":"var(--color-text-secondary)"}}>{b.address}</p>
                      </div>
                      {sel && <i className="ti ti-check" style={{fontSize:14,color:"#fff",flexShrink:0,marginLeft:12}} aria-hidden="true"></i>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Step progress */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:1,marginBottom:"2rem",background:"var(--color-border-tertiary)"}}>
            {["Select Service","Choose Provider","Date & Time"].map((label,i)=>{
              const s=i+1, done=step>s, active=step===s;
              return (
                <div key={s} onClick={()=>done&&setStep(s)}
                  style={{background:active?"#000":done?"#1a1a1a":"var(--color-background-primary)",padding:"10px 14px",cursor:done?"pointer":"default",transition:"background 0.15s"}}>
                  <p style={{margin:0,fontSize:10,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",
                    color:active?"#fff":done?"rgba(255,255,255,0.7)":"var(--color-text-secondary)",display:"flex",alignItems:"center",gap:6}}>
                    <span style={{width:16,height:16,border:`1px solid ${(active||done)?"rgba(255,255,255,0.3)":"var(--color-border-tertiary)"}`,
                      display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:(active||done)?"#fff":"var(--color-text-secondary)",flexShrink:0}}>
                      {done ? <i className="ti ti-check" style={{fontSize:9}} aria-hidden="true"></i> : s}
                    </span>
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ── STEP 1 ── */}
          {step===1 && (
            <div>
              <div style={DIVIDER_ROW}>
                <p style={SECTION_TITLE}>Select a Service</p>
                <div style={DIVIDER_LINE}></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"148px 1fr",border:"1px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",overflow:"hidden"}}>
                <div style={{borderRight:"1px solid var(--color-border-tertiary)"}}>
                  {SERVICES_CATEGORIES.map((cat,i)=>(
                    <div key={cat.id} onClick={()=>setActiveCategory(cat.id)}
                      style={{padding:"11px 14px",fontSize:10,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",cursor:"pointer",
                        background:activeCategory===cat.id?"#000":"transparent",
                        color:activeCategory===cat.id?"#fff":"var(--color-text-primary)",
                        borderBottom:i<SERVICES_CATEGORIES.length-1?"1px solid var(--color-border-tertiary)":"none",
                        transition:"all 0.1s"}}>
                      {cat.label}
                    </div>
                  ))}
                </div>
                <div>
                  {currentCat?.services.map((svc,i)=>{
                    const sel=selectedService?.id===svc.id;
                    return (
                      <div key={svc.id} onClick={()=>setSelectedService(svc)}
                        style={{padding:"14px 18px",borderBottom:i<currentCat.services.length-1?"1px solid var(--color-border-tertiary)":"none",
                          cursor:"pointer",display:"flex",alignItems:"flex-start",gap:14,
                          background:sel?"#f8f8f6":"transparent",transition:"background 0.1s"}}>
                        <div style={{flex:1}}>
                          <p style={{margin:"0 0 4px",fontWeight:700,fontSize:13,color:"var(--color-text-primary)",letterSpacing:"0.01em"}}>{svc.name}</p>
                          <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)",lineHeight:1.6}}>{svc.desc}</p>
                        </div>
                        <div style={{textAlign:"right",flexShrink:0,paddingTop:2}}>
                          <p style={{margin:"0 0 2px",fontSize:12,fontWeight:700,color:"var(--color-text-primary)"}}>₱{svc.price.toFixed(2)}</p>
                          <p style={{margin:"0 0 10px",fontSize:10,color:"var(--color-text-secondary)",letterSpacing:"0.04em"}}>{svc.duration}min</p>
                          <div style={{width:16,height:16,border:`1.5px solid ${sel?"#000":"#aaa"}`,borderRadius:0,
                            background:sel?"#000":"transparent",display:"inline-flex",alignItems:"center",justifyContent:"center",transition:"all 0.1s",flexShrink:0}}>
                            {sel && <i className="ti ti-check" style={{color:"#fff",fontSize:9}} aria-hidden="true"></i>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={{marginTop:"1.25rem",display:"flex",justifyContent:"flex-end"}}>
                <button onClick={()=>selectedService&&setStep(2)} style={selectedService?BTN.primary:BTN.disabled}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step===2 && (
            <div>
              <div style={{display:"flex",alignItems:"stretch",marginBottom:"1.5rem",border:"1px solid var(--color-border-tertiary)"}}>
                <div style={{width:3,background:"#000",flexShrink:0}}></div>
                <div style={{flex:1,padding:"12px 16px",background:"var(--color-background-primary)"}}>
                  <p style={{margin:0,fontSize:13,fontWeight:700,color:"var(--color-text-primary)",letterSpacing:"0.01em"}}>{selectedService?.name}</p>
                  <p style={{margin:"2px 0 0",fontSize:11,color:"var(--color-text-secondary)"}}>{selectedService?.duration}min · ₱{selectedService?.price.toFixed(2)}</p>
                </div>
                <button onClick={()=>setStep(1)} style={{background:"none",border:"none",borderLeft:"1px solid var(--color-border-tertiary)",
                  padding:"0 16px",fontSize:10,color:"var(--color-text-secondary)",cursor:"pointer",letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:700}}>
                  Edit
                </button>
              </div>

              <div style={DIVIDER_ROW}>
                <p style={SECTION_TITLE}>Select a Provider</p>
                <div style={DIVIDER_LINE}></div>
              </div>
              <div style={{border:"1px solid var(--color-border-tertiary)",background:"var(--color-background-primary)"}}>
                {PROVIDERS.map((p,i)=>{
                  const sel=selectedProvider===p.id;
                  const initials=p.id==="any"?null:p.name.split(" ").map(w=>w[0]).slice(0,2).join("");
                  return (
                    <div key={p.id} onClick={()=>setSelectedProvider(p.id)}
                      style={{padding:"12px 18px",borderBottom:i<PROVIDERS.length-1?"1px solid var(--color-border-tertiary)":"none",
                        cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",
                        background:sel?"#000":"transparent",transition:"background 0.12s"}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:30,height:30,borderRadius:0,border:`1px solid ${sel?"rgba(255,255,255,0.2)":"var(--color-border-tertiary)"}`,
                          background:sel?"rgba(255,255,255,0.1)":"var(--color-background-secondary)",
                          display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                          fontSize:10,fontWeight:700,color:sel?"#fff":"var(--color-text-primary)",letterSpacing:"0.04em"}}>
                          {p.id==="any" ? <i className="ti ti-users" style={{fontSize:13}} aria-hidden="true"></i> : initials}
                        </div>
                        <span style={{fontSize:13,fontWeight:700,color:sel?"#fff":"var(--color-text-primary)",letterSpacing:"0.01em"}}>{p.name}</span>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:14}}>
                        <span style={{fontSize:11,color:sel?"rgba(255,255,255,0.45)":"var(--color-text-secondary)"}}>₱0.00 · {selectedService?.duration}min</span>
                        <div style={{width:16,height:16,border:`1.5px solid ${sel?"rgba(255,255,255,0.6)":"#aaa"}`,borderRadius:0,
                          background:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          {sel && <i className="ti ti-check" style={{color:"#fff",fontSize:9}} aria-hidden="true"></i>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{marginTop:"1.25rem",display:"flex",justifyContent:"space-between"}}>
                <button onClick={()=>setStep(1)} style={BTN.secondary}>← Back</button>
                <button onClick={()=>selectedProvider&&setStep(3)} style={selectedProvider?BTN.primary:BTN.disabled}>Continue →</button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ── */}
          {step===3 && (
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:"1px solid var(--color-border-tertiary)",marginBottom:"1.5rem",background:"var(--color-background-primary)"}}>
                {[{icon:"ti-scissors",label:"Service",val:selectedService?.name},{icon:"ti-user",label:"Provider",val:PROVIDERS.find(p=>p.id===selectedProvider)?.name}].map((item,i)=>(
                  <div key={item.label} style={{padding:"10px 16px",borderRight:i===0?"1px solid var(--color-border-tertiary)":"none"}}>
                    <p style={{margin:"0 0 2px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--color-text-secondary)"}}>{item.label}</p>
                    <p style={{margin:0,fontSize:12,fontWeight:700,color:"var(--color-text-primary)",display:"flex",alignItems:"center",gap:5}}>
                      <i className={`ti ${item.icon}`} style={{fontSize:12}} aria-hidden="true"></i>{item.val}
                    </p>
                  </div>
                ))}
              </div>

              <div style={DIVIDER_ROW}>
                <p style={SECTION_TITLE}>Select Date & Time</p>
                <div style={DIVIDER_LINE}></div>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:"1px solid var(--color-border-tertiary)",background:"var(--color-border-tertiary)",gap:1,marginBottom:"1.25rem"}}>
                {/* Calendar */}
                <div style={{background:"var(--color-background-primary)",padding:"1.25rem"}}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                    <button onClick={prevMonth} disabled={!canPrevMonth}
                      style={{background:"none",border:"1px solid var(--color-border-tertiary)",width:26,height:26,borderRadius:0,padding:0,
                        cursor:canPrevMonth?"pointer":"not-allowed",display:"flex",alignItems:"center",justifyContent:"center",
                        color:canPrevMonth?"var(--color-text-primary)":"var(--color-border-tertiary)"}}>
                      <i className="ti ti-chevron-left" style={{fontSize:11}} aria-hidden="true"></i>
                    </button>
                    <span style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"var(--color-text-primary)"}}>{MONTHS[calMonth].slice(0,3)} {calYear}</span>
                    <button onClick={nextMonth}
                      style={{background:"none",border:"1px solid var(--color-border-tertiary)",width:26,height:26,borderRadius:0,padding:0,
                        cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--color-text-primary)"}}>
                      <i className="ti ti-chevron-right" style={{fontSize:11}} aria-hidden="true"></i>
                    </button>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"2px"}}>
                    {DAYS_SHORT.map(d=>(
                      <div key={d} style={{fontSize:9,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",
                        color:"var(--color-text-secondary)",textAlign:"center",padding:"3px 0"}}>{d}</div>
                    ))}
                    {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`}></div>)}
                    {Array(daysInMonth).fill(null).map((_,i)=>{
                      const day=i+1, disabled=isDisabled(day), sel=day===selectedDay;
                      return (
                        <div key={day} onClick={()=>!disabled&&setSelectedDay(day)}
                          style={{fontSize:11,fontWeight:sel?700:400,padding:"7px 2px",textAlign:"center",
                            cursor:disabled?"not-allowed":"pointer",
                            background:sel?"#000":"transparent",
                            color:sel?"#fff":disabled?"var(--color-border-tertiary)":"var(--color-text-primary)",
                            transition:"background 0.1s"}}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div style={{background:"var(--color-background-primary)",display:"flex",flexDirection:"column",overflow:"hidden"}}>
                  <div style={{padding:"10px 16px",background:"#000",flexShrink:0}}>
                    <p style={{margin:0,fontSize:10,fontWeight:700,color:"#fff",letterSpacing:"0.12em",textTransform:"uppercase"}}>{formatDate()}</p>
                  </div>
                  <div style={{overflowY:"auto",flex:1,maxHeight:220}}>
                    {TIME_SLOTS.map((t)=>{
                      const sel=selectedTime===t;
                      return (
                        <div key={t} onClick={()=>setSelectedTime(t)}
                          style={{padding:"10px 16px",borderBottom:"1px solid var(--color-border-tertiary)",cursor:"pointer",
                            display:"flex",alignItems:"center",justifyContent:"space-between",
                            background:sel?"#000":"transparent",transition:"background 0.1s"}}>
                          <span style={{fontSize:12,fontWeight:sel?700:400,color:sel?"#fff":"var(--color-text-primary)",letterSpacing:"0.04em"}}>{t}</span>
                          <div style={{width:14,height:14,border:`1.5px solid ${sel?"rgba(255,255,255,0.5)":"#aaa"}`,borderRadius:0,
                            display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                            {sel && <i className="ti ti-check" style={{color:"#fff",fontSize:8}} aria-hidden="true"></i>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{border:"1px solid var(--color-border-tertiary)",background:"var(--color-background-primary)",padding:"14px 18px",marginBottom:"1.25rem"}}>
                <p style={{margin:"0 0 10px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--color-text-primary)",display:"flex",alignItems:"center",gap:6}}>
                  <i className="ti ti-calendar" style={{fontSize:12}} aria-hidden="true"></i>
                  {formatDate()} · {selectedTime}
                </p>
                <input value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a note for your stylist (optional)"
                  style={{width:"100%",fontSize:12,background:"transparent",border:"1px solid var(--color-border-tertiary)",borderRadius:0,
                    padding:"9px 12px",color:"var(--color-text-primary)",boxSizing:"border-box",outline:"none",fontFamily:"var(--font-sans)"}} />
              </div>

              <div style={{display:"flex",justifyContent:"space-between"}}>
                <button onClick={()=>setStep(2)} style={BTN.secondary}>← Back</button>
                <button onClick={()=>setConfirmed(true)} style={BTN.primary}>Request Appointment</button>
              </div>
            </div>
          )}
        </div>

        {/* ── SIDEBAR ── */}
        <div style={{position:"sticky",top:"1.5rem"}}>
          <div style={{background:"var(--color-background-primary)",border:"1px solid var(--color-border-tertiary)",borderRadius:0,overflow:"hidden"}}>
            <div style={{height:110,background:"#d8d5d0",display:"flex",alignItems:"center",justifyContent:"center",borderBottom:"1px solid var(--color-border-tertiary)"}}>
              <i className="ti ti-building-store" style={{fontSize:32,color:"rgba(0,0,0,0.15)"}} aria-hidden="true"></i>
            </div>
            <div style={{padding:"1.25rem"}}>
              <p style={{margin:"0 0 2px",fontSize:13,fontWeight:700,color:"var(--color-text-primary)",letterSpacing:"0.02em"}}>{branch.name}</p>
              <p style={{margin:"0 0 0",fontSize:11,color:"var(--color-text-secondary)",lineHeight:1.55}}>{branch.address}</p>

              {[{label:"Hours",val:branch.hours},{label:"Phone",val:branch.phone}].map(({label,val})=>(
                <div key={label} style={{borderTop:"1px solid var(--color-border-tertiary)",paddingTop:10,marginTop:10}}>
                  <p style={{margin:"0 0 3px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--color-text-primary)"}}>{label}</p>
                  <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)"}}>{val}</p>
                </div>
              ))}

              <div style={{borderTop:"1px solid var(--color-border-tertiary)",paddingTop:10,marginTop:10}}>
                <p style={{margin:"0 0 4px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--color-text-primary)"}}>Allergy Alert</p>
                <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)",lineHeight:1.6}}>New colour clients must complete a 48-hour allergy test before their appointment.</p>
              </div>

              <div style={{borderTop:"1px solid var(--color-border-tertiary)",paddingTop:10,marginTop:10}}>
                <p style={{margin:"0 0 4px",fontSize:10,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--color-text-primary)"}}>Cancellation</p>
                <p style={{margin:0,fontSize:11,color:"var(--color-text-secondary)",lineHeight:1.6}}>24 hours' notice required to cancel or reschedule your appointment.</p>
              </div>

              <div style={{borderTop:"1px solid var(--color-border-tertiary)",paddingTop:12,marginTop:12}}>
                <a href="https://booky.com/privacy" style={{fontSize:10,color:"var(--color-text-secondary)",letterSpacing:"0.06em",textDecoration:"underline",textTransform:"uppercase",fontWeight:600}}>Privacy Policy ↗</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
