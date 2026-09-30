const DATA = window.__DATA;
const CONTENT = /*CONTENT*/[];
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
const PICON={
 youtube:'<path fill="#FF0000" d="M15.6 4.9a2 2 0 0 0-1.4-1.4C13 3.1 8 3.1 8 3.1s-5 0-6.2.4A2 2 0 0 0 .4 4.9C.1 6 0 7 0 8s.1 2.1.4 3.1a2 2 0 0 0 1.4 1.4c1.2.4 6.2.4 6.2.4s5 0 6.2-.4a2 2 0 0 0 1.4-1.4c.3-1 .4-2 .4-3.1s-.1-2.1-.4-3.1Z"/><path fill="#fff" d="M6.4 10.4 10.6 8 6.4 5.6v4.8Z"/>',
 instagram:'<g fill="none" stroke="#E1306C" stroke-width="1.6"><rect x="1.6" y="1.6" width="12.8" height="12.8" rx="4"/><circle cx="8" cy="8" r="3.1"/></g><circle cx="11.9" cy="4.2" r="1" fill="#E1306C"/>',
 x:'<path fill="currentColor" d="M12.3 1.5h2.3l-5 5.7 5.9 7.8h-4.6L7.3 9.3l-4.1 4.7H.9l5.4-6.1L.6 1.5h4.7l3.3 4.3 3.7-4.3Zm-.8 11.1h1.3L4.6 2.8H3.2l8.3 9.8Z"/>',
 tiktok:'<path fill="#FF0050" d="M10.2 1.5h2.2c.2 1.5 1.1 2.7 2.6 2.9v2.2c-1-.1-1.9-.4-2.6-.9v4.2a4.2 4.2 0 1 1-4.2-4.2c.2 0 .4 0 .6.1v2.3a2 2 0 1 0 1.4 1.9V1.5Z"/>',
 discord:'<path fill="#5865F2" d="M13.2 3.4A12 12 0 0 0 10.3 2.5l-.2.4a11 11 0 0 0-4.2 0l-.2-.4a12 12 0 0 0-2.9.9C1 6.4.5 9.3.7 12.1a12 12 0 0 0 3.6 1.8l.8-1.2a7.7 7.7 0 0 1-1.2-.6l.3-.2a8.5 8.5 0 0 0 7.2 0l.3.2a7.7 7.7 0 0 1-1.2.6l.8 1.2a12 12 0 0 0 3.6-1.8c.3-3.2-.5-6.1-2.7-8.7ZM5.8 10.3c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Zm4.4 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4Z"/>',
 telegram:'<path fill="#229ED9" d="M15 2.3 1 7.7c-.9.3-.9.9-.2 1.1l3.5 1.1 1.4 4.2c.2.4.3.6.7.6.3 0 .4-.1.6-.3l1.7-1.7 3.5 2.6c.6.4 1.1.2 1.3-.6l2.3-10.8c.2-.9-.3-1.3-.8-1.1ZM5.7 10.2l7.5-4.7c.3-.2.6-.1.4.1l-6.4 5.8-.3 2.4-1.2-3.6Z"/>',
 twitch:'<path fill="#9146FF" d="M3.2 1 1.5 3.9v9.4h3.2V16l2.9-2.7h2.3L15 9.1V1H3.2Zm10.5 7.6-1.9 1.8H9.4l-1.6 1.6v-1.6H5.1V2.2h8.6v6.4Z"/><path fill="#9146FF" d="M11.3 4.2v3.6h-1.2V4.2h1.2Zm-3.2 0v3.6H6.9V4.2h1.2Z"/>',
 kick:'<rect width="16" height="16" rx="3.5" fill="#53FC18"/><path fill="#0B120F" d="M4.4 3.6h2.5v3.2l2.6-3.2h3l-3.5 4.2 3.6 4.6h-3l-2.7-3.6v3.6H4.4V3.6Z"/>',
 reddit:'<circle cx="8" cy="8" r="7" fill="#FF4500"/><path fill="#fff" d="M12.8 8a1.2 1.2 0 0 0-2-.8 5.9 5.9 0 0 0-3-.9l.5-2.4 1.7.4a1 1 0 1 0 .1-.7l-2-.4a.3.3 0 0 0-.4.2l-.6 2.9a5.9 5.9 0 0 0-3 .9A1.2 1.2 0 1 0 2.6 9.9v.4c0 1.7 2 3.1 4.4 3.1s4.4-1.4 4.4-3.1v-.4c.3-.2.6-.6.6-1Zm-7.5.9a.9.9 0 1 1 .9.9.9.9 0 0 1-.9-.9Zm4.9 2.4a3.1 3.1 0 0 1-2.2.7 3.1 3.1 0 0 1-2.2-.7.3.3 0 0 1 .4-.4 2.6 2.6 0 0 0 1.8.5 2.6 2.6 0 0 0 1.8-.5.3.3 0 1 1 .4.4Zm-.2-1.5a.9.9 0 1 1 .9-.9.9.9 0 0 1-.9.9Z"/>',
 web:'<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6.3"/><ellipse cx="8" cy="8" rx="2.7" ry="6.3"/><path d="M1.9 5.8h12.2M1.9 10.2h12.2"/></g>'
};
const PLATNAME={youtube:"YouTube",instagram:"Instagram",x:"X",tiktok:"TikTok",discord:"Discord",telegram:"Telegram",twitch:"Twitch",kick:"Kick",reddit:"Reddit",web:"Website"};
function picon(p){return PICON[p]?'<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">'+PICON[p]+'</svg>':"";}
const PLATS=[["youtube","YT"],["instagram","IG"],["x","X"],["discord","DC"],["telegram","TG"],["tiktok","TT"],["reddit","RD"],["kick","KI"],["twitch","TW"],["web","WWW"]];
const CRYPTO=/hyperliquid|polymarket|\bcrypto|perps?\b|perpetual|breakout|hyrotrader|crypto fund trader|bitfunded|hypernova|carrot funding|solana|bitcoin|\bbtc\b|\beth\b|altcoin|defi|on-?chain|web3|kalshi|prediction market/i;
function daysSince(s){if(!s)return null;s=String(s).toLowerCase();let m;if((m=s.match(/(\d+)\s*(hour|day|week|month|year)/)))return +m[1]*({hour:0.04,day:1,week:7,month:30,year:365}[m[2]]);if(/^\d{4}-\d{2}-\d{2}/.test(s))return (Date.now()-Date.parse(s))/864e5;return null;}
function matchScore(r){const why=[];let s=0;const y=(r.platforms||{}).youtube||{};const bio=[r.name,r.description,(r.platforms.x||{}).bio,(r.platforms.instagram||{}).bio].join(" ");const cf=[...(r.mentionedFirms||[]),...(r.firms||[]).map(f=>f.firm)].join(" ");
  const onPropr=(r.firms||[]).some(f=>f.firm==="Propr")||(r.mentionedFirms||[]).includes("Propr");
  if(CRYPTO.test(bio)){s+=30;why.push("crypto or prediction market audience");}else if(/breakout|hyrotrader|crypto fund trader|hypernova|funding predicts|carrot/i.test(cf)){s+=18;why.push("promotes a crypto prop firm");}else if(/futures|nasdaq|\bnq\b/i.test(bio+" "+cf)){s+=8;why.push("futures audience");}
  if(r.promoter){s+=20;why.push("already runs affiliate codes");}
  if((r.firmCount||0)>=2){s+=10;why.push("works with "+r.firmCount+" firms");}
  const a=r.maxAudience||0;if(a>0){const rs=Math.min(20,Math.round(Math.log10(a+1)*3.4));s+=rs;const af=a>=1e6?(a/1e6).toFixed(1)+"M":a>=1e3?Math.round(a/1e3)+"K":String(a);why.push(af+" audience");}
  if(y.viewRate!=null){if(y.viewRate>=.3){s+=10;why.push("very high view rate");}else if(y.viewRate>=.1){s+=6;why.push("high view rate");}else if(y.viewRate>=.03){s+=3;}}
  if((y.uploadsPerMonth||0)>=4){s+=5;why.push("posts weekly or more");}
  const d=daysSince(y.lastUpload);if(d!=null&&d<=30){s+=5;why.push("active this month");}
  if(r.recruit){s+=10;why.push("hand picked recruit");}
  if(r.type==="site"){s-=10;}
  return {score:Math.max(0,Math.min(100,s)),why,onPropr};}
