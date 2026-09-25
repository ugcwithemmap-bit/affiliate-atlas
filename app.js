const DATA = window.__DATA;
const RECRUITS = [
 {id:"rec-hyperliquiddaily",name:"Hyperliquid Daily",platforms:{x:{handle:"HYPERDailyTK",url:"https://x.com/HYPERDailyTK"}},fit:"Warmest lead. Posted about Propr organically on 2026-03-05, 50.1K views, no code.",evidence:"https://x.com/HYPERDailyTK/status/2029617942824997044"},
 {id:"rec-cryptogorilla",name:"Crypto Gorilla",platforms:{youtube:{subs:84300,handle:"",url:""}},fit:"Best pure Polymarket fit. Beginner guide at 146K views with no affiliate links at all."},
 {id:"rec-moneyzg",name:"MoneyZG",platforms:{youtube:{subs:760000}},fit:"Hyperliquid tutorial 55K views. Already carries Hyperliquid, Blofin and Kraken referrals, so comfortable with affiliate deals."},
 {id:"rec-coinbureau",name:"Coin Bureau",platforms:{youtube:{subs:2730000}},fit:"Reach play, expensive. Hyperliquid vs Aster review 77K views, zero prop firm mentions."},
 {id:"rec-altcoindaily",name:"Altcoin Daily",platforms:{youtube:{subs:1660000}},fit:"Prediction market adjacent. Perps tutorial 46K views, Kalshi referral only."},
 {id:"rec-cryptovic",name:"Crypto Vic",platforms:{youtube:{subs:105000}},fit:"Tools audience. Axiom terminal tutorials 75K views, consistent disclosure habit."},
];
RECRUITS.forEach(r=>{r.recruit=true;r.type="creator";r.firms=[];r.mentionedFirms=[];r.country="";r.linkCodes=[];r.maxAudience=Math.max(0,...Object.values(r.platforms).map(p=>p.subs||0));r.source="sweep";DATA.push(r);});

const FIRM_FP={"FTMO":"?affiliates=","FundedNext":"?fpr=","BrightFunded":"?affiliateId= or /a/","FundingPips":"?referral_code=","The5ers":"?afmc=","E8 Markets":"/d/","Apex Trader Funding":"/member/aff/go/","MyFundedFutures":"?ref=<number>","Tradeify":"/ref/ or ?ref=","Blue Guardian":"checkout.blueguardian.com/ref/","HyroTrader":"?coupon=","Propr":"app.propr.xyz/r/","Breakout Prop":"breakoutprop.com/join/ or code","Funding Predicts":"?ref= or /@handle"};
const STATUSES=[["","Not contacted"],["shortlist","Shortlist"],["contacted","Contacted"],["talks","In talks"],["live","Live with Propr"],["declined","Declined"],["nofit","Not a fit"]];
const TYPES=[["creator","Creator"],["discord","Discord server"],["telegram","Telegram channel"],["reddit","Reddit poster"],["site","Site"]];
let limit=150;
const PLATS=[["youtube","YT"],["instagram","IG"],["x","X"],["discord","DC"],["telegram","TG"],["tiktok","TT"],["reddit","RD"]];
const CRYPTO=/hyperliquid|polymarket|\bcrypto|perps?\b|perpetual|breakout|hyrotrader|crypto fund trader|bitfunded|hypernova|carrot funding|solana|bitcoin|\bbtc\b|\beth\b|altcoin|defi|on-?chain|web3|kalshi|prediction market/i;
function daysSince(s){if(!s)return null;s=String(s).toLowerCase();let m;if((m=s.match(/(\d+)\s*(hour|day|week|month|year)/)))return +m[1]*({hour:0.04,day:1,week:7,month:30,year:365}[m[2]]);if(/^\d{4}-\d{2}-\d{2}/.test(s))return (Date.now()-Date.parse(s))/864e5;return null;}
function matchScore(r){const why=[];let s=0;const y=(r.platforms||{}).youtube||{};const txt=[r.name,r.description,...(r.mentionedFirms||[]),...(r.searchFirms||[]),...(r.firms||[]).map(f=>f.firm)].join(" ");
  const onPropr=(r.firms||[]).some(f=>f.firm==="Propr")||(r.mentionedFirms||[]).includes("Propr");
  if(CRYPTO.test(txt)){s+=30;why.push("crypto or prediction market audience");}else if(/futures|nasdaq|\bnq\b|\bes\b/i.test(txt)){s+=8;why.push("futures audience");}
  if(r.promoter){s+=20;why.push("already runs affiliate codes");}
  if((r.firmCount||0)>=2){s+=10;why.push("works with "+r.firmCount+" firms");}
  const a=r.maxAudience||0;if(a>0){const rs=Math.min(20,Math.round(Math.log10(a+1)*3.4));s+=rs;const af=a>=1e6?(a/1e6).toFixed(1)+"M":a>=1e3?Math.round(a/1e3)+"K":String(a);why.push(af+" audience");}
  if(y.viewRate!=null){if(y.viewRate>=.3){s+=10;why.push("very high view rate");}else if(y.viewRate>=.1){s+=6;why.push("high view rate");}else if(y.viewRate>=.03){s+=3;}}
  if((y.uploadsPerMonth||0)>=4){s+=5;why.push("posts weekly or more");}
  const d=daysSince(y.lastUpload);if(d!=null&&d<=30){s+=5;why.push("active this month");}
  if(r.recruit){s+=10;why.push("hand picked recruit");}
  if(r.type==="site"){s-=10;}
  return {score:Math.max(0,Math.min(100,s)),why,onPropr};}
