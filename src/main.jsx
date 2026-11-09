import React,{useState,useEffect} from 'react';
import{createRoot}from'react-dom/client';
import{MapPin,ArrowRight,ArrowLeft,RotateCcw,CheckCircle2,Navigation,ExternalLink,Search,Building2}from'lucide-react';
import './style.css';

// Campus building names are directory entries, NOT mapped indoor routes.
// Do not imply that a building's floor plan, entrances, or room inventory was verified.
const buildings=[
 {
  "id": "academic-residential-complex",
  "name": "Academic & Residential Complex",
  "area": "East Campus"
 },
 {
  "id": "addams-hall",
  "name": "Addams Hall",
  "area": "East Campus"
 },
 {
  "id": "architecture-and-design-studios",
  "name": "Architecture and Design Studios",
  "area": "East Campus"
 },
 {
  "id": "art-and-exhibition-hall",
  "name": "Art and Exhibition Hall",
  "area": "East Campus"
 },
 {
  "id": "behavioral-sciences-building",
  "name": "Behavioral Sciences Building",
  "area": "East Campus"
 },
 {
  "id": "burnham-hall",
  "name": "Burnham Hall",
  "area": "East Campus"
 },
 {
  "id": "chemical-engineering-building",
  "name": "Chemical Engineering Building",
  "area": "East Campus"
 },
 {
  "id": "co-generation-facility",
  "name": "Co-Generation Facility",
  "area": "East Campus"
 },
 {
  "id": "college-of-urban-planning-public-affairs-hall",
  "name": "College of Urban Planning & Public Affairs Hall",
  "area": "East Campus"
 },
 {
  "id": "computer-design-research-and-learning-center",
  "name": "Computer Design Research and Learning Center",
  "area": "East Campus"
 },
 {
  "id": "credit-union-1-arena",
  "name": "Credit Union 1 Arena",
  "area": "East Campus"
 },
 {
  "id": "douglass-hall",
  "name": "Douglass Hall",
  "area": "East Campus"
 },
 {
  "id": "education-theatre-music-and-social-work",
  "name": "Education, Theatre, Music and Social Work",
  "area": "East Campus"
 },
 {
  "id": "engineering-innovation-building",
  "name": "Engineering Innovation Building",
  "area": "East Campus"
 },
 {
  "id": "engineering-research-facility",
  "name": "Engineering Research Facility",
  "area": "East Campus"
 },
 {
  "id": "flames-athletic-center",
  "name": "Flames Athletic Center",
  "area": "East Campus"
 },
 {
  "id": "grant-hall",
  "name": "Grant Hall",
  "area": "East Campus"
 },
 {
  "id": "henry-hall",
  "name": "Henry Hall",
  "area": "East Campus"
 },
 {
  "id": "jane-addams-hull-house-museum",
  "name": "Jane Addams Hull-House Museum",
  "area": "East Campus"
 },
 {
  "id": "jane-addams-hull-house-dining-hall",
  "name": "Jane Addams' Hull-House Dining Hall",
  "area": "East Campus"
 },
 {
  "id": "jefferson-hall",
  "name": "Jefferson Hall",
  "area": "East Campus"
 },
 {
  "id": "lecture-center-building-a",
  "name": "Lecture Center Building A",
  "area": "East Campus"
 },
 {
  "id": "lecture-center-building-b",
  "name": "Lecture Center Building B",
  "area": "East Campus"
 },
 {
  "id": "lecture-center-building-c",
  "name": "Lecture Center Building C",
  "area": "East Campus"
 },
 {
  "id": "lecture-center-building-d",
  "name": "Lecture Center Building D",
  "area": "East Campus"
 },
 {
  "id": "lecture-center-building-e",
  "name": "Lecture Center Building E",
  "area": "East Campus"
 },
 {
  "id": "lecture-center-building-f",
  "name": "Lecture Center Building F",
  "area": "East Campus"
 },
 {
  "id": "lincoln-hall",
  "name": "Lincoln Hall",
  "area": "East Campus"
 },
 {
  "id": "maxwell-street-parking-structure",
  "name": "Maxwell Street Parking Structure",
  "area": "East Campus"
 },
 {
  "id": "physical-education-building",
  "name": "Physical Education Building",
  "area": "East Campus"
 },
 {
  "id": "physical-plant-building",
  "name": "Physical Plant Building",
  "area": "East Campus"
 },
 {
  "id": "plant-research-laboratory",
  "name": "Plant Research Laboratory",
  "area": "East Campus"
 },
 {
  "id": "richard-j-daley-library",
  "name": "Richard J. Daley Library",
  "area": "East Campus"
 },
 {
  "id": "roosevelt-road-building",
  "name": "Roosevelt Road Building",
  "area": "East Campus"
 },
 {
  "id": "science-engineering-laboratory-east",
  "name": "Science & Engineering Laboratory East",
  "area": "East Campus"
 },
 {
  "id": "science-engineering-laboratory-west",
  "name": "Science & Engineering Laboratory West",
  "area": "East Campus"
 },
 {
  "id": "science-engineering-offices",
  "name": "Science & Engineering Offices",
  "area": "East Campus"
 },
 {
  "id": "science-engineering-south",
  "name": "Science & Engineering South",
  "area": "East Campus"
 },
 {
  "id": "stevenson-hall",
  "name": "Stevenson Hall",
  "area": "East Campus"
 },
 {
  "id": "student-recreation-facility",
  "name": "Student Recreation Facility",
  "area": "East Campus"
 },
 {
  "id": "student-residence-and-commons-courtyard",
  "name": "Student Residence and Commons Courtyard",
  "area": "East Campus"
 },
 {
  "id": "student-residence-and-commons-north",
  "name": "Student Residence and Commons North",
  "area": "East Campus"
 },
 {
  "id": "student-residence-and-commons-south",
  "name": "Student Residence and Commons South",
  "area": "East Campus"
 },
 {
  "id": "student-residence-and-commons-west",
  "name": "Student Residence and Commons West",
  "area": "East Campus"
 },
 {
  "id": "student-services-building",
  "name": "Student Services Building",
  "area": "East Campus"
 },
 {
  "id": "taft-hall",
  "name": "Taft Hall",
  "area": "East Campus"
 },
 {
  "id": "taylor-street-building",
  "name": "Taylor Street Building",
  "area": "East Campus"
 },
 {
  "id": "teaching-excellence-building",
  "name": "Teaching Excellence Building",
  "area": "East Campus"
 },
 {
  "id": "transportation-facility",
  "name": "Transportation Facility",
  "area": "East Campus"
 },
 {
  "id": "uic-police-station",
  "name": "UIC Police Station",
  "area": "East Campus"
 },
 {
  "id": "sce",
  "name": "UIC Student Center East",
  "area": "East Campus"
 },
 {
  "id": "uic-student-center-east-tower",
  "name": "UIC Student Center East Tower",
  "area": "East Campus"
 },
 {
  "id": "uic-theatre",
  "name": "UIC Theatre",
  "area": "East Campus"
 },
 {
  "id": "university-hall",
  "name": "University Hall",
  "area": "East Campus"
 },
 {
  "id": "utilities-building",
  "name": "Utilities Building",
  "area": "East Campus"
 },
 {
  "id": "2242-west-harrison",
  "name": "2242 West Harrison",
  "area": "West Campus"
 },
 {
  "id": "5525-south-pulaski-road-building",
  "name": "5525 South Pulaski Road Building",
  "area": "West Campus"
 },
 {
  "id": "administrative-office-building",
  "name": "Administrative Office Building",
  "area": "West Campus"
 },
 {
  "id": "applied-health-sciences-building",
  "name": "Applied Health Sciences Building",
  "area": "West Campus"
 },
 {
  "id": "benjamin-goldberg-research-center",
  "name": "Benjamin Goldberg Research Center",
  "area": "West Campus"
 },
 {
  "id": "biologic-resources-laboratory",
  "name": "Biologic Resources Laboratory",
  "area": "West Campus"
 },
 {
  "id": "center-for-structural-biology",
  "name": "Center for Structural Biology",
  "area": "West Campus"
 },
 {
  "id": "clinical-sciences-building",
  "name": "Clinical Sciences Building",
  "area": "West Campus"
 },
 {
  "id": "clinical-sciences-north",
  "name": "Clinical Sciences North",
  "area": "West Campus"
 },
 {
  "id": "college-of-dentistry",
  "name": "College of Dentistry",
  "area": "West Campus"
 },
 {
  "id": "college-of-medicine-east-tower",
  "name": "College of Medicine East Tower",
  "area": "West Campus"
 },
 {
  "id": "college-of-medicine-research-building",
  "name": "College of Medicine Research Building",
  "area": "West Campus"
 },
 {
  "id": "college-of-medicine-west",
  "name": "College of Medicine West",
  "area": "West Campus"
 },
 {
  "id": "college-of-medicine-west-tower",
  "name": "College of Medicine West Tower",
  "area": "West Campus"
 },
 {
  "id": "college-of-nursing",
  "name": "College of Nursing",
  "area": "West Campus"
 },
 {
  "id": "college-of-pharmacy",
  "name": "College of Pharmacy",
  "area": "West Campus"
 },
 {
  "id": "disability-health-and-social-policy-building",
  "name": "Disability, Health and Social Policy Building",
  "area": "West Campus"
 },
 {
  "id": "environmental-health-and-safety-offices",
  "name": "Environmental Health and Safety Offices",
  "area": "West Campus"
 },
 {
  "id": "eye-and-ear-infirmary",
  "name": "Eye and Ear Infirmary",
  "area": "West Campus"
 },
 {
  "id": "human-resources-building",
  "name": "Human Resources Building",
  "area": "West Campus"
 },
 {
  "id": "incubator-laboratory-facility",
  "name": "Incubator Laboratory Facility",
  "area": "West Campus"
 },
 {
  "id": "laflin-warehouse-building",
  "name": "Laflin Warehouse Building",
  "area": "West Campus"
 },
 {
  "id": "library-of-the-health-sciences",
  "name": "Library of the Health Sciences",
  "area": "West Campus"
 },
 {
  "id": "lions-of-illinois-eye-research-institute",
  "name": "Lions of Illinois Eye Research Institute",
  "area": "West Campus"
 },
 {
  "id": "marshfield-avenue-building",
  "name": "Marshfield Avenue Building",
  "area": "West Campus"
 },
 {
  "id": "medical-center-administration-building",
  "name": "Medical Center Administration Building",
  "area": "West Campus"
 },
 {
  "id": "medical-sciences-building",
  "name": "Medical Sciences Building",
  "area": "West Campus"
 },
 {
  "id": "mile-square-health-center",
  "name": "Mile Square Health Center",
  "area": "West Campus"
 },
 {
  "id": "molecular-biology-research-building",
  "name": "Molecular Biology Research Building",
  "area": "West Campus"
 },
 {
  "id": "nmr-laboratories",
  "name": "NMR Laboratories",
  "area": "West Campus"
 },
 {
  "id": "neuropsychiatric-institute",
  "name": "Neuropsychiatric Institute",
  "area": "West Campus"
 },
 {
  "id": "on-the-mall",
  "name": "On the Mall",
  "area": "West Campus"
 },
 {
  "id": "outpatient-care-center",
  "name": "Outpatient Care Center",
  "area": "West Campus"
 },
 {
  "id": "paulina-street-building",
  "name": "Paulina Street Building",
  "area": "West Campus"
 },
 {
  "id": "polk-street-residence-hall",
  "name": "Polk Street Residence Hall",
  "area": "West Campus"
 },
 {
  "id": "school-of-public-health-and-psychiatric-institute",
  "name": "School of Public Health and Psychiatric Institute",
  "area": "West Campus"
 },
 {
  "id": "school-of-public-health-west",
  "name": "School of Public Health-West",
  "area": "West Campus"
 },
 {
  "id": "single-student-residence",
  "name": "Single Student Residence",
  "area": "West Campus"
 },
 {
  "id": "student-residence-hall",
  "name": "Student Residence Hall",
  "area": "West Campus"
 },
 {
  "id": "ui-health-specialty-care-building",
  "name": "UI Health Specialty Care Building",
  "area": "West Campus"
 },
 {
  "id": "uic-sport-and-fitness-center",
  "name": "UIC Sport and Fitness Center",
  "area": "West Campus"
 },
 {
  "id": "uic-student-center-west",
  "name": "UIC Student Center West",
  "area": "West Campus"
 },
 {
  "id": "university-of-illinois-hospital",
  "name": "University of Illinois Hospital",
  "area": "West Campus"
 },
 {
  "id": "westside-research-office-building",
  "name": "Westside Research Office Building",
  "area": "West Campus"
 },
 {
  "id": "1253-south-halsted-street",
  "name": "1253 South Halsted Street",
  "area": "South Campus"
 },
 {
  "id": "1309-south-halsted-street",
  "name": "1309 South Halsted Street",
  "area": "South Campus"
 },
 {
  "id": "1333-south-halsted-street",
  "name": "1333 South Halsted Street",
  "area": "South Campus"
 },
 {
  "id": "722-west-maxwell-street",
  "name": "722 West Maxwell Street",
  "area": "South Campus"
 },
 {
  "id": "curtis-granderson-stadium",
  "name": "Curtis Granderson Stadium",
  "area": "South Campus"
 },
 {
  "id": "flames-field-press-box",
  "name": "Flames Field Press Box",
  "area": "South Campus"
 },
 {
  "id": "isadore-and-sadie-dorin-forum",
  "name": "Isadore and Sadie Dorin Forum",
  "area": "South Campus"
 },
 {
  "id": "james-j-stukel-towers",
  "name": "James J. Stukel Towers",
  "area": "South Campus"
 },
 {
  "id": "marie-robinson-hall",
  "name": "Marie Robinson Hall",
  "area": "South Campus"
 },
 {
  "id": "thomas-beckham-hall",
  "name": "Thomas Beckham Hall",
  "area": "South Campus"
 }
];
const sceDestinations=[
 {id:'inner',name:'Inner Circle',floor:'2',steps:['Start at the second-floor escalator landing.','Walk behind the escalators toward Inner Circle.','Confirm the Inner Circle sign at the entrance.']},
 {id:'east',name:'East Terrace',floor:'2',steps:['Start at the second-floor escalator landing.','Turn right and walk toward Inner Circle.','Look for the East Terrace entrance on your left.']},
 {id:'west',name:'West Terrace',floor:'2',steps:['Start at the second-floor escalator landing.','Turn left and walk toward Inner Circle.','Look for the West Terrace entrance on your right.']},
 {id:'commuter',name:'Commuter Center',floor:'2',steps:['Start at the second-floor escalator landing.','Turn left and walk into Inner Circle.','Look for the Commuter Center sign near Circle Burger.']},
 {id:'pier',name:'Pier Room',floor:'2',steps:['Start at the second-floor escalator landing.','Check the posted directory for Dunkin’ and use it as a landmark.','Confirm the Pier Room sign near Dunkin’.']},
 {id:'ballroom',name:'Dr. Henley Ballroom (Room 301)',floor:'3',preview:true}
];
const defaultDestinations=[{id:'entrance',name:'Main entrance / information point',floor:'?'},{id:'room',name:'Classroom or office (enter room number)',floor:'?'},{id:'service',name:'Service desk / building directory',floor:'?'}];
function App(){
 const saved=(()=>{try{return JSON.parse(localStorage.getItem('lastturn-campus')||'{}')}catch{return {}}})();
 const [buildingId,setBuildingId]=useState(buildings.some(b=>b.id===saved.buildingId)?saved.buildingId:'sce');
 const [destId,setDestId]=useState(saved.destId||'inner');
 const [startId,setStartId]=useState(saved.startId||'escalator');
 const [room,setRoom]=useState('');const [query,setQuery]=useState('');const [area,setArea]=useState('All campuses');
 const [step,setStep]=useState(0),[started,setStarted]=useState(false),[help,setHelp]=useState(false),[finished,setFinished]=useState(false);
 const [largeText,setLargeText]=useState(false),[mode,setMode]=useState('stairs');
 const building=buildings.find(b=>b.id===buildingId)||buildings[0];
 const isSce=building.id==='sce';const destinations=isSce?sceDestinations:defaultDestinations;
 const dest=destinations.find(d=>d.id===destId)||destinations[0];
 const starts=isSce?[{id:'escalator',name:'Second-floor escalator landing',floor:'2'},{id:'main',name:'Main entrance',floor:'1'},{id:'third',name:'Third-floor stairs/elevator landing',floor:'3'}]:[{id:'entrance',name:'Building entrance',floor:'?'},{id:'directory',name:'Posted building directory',floor:'?'}];
 const start=starts.find(s=>s.id===startId)||starts[0];
 useEffect(()=>{try{localStorage.setItem('lastturn-campus',JSON.stringify({buildingId,destId,startId}))}catch{}},[buildingId,destId,startId]);
 const reset=()=>{setStep(0);setStarted(false);setHelp(false);setFinished(false)};
 const changeBuilding=id=>{setBuildingId(id);setDestId(id==='sce'?'inner':'entrance');setStartId(id==='sce'?'escalator':'entrance');setRoom('');reset()};
 const filtered=buildings.filter(b=>(area==='All campuses'||b.area===area)&&`${b.name} ${b.area}`.toLowerCase().includes(query.toLowerCase()));
 const target=dest.id==='room'&&room.trim()?`Room ${room.trim()}`:dest.name;
 const steps=[];
 if(isSce&&dest.steps&&startId==='escalator'){
   dest.steps.forEach(t=>steps.push({text:t,floor:'2',mapped:true}));
 }else if(isSce){
   if(start.floor!==dest.floor)steps.push({text:`Check the posted directory and find the ${mode==='elevator'?'elevator':'stairs'} to floor ${dest.floor}. The connection has not been mapped.`,floor:start.floor,mapped:false});
   steps.push({text:`Locate ${target} using posted floor directories or ask building staff. Do not rely on this preview for hallway turns.`,floor:dest.floor,mapped:false});
   steps.push({text:`Confirm the sign for ${target} before marking arrival.`,floor:dest.floor,mapped:false});
 }else{
   steps.push({text:`At ${building.name}, find the official entrance or information point. Verify the building name on the posted sign.`,floor:'?',mapped:false});
   steps.push({text:`Check the building directory or ask staff for ${target}. Room numbers, floor assignments and corridors are not mapped in this prototype.`,floor:'?',mapped:false});
   steps.push({text:`Follow the building's posted signs and confirm the destination sign before marking arrival.`,floor:'?',mapped:false});
 }
 const next=()=>{setHelp(false);if(step<steps.length-1)setStep(s=>s+1);else setFinished(true)};
 const previous=()=>{setStep(s=>Math.max(0,s-1));setFinished(false);setHelp(false)};
 return <div className={largeText?'large-text':''}><header><div className="brand"><span className="brandicon"><Navigation size={21}/></span><span>Last Turn</span></div><button className="secondary text-toggle" aria-pressed={largeText} onClick={()=>setLargeText(v=>!v)}>{largeText?'Standard text':'Larger text'}</button></header>
 <main><section className="hero"><span className="eyebrow">UIC CAMPUS BUILDING FINDER</span><h1>Find the right building.<br/><em>Then the right room.</em></h1><p>Explore UIC campus buildings, plan your next step, and use clear recovery guidance.</p><div className="address"><Building2 size={17}/> {buildings.length} campus building entries · East, West and South Campus</div></section>
 <div className="layout"><section className="panel"><div className="sectiontitle"><span className="num">01</span><h2>Choose your building</h2></div>
 <label htmlFor="buildingSearch">Search buildings</label><div className="searchbox"><Search size={18}/><input id="buildingSearch" placeholder="Search by building name..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
 <label htmlFor="area">Campus area</label><select id="area" value={area} onChange={e=>setArea(e.target.value)}><option>All campuses</option><option>East Campus</option><option>West Campus</option><option>South Campus</option></select>
 <label htmlFor="building">Building ({filtered.length} matches)</label><select id="building" value={filtered.some(b=>b.id===buildingId)?buildingId:''} onChange={e=>changeBuilding(e.target.value)}><option value="" disabled>Select a matching building</option>{filtered.map(b=><option value={b.id} key={b.id}>{b.name} · {b.area}</option>)}</select>
 <p className="hint">Directory names supplied from the UIC Buildings A–Z list. Indoor routes are not verified for most buildings.</p>
 <label htmlFor="start">Starting point</label><select id="start" value={start.id} onChange={e=>{setStartId(e.target.value);reset()}}>{starts.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
 <label htmlFor="dest">Destination</label><select id="dest" value={dest.id} onChange={e=>{setDestId(e.target.value);reset()}}>{destinations.map(d=><option key={d.id} value={d.id}>{d.name}{d.floor!=='?'?` · Floor ${d.floor}`:''}</option>)}</select>
 {dest.id==='room'&&<><label htmlFor="room">Room number (optional)</label><input className="field" id="room" value={room} maxLength={30} placeholder="e.g. 205" onChange={e=>{setRoom(e.target.value);reset()}}/></>}
 {isSce&&start.floor!==dest.floor&&<><label htmlFor="mode">Floor change preference</label><select id="mode" value={mode} onChange={e=>{setMode(e.target.value);reset()}}><option value="stairs">Stairs</option><option value="elevator">Elevator</option></select></>}
 <div className="floor"><MapPin size={17}/>{building.name} · {building.area}</div>
 <p className="hint">{isSce&&dest.steps&&startId==='escalator'?'Landmark-guided SCE prototype: signs and turns still need on-site verification.':'Planning preview only: no verified indoor turn-by-turn directions for this selection.'}</p>
 <button className="primary" onClick={()=>{reset();setStarted(true)}}>Start guidance <ArrowRight size={17}/></button>
 </section><section className="panel"><div className="sectiontitle"><span className="num">02</span><h2>Your guidance</h2></div>
 {!started?<div className="empty"><Navigation size={36}/><h3>Ready when you are</h3><p>Select a building and destination to see the next steps.</p></div>:finished?<div className="empty success"><CheckCircle2 size={38}/><h3>Destination marked reached</h3><p>You marked {target} as reached. Confirm its actual posted sign.</p><button className="secondary" onClick={reset}>Plan another route</button></div>:<><div className="progress"><span>Step {step+1} of {steps.length}</span><span>{Math.round(step/steps.length*100)}% completed</span></div><div className="track">{steps.map((_,i)=><span key={i} className={i<step?'done':i===step?'active':''}/>)}</div><div className="instruction" aria-live="polite"><span className="stepbadge">{steps[step].mapped?'SCE LANDMARK PROTOTYPE':'UNMAPPED BUILDING PREVIEW'} {steps[step].floor!=='?'?`· FLOOR ${steps[step].floor}`:''}</span><h3>{steps[step].text}</h3><p>{steps[step].mapped?'Check visible landmarks and signs before continuing.':'Exact indoor paths are not verified. Use posted directories or staff assistance.'}</p></div>{help&&<div className="recovery" role="status"><strong>Not sure where to go?</strong><p>Stop at a safe point, return to the last sign you recognized, and consult a posted directory or building staff. This app cannot detect your indoor location.</p><button className="secondary" onClick={previous}><RotateCcw size={15}/> Previous step</button></div>}<div className="actions"><button className="secondary" onClick={()=>setHelp(v=>!v)}><RotateCcw size={16}/>{help?'Hide recovery':'I’m not sure'}</button><button className="primary" onClick={next}>{step===steps.length-1?'I found it':'Continue'} <ArrowRight size={16}/></button></div>{step>0&&<button className="back" onClick={previous}><ArrowLeft size={15}/> Previous step</button>}</>}
 </section></div><section className="footnote"><strong>Coverage and verification</strong><p>Last Turn now lists {buildings.length} UIC buildings across East, West and South Campus. Detailed landmark prompts are available only for selected Student Center East destinations. Other buildings use clearly labeled directory-based planning guidance, not fabricated indoor directions. Building listings, room numbers and accessible routes must be checked against official UIC sources and in person before real-world navigation. Not for emergencies.</p><a href="https://www.uic.edu/about/visit-directions/" target="_blank" rel="noreferrer">UIC visitor and directions information <ExternalLink size={14}/></a></section></main><footer>Last Turn · UIC campus-wide HCI functional prototype · Building directory + SCE pilot</footer></div>;
}
createRoot(document.getElementById('root')).render(<App/>);