const VIEWS=[["content","Content to stitch",()=>true],["matches","Potential matches for Propr",r=>!r.onPropr&&r.match>=55],["dmatches","Potential matches for DRAWUP",r=>r.dmatch>=50],["promoters","Carries a code",r=>r.promoter],["enriched","Has reach stats",r=>r.enriched],["all","Everyone found",()=>true],["propr","Already promoting Propr",r=>r.firms.some(f=>f.firm==="Propr")],["multi","Works with 3+ firms",r=>r.firmCount>=3],["recruits","Recruit candidates",r=>r.recruit],["export","From channel exports",r=>r.source==="export"]];

const NICHES=[["prop trading","Prop trading"],["gacha","Gacha and openings"],["memecoin","Memecoin and degen"],["ai bots","AI trading bots"]];
const EXCL_GEO=/^(United States|Belgium|Netherlands|United Arab Emirates|US|USA|UAE|NL|BE)$/i;
function drawupScore(r){const why=[];let s=0;const n=r.niche;if(n==="gacha"){s+=30;why.push("gacha or opening audience");}else if(n==="memecoin"){s+=30;why.push("memecoin or degen audience");}else if(n==="ai bots"){s+=22;why.push("wants a bot to trade");}else if(/crypto/i.test((r.matchWhy||[]).join(" "))){s+=15;why.push("crypto prop audience");}
 if(r.promoter){s+=15;why.push("runs codes or sponsors");}const a=r.maxAudience||0;if(a>0){s+=Math.min(20,Math.round(Math.log10(a+1)*3.4));why.push(fmtN(a)+" audience");}
 const y=(r.platforms||{}).youtube||{};if(y.viewRate>=.3){s+=10;why.push("very high view rate");}else if(y.viewRate>=.1){s+=6;why.push("high view rate");}
 if((y.uploadsPerMonth||0)>=4){s+=5;why.push("posts weekly");}if(r.platforms.kick||r.platforms.twitch){s+=8;why.push("live streams openings");}
 if(EXCL_GEO.test(r.country||"")){s-=25;why.push("in an excluded market");}if(/^India$/i.test(r.country||"")){s-=8;why.push("India promoter risk");}
 return {score:Math.max(0,Math.min(100,s)),why};}