DATA.forEach(r=>{const m=matchScore(r);r.match=m.score;r.matchWhy=m.why;r.onPropr=m.onPropr;});
const VIEWS=[["matches","Potential matches for Propr",r=>!r.onPropr&&r.match>=45],["promoters","Carries a code",r=>r.promoter],["enriched","Has reach stats",r=>r.enriched],["all","Everyone found",()=>true],["propr","Already promoting Propr",r=>r.firms.some(f=>f.firm==="Propr")],["multi","Works with 3+ firms",r=>r.firmCount>=3],["recruits","Recruit candidates",r=>r.recruit],["export","From channel exports",r=>r.source==="export"]];

const state={view:"matches",q:"",firms:new Set(),plats:new Set(),types:new Set(),minsubs:0,country:"",status:"",sort:"match",dir:-1,sel:null};
const outreach={};let db=null,dbReady=false,dbWritable=true,downloads=null;

const fmt=n=>n==null?"":n>=1e6?(n/1e6).toFixed(n>=1e7?0:1)+"M":n>=1e3?(n/1e3).toFixed(n>=1e5?0:1)+"K":String(Math.round(n));
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const yt=r=>r.platforms.youtube||{};
const firmsOf=r=>[...new Set([...r.firms.map(f=>f.firm),...r.mentionedFirms])];

function filtered(){
  const v=VIEWS.find(v=>v[0]===state.view)[2];const q=state.q.toLowerCase();
  return DATA.filter(r=>{
    if(!v(r))return false;
    if(state.firms.size&&![...firmsOf(r),...(r.searchFirms||[])].some(f=>state.firms.has(f)))return false;
    if(state.plats.size&&![...state.plats].every(p=>r.platforms[p]))return false;
    if(state.types.size&&!state.types.has(r.type||"creator"))return false;
    if(state.minsubs&&(r.maxAudience||0)<state.minsubs)return false;
    if(state.country&&r.country!==state.country)return false;
    if(state.status&&((outreach[r.id]||{}).status||"")!==state.status)return false;
    if(q){const hay=[r.name,r.country,...Object.values(r.platforms).map(p=>p.handle||""),...firmsOf(r),...r.firms.map(f=>f.code||""),...(r.linkCodes||[])].join(" ").toLowerCase();if(!hay.includes(q))return false;}
    return true;
  }).sort((a,b)=>{const k=state.sort;let x=val(a,k),y=val(b,k);if(x==null&&y==null)return 0;if(x==null)return 1;if(y==null)return -1;if(typeof x==="string")return x.localeCompare(y)*state.dir;return (x-y)*state.dir;});
}
function val(r,k){switch(k){case"match":return r.match||0;case"name":return r.name.toLowerCase();case"subs":return yt(r).subs??null;case"aud":return r.maxAudience||null;case"avg":return yt(r).avgViews??null;case"rate":return yt(r).viewRate??null;case"upl":return yt(r).uploadsPerMonth??null;case"firms":return r.firmCount;case"country":return r.country||null;case"status":return (outreach[r.id]||{}).status||"";default:return r.maxAudience||null;}}

