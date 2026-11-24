import React,{useState,useEffect} from 'react';
import{createRoot}from'react-dom/client';
import{MapPin,ArrowRight,ArrowLeft,RotateCcw,CheckCircle2,Navigation,ExternalLink,Search,Building2}from'lucide-react';
import './style.css';

// Campus building names are directory entries, NOT mapped indoor routes.
// Do not imply that a building's floor plan, entrances, or room inventory was verified.
const buildings=[
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
    "id": "grant-hall",
    "name": "Grant Hall",
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
    "id": "teaching-excellence-building",
    "name": "Teaching Excellence Building",
    "area": "East Campus"
  },
  {
    "id": "sce",
    "name": "UIC Student Center East",
    "area": "East Campus"
  }
];
// Location descriptions adapted from UIC Student Centers' official Study Lounges page.
// These are published landmarks, not on-site-verified routes from every starting point.
const buildingNotes={"addams-hall": {"image": "/photos/addams-hall.webp", "note": "Stairs will be on your left and right from entrance.", "source": "Addams hall.pdf"}, "architecture-and-design-studios": {"image": "/photos/architecture-and-design-studios.webp", "note": "Architecture and design studios: First floor: stairs straight, elevator: right and then left Second floor: stairs will be on left", "source": "Architecture and design studios.pdf"}, "art-and-exhibition-hall": {"image": "/photos/art-and-exhibition-hall.webp", "note": "Elevator is left from stairs:", "source": "Art and exhibition hall.pdf"}, "behavioral-sciences-building": {"image": "/photos/behavioral-sciences-building.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "BSB.pdf"}, "burnham-hall": {"image": "/photos/burnham-hall.webp", "note": "First floor: elevator straight from the door, stairs will be on left from entrance.", "source": "Burnham hall.pdf"}, "college-of-urban-planning-public-affairs-hall": {"image": "/photos/college-of-urban-planning-public-affairs-hall.webp", "note": "Stairs and elevator: straight from the door", "source": "College of urban planning.pdf"}, "computer-design-research-and-learning-center": {"image": "/photos/computer-design-research-and-learning-center.webp", "note": "First floor : stairs straight from the door, Elevator straight 10 metres straight from main entrance. Elevator on left, stairs 10 meters straight will be on right.", "source": "CDRLC.pdf"}, "douglass-hall": {"image": "/photos/douglass-hall.webp", "note": "Stairs on the right after you enter. Elevator is available in the grant hall and is accessible to reach the Douglass hall. The bridge connects the 2nd and the 3rd floors of Grant and Douglass hall.", "source": "Douglass hall.pdf"}, "education-theatre-music-and-social-work": {"image": "/photos/education-theatre-music-and-social-work.webp", "note": "Education,Theatre, Music and Social Work Two entrance doors in a row. Stairs on the right side and elevators on the left of the entrance.", "source": "Education,Theatre, Music and Social Work.pdf"}, "engineering-innovation-building": {"image": "/photos/engineering-innovation-building.webp", "note": "Main entrance and posted first- and second-floor plans photographed. The team noted that an elevator can reach Floor 2.", "source": "Engineering Innovation Building.pdf"}, "engineering-research-facility": {"image": "/photos/engineering-research-facility.webp", "note": "Engineering Research Facility Stairs on the right. And for elevators go straight and take a right.", "source": "Engineering Research Facility.pdf"}, "grant-hall": {"image": "/photos/grant-hall.webp", "note": "Elevator is right beside the entrance.And the stairs are straight behind the wall just", "source": "Grant Hall.pdf"}, "lecture-center-building-a": {"image": "/photos/lecture-center-building-a.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lecture center A.pdf"}, "lecture-center-building-b": {"image": "/photos/lecture-center-building-b.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lecture center B.pdf"}, "lecture-center-building-c": {"image": "/photos/lecture-center-building-c.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lecture center C.pdf"}, "lecture-center-building-d": {"image": "/photos/lecture-center-building-d.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lecture center D.pdf"}, "lecture-center-building-e": {"image": "/photos/lecture-center-building-e.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lecture center E.pdf"}, "lecture-center-building-f": {"image": "/photos/lecture-center-building-f.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lecture center F.pdf"}, "lincoln-hall": {"image": "/photos/lincoln-hall.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Lincoln hall.pdf"}, "plant-research-laboratory": {"image": "/photos/plant-research-laboratory.webp", "note": "Main entrance photographed. The team could not enter through the main entrance; no interior route is available.", "source": "Plant research lab.pdf"}, "richard-j-daley-library": {"image": "/photos/richard-j-daley-library.webp", "note": "Entrance and floor reference photos collected; complete room-to-room directions not confirmed.", "source": "Library.pdf"}, "science-engineering-laboratory-east": {"image": "/photos/science-engineering-laboratory-east.webp", "note": "Science and engineering lab east", "source": "Science and engineering lab east.pdf"}, "science-engineering-laboratory-west": {"image": "/photos/science-engineering-laboratory-west.webp", "note": "Science and engineering lab west", "source": "Science and engineering lab west.pdf"}, "science-engineering-offices": {"image": "/photos/science-engineering-offices.webp", "note": "Science and engineering office", "source": "Science and engineering office.pdf"}, "science-engineering-south": {"image": "/photos/science-engineering-south.webp", "note": "First- and second-floor entrance photos and classroom directional signs collected. Classroom 132/136 and lecture rooms 130/138 are left; classrooms 170/174 are right at the photographed sign.", "source": "Science and engineering south.pdf"}, "stevenson-hall": {"image": "/photos/stevenson-hall.webp", "note": "Main entrance and stair areas photographed. Room 220 is beside the second-floor stair landing and Room 320 is near the third-floor stair landing. Full hallway routes are not mapped.", "source": "UIC_Stevenson_Hall_Entrance_Stairs_Reference.pdf"}, "teaching-excellence-building": {"image": "/photos/teaching-excellence-building.webp", "note": "Main entrance photographed. The team could not enter the building; no interior route is available.", "source": "Teaching excellence building.pdf"}, "sce": {"image": "/photos/sce.webp", "note": "Photo documentation includes entrance areas, floor directories, stairs, escalators, and the Floor 2 connection between Student Center East and its tower.", "source": "UIC_SCE_and_SCE_Tower_Complete_Photo_Guide.pdf"}};
const sceSource='https://studentcenters.uic.edu/study-lounges/';
const sceDestinations=[
 {id:'inner',name:'Inner Circle',floor:'2',steps:['At the second-floor escalator landing, turn left or right.','Walk behind the escalators toward the Inner Circle entrance.','Confirm the Inner Circle entrance sign before entering.']},
 {id:'east',name:'East Terrace',floor:'2',steps:['From the second-floor escalator landing, turn right.','Walk toward Inner Circle.','Look for the East Terrace entrance on your left and confirm the sign.']},
 {id:'west',name:'West Terrace',floor:'2',steps:['From the second-floor escalator landing, turn left.','Walk toward Inner Circle.','Look for the West Terrace entrance on your right and confirm the sign.']},
 {id:'commuter',name:'Commuter Center',floor:'2',steps:['From the second-floor escalator landing, turn left.','Walk inside Inner Circle.','Find the door on the right near Circle Burger and confirm the Commuter Center sign.']},
 {id:'pier',name:'Pier Room',floor:'2',steps:['The Pier Room is on Floor 2, beside Dunkin’ Donuts.','Find Dunkin’ Donuts using posted signs or the building directory. The exact hallway turns are not mapped.','Confirm the Pier Room sign beside Dunkin’ Donuts.']},
 {id:'montgomery',name:'Montgomery Lounge',floor:'2',steps:['Montgomery Lounge is on Floor 2 of the Student Center East tower.','Use the posted directory to find the tower and its second floor. The connecting turns are not mapped.','Confirm the Montgomery Lounge sign at the destination.']},
 {id:'circle',name:'Circle Lounge',floor:'1',steps:['Circle Lounge is on Floor 1 of the Student Center East tower.','Use the posted directory to find the tower and its first floor. UIC mentions the elevator; the connecting turns are not mapped.','Confirm the Circle Lounge sign at the destination.']},
 {id:'ballroom',name:'Dr. Henley Ballroom (Room 301)',floor:'3',preview:true}
];
const defaultDestinations=[{id:'entrance',name:'Main entrance / information point',floor:'?'},{id:'room',name:'Classroom or office (enter room number)',floor:'?'},{id:'service',name:'Service desk / building directory',floor:'?'}];
function App(){
 const saved=(()=>{try{return JSON.parse(localStorage.getItem('lastturn-campus')||'{}')}catch{return {}}})();
 const [buildingId,setBuildingId]=useState(buildings.some(b=>b.id===saved.buildingId)?saved.buildingId:'sce');
 const [destId,setDestId]=useState(saved.destId||'inner');
 const [startId,setStartId]=useState('main');
 const [room,setRoom]=useState('');const [query,setQuery]=useState('');const [area,setArea]=useState('All campuses');
 const [step,setStep]=useState(0),[started,setStarted]=useState(false),[help,setHelp]=useState(false),[finished,setFinished]=useState(false);
 const [study,setStudy]=useState(false),[events,setEvents]=useState([]),[participant,setParticipant]=useState(''),[task,setTask]=useState('1'),[confirmed,setConfirmed]=useState(false);
 const log=(action,detail='')=>{if(study)setEvents(old=>[...old,{participant,task,action,detail,time:new Date().toISOString()}])};
 const exportStudy=()=>{const blob=new Blob([JSON.stringify(events,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='last-turn-session.json';a.click();URL.revokeObjectURL(url)};
 const [coverage,setCoverage]=useState('all');
 const [largeText,setLargeText]=useState(false),[mode,setMode]=useState('escalator');
 const building=buildings.find(b=>b.id===buildingId)||buildings[0];
 const isSce=building.id==='sce';const buildingInfo=buildingNotes[building.id];const destinations=isSce?sceDestinations:defaultDestinations;
 const dest=destinations.find(d=>d.id===destId)||destinations[0];
 const starts=isSce?[{id:'main',name:'Main entrance',floor:'1'},{id:'escalator',name:'Second-floor escalator landing',floor:'2'},{id:'third',name:'Third-floor stairs/elevator landing',floor:'3'}]:[{id:'entrance',name:'Building entrance',floor:'?'},{id:'directory',name:'Posted building directory',floor:'?'}];
 const start=starts.find(s=>s.id===startId)||starts[0];
 useEffect(()=>{try{localStorage.setItem('lastturn-campus',JSON.stringify({buildingId,destId,startId}))}catch{}},[buildingId,destId,startId]);
 const reset=()=>{setStep(0);setStarted(false);setHelp(false);setFinished(false);setConfirmed(false)};
 const changeBuilding=id=>{log('building selected',id);setBuildingId(id);setDestId(id==='sce'?'inner':'entrance');setStartId(id==='sce'?'main':'entrance');setRoom('');reset()};
 const filtered=buildings.filter(b=>(area==='All campuses'||b.area===area)&&(coverage==='all'||b.id==='sce')&&`${b.name} ${b.area} ${b.id==='sce'?'SCE Student Center Inner Circle':b.id==='computer-design-research-and-learning-center'?'CDRLC CS computer science':b.id==='behavioral-sciences-building'?'BSB':b.id==='richard-j-daley-library'?'Daley library':b.id.startsWith('lecture-center-building-')?'LC'+b.id.slice(-1):''}`.toLowerCase().includes(query.trim().toLowerCase()));
 const target=dest.id==='room'&&room.trim()?`Room ${room.trim()}`:dest.name;
 const steps=[];
 if(isSce&&dest.id==='inner'&&startId==='main'){
   steps.push({text:`Enter UIC Student Center East through the main entrance. Look for the ${mode==='stairs'?'stairs':'escalators'} on either the left or right side.`,floor:'1',mapped:true,checked:true});
   steps.push({text:`Take the ${mode==='stairs'?'stairs':'escalator'} to Floor 2. At the top, if you came up on the left side, turn left and then left again. If you came up on the right side, turn right and then right again. Continue straight.`,floor:'2',mapped:true,checked:true});
   steps.push({text:'You will see doors on both the left and right sides. Enter through either doorway to reach Inner Circle.',floor:'2',mapped:true,checked:true});
 }else if(isSce&&dest.steps&&startId==='escalator'&&dest.floor==='2'){
   dest.steps.forEach(t=>steps.push({text:t,floor:'2',mapped:true,published:true}));
 }else if(isSce&&dest.steps){
   steps.push({text:`UIC lists ${target} on Floor ${dest.floor}. From ${start.name.toLowerCase()}, use the posted building directory to locate ${dest.floor==='1'?'Floor 1':'Floor 2'} and the relevant landmark. The connecting turns from this starting point are not mapped.`,floor:start.floor,mapped:false,published:true});
   dest.steps.slice(dest.id==='pier'||dest.id==='montgomery'||dest.id==='circle'?1:0).forEach(t=>steps.push({text:t,floor:dest.floor,mapped:false,published:true}));
 }else if(isSce){
   if(start.floor!==dest.floor)steps.push({text:`Check the posted directory and find the ${mode==='elevator'?'elevator':'stairs'} to floor ${dest.floor}. The connection has not been mapped.`,floor:start.floor,mapped:false});
   steps.push({text:`Locate ${target} using posted floor directories or ask building staff. Do not rely on this preview for hallway turns.`,floor:dest.floor,mapped:false});
   steps.push({text:`Confirm the sign for ${target} before marking arrival.`,floor:dest.floor,mapped:false});
 }else{
   steps.push({text:`At ${building.name}, use the photographed entrance reference to identify the building. Verify the building name on the posted sign.`,floor:'?',mapped:false});
   steps.push({text:`Reference from the team visit: ${buildingInfo?.note||"Entrance documented."} For ${target}, confirm any additional turns using posted directories or building staff.`,floor:'?',mapped:false});
   steps.push({text:`Follow the building's posted signs and confirm the destination sign before marking arrival.`,floor:'?',mapped:false});
 }
 const next=()=>{log(step===steps.length-1?'arrival self-confirmed':'step advanced',`${building.name}: ${target}, step ${step+1}`);setConfirmed(false);setHelp(false);if(step<steps.length-1)setStep(s=>s+1);else setFinished(true)};
 const previous=()=>{log('previous step',String(step+1));setConfirmed(false);setStep(s=>Math.max(0,s-1));setFinished(false);setHelp(false)};
 return <div className={largeText?'large-text':''}><header><div className="brand"><span className="brandicon"><Navigation size={21}/></span><span>Last Turn</span></div><button className="secondary text-toggle" aria-pressed={largeText} onClick={()=>setLargeText(v=>!v)}>{largeText?'Standard text':'Larger text'}</button></header>
 <main><section className="hero"><span className="eyebrow">UIC CAMPUS BUILDING FINDER</span><h1>Find the right building.<br/><em>Then the right room.</em></h1><p>Explore UIC campus buildings, plan your next step, and use clear recovery guidance.</p><div className="address"><Building2 size={17}/> {buildings.length} campus building entries · East Campus · documented buildings only</div></section>
 <div className="layout"><section className="panel"><div className="sectiontitle"><span className="num">01</span><h2>Choose your building</h2></div>
 <label htmlFor="buildingSearch">Search buildings</label><div className="searchbox"><Search size={18}/><input id="buildingSearch" placeholder="Search by building name..." value={query} onChange={e=>setQuery(e.target.value)}/></div>
 <label htmlFor="area">Campus area</label><select id="area" value={area} onChange={e=>setArea(e.target.value)}><option>All campuses</option><option>East Campus</option></select>
 <label htmlFor="coverage">Guidance coverage</label><select id="coverage" value={coverage} onChange={e=>{setCoverage(e.target.value);reset()}}><option value="all">All documented buildings</option><option value="route">Buildings with team-checked route (SCE)</option></select><label htmlFor="building">Building ({filtered.length} matches)</label><select id="building" value={filtered.some(b=>b.id===buildingId)?buildingId:''} onChange={e=>changeBuilding(e.target.value)}><option value="" disabled>Select a matching building</option>{filtered.map(b=><option value={b.id} key={b.id}>{b.name} · {b.area}</option>)}</select>
 {filtered.length===0&&<p role="status">No matching buildings. Try a shorter name or clear the filters.</p>}{!filtered.some(b=>b.id===buildingId)&&filtered.length>0&&<p role="status">Select a matching building to continue.</p>}<p className="hint">Only buildings with team-submitted photo documentation are listed. Full indoor directions are available for the SCE Inner Circle demo; other locations provide photo references and planning help.</p>
 <label htmlFor="start">Starting point</label><select id="start" value={start.id} onChange={e=>{setStartId(e.target.value);reset()}}>{starts.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select>
 <label htmlFor="dest">Destination</label><select id="dest" value={dest.id} onChange={e=>{setDestId(e.target.value);log('destination selected',e.target.value);reset()}}>{destinations.map(d=><option key={d.id} value={d.id}>{d.name}{d.floor!=='?'?` · Floor ${d.floor}`:''}</option>)}</select>
 {dest.id==='room'&&<><label htmlFor="room">Room number (optional)</label><input className="field" id="room" value={room} maxLength={30} placeholder="e.g. 205" onChange={e=>{setRoom(e.target.value);reset()}}/></>}
 {isSce&&start.floor!==dest.floor&&<><label htmlFor="mode">Floor change preference</label><select id="mode" value={mode} onChange={e=>{setMode(e.target.value);reset()}}><option value="escalator">Escalator</option><option value="stairs">Stairs</option></select></>}
 <div className="floor"><MapPin size={17}/>{building.name} · {building.area}</div>
 <p className="hint">{isSce&&dest.id==='inner'&&startId==='main'?'Documented demo route: Main entrance to Inner Circle, Floor 2. Follow visible landmarks; this app does not track your position.':isSce&&dest.steps&&startId==='escalator'?'UIC-published landmark guidance; the full route has not been checked by our team. Confirm signs on site.':isSce&&dest.steps?'UIC-published destination information. The full route from this starting point has not been checked on site.':'Planning preview only: no verified indoor turn-by-turn directions for this selection.'}</p>
 <button className="primary" disabled={!filtered.some(b=>b.id===buildingId)} onClick={()=>{reset();log('guidance started',`${building.name}: ${start.name} → ${target}`);setStarted(true);requestAnimationFrame(()=>document.getElementById('guidance')?.scrollIntoView({block:'start'}))}}>Start guidance <ArrowRight size={17}/></button>
 </section><section className="panel" id="guidance"><div className="sectiontitle"><span className="num">02</span><h2>Your guidance</h2></div>
 {!started?<div className="empty"><Navigation size={36}/><h3>Ready when you are</h3><p>Select a building and destination to see the next steps.</p></div>:finished?<div className="empty success"><CheckCircle2 size={38}/><h3>{isSce&&dest.id==='inner'&&startId==='main'?'Inner Circle arrival confirmed by you':'Destination marked reached'}</h3><p>{isSce&&dest.id==='inner'&&startId==='main'?'You completed the documented demo route to Inner Circle on Floor 2.':'You marked '+target+' as reached. Confirm its actual posted sign.'}</p><button className="secondary" onClick={reset}>Plan another route</button></div>:<><div className="route-summary"><strong>{building.name}</strong><span>{start.name} → {target}</span><span>{dest.floor!=='?'?`Destination floor ${dest.floor}`:'Check posted floor directory'}</span></div><div className="progress"><span>Step {step+1} of {steps.length}</span><span>{Math.round(step/steps.length*100)}% completed</span></div><div className="track">{steps.map((_,i)=><span key={i} className={i<step?'done':i===step?'active':''}/>)}</div><div className="instruction" aria-live="polite"><span className="stepbadge">{steps[step].checked?'DOCUMENTED SCE DEMO ROUTE':steps[step].published?'UIC-PUBLISHED LANDMARK GUIDANCE':steps[step].mapped?'SCE LANDMARK PROTOTYPE':'UNMAPPED BUILDING PREVIEW'} {steps[step].floor!=='?'?`· FLOOR ${steps[step].floor}`:''}</span><h3>{steps[step].text}</h3><p>{steps[step].checked?'Confirm the landmark before continuing. Demonstration route provided by the project team; no live indoor positioning.':steps[step].mapped?steps[step].published?'Based on UIC’s published lounge descriptions. Connecting turns may be unmapped; confirm signs on site.':'Check visible landmarks and signs before continuing.':'Exact indoor paths are not verified. Use posted directories or staff assistance.'}</p></div>{help&&<div className="recovery" role="status"><strong>Not sure where to go?</strong><p>Stop at a safe point, return to the last sign you recognized, and consult a posted directory or building staff. This app cannot detect your indoor location.</p><button className="secondary" onClick={previous}><RotateCcw size={15}/> Previous step</button>{buildingInfo&&<div className="reference"><img src={buildingInfo.image} alt={`Building reference for ${building.name}`}/><p>{buildingInfo.note}</p></div>}</div>}{step===steps.length-1&&<label className="arrival-check"><input type="checkbox" checked={confirmed} onChange={e=>setConfirmed(e.target.checked)}/> I checked the destination sign in person.</label>}<div className="actions"><button className="secondary" onClick={()=>{if(!help)log('recovery opened',String(step+1));setHelp(v=>!v)}}><RotateCcw size={16}/>{help?'Hide recovery':'I’m not sure'}</button><button className="primary" disabled={step===steps.length-1&&!confirmed} onClick={next}>{step===steps.length-1?'I found it':'Continue'} <ArrowRight size={16}/></button></div>{step>0&&<button className="back" onClick={previous}><ArrowLeft size={15}/> Previous step</button>}</>}
 {buildingInfo&&<div className="reference"><h3>Building photo reference</h3><img src={buildingInfo.image} alt={`Submitted photo reference for ${building.name}`} loading="lazy"/><p>{buildingInfo.note}</p></div>}</section></div><section className="footnote"><strong>Coverage and verification</strong><p>Last Turn lists {buildings.length} buildings documented by the project team, focused on East Campus. The main-entrance-to-Inner-Circle demo route follows the team-submitted demonstration directions. Student Center East destinations use published location descriptions; the full routes still require on-site verification. Other buildings include team-submitted photo references and clearly labeled planning guidance, not fabricated indoor directions. Building listings, room numbers and accessible routes must be checked against official UIC sources and in person before real-world navigation. Not for emergencies.</p><a href={sceSource} target="_blank" rel="noreferrer">UIC official lounge locations <ExternalLink size={14}/></a> · <a href="https://www.uic.edu/about/visit-directions/" target="_blank" rel="noreferrer">UIC visitor and directions information <ExternalLink size={14}/></a></section><details className="study-panel"><summary>Researcher tools — optional evaluation mode</summary><p>Use only after consent. Enter an anonymous ID, not a name. Events stay in this tab until exported; no automatic upload or demographic collection.</p><label htmlFor="pid">Participant ID</label><input id="pid" className="field" value={participant} disabled={study} onChange={e=>setParticipant(e.target.value)} placeholder="P01"/><label htmlFor="task">Task</label><select id="task" value={task} disabled={study} onChange={e=>setTask(e.target.value)}><option value="1">Task 1 — Inner Circle</option><option value="2">Task 2 — building reference / destination planning</option></select><div className="actions"><button className="secondary" disabled={!study&&!/^P[0-9]+$/i.test(participant)} onClick={()=>{if(study){log('session stopped');setStudy(false)}else{setEvents(old=>[...old,{participant,task,action:'session started',time:new Date().toISOString()}]);setStudy(true)}}}>{study?'Stop recording':'Start recording'}</button><button className="secondary" disabled={!events.length} onClick={exportStudy}>Export events ({events.length})</button><button className="secondary" disabled={study} onClick={()=>setEvents([])}>Clear events</button></div><p role="status">{study?'Recording interaction events in this tab.':'Recording off.'} Events do not prove physical arrival or replace observer notes.</p></details></main><footer>Last Turn · UIC HCI functional prototype · Documented buildings + SCE pilot</footer></div>;
}
createRoot(document.getElementById('root')).render(<App/>);