function fmtN(n){return n>=1e6?(n/1e6).toFixed(1)+"M":n>=1e3?Math.round(n/1e3)+"K":String(n);}
DATA.forEach(r=>{const m=matchScore(r);r.match=m.score;r.matchWhy=m.why;r.onPropr=m.onPropr;r.niche=r.niche||"prop trading";const d=drawupScore(r);r.dmatch=d.score;r.dmatchWhy=d.why;});
const state={view:"matches",q:"",firms:new Set(),plats:new Set(),types:new Set(),niches:new Set(),minsubs:0,country:"",status:"",sort:"match",dir:-1,sel:null};
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
    if(state.niches.size&&!state.niches.has(r.niche||"prop trading"))return false;
    if(state.minsubs&&(r.maxAudience||0)<state.minsubs)return false;
    if(state.country&&r.country!==state.country)return false;
    if(state.status&&((outreach[r.id]||{}).status||"")!==state.status)return false;
    if(q){const hay=[r.name,r.country,...Object.values(r.platforms).map(p=>p.handle||""),...firmsOf(r),...r.firms.map(f=>f.code||""),...(r.linkCodes||[])].join(" ").toLowerCase();if(!hay.includes(q))return false;}
    return true;
  }).sort((a,b)=>{const k=state.sort;let x=val(a,k),y=val(b,k);if(x==null&&y==null)return 0;if(x==null)return 1;if(y==null)return -1;if(typeof x==="string")return x.localeCompare(y)*state.dir;return (x-y)*state.dir;});
}
function val(r,k){switch(k){case"match":return state.view==="dmatches"?(r.dmatch||0):(r.match||0);case"name":return r.name.toLowerCase();case"subs":return yt(r).subs??null;case"aud":return r.maxAudience||null;case"avg":return yt(r).avgViews??null;case"rate":return yt(r).viewRate??null;case"upl":return yt(r).uploadsPerMonth??null;case"firms":return r.firmCount;case"country":return r.country||null;case"status":return (outreach[r.id]||{}).status||"";default:return r.maxAudience||null;}}