function renderStats(){
  const enr=DATA.filter(r=>r.enriched).length;const prom=DATA.filter(r=>r.promoter).length,propr=DATA.filter(r=>r.firms.some(f=>f.firm==="Propr")).length,firms=new Set(DATA.flatMap(r=>r.firms.map(f=>f.firm))).size,shortl=Object.values(outreach).filter(o=>o.status&&o.status!=="nofit"&&o.status!=="declined").length;
  document.getElementById("stats").innerHTML=[[DATA.length,"in the atlas"],[prom,"carry a code"],[enr,"with reach stats"],[firms,"firms mapped"],[propr,"already on Propr"],[shortl,"in your pipeline"]].map(([n,l])=>`<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");
}
function renderRail(){
  document.getElementById("tabs").innerHTML=VIEWS.map(v=>`<button class="tab" role="tab" data-v="${v[0]}" aria-selected="${state.view===v[0]}"><span>${v[1]}</span><span class="num">${DATA.filter(v[2]).length}</span></button>`).join("");
  const fc={};DATA.forEach(r=>[...new Set([...firmsOf(r),...(r.searchFirms||[])])].forEach(f=>fc[f]=(fc[f]||0)+1));
  const fe=Object.entries(fc).sort((a,b)=>b[1]-a[1]);const cut=window.__allFirms?fe.length:14;const shown=fe.filter((x,i)=>i<cut||state.firms.has(x[0]));
  document.getElementById("firmchips").innerHTML=shown.map(([f,n])=>`<button class="chip" data-f="${esc(f)}" aria-pressed="${state.firms.has(f)}">${esc(f)}<small>${n}</small></button>`).join("")+(fe.length>14?`<button class="more-chips" id="morefirms">${window.__allFirms?"Show fewer":"Show all "+fe.length+" firms"}</button>`:"");
  const tc={};DATA.forEach(r=>{const k=r.type||"creator";tc[k]=(tc[k]||0)+1;});
  document.getElementById("typechips").innerHTML=TYPES.filter(([k])=>tc[k]).map(([k,l])=>`<button class="chip" data-t="${k}" aria-pressed="${state.types.has(k)}">${l}<small>${tc[k]}</small></button>`).join("");
  const pc={};DATA.forEach(r=>Object.keys(r.platforms).forEach(p=>pc[p]=(pc[p]||0)+1));
  document.getElementById("platchips").innerHTML=PLATS.filter(([p])=>pc[p]).map(([p,l])=>`<button class="chip" data-p="${p}" aria-pressed="${state.plats.has(p)}">${l}<small>${pc[p]}</small></button>`).join("");
  const cs=document.getElementById("country");if(cs.options.length===1){const cc={};DATA.forEach(r=>{if(r.country)cc[r.country]=(cc[r.country]||0)+1;});Object.entries(cc).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>cs.insertAdjacentHTML("beforeend",`<option value="${esc(c)}">${esc(c)} (${n})</option>`));}
  const ss=document.getElementById("status");if(ss.options.length===1)STATUSES.slice(1).forEach(([v,l])=>ss.insertAdjacentHTML("beforeend",`<option value="${v}">${l}</option>`));
}
function audLabel(r){const p=r.platforms;const k=p.youtube&&p.youtube.subs===r.maxAudience?"YT":p.discord&&p.discord.members===r.maxAudience?"DC":p.telegram&&p.telegram.members===r.maxAudience?"TG":p.reddit&&p.reddit.karma===r.maxAudience?"karma":p.x&&p.x.followers===r.maxAudience?"X":"";return k&&r.maxAudience?` <span style="color:var(--faint);font-size:10px">${k}</span>`:"";}
const AV=window.__AVATARS||{};
function avatar(r){const src=AV[r.id];if(src)return `<img class="av" src="${src}" alt="" loading="lazy">`;const ini=(r.name||"?").replace(/^u\//,"").trim().split(/\s+/).slice(0,2).map(w=>w[0]||"").join("").toUpperCase()||"?";return `<span class="av init">${esc(ini)}</span>`;}
function primaryUrl(r){const p=r.platforms;const o=["youtube","discord","telegram","instagram","x","tiktok","web","reddit"];for(const k of o){if(p[k]&&p[k].url)return p[k].url;}return "";}
function statusHtml(id){const s=(outreach[id]||{}).status||"";const l=(STATUSES.find(x=>x[0]===s)||STATUSES[0])[1];return `<span class="status"><i class="dot ${s}"></i>${s?l:"<span style='color:var(--faint)'>Not contacted</span>"}</span>`;}
function renderTable(rows){
  const cols=[...(state.view==="matches"?[["match","Match"]]:[]),["name","Creator"],["link","Channel"],["plats","Where"],["aud","Audience","r"],["avg","Avg views / video","r"],["rate","View rate","r"],["upl","Uploads / mo","r"],["firms","Works with"],["country","Country"],["status","Your status"]];
  const head=cols.map(([k,l,a])=>`<th class="${a||""}" data-k="${k}" ${state.sort===k?`aria-sort="${state.dir<0?"descending":"ascending"}"`:""}>${l}</th>`).join("");
  
  const shown=rows.slice(0,limit);
  const body=shown.map(r=>{const y=yt(r);const rate=y.viewRate;const w=rate?Math.round(Math.min(rate,1)*56):0;
    const chips=r.firms.slice(0,3).map(f=>`<span class="tag ${f.firm==="Propr"?"propr":"code"}">${esc(f.firm)}</span>`).join("")+r.mentionedFirms.filter(m=>!r.firms.some(f=>f.firm===m)).slice(0,2).map(m=>`<span class="tag mention">${esc(m)}</span>`).join("")+(r.firmCount>5?`<span class="tag mention">+${r.firmCount-5}</span>`:"")+(!r.firmCount&&r.searchFirms&&r.searchFirms.length?r.searchFirms.slice(0,2).map(m=>`<span class="tag via" title="Found by searching for this firm">${esc(m)}</span>`).join("")+(r.searchFirms.length>2?`<span class="tag via">+${r.searchFirms.length-2}</span>`:""):"");
    const pu=primaryUrl(r);const mcell=state.view==="matches"?`<td><div class="mscore"><b>${r.match}</b><span class="mbar"><i style="width:${r.match}%"></i></span></div><div class="mwhy">${(r.matchWhy||[]).slice(0,3).map(esc).join(" · ")}</div></td>`:"";return `<tr class="row" data-id="${esc(r.id)}" aria-selected="${state.sel===r.id}">${mcell}<td><div class="who">${avatar(r)}<div><div class="name">${esc(r.name)}${r.recruit?'<span class="tag propr">recruit</span>':""}</div>${y.handle?`<div class="handle">@${esc(y.handle)}</div>`:""}</div></div></td>
    <td class="chan">${pu?`<a class="ext" href="${esc(pu)}" target="_blank" rel="noopener">${esc(pu.replace(/^https?:\/\/(www\.)?/,"").slice(0,42))}</a>`:'<span style="color:var(--faint)">no link</span>'}</td>
    <td><div class="plats">${PLATS.map(([p,l])=>{const v=r.platforms[p];return v?`<span class="pl on ${p==="youtube"?"yt":""}" title="${l}${v.handle?" @"+esc(v.handle):""}">${v.url?`<a class="ext" href="${esc(v.url)}" target="_blank" rel="noopener">${l}</a>`:l}</span>`:`<span class="pl" title="${l}">${l}</span>`;}).join("")}</div></td>
    <td class="r num">${fmt(r.maxAudience)||'<span style="color:var(--faint)" title="Not enriched yet">?</span>'}${audLabel(r)}</td><td class="r num">${fmt(y.avgViews)||(y.foundMaxViews?`<span style="color:var(--faint)" title="Top video found in the crawl; channel not enriched yet">${fmt(y.foundMaxViews)} top</span>`:"")}</td>
    <td class="r num">${rate!=null?`<span class="bar" style="width:${w}px"></span>${(rate*100).toFixed(0)}%`:'<span style="color:var(--faint)">no data</span>'}</td>
    <td class="r num">${y.uploadsPerMonth!=null?y.uploadsPerMonth.toFixed(1):""}</td>
    <td>${chips||'<span style="color:var(--faint)">none named</span>'}</td><td>${esc(r.country)}</td><td>${statusHtml(r.id)}</td></tr>`;}).join("");
  const more=rows.length>limit?`<div style="padding:12px;text-align:center"><button class="btn" id="more">Show ${Math.min(150,rows.length-limit)} more of ${rows.length-limit} remaining</button></div>`:"";
  const intro=state.view==="matches"?`<div class="mintro"><b>How the match score works.</b> Crypto or prediction market audience 30, already runs affiliate codes 20, works with several firms 10, reach up to 20 on a log scale, view rate up to 10, posts weekly 5, active this month 5, hand picked recruit 10. Anyone already promoting Propr is left out. Scores are a shortlist, not a verdict: open the profile before you reach out.</div>`:"";
  document.getElementById("view").innerHTML=rows.length?intro+`<div class="tablewrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>${more}</div>`:`<div class="empty">Nothing matches these filters. Clear one and try again.</div>`;
}
function renderFirms(rows){
  const m={};rows.forEach(r=>r.firms.forEach(f=>{(m[f.firm]=m[f.firm]||[]).push({r,f});}));
  const cards=Object.entries(m).sort((a,b)=>b[1].length-a[1].length).map(([firm,list])=>{const seen=new Set();const u=list.filter(x=>!seen.has(x.r.id)&&seen.add(x.r.id));const aud=u.reduce((s,x)=>s+(x.r.maxAudience||0),0);const excl=u.filter(x=>x.r.firmCount<=1).length;
    return `<div class="firmcard"><h3>${esc(firm)}<span class="num" style="color:var(--muted)">${u.length} promoters</span></h3><div class="meta"><span>Combined audience ${fmt(aud)}</span><span>${excl} single firm</span></div><ol>${u.sort((a,b)=>(b.r.maxAudience||0)-(a.r.maxAudience||0)).slice(0,6).map(x=>`<li><a href="#" data-id="${esc(x.r.id)}">${esc(x.r.name)}</a> <span class="num" style="color:var(--muted)">${fmt(x.r.maxAudience)}</span>${x.f.code?` <span class="tag code">${esc(x.f.code.split(",")[0].slice(0,28))}</span>`:""}</li>`).join("")}</ol>${FIRM_FP[firm]?`<div class="fp">link fingerprint ${esc(FIRM_FP[firm])}</div>`:""}</div>`;}).join("");
  document.getElementById("view").innerHTML=`<div class="firmgrid">${cards}</div>`;
}
let firmMode=false;
function render(){renderStats();renderRail();const rows=filtered();const narrowed=state.view!=="all"&&(state.plats.size||state.types.size||state.firms.size);let hint="";if(narrowed){const v=VIEWS.find(v=>v[0]==="all");const all=DATA.filter(r=>{if(state.firms.size&&![...firmsOf(r),...(r.searchFirms||[])].some(f=>state.firms.has(f)))return false;if(state.plats.size&&![...state.plats].every(p=>r.platforms[p]))return false;if(state.types.size&&!state.types.has(r.type||"creator"))return false;return true;}).length;if(all>rows.length)hint=` Only the "${VIEWS.find(v=>v[0]===state.view)[1]}" view is shown. <a href="#" id="widen">Show all ${all}</a>.`;}
document.getElementById("count").innerHTML=`${rows.length} of ${DATA.length} shown.${hint} <a href="#" id="toggle">${firmMode?"Show as a table":"Show by firm"}</a>`;firmMode?renderFirms(rows):renderTable(rows);}

function openDrawer(id){
  const r=DATA.find(x=>x.id===id);if(!r)return;state.sel=id;const y=yt(r);const o=outreach[id]||{};
  const links=Object.entries(r.platforms).filter(([p,v])=>v.url||v.handle).map(([p,v])=>`<a href="${esc(v.url||"#")}" target="_blank" rel="noopener"><b>${(PLATS.find(x=>x[0]===p)||[p,p.toUpperCase()])[1]}</b>${esc(v.handle?"@"+v.handle:(p==="youtube"?"channel":p))}</a>`).join("");
  const tiles=y.subs!=null||y.avgViews!=null?`<div class="tiles">
    <div class="tile hero"><b>${fmt(y.subs)}</b><span>YouTube subscribers</span></div>
    <div class="tile hero"><b>${fmt(y.avgViews)}</b><span>Avg views per video</span></div>
    <div class="tile hero"><b>${y.viewRate!=null?(y.viewRate*100).toFixed(0)+"%":"n/a"}</b><span>View rate (views ÷ subs)</span></div>
    <div class="tile"><b>${fmt(y.monthlyViews)}</b><span>Avg monthly views</span></div>
    <div class="tile"><b>${y.uploadsPerMonth!=null?y.uploadsPerMonth.toFixed(1):"n/a"}</b><span>Uploads per month</span></div>
    <div class="tile"><b>${fmt(y.totalVideos)}</b><span>Videos total</span></div>
    <div class="tile"><b>${esc(y.videoLength||"n/a")}</b><span>Avg video length</span></div>
    <div class="tile"><b>${esc(y.lastUpload||"n/a")}</b><span>Last upload</span></div>
    <div class="tile"><b>${y.ageDays?Math.round(y.ageDays/365*10)/10+" yr":"n/a"}</b><span>Channel age</span></div></div>
    <p class="note">${y.avgViews!=null?"Full stats from the channel export.":"Subscriber count only, from the sweep. Add this channel to a similar-channels export to fill the rest."} Recurring viewers and engagement rate live in the creator's own YouTube Studio; ask for a screenshot once you are in talks.</p>`:`<p class="note">No YouTube statistics yet for this one. ${r.recruit?"Add the channel to a similar-channels export to fill them in.":""}</p>`;
  const p=r.platforms;const other=[];
  if(p.discord&&(p.discord.members!=null))other.push(`<div class="tile hero"><b>${fmt(p.discord.members)}</b><span>Discord members</span></div><div class="tile"><b>${fmt(p.discord.online)||"n/a"}</b><span>Online when read</span></div>`);
  if(p.telegram&&(p.telegram.members!=null))other.push(`<div class="tile hero"><b>${fmt(p.telegram.members)}</b><span>Telegram members</span></div>`);
  if(p.reddit&&(p.reddit.karma!=null||p.reddit.posts!=null))other.push(`<div class="tile hero"><b>${fmt(p.reddit.karma)||"n/a"}</b><span>Reddit karma</span></div><div class="tile"><b>${fmt(p.reddit.posts)||"0"}</b><span>Posts naming a firm</span></div><div class="tile"><b>${fmt(p.reddit.comments)||"0"}</b><span>Comments naming a firm</span></div>`+(p.reddit.subreddits&&p.reddit.subreddits.length?`<div class="tile" style="grid-column:1/-1"><b style="font-size:13px">${esc(p.reddit.subreddits.slice(0,8).join(", "))}</b><span>Active in</span></div>`:""));
  if(p.web&&p.web.visits!=null)other.push(`<div class="tile hero"><b>${fmt(p.web.visits)}</b><span>Site visits per month</span></div>`);
  if(p.x&&p.x.followers!=null)other.push(`<div class="tile hero"><b>${fmt(p.x.followers)}</b><span>X followers</span></div>`);
  if(p.instagram&&p.instagram.followers!=null)other.push(`<div class="tile hero"><b>${fmt(p.instagram.followers)}</b><span>Instagram followers</span></div>`);
  const otherTiles=other.length?`<div class="tiles" style="margin-bottom:8px">${other.join("")}</div>`:"";
  const rels=r.firms.length?r.firms.map(f=>`<div class="rel"><span class="f">${esc(f.firm)}</span><span class="num">${f.topViews?fmt(f.topViews)+" views on top video":""}</span>${f.code?`<span class="k">${esc(f.code)}</span>`:""}<span class="d">${esc([f.discount&&f.discount!=="none"&&f.discount!=="n/s"&&f.discount!=="not stated"?"Discount "+f.discount:"",f.deal].filter(Boolean).join(" · "))}${f.evidence?` · <a href="${esc(f.evidence)}" target="_blank" rel="noopener">evidence</a>`:""} · checked ${f.checked}</span>${f.otherFirms&&f.otherFirms!=="none"?`<span class="d">Also in the same description: ${esc(f.otherFirms)}</span>`:""}</div>`).join(""):"";
  const mentions=r.mentionedFirms.filter(m=>!r.firms.some(f=>f.firm===m));
  const foundVia=y.foundVideos?`<div><h4>How the crawl found them</h4><p style="margin:0;font-size:13px">${y.foundVideos} video${y.foundVideos>1?"s":""} surfaced in searches for ${(r.searchFirms||[]).concat(r.mentionedFirms.filter(m=>r.searchFirms&&!r.searchFirms.includes(m))).slice(0,6).map(esc).join(", ")||"generic prop firm terms"}.${y.foundSample?` Top one: <a href="https://www.youtube.com/watch?v=${esc(y.foundSample.videoId)}" target="_blank" rel="noopener">${esc(y.foundSample.title||"video")}</a>, ${fmt(y.foundSample.views)} views.`:""}</p></div>`:"";
  const fc=r.firmCodes||[];const oc=(r.linkCodes||[]).filter(c=>!fc.includes(c));const codes=fc.length||oc.length?`<div><h4>Referral links in channel bio</h4><div class="links">${fc.map(c=>`<span class="tag code">${esc(c)}</span>`).join("")}${oc.slice(0,6).map(c=>`<span class="tag mention" title="Referral style link to something other than a prop firm">${esc(c)}</span>`).join("")}</div></div>`:"";
  document.getElementById("drawer").innerHTML=`<div class="dhead"><div style="display:flex;gap:12px;align-items:center">${avatar(r).replace('class="av','class="av" style="width:48px;height:48px;font-size:16px" data-x="')}<div><h2>${esc(r.name)}</h2><div class="where">${[r.country,(TYPES.find(x=>x[0]===(r.type||"creator"))||[])[1],r.recruit?"Recruit candidate":r.promoter?"Carries a prop firm code":"No code found yet",r.email?"email on file":"",...(r.sources||[])].filter(Boolean).join(" · ")}</div></div></div><button class="close" id="close" aria-label="Close">×</button></div>
  <div class="dbody">
    <div><h4>Where they are</h4><div class="links">${links||'<span class="note">No links recorded yet.</span>'}${r.email?`<a href="mailto:${esc(r.email)}"><b>@</b>${esc(r.email)}</a>`:""}</div></div>
    ${r.match!=null&&!r.onPropr?`<div><h4>Propr match</h4><div class="mscore"><b>${r.match}</b><span class="mbar"><i style="width:${r.match}%"></i></span><span style="font-size:12px;color:var(--muted)">out of 100</span></div><p class="note" style="margin-top:6px">${(r.matchWhy||[]).length?esc(r.matchWhy.join(", ")):"No strong signals yet."}</p></div>`:""}
    <div><h4>Reach</h4>${otherTiles}${tiles}</div>
    ${r.recruit?`<div><h4>Why they fit Propr</h4><p style="margin:0">${esc(r.fit)}${r.evidence?` <a href="${esc(r.evidence)}" target="_blank" rel="noopener">evidence</a>`:""}</p></div>`:""}
    <div><h4>Prop firm relationships</h4>${rels||'<p class="note" style="margin:0">No confirmed affiliate relationship found in the sweep.</p>'}${mentions.length?`<p class="note">Also mentions ${mentions.map(esc).join(", ")} in bio or descriptions.</p>`:""}</div>
    ${foundVia}
    ${codes}
    ${r.description?`<div><h4>Channel description</h4><div class="desc">${esc(r.description)}</div></div>`:""}
    <div><h4>Your outreach</h4><div class="form">
      <label>Status<select class="ctl" id="o-status" ${dbReady&&dbWritable?"":"disabled"}>${STATUSES.map(([v,l])=>`<option value="${v}" ${o.status===v?"selected":""}>${l}</option>`).join("")}</select></label>
      <label>Priority<select class="ctl" id="o-prio" ${dbReady&&dbWritable?"":"disabled"}><option value="">Unranked</option>${["A","B","C"].map(p=>`<option ${o.priority===p?"selected":""}>${p}</option>`).join("")}</select></label>
      <textarea id="o-notes" placeholder="Deal terms discussed, who owns the contact, next step" ${dbReady&&dbWritable?"":"disabled"}>${esc(o.notes||"")}</textarea>
      <div class="saved" id="o-saved">${dbReady?(dbWritable?(o.updatedAt?"Saved "+new Date(o.updatedAt).toLocaleString():"Nothing saved yet. Changes save automatically."):"You can view notes but not edit them."):"Notes need the page's database, which is not available in this view."}</div>
    </div></div>
  </div>`;
  document.getElementById("drawer").classList.add("open");document.getElementById("drawer").setAttribute("aria-hidden","false");document.getElementById("scrim").classList.add("show");
  document.getElementById("close").onclick=closeDrawer;
  const save=async()=>{if(!db||!dbWritable)return;const body={status:document.getElementById("o-status").value,priority:document.getElementById("o-prio").value,notes:document.getElementById("o-notes").value,name:r.name,updatedAt:new Date().toISOString()};const prev=outreach[id]||{};if(prev.status===body.status&&prev.priority===body.priority&&prev.notes===body.notes)return;try{await db.doc("outreach/"+id).set(body);outreach[id]=body;document.getElementById("o-saved").textContent="Saved "+new Date().toLocaleTimeString();render();}catch(e){if(e&&e.code==="invalid_argument"){dbWritable=false;document.getElementById("o-saved").textContent="You can view notes but not edit them.";}else document.getElementById("o-saved").textContent="Could not save. Check your connection and try again.";}};
  document.getElementById("o-status").onchange=save;document.getElementById("o-prio").onchange=save;
  let t;document.getElementById("o-notes").oninput=()=>{clearTimeout(t);t=setTimeout(save,900);};document.getElementById("o-notes").onblur=save;
  render();
}
function closeDrawer(){state.sel=null;document.getElementById("drawer").classList.remove("open");document.getElementById("drawer").setAttribute("aria-hidden","true");document.getElementById("scrim").classList.remove("show");render();}

document.addEventListener("click",e=>{
  const sh=e.target.closest(".sec-h");if(sh){const s=sh.parentElement;const c=s.dataset.collapsed==="1";s.dataset.collapsed=c?"0":"1";sh.querySelector(".tog").textContent=c?"hide":"show";try{localStorage.setItem("atlas-sec-"+s.dataset.sec,c?"0":"1");}catch(_){}return;}
  if(e.target.id==="morefirms"){window.__allFirms=!window.__allFirms;render();return;}
  const t=e.target.closest("[data-v],[data-f],[data-p],[data-t],th[data-k],tr.row,#toggle,#reset,#more,#widen,a[data-id],a.ext");if(!t)return;
  if(t.matches("a.ext"))return;
  if(t.id==="widen"){e.preventDefault();state.view="all";limit=150;render();return;}
  if(!t.matches("tr.row,a[data-id],#more,th"))limit=150;
  if(t.dataset.v){state.view=t.dataset.v;if(state.view==="matches"){state.sort="match";state.dir=-1;}else if(state.sort==="match"){state.sort="maxAudience";state.dir=-1;}render();}
  else if(t.dataset.f){state.firms.has(t.dataset.f)?state.firms.delete(t.dataset.f):state.firms.add(t.dataset.f);render();}
  else if(t.dataset.p){state.plats.has(t.dataset.p)?state.plats.delete(t.dataset.p):state.plats.add(t.dataset.p);render();}
  else if(t.dataset.t){state.types.has(t.dataset.t)?state.types.delete(t.dataset.t):state.types.add(t.dataset.t);render();}
  else if(t.id==="more"){limit+=150;render();}
  else if(t.matches("th")){const k=t.dataset.k;if(k==="plats"||k==="link")return;if(state.sort===k)state.dir*=-1;else{state.sort=k;state.dir=k==="name"||k==="country"?1:-1;}render();}
  else if(t.matches("tr.row"))openDrawer(t.dataset.id);
  else if(t.matches("a[data-id]")){e.preventDefault();openDrawer(t.dataset.id);}
  else if(t.id==="toggle"){e.preventDefault();firmMode=!firmMode;render();}
  else if(t.id==="reset"){Object.assign(state,{q:"",minsubs:0,country:"",status:""});state.firms.clear();state.plats.clear();state.types.clear();document.getElementById("q").value="";document.getElementById("minsubs").value="0";document.getElementById("country").value="";document.getElementById("status").value="";render();}
});
document.getElementById("q").addEventListener("input",e=>{state.q=e.target.value;limit=150;render();});
document.getElementById("minsubs").addEventListener("change",e=>{state.minsubs=+e.target.value;render();});
document.getElementById("country").addEventListener("change",e=>{state.country=e.target.value;render();});
document.getElementById("status").addEventListener("change",e=>{state.status=e.target.value;render();});
document.getElementById("scrim").addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&state.sel)closeDrawer();});
document.getElementById("export").addEventListener("click",async()=>{
  const rows=filtered();const cols=["name","kind","channel_url","country","youtube_handle","youtube_subs","avg_views_per_video","view_rate","avg_monthly_views","uploads_per_month","last_upload","instagram","x","discord","telegram","tiktok","email","confirmed_firms","codes","mentioned_firms","status","priority","notes"];
  const line=r=>{const y=yt(r);const o=outreach[r.id]||{};const g=p=>(r.platforms[p]||{}).url||"";return [r.name,r.type||"creator",primaryUrl(r),r.country,y.handle||"",y.subs??"",y.avgViews??"",y.viewRate??"",y.monthlyViews??"",y.uploadsPerMonth??"",y.lastUpload||"",g("instagram"),g("x"),g("discord"),g("telegram"),g("tiktok"),r.email||"",r.firms.map(f=>f.firm).join("; "),[...r.firms.map(f=>f.code).filter(Boolean),...(r.firmCodes||[])].join("; "),r.mentionedFirms.join("; "),o.status||"",o.priority||"",o.notes||""].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",");};
  const csv=cols.join(",")+"\n"+rows.map(line).join("\n");
  if(downloads){try{await downloads.save({filename:"propr-affiliate-atlas-"+new Date().toISOString().slice(0,10)+".csv",data:csv});}catch(e){}}
  else{try{await navigator.clipboard.writeText(csv);alert("Downloads are not available in this view, so the CSV was copied to your clipboard instead.");}catch(e){alert("Downloads are not available in this view.");}}
});

try{document.querySelectorAll(".rail section[data-sec]").forEach(s=>{if(localStorage.getItem("atlas-sec-"+s.dataset.sec)==="1"){s.dataset.collapsed="1";s.querySelector(".tog").textContent="show";}});}catch(_){}
render();
try{Object.assign(outreach,JSON.parse(localStorage.getItem("atlas-outreach")||"{}"));}catch(e){}
db={doc:p=>({set:async b=>{outreach[p.split("/")[1]]=b;localStorage.setItem("atlas-outreach",JSON.stringify(outreach));}})};dbReady=true;dbWritable=true;
downloads={save:async({filename,data})=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"text/csv"}));a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1000);return{status:"saved"};}};
render();