function renderStats(){
  const enr=DATA.filter(r=>r.enriched).length;const prom=DATA.filter(r=>r.promoter).length,propr=DATA.filter(r=>r.firms.some(f=>f.firm==="Propr")).length,firms=new Set(DATA.flatMap(r=>r.firms.map(f=>f.firm))).size,shortl=Object.values(outreach).filter(o=>o.status&&o.status!=="nofit"&&o.status!=="declined").length;
  document.getElementById("stats").innerHTML=[[DATA.length,"in the atlas"],[prom,"carry a code"],[enr,"with reach stats"],[firms,"firms mapped"],[propr,"already on Propr"],[shortl,"in your pipeline"]].map(([n,l])=>`<div class="stat"><b>${n}</b><span>${l}</span></div>`).join("");
}
function renderRail(){
  document.getElementById("tabs").innerHTML=VIEWS.map(v=>`<button class="tab" role="tab" data-v="${v[0]}" aria-selected="${state.view===v[0]}"><span>${v[1]}</span><span class="num">${DATA.filter(v[2]).length}</span></button>`).join("");
  const fc={};DATA.forEach(r=>[...new Set([...firmsOf(r),...(r.searchFirms||[])])].forEach(f=>fc[f]=(fc[f]||0)+1));
  const fe=Object.entries(fc).sort((a,b)=>b[1]-a[1]);const cut=window.__allFirms?fe.length:14;const shown=fe.filter((x,i)=>i<cut||state.firms.has(x[0]));
  document.getElementById("firmchips").innerHTML=shown.map(([f,n])=>`<button class="chip" data-f="${esc(f)}" aria-pressed="${state.firms.has(f)}">${esc(f)}<small>${n}</small></button>`).join("")+(fe.length>14?`<button class="more-chips" id="morefirms">${window.__allFirms?"Show fewer":"Show all "+fe.length+" firms"}</button>`:"");
  const nc={};DATA.forEach(r=>{const k=r.niche||"prop trading";nc[k]=(nc[k]||0)+1;});
  document.getElementById("nichechips").innerHTML=NICHES.filter(([k])=>nc[k]).map(([k,l])=>`<button class="chip" data-n="${k}" aria-pressed="${state.niches.has(k)}">${l}<small>${nc[k]}</small></button>`).join("");
  const tc={};DATA.forEach(r=>{const k=r.type||"creator";tc[k]=(tc[k]||0)+1;});
  document.getElementById("typechips").innerHTML=TYPES.filter(([k])=>tc[k]).map(([k,l])=>`<button class="chip" data-t="${k}" aria-pressed="${state.types.has(k)}">${l}<small>${tc[k]}</small></button>`).join("");
  const pc={};DATA.forEach(r=>Object.keys(r.platforms).forEach(p=>pc[p]=(pc[p]||0)+1));
  document.getElementById("platchips").innerHTML=PLATS.filter(([p])=>pc[p]).map(([p,l])=>`<button class="chip" data-p="${p}" aria-pressed="${state.plats.has(p)}" title="Show only creators present on ${PLATNAME[p]||l}">${picon(p)}${PLATNAME[p]||l}<small>${pc[p]}</small></button>`).join("");
  const cs=document.getElementById("country");if(cs.options.length===1){const cc={};DATA.forEach(r=>{if(r.country)cc[r.country]=(cc[r.country]||0)+1;});Object.entries(cc).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>cs.insertAdjacentHTML("beforeend",`<option value="${esc(c)}">${esc(c)} (${n})</option>`));}
  const ss=document.getElementById("status");if(ss.options.length===1)STATUSES.slice(1).forEach(([v,l])=>ss.insertAdjacentHTML("beforeend",`<option value="${v}">${l}</option>`));
}
function audLabel(r){const p=r.platforms;const k=p.youtube&&p.youtube.subs===r.maxAudience?"YT":p.discord&&p.discord.members===r.maxAudience?"DC":p.telegram&&p.telegram.members===r.maxAudience?"TG":p.reddit&&p.reddit.karma===r.maxAudience?"karma":p.x&&p.x.followers===r.maxAudience?"X":"";return k&&r.maxAudience?` <span style="color:var(--faint);font-size:10px">${k}</span>`:"";}
const AV=window.__AVATARS||{};
function avatar(r){const src=AV[r.id];if(src)return `<img class="av" src="${src}" alt="" loading="lazy">`;const ini=(r.name||"?").replace(/^u\//,"").trim().split(/\s+/).slice(0,2).map(w=>w[0]||"").join("").toUpperCase()||"?";return `<span class="av init">${esc(ini)}</span>`;}
function primaryUrl(r){const p=r.platforms;const o=["youtube","discord","telegram","instagram","x","tiktok","kick","twitch","web","reddit"];for(const k of o){if(p[k]&&p[k].url)return p[k].url;}return "";}
function statusHtml(id){const s=(outreach[id]||{}).status||"";const l=(STATUSES.find(x=>x[0]===s)||STATUSES[0])[1];return `<span class="status"><i class="dot ${s}"></i>${s?l:"<span style='color:var(--faint)'>Not contacted</span>"}</span>`;}
function renderTable(rows){
  const cols=[...(state.view==="matches"||state.view==="dmatches"?[["match","Match","mcol"]]:[]),["name","Creator"],["link","Channel"],["plats","Where"],["aud","Audience","r"],["avg","Avg views / video","r"],["rate","View rate","r"],["upl","Uploads / mo","r"],["firms","Works with"],["country","Country"],["status","Your status"]];
  const head=cols.map(([k,l,a])=>`<th class="${a||""}" data-k="${k}" ${state.sort===k?`aria-sort="${state.dir<0?"descending":"ascending"}"`:""}>${l}</th>`).join("");
  
  const shown=rows.slice(0,limit);
  const body=shown.map(r=>{const y=yt(r);const rate=y.viewRate;const w=rate?Math.round(Math.min(rate,1)*56):0;
    const chips=r.firms.slice(0,3).map(f=>`<span class="tag ${f.firm==="Propr"?"propr":"code"}">${esc(f.firm)}</span>`).join("")+r.mentionedFirms.filter(m=>!r.firms.some(f=>f.firm===m)).slice(0,2).map(m=>`<span class="tag mention">${esc(m)}</span>`).join("")+(r.firmCount>5?`<span class="tag mention">+${r.firmCount-5}</span>`:"")+(!r.firmCount&&r.searchFirms&&r.searchFirms.length?r.searchFirms.slice(0,2).map(m=>`<span class="tag via" title="Found by searching for this firm">${esc(m)}</span>`).join("")+(r.searchFirms.length>2?`<span class="tag via">+${r.searchFirms.length-2}</span>`:""):"");
    const pu=primaryUrl(r);const dm=state.view==="dmatches";const ms=dm?r.dmatch:r.match;const mw=dm?r.dmatchWhy:r.matchWhy;const mcell=(state.view==="matches"||dm)?`<td class="mcol"><div class="mscore"><b>${ms}</b><span class="mbar"><i style="width:${ms}%"></i></span></div><div class="mwhy" title="${esc((mw||[]).join(", "))}">${(mw||[]).slice(0,2).map(esc).join(" \u00b7 ")}</div></td>`:"";return `<tr class="row" data-id="${esc(r.id)}" aria-selected="${state.sel===r.id}">${mcell}<td><div class="who">${avatar(r)}<div><div class="name">${esc(r.name)}${r.recruit?'<span class="tag propr">recruit</span>':""}</div>${y.handle?`<div class="handle">@${esc(y.handle)}</div>`:""}</div></div></td>
    <td class="chan">${pu?`<a class="ext" href="${esc(pu)}" target="_blank" rel="noopener">${esc(pu.replace(/^https?:\/\/(www\.)?/,"").slice(0,42))}</a>`:'<span style="color:var(--faint)">no link</span>'}</td>
    <td><div class="plats">${PLATS.map(([p,l])=>{const v=r.platforms[p];return v?`<span class="pl on" title="${PLATNAME[p]||l}${v.handle?" @"+esc(v.handle):""}">${v.url?`<a class="ext" href="${esc(v.url)}" target="_blank" rel="noopener" aria-label="${PLATNAME[p]||l}">${picon(p)||l}</a>`:(picon(p)||l)}</span>`:`<span class="pl" title="No ${PLATNAME[p]||l}">${picon(p)||l}</span>`;}).join("")}</div></td>
    <td class="r num">${fmt(r.maxAudience)||'<span style="color:var(--faint)" title="Not enriched yet">?</span>'}${audLabel(r)}</td><td class="r num">${fmt(y.avgViews)||(y.foundMaxViews?`<span style="color:var(--faint)" title="Top video found in the crawl; channel not enriched yet">${fmt(y.foundMaxViews)} top</span>`:"")}</td>
    <td class="r num">${rate!=null?`<span class="bar" style="width:${w}px"></span>${(rate*100).toFixed(0)}%`:'<span style="color:var(--faint)">no data</span>'}</td>
    <td class="r num">${y.uploadsPerMonth!=null?y.uploadsPerMonth.toFixed(1):""}</td>
    <td>${chips||'<span style="color:var(--faint)">none named</span>'}</td><td>${esc(r.country)}</td><td>${statusHtml(r.id)}</td></tr>`;}).join("");
  const more=rows.length>limit?`<div style="padding:12px;text-align:center"><button class="btn" id="more">Show ${Math.min(150,rows.length-limit)} more of ${rows.length-limit} remaining</button></div>`:"";
  const intro=state.view==="dmatches"?`<div class="mintro"><b>How the DRAWUP match score works.</b> Gacha or opening audience 30, memecoin or degen 30, wants a bot to trade 22, crypto prop audience 15, runs codes or sponsors 15, reach up to 20 on a log scale, view rate up to 10, posts weekly 5, live streams openings 8. Minus 25 in the US, Belgium, the Netherlands or the UAE (cannot buy), minus 8 in India (promoter risk). Shortlist, not a verdict.</div>`:state.view==="matches"?`<div class="mintro"><b>How the match score works.</b> Crypto or prediction market audience 30, already runs affiliate codes 20, works with several firms 10, reach up to 20 on a log scale, view rate up to 10, posts weekly 5, active this month 5, hand picked recruit 10. Anyone already promoting Propr is left out. Scores are a shortlist, not a verdict: open the profile before you reach out.</div>`:"";
  document.getElementById("view").innerHTML=rows.length?intro+`<div class="tablewrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>${more}</div>`:`<div class="empty">Nothing matches these filters. Clear one and try again.</div>`;
}
function renderFirms(rows){
  const m={};rows.forEach(r=>r.firms.forEach(f=>{(m[f.firm]=m[f.firm]||[]).push({r,f});}));
  const cards=Object.entries(m).sort((a,b)=>b[1].length-a[1].length).map(([firm,list])=>{const seen=new Set();const u=list.filter(x=>!seen.has(x.r.id)&&seen.add(x.r.id));const aud=u.reduce((s,x)=>s+(x.r.maxAudience||0),0);const excl=u.filter(x=>x.r.firmCount<=1).length;
    return `<div class="firmcard"><h3>${esc(firm)}<span class="num" style="color:var(--muted)">${u.length} promoters</span></h3><div class="meta"><span>Combined audience ${fmt(aud)}</span><span>${excl} single firm</span></div><ol>${u.sort((a,b)=>(b.r.maxAudience||0)-(a.r.maxAudience||0)).slice(0,6).map(x=>`<li><a href="#" data-id="${esc(x.r.id)}">${esc(x.r.name)}</a> <span class="num" style="color:var(--muted)">${fmt(x.r.maxAudience)}</span>${x.f.code?` <span class="tag code">${esc(x.f.code.split(",")[0].slice(0,28))}</span>`:""}</li>`).join("")}</ol>${FIRM_FP[firm]?`<div class="fp">link fingerprint ${esc(FIRM_FP[firm])}</div>`:""}</div>`;}).join("");
  document.getElementById("view").innerHTML=`<div class="firmgrid">${cards}</div>`;
}
let firmMode=false;
const cstate={niche:"",hook:"",form:"",q:""};
function renderContent(){const rows=CONTENT.filter(c=>(!cstate.niche||c.niche===cstate.niche)&&(!cstate.hook||c.hooks.includes(cstate.hook))&&(!cstate.form||(cstate.form==="short"?c.shortForm:c.clipLength))&&(!cstate.q||(c.title+" "+c.channel).toLowerCase().includes(cstate.q)));
 const top=rows.slice(0,Math.max(100,Math.min(rows.length,limit)));
 const nc={},hc={};CONTENT.forEach(c=>{nc[c.niche]=(nc[c.niche]||0)+1;c.hooks.forEach(h=>hc[h]=(hc[h]||0)+1);});
 const chips=`<div class="cfilters">${NICHES.filter(([k])=>nc[k]).map(([k,l])=>`<button class="chip" data-cn="${k}" aria-pressed="${cstate.niche===k}">${l}<small>${nc[k]}</small></button>`).join("")}<span style="width:8px"></span>${Object.entries(hc).sort((a,b)=>b[1]-a[1]).map(([h,n])=>`<button class="chip" data-ch="${esc(h)}" aria-pressed="${cstate.hook===h}">${esc(h)}<small>${n}</small></button>`).join("")}<span style="width:8px"></span><button class="chip" data-cf="short" aria-pressed="${cstate.form==="short"}">Under 60s</button><button class="chip" data-cf="clip" aria-pressed="${cstate.form==="clip"}">Under 3 min</button></div>`;
 const intro=`<div class="mintro"><b>What this is.</b> The best performing videos from channels the atlas judged on topic, ranked for stitch value: views on a log scale, plus a bonus for short form, for the last 90 days, for a recognisable hook (how to pass, strategy, payout proof, pull or opening, memecoin call, bot results), for channels that already run affiliate codes, and for videos that outperformed the channel's subscriber count. Firm owned channels and ad uploads are excluded. Open the video, take the first one to three seconds as the hook, and bridge to DRAWUP. ${rows.length} candidates, showing ${top.length}.</div>`;
 const head=`<tr><th>#</th><th>Video</th><th>Hook</th><th class="r">Views</th><th class="r">Length</th><th>Posted</th><th class="r">Views ÷ subs</th><th>Channel</th></tr>`;
 const body=top.map(c=>{const r=DATA.find(x=>x.id===c.atlasId);return `<tr><td class="num">${c.rank}</td><td class="ctitle"><a class="ext" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.title)}</a><div class="csub">${esc(c.niche)}${c.shortForm?" · short":c.clipLength?" · clip length":""}</div></td><td>${c.hooks.map(h=>`<span class="hook">${esc(h)}</span>`).join(" ")||'<span style="color:var(--faint)">none</span>'}</td><td class="r num">${fmt(c.views)}</td><td class="r num">${esc(c.length)}</td><td class="num">${esc(c.published)}</td><td class="r num">${c.viewsOverSubs!=null?c.viewsOverSubs+"x":""}</td><td>${r?`<a href="#" data-id="${esc(r.id)}">${esc(c.channel)}</a>`:esc(c.channel)}<div class="csub">${fmt(c.channelSubs)||"?"} subs${c.channelPromoter?" · runs codes":""}${c.channelCountry?" · "+esc(c.channelCountry):""}</div></td></tr>`;}).join("");
 const more=rows.length>top.length?`<div style="padding:12px;text-align:center"><button class="btn" id="more">Show more of ${rows.length-top.length} remaining</button></div>`:"";
 document.getElementById("count").innerHTML=`Top ${top.length} of ${rows.length} stitchable videos. <a href="#" id="cexport">Export this list as CSV</a>`;
 document.getElementById("view").innerHTML=intro+chips+`<div class="tablewrap"><table class="ctable"><thead>${head}</thead><tbody>${body}</tbody></table>${more}</div>`;}
function render(){if(state.view==="content"){renderStats();renderRail();renderContent();return;}renderStats();renderRail();const rows=filtered();const narrowed=state.view!=="all"&&(state.plats.size||state.types.size||state.firms.size);let hint="";if(narrowed){const v=VIEWS.find(v=>v[0]==="all");const all=DATA.filter(r=>{if(state.firms.size&&![...firmsOf(r),...(r.searchFirms||[])].some(f=>state.firms.has(f)))return false;if(state.plats.size&&![...state.plats].every(p=>r.platforms[p]))return false;if(state.types.size&&!state.types.has(r.type||"creator"))return false;return true;}).length;if(all>rows.length)hint=` Only the "${VIEWS.find(v=>v[0]===state.view)[1]}" view is shown. <a href="#" id="widen">Show all ${all}</a>.`;}
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
  document.getElementById("drawer").innerHTML=`<div class="dhead"><div style="display:flex;gap:12px;align-items:center">${avatar(r).replace('class="av','class="av" style="width:48px;height:48px;font-size:16px" data-x="')}<div><h2>${esc(r.name)}</h2><div class="where">${[r.country,(NICHES.find(x=>x[0]===(r.niche||"prop trading"))||[])[1],r.subniche||"",(TYPES.find(x=>x[0]===(r.type||"creator"))||[])[1],r.recruit?"Recruit candidate":r.promoter?"Carries a prop firm code":"No code found yet",r.email?"email on file":"",...(r.sources||[])].filter(Boolean).join(" · ")}</div></div></div><button class="close" id="close" aria-label="Close">×</button></div>
  <div class="dbody">
    <div><h4>Where they are</h4><div class="links">${links||'<span class="note">No links recorded yet.</span>'}${r.email?`<a href="mailto:${esc(r.email)}"><b>@</b>${esc(r.email)}</a>`:""}</div></div>
    ${r.dmatch!=null?`<div><h4>DRAWUP match</h4><div class="mscore"><b>${r.dmatch}</b><span class="mbar"><i style="width:${r.dmatch}%"></i></span><span style="font-size:12px;color:var(--muted)">out of 100</span></div><p class="note" style="margin-top:6px">${(r.dmatchWhy||[]).length?esc(r.dmatchWhy.join(", ")):"No strong signals yet."}${(r.sponsors||[]).length?" Sponsors and promotions seen: "+esc(r.sponsors.slice(0,6).join(", "))+".":""}</p></div>`:""}
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
  const t=e.target.closest("[data-v],[data-f],[data-p],[data-t],[data-n],th[data-k],tr.row,#toggle,#reset,#more,#widen,a[data-id],a.ext");if(!t)return;
  if(t.matches("a.ext"))return;
  if(t.id==="widen"){e.preventDefault();state.view="all";limit=150;render();return;}
  const cc=e.target.closest("[data-cn],[data-ch],[data-cf],#cexport");if(cc&&state.view==="content"){e.preventDefault();if(cc.dataset.cn!==undefined)cstate.niche=cstate.niche===cc.dataset.cn?"":cc.dataset.cn;else if(cc.dataset.ch!==undefined)cstate.hook=cstate.hook===cc.dataset.ch?"":cc.dataset.ch;else if(cc.dataset.cf!==undefined)cstate.form=cstate.form===cc.dataset.cf?"":cc.dataset.cf;else if(cc.id==="cexport"){const rows=CONTENT.filter(c=>(!cstate.niche||c.niche===cstate.niche)&&(!cstate.hook||c.hooks.includes(cstate.hook)));const csv="rank,title,url,channel,niche,hooks,views,length,published,views_over_subs,channel_subs,channel_runs_codes\n"+rows.map(c=>[c.rank,c.title,c.url,c.channel,c.niche,c.hooks.join("; "),c.views,c.length,c.published,c.viewsOverSubs??"",c.channelSubs,c.channelPromoter].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");if(downloads){downloads.save({filename:"content-to-stitch.csv",data:csv}).catch(()=>{});}else{navigator.clipboard.writeText(csv).then(()=>alert("Copied to clipboard")).catch(()=>{});}return;}limit=150;render();return;}
  if(!t.matches("tr.row,a[data-id],#more,th"))limit=150;
  if(t.dataset.v){state.view=t.dataset.v;if(state.view==="matches"||state.view==="dmatches"){state.sort="match";state.dir=-1;}else if(state.sort==="match"){state.sort="maxAudience";state.dir=-1;}render();}
  else if(t.dataset.f){state.firms.has(t.dataset.f)?state.firms.delete(t.dataset.f):state.firms.add(t.dataset.f);render();}
  else if(t.dataset.p){state.plats.has(t.dataset.p)?state.plats.delete(t.dataset.p):state.plats.add(t.dataset.p);render();}
  else if(t.dataset.t){state.types.has(t.dataset.t)?state.types.delete(t.dataset.t):state.types.add(t.dataset.t);render();}
  else if(t.dataset.n){state.niches.has(t.dataset.n)?state.niches.delete(t.dataset.n):state.niches.add(t.dataset.n);render();}
  else if(t.id==="more"){limit+=150;render();}
  else if(t.matches("th")){const k=t.dataset.k;if(k==="plats"||k==="link")return;if(state.sort===k)state.dir*=-1;else{state.sort=k;state.dir=k==="name"||k==="country"?1:-1;}render();}
  else if(t.matches("tr.row"))openDrawer(t.dataset.id);
  else if(t.matches("a[data-id]")){e.preventDefault();openDrawer(t.dataset.id);}
  else if(t.id==="toggle"){e.preventDefault();firmMode=!firmMode;render();}
  else if(t.id==="reset"){Object.assign(state,{q:"",minsubs:0,country:"",status:""});state.firms.clear();state.plats.clear();state.types.clear();state.niches.clear();document.getElementById("q").value="";document.getElementById("minsubs").value="0";document.getElementById("country").value="";document.getElementById("status").value="";render();}
});
document.getElementById("q").addEventListener("input",e=>{state.q=e.target.value;cstate.q=e.target.value.toLowerCase();limit=150;render();});
document.getElementById("minsubs").addEventListener("change",e=>{state.minsubs=+e.target.value;render();});
document.getElementById("country").addEventListener("change",e=>{state.country=e.target.value;render();});
document.getElementById("status").addEventListener("change",e=>{state.status=e.target.value;render();});
document.getElementById("scrim").addEventListener("click",closeDrawer);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&state.sel)closeDrawer();});
document.getElementById("export").addEventListener("click",async()=>{
  const rows=filtered();const cols=["name","niche","kind","channel_url","country","youtube_handle","youtube_subs","avg_views_per_video","view_rate","avg_monthly_views","uploads_per_month","last_upload","instagram","x","discord","telegram","tiktok","email","confirmed_firms","codes","mentioned_firms","status","priority","notes"];
  const line=r=>{const y=yt(r);const o=outreach[r.id]||{};const g=p=>(r.platforms[p]||{}).url||"";return [r.name,r.niche||"prop trading",r.type||"creator",primaryUrl(r),r.country,y.handle||"",y.subs??"",y.avgViews??"",y.viewRate??"",y.monthlyViews??"",y.uploadsPerMonth??"",y.lastUpload||"",g("instagram"),g("x"),g("discord"),g("telegram"),g("tiktok"),r.email||"",r.firms.map(f=>f.firm).join("; "),[...r.firms.map(f=>f.code).filter(Boolean),...(r.firmCodes||[])].join("; "),r.mentionedFirms.join("; "),o.status||"",o.priority||"",o.notes||""].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",");};
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
