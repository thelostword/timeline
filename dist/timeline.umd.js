(function(x,S){typeof exports=="object"&&typeof module<"u"?S(exports):typeof define=="function"&&define.amd?define(["exports"],S):(x=typeof globalThis<"u"?globalThis:x||self,S(x.$timeline={}))})(this,function(x){"use strict";var Kt=Object.defineProperty;var te=(x,S,E)=>S in x?Kt(x,S,{enumerable:!0,configurable:!0,writable:!0,value:E}):x[S]=E;var dt=(x,S,E)=>(te(x,typeof S!="symbol"?S+"":S,E),E),Ht=(x,S,E)=>{if(!S.has(x))throw TypeError("Cannot "+E)};var o=(x,S,E)=>(Ht(x,S,"read from private field"),E?E.call(x):S.get(x)),_=(x,S,E)=>{if(S.has(x))throw TypeError("Cannot add the same private member more than once");S instanceof WeakSet?S.add(x):S.set(x,E)},W=(x,S,E,at)=>(Ht(x,S,"write to private field"),at?at.call(x,E):S.set(x,E),E);var B=(x,S,E)=>(Ht(x,S,"access private method"),E);var ut,K,ot,X,J,z,it,V,tt,Q,vt,Wt,pt,Pt,Mt,kt,Tt,It,Dt,Ut,xt,Xt,yt,jt,St,At,Yt,ft,ht,st,$t;function S(g){return{all:g=g||new Map,on:function(t,i){var a=g.get(t);a?a.push(i):g.set(t,[i])},off:function(t,i){var a=g.get(t);a&&(i?a.splice(a.indexOf(i)>>>0,1):g.set(t,[]))},emit:function(t,i){var a=g.get(t);a&&a.slice().map(function(f){f(i)}),(a=g.get("*"))&&a.slice().map(function(f){f(t,i)})}}}var E=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function at(g){return g&&g.__esModule&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g}var Ft={exports:{}};(function(g,t){(function(i,a){g.exports=a()})(E,function(){var i=1e3,a=6e4,f=36e5,p="millisecond",l="second",m="minute",c="hour",C="day",b="week",M="month",T="quarter",D="year",Y="date",r="Invalid Date",y=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,k=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,w={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(u){var n=["th","st","nd","rd"],e=u%100;return"["+u+(n[(e-20)%10]||n[e]||n[0])+"]"}},H=function(u,n,e){var h=String(u);return!h||h.length>=n?u:""+Array(n+1-h.length).join(e)+u},Z={s:H,z:function(u){var n=-u.utcOffset(),e=Math.abs(n),h=Math.floor(e/60),s=e%60;return(n<=0?"+":"-")+H(h,2,"0")+":"+H(s,2,"0")},m:function u(n,e){if(n.date()<e.date())return-u(e,n);var h=12*(e.year()-n.year())+(e.month()-n.month()),s=n.clone().add(h,M),d=e-s<0,$=n.clone().add(h+(d?-1:1),M);return+(-(h+(e-s)/(d?s-$:$-s))||0)},a:function(u){return u<0?Math.ceil(u)||0:Math.floor(u)},p:function(u){return{M,y:D,w:b,d:C,D:Y,h:c,m,s:l,ms:p,Q:T}[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(u){return u===void 0}},F="en",I={};I[F]=w;var j="$isDayjsObject",G=function(u){return u instanceof bt||!(!u||!u[j])},R=function u(n,e,h){var s;if(!n)return F;if(typeof n=="string"){var d=n.toLowerCase();I[d]&&(s=d),e&&(I[d]=e,s=d);var $=n.split("-");if(!s&&$.length>1)return u($[0])}else{var O=n.name;I[O]=n,s=O}return!h&&s&&(F=s),s||!h&&F},L=function(u,n){if(G(u))return u.clone();var e=typeof n=="object"?n:{};return e.date=u,e.args=arguments,new bt(e)},v=Z;v.l=R,v.i=G,v.w=function(u,n){return L(u,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var bt=function(){function u(e){this.$L=R(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[j]=!0}var n=u.prototype;return n.parse=function(e){this.$d=function(h){var s=h.date,d=h.utc;if(s===null)return new Date(NaN);if(v.u(s))return new Date;if(s instanceof Date)return new Date(s);if(typeof s=="string"&&!/Z$/i.test(s)){var $=s.match(y);if($){var O=$[2]-1||0,P=($[7]||"0").substring(0,3);return d?new Date(Date.UTC($[1],O,$[3]||1,$[4]||0,$[5]||0,$[6]||0,P)):new Date($[1],O,$[3]||1,$[4]||0,$[5]||0,$[6]||0,P)}}return new Date(s)}(e),this.init()},n.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},n.$utils=function(){return v},n.isValid=function(){return this.$d.toString()!==r},n.isSame=function(e,h){var s=L(e);return this.startOf(h)<=s&&s<=this.endOf(h)},n.isAfter=function(e,h){return L(e)<this.startOf(h)},n.isBefore=function(e,h){return this.endOf(h)<L(e)},n.$g=function(e,h,s){return v.u(e)?this[h]:this.set(s,e)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(e,h){var s=this,d=!!v.u(h)||h,$=v.p(e),O=function(rt,N){var et=v.w(s.$u?Date.UTC(s.$y,N,rt):new Date(s.$y,N,rt),s);return d?et:et.endOf(C)},P=function(rt,N){return v.w(s.toDate()[rt].apply(s.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(N)),s)},U=this.$W,A=this.$M,q=this.$D,ct="set"+(this.$u?"UTC":"");switch($){case D:return d?O(1,0):O(31,11);case M:return d?O(1,A):O(0,A+1);case b:var nt=this.$locale().weekStart||0,lt=(U<nt?U+7:U)-nt;return O(d?q-lt:q+(6-lt),A);case C:case Y:return P(ct+"Hours",0);case c:return P(ct+"Minutes",1);case m:return P(ct+"Seconds",2);case l:return P(ct+"Milliseconds",3);default:return this.clone()}},n.endOf=function(e){return this.startOf(e,!1)},n.$set=function(e,h){var s,d=v.p(e),$="set"+(this.$u?"UTC":""),O=(s={},s[C]=$+"Date",s[Y]=$+"Date",s[M]=$+"Month",s[D]=$+"FullYear",s[c]=$+"Hours",s[m]=$+"Minutes",s[l]=$+"Seconds",s[p]=$+"Milliseconds",s)[d],P=d===C?this.$D+(h-this.$W):h;if(d===M||d===D){var U=this.clone().set(Y,1);U.$d[O](P),U.init(),this.$d=U.set(Y,Math.min(this.$D,U.daysInMonth())).$d}else O&&this.$d[O](P);return this.init(),this},n.set=function(e,h){return this.clone().$set(e,h)},n.get=function(e){return this[v.p(e)]()},n.add=function(e,h){var s,d=this;e=Number(e);var $=v.p(h),O=function(A){var q=L(d);return v.w(q.date(q.date()+Math.round(A*e)),d)};if($===M)return this.set(M,this.$M+e);if($===D)return this.set(D,this.$y+e);if($===C)return O(1);if($===b)return O(7);var P=(s={},s[m]=a,s[c]=f,s[l]=i,s)[$]||1,U=this.$d.getTime()+e*P;return v.w(U,this)},n.subtract=function(e,h){return this.add(-1*e,h)},n.format=function(e){var h=this,s=this.$locale();if(!this.isValid())return s.invalidDate||r;var d=e||"YYYY-MM-DDTHH:mm:ssZ",$=v.z(this),O=this.$H,P=this.$m,U=this.$M,A=s.weekdays,q=s.months,ct=s.meridiem,nt=function(N,et,mt,wt){return N&&(N[et]||N(h,d))||mt[et].slice(0,wt)},lt=function(N){return v.s(O%12||12,N,"0")},rt=ct||function(N,et,mt){var wt=N<12?"AM":"PM";return mt?wt.toLowerCase():wt};return d.replace(k,function(N,et){return et||function(mt){switch(mt){case"YY":return String(h.$y).slice(-2);case"YYYY":return v.s(h.$y,4,"0");case"M":return U+1;case"MM":return v.s(U+1,2,"0");case"MMM":return nt(s.monthsShort,U,q,3);case"MMMM":return nt(q,U);case"D":return h.$D;case"DD":return v.s(h.$D,2,"0");case"d":return String(h.$W);case"dd":return nt(s.weekdaysMin,h.$W,A,2);case"ddd":return nt(s.weekdaysShort,h.$W,A,3);case"dddd":return A[h.$W];case"H":return String(O);case"HH":return v.s(O,2,"0");case"h":return lt(1);case"hh":return lt(2);case"a":return rt(O,P,!0);case"A":return rt(O,P,!1);case"m":return String(P);case"mm":return v.s(P,2,"0");case"s":return String(h.$s);case"ss":return v.s(h.$s,2,"0");case"SSS":return v.s(h.$ms,3,"0");case"Z":return $}return null}(N)||$.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(e,h,s){var d,$=this,O=v.p(h),P=L(e),U=(P.utcOffset()-this.utcOffset())*a,A=this-P,q=function(){return v.m($,P)};switch(O){case D:d=q()/12;break;case M:d=q();break;case T:d=q()/3;break;case b:d=(A-U)/6048e5;break;case C:d=(A-U)/864e5;break;case c:d=A/f;break;case m:d=A/a;break;case l:d=A/i;break;default:d=A}return s?d:v.a(d)},n.daysInMonth=function(){return this.endOf(M).$D},n.$locale=function(){return I[this.$L]},n.locale=function(e,h){if(!e)return this.$L;var s=this.clone(),d=R(e,h,!0);return d&&(s.$L=d),s},n.clone=function(){return v.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},u}(),Et=bt.prototype;return L.prototype=Et,[["$ms",p],["$s",l],["$m",m],["$H",c],["$W",C],["$M",M],["$y",D],["$D",Y]].forEach(function(u){Et[u[1]]=function(n){return this.$g(n,u[0],u[1])}}),L.extend=function(u,n){return u.$i||(u(n,bt,L),u.$i=!0),L},L.locale=R,L.isDayjs=G,L.unix=function(u){return L(1e3*u)},L.en=I[F],L.Ls=I,L.p={},L})})(Ft);var Zt=Ft.exports;const Ot=at(Zt);var Lt={exports:{}};(function(g,t){(function(i,a){g.exports=a()})(E,function(){var i="minute",a=/[+-]\d\d(?::?\d\d)?/g,f=/([+-]|\d\d)/g;return function(p,l,m){var c=l.prototype;m.utc=function(r){var y={date:r,utc:!0,args:arguments};return new l(y)},c.utc=function(r){var y=m(this.toDate(),{locale:this.$L,utc:!0});return r?y.add(this.utcOffset(),i):y},c.local=function(){return m(this.toDate(),{locale:this.$L,utc:!1})};var C=c.parse;c.parse=function(r){r.utc&&(this.$u=!0),this.$utils().u(r.$offset)||(this.$offset=r.$offset),C.call(this,r)};var b=c.init;c.init=function(){if(this.$u){var r=this.$d;this.$y=r.getUTCFullYear(),this.$M=r.getUTCMonth(),this.$D=r.getUTCDate(),this.$W=r.getUTCDay(),this.$H=r.getUTCHours(),this.$m=r.getUTCMinutes(),this.$s=r.getUTCSeconds(),this.$ms=r.getUTCMilliseconds()}else b.call(this)};var M=c.utcOffset;c.utcOffset=function(r,y){var k=this.$utils().u;if(k(r))return this.$u?0:k(this.$offset)?M.call(this):this.$offset;if(typeof r=="string"&&(r=function(F){F===void 0&&(F="");var I=F.match(a);if(!I)return null;var j=(""+I[0]).match(f)||["-",0,0],G=j[0],R=60*+j[1]+ +j[2];return R===0?0:G==="+"?R:-R}(r),r===null))return this;var w=Math.abs(r)<=16?60*r:r,H=this;if(y)return H.$offset=w,H.$u=r===0,H;if(r!==0){var Z=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(H=this.local().add(w+Z,i)).$offset=w,H.$x.$localOffset=Z}else H=this.utc();return H};var T=c.format;c.format=function(r){var y=r||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return T.call(this,y)},c.valueOf=function(){var r=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*r},c.isUTC=function(){return!!this.$u},c.toISOString=function(){return this.toDate().toISOString()},c.toString=function(){return this.toDate().toUTCString()};var D=c.toDate;c.toDate=function(r){return r==="s"&&this.$offset?m(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():D.call(this)};var Y=c.diff;c.diff=function(r,y,k){if(r&&this.$u===r.$u)return Y.call(this,r,y,k);var w=this.local(),H=m(r).local();return Y.call(w,H,y,k)}}})})(Lt);var Nt=Lt.exports;const Rt=at(Nt);var zt={exports:{}};(function(g,t){(function(i,a){g.exports=a()})(E,function(){var i={year:0,month:1,day:2,hour:3,minute:4,second:5},a={};return function(f,p,l){var m,c=function(T,D,Y){Y===void 0&&(Y={});var r=new Date(T),y=function(k,w){w===void 0&&(w={});var H=w.timeZoneName||"short",Z=k+"|"+H,F=a[Z];return F||(F=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:k,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:H}),a[Z]=F),F}(D,Y);return y.formatToParts(r)},C=function(T,D){for(var Y=c(T,D),r=[],y=0;y<Y.length;y+=1){var k=Y[y],w=k.type,H=k.value,Z=i[w];Z>=0&&(r[Z]=parseInt(H,10))}var F=r[3],I=F===24?0:F,j=r[0]+"-"+r[1]+"-"+r[2]+" "+I+":"+r[4]+":"+r[5]+":000",G=+T;return(l.utc(j).valueOf()-(G-=G%1e3))/6e4},b=p.prototype;b.tz=function(T,D){T===void 0&&(T=m);var Y=this.utcOffset(),r=this.toDate(),y=r.toLocaleString("en-US",{timeZone:T}),k=Math.round((r-new Date(y))/1e3/60),w=l(y,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(r.getTimezoneOffset()/15)-k,!0);if(D){var H=w.utcOffset();w=w.add(Y-H,"minute")}return w.$x.$timezone=T,w},b.offsetName=function(T){var D=this.$x.$timezone||l.tz.guess(),Y=c(this.valueOf(),D,{timeZoneName:T}).find(function(r){return r.type.toLowerCase()==="timezonename"});return Y&&Y.value};var M=b.startOf;b.startOf=function(T,D){if(!this.$x||!this.$x.$timezone)return M.call(this,T,D);var Y=l(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return M.call(Y,T,D).tz(this.$x.$timezone,!0)},l.tz=function(T,D,Y){var r=Y&&D,y=Y||D||m,k=C(+l(),y);if(typeof T!="string")return l(T).tz(y);var w=function(I,j,G){var R=I-60*j*1e3,L=C(R,G);if(j===L)return[R,j];var v=C(R-=60*(L-j)*1e3,G);return L===v?[R,L]:[I-60*Math.min(L,v)*1e3,Math.max(L,v)]}(l.utc(T,r).valueOf(),k,y),H=w[0],Z=w[1],F=l(H).utcOffset(Z);return F.$x.$timezone=y,F},l.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},l.tz.setDefault=function(T){m=T}}})})(zt);var Bt=zt.exports;const qt=at(Bt);Ot.extend(Rt),Ot.extend(qt);const gt=(g,t="MM/DD HH:mm Z",i)=>Ot(g).tz(i).format(t),Ct=(g,t)=>{let i,a=0;return(...f)=>{const p=Date.now(),l=p-a;!a||l>=t?(a=p,g.apply(void 0,f)):i||(i=setTimeout(()=>{a=p,g.apply(void 0,f),i=null},t-l))}},_t=g=>{const[t,i]=[g[0],g[1]],a=i.clientX-t.clientX,f=i.clientY-t.clientY;return Math.sqrt(a*a+f*f)},Jt=(g,t)=>{const i=document.createElement("canvas");i.width=i.height=1;const a=i.getContext("2d");a.fillStyle=g,a.fillRect(0,0,1,1);const f=a.getImageData(0,0,1,1).data;return`rgba(${f[0]}, ${f[1]}, ${f[2]}, ${t})`},Vt=({xCenterPoint:g,cfg:t,timePerPixel:i,timeSpacing:a,currentTime:f,$canvas:p,screenScaleCount:l,scaleHeight:m,startTime:c,drawLine:C,drawText:b,drawArea:M})=>{const T=({space:Y,scaleTimeFormat:r,bgTimeFormat:y,pointerTimeFormat:k,timezone:w})=>{b({x:p.width-g/10,y:6,text:gt(f,y,w),fontSize:`${p.height-5}px`,align:"right",baseLine:"top",color:t.bgTextColor});const H=c%a,Z=H/i;for(let F=0;F<l;F++){const I=F*t.scaleSpacing-Z-t.pointerWidth/2,j=c+F*a-H;if(j%(a*Y)===0){C({x:I,y:m.long}),b({x:I,y:p.height-m.long-5,text:gt(j,r,w),baseLine:"bottom"});continue}C({x:I,y:m.short})}C({x:g-t.pointerWidth/2,y:p.height,width:t.pointerWidth,color:t.pointerColor}),M({startX:g-t.pointerDisplayWidth/2,startY:4,endX:g+t.pointerDisplayWidth/2,endY:4+t.pointerDisplayHeight,bgColor:t.pointerColor}),b({x:g,y:t.pointerDisplayHeight/2+5,text:gt(f,k,w),align:"center",baseLine:"middle"})},D=t.thresholdsConfig[a];D&&T({space:D.space,scaleTimeFormat:D.scaleTimeFormat,bgTimeFormat:D.bgTimeFormat,pointerTimeFormat:D.pointerTimeFormat,timezone:t.timezone})},Gt={fill:!0,width:1e3,height:60,bgColor:"rgba(0,0,0,0.5)",textColor:"#ffffff",fontFamily:"Arial",scaleColor:"#ffffff",scaleSpacing:7,areaBgColor:"#ffffff55",pointerColor:"#00aeec",pointerWidth:3,pointerDisplayWidth:100,pointerDisplayHeight:14,fps:60,zoom:3,timeSpacingList:[10,100,1e3,1e4,6e4,6e5,36e5,864e5,6048e5],minimumTime:-1/0,maximumTime:1/0,thresholdsConfig:{10:{scaleTimeFormat:"mm:ss:SSS",bgTimeFormat:"YYYY/MM/DD",pointerTimeFormat:"HH:mm:ss:SSS",space:10},100:{scaleTimeFormat:"mm:ss",bgTimeFormat:"YYYY/MM/DD",pointerTimeFormat:"HH:mm:ss:SSS",space:10},1e3:{scaleTimeFormat:"mm:ss",bgTimeFormat:"YYYY/MM/DD",pointerTimeFormat:"HH:mm:ss",space:10},1e4:{scaleTimeFormat:"HH:mm:ss",bgTimeFormat:"YYYY/MM/DD",pointerTimeFormat:"HH:mm:ss",space:12},6e4:{scaleTimeFormat:"HH:mm",bgTimeFormat:"YYYY/MM/DD",pointerTimeFormat:"HH:mm:ss",space:10},6e5:{scaleTimeFormat:"HH:mm",bgTimeFormat:"YYYY/MM/DD",pointerTimeFormat:"HH:mm:ss",space:10},36e5:{scaleTimeFormat:"MM/DD HH:mm",bgTimeFormat:"YYYY/MM",pointerTimeFormat:"MM/DD HH:mm",space:12},864e5:{scaleTimeFormat:"MM/DD HH:mm",bgTimeFormat:"YYYY/MM",pointerTimeFormat:"YYYY/MM/DD HH:mm",space:12},6048e5:{scaleTimeFormat:"YYYY/MM/DD",bgTimeFormat:"YYYY",pointerTimeFormat:"YYYY/MM/DD",space:10}}};class Qt{constructor(t,i){_(this,vt);_(this,pt);_(this,Mt);_(this,Tt);_(this,Dt);_(this,xt);_(this,yt);_(this,St);_(this,st);dt(this,"$canvas");dt(this,"$canvasParent");dt(this,"ctx");dt(this,"cfg");_(this,ut,void 0);_(this,K,void 0);_(this,ot,S());_(this,X,0);_(this,J,void 0);_(this,z,void 0);_(this,it,void 0);_(this,V,!1);_(this,tt,null);_(this,Q,null);_(this,Yt,({x:t,y:i,width:a=1,color:f=this.cfg.scaleColor})=>{this.ctx.beginPath(),this.ctx.moveTo(t,this.$canvas.height),this.ctx.lineTo(t,this.$canvas.height-i),this.ctx.closePath(),this.ctx.strokeStyle=f,this.ctx.lineWidth=a,this.ctx.stroke()});_(this,ft,({x:t,y:i,text:a,color:f=this.cfg.textColor,fontSize:p="11px",align:l="center",baseLine:m="alphabetic"})=>{this.ctx.beginPath(),this.ctx.font=`${p} ${this.cfg.fontFamily}`,this.ctx.fillStyle=f,this.ctx.textAlign=l,this.ctx.textBaseline=m,this.ctx.fillText(a,t,i)});_(this,ht,({startX:t,startY:i,endX:a,endY:f,bgColor:p})=>{this.ctx.beginPath(),this.ctx.rect(t,i,a-t,f-i),this.ctx.fillStyle=p,this.ctx.fill()});if(!t)throw new Error("canvas Element Or Element ID is required!");typeof t=="string"?this.$canvas=document.querySelector(t):this.$canvas=t,this.ctx=this.$canvas.getContext("2d"),this.cfg={...Gt,...i},i!=null&&i.pointColor&&(this.cfg.pointerColor=i.pointColor),i!=null&&i.pointWidth&&(this.cfg.pointerWidth=i.pointWidth);const{fill:a,width:f,height:p,zoom:l,timeSpacingList:m,scaleHeight:c,textColor:C,bgTextColor:b}=this.cfg;if(b||(this.cfg.bgTextColor=Jt(C,.18)),l<0||l>=m.length||l%1!==0)throw new Error(`zoom must be 0 ~ ${m.length-1}, and must be an integer`);if(a){const M=this.$canvas.parentElement;this.$canvasParent=M,this.$canvas.width=M.clientWidth,this.$canvas.height=M.clientHeight,new ResizeObserver(Ct(B(this,xt,Xt).bind(this),200)).observe(M)}else this.$canvas.width=f,this.$canvas.height=p;W(this,z,m[l]),c!=null&&c.long&&(c!=null&&c.short)?W(this,it,c):W(this,it,{long:this.$canvas.height/3,medium:this.$canvas.height/6,short:this.$canvas.height/10}),this.draw(),this.$canvas.addEventListener("wheel",B(this,pt,Pt).bind(this),{passive:!1}),this.$canvas.addEventListener("mousedown",B(this,vt,Wt).bind(this)),this.$canvas.addEventListener("touchstart",B(this,Mt,kt).bind(this),{passive:!1}),this.$canvas.addEventListener("touchmove",Ct(B(this,Tt,It).bind(this),1e3/this.cfg.fps),{passive:!1}),this.$canvas.addEventListener("touchend",B(this,Dt,Ut).bind(this))}draw({currentTime:t,areas:i,_privateFlag:a}={}){if(o(this,V)&&!a)return;let f=t||Date.now();f<this.cfg.minimumTime&&(f=this.cfg.minimumTime),f>this.cfg.maximumTime&&(f=this.cfg.maximumTime),W(this,X,f),W(this,J,i||[]);const p=this.$canvas.width/2,l=Math.ceil(this.$canvas.width/this.cfg.scaleSpacing),m=l*o(this,z),[c,C]=W(this,ut,[o(this,X)-m/2,o(this,X)+m/2]);W(this,K,m/this.$canvas.width),B(this,yt,jt).call(this),o(this,ht).call(this,{startX:0,startY:0,endX:this.$canvas.width,endY:this.$canvas.height,bgColor:this.cfg.bgColor}),o(this,J).forEach(b=>{const M=b.startTime<=c?0:Math.round((b.startTime-c)/o(this,K)),T=b.endTime>=C?this.$canvas.width:Math.round((b.endTime-c)/o(this,K));M<this.$canvas.width&&T>0&&o(this,ht).call(this,{startX:M,startY:0,endX:T,endY:this.$canvas.height,bgColor:b.bgColor||this.cfg.areaBgColor})}),Vt.bind(this)({xCenterPoint:p,screenScaleCount:l,startTime:c,timePerPixel:o(this,K),scaleHeight:o(this,it),timeSpacing:o(this,z),currentTime:o(this,X),$canvas:this.$canvas,cfg:this.cfg,drawLine:o(this,Yt).bind(this),drawText:o(this,ft).bind(this),drawArea:o(this,ht).bind(this)}),B(this,St,At).call(this)}getCurrentTime(){return o(this,X)}getTimeRange(){return o(this,ut)}getMsPerPixel(){return o(this,K)}on(t,i){o(this,ot).on(t,i)}off(t,i){o(this,ot).off(t,i)}}ut=new WeakMap,K=new WeakMap,ot=new WeakMap,X=new WeakMap,J=new WeakMap,z=new WeakMap,it=new WeakMap,V=new WeakMap,tt=new WeakMap,Q=new WeakMap,vt=new WeakSet,Wt=function(t){W(this,V,!0);let i=t.clientX,a=o(this,X);const f=Ct(({clientX:m})=>{o(this,V)&&(a=Math.round(o(this,X)-o(this,z)/this.cfg.scaleSpacing*(m-i)),i=m,this.draw({currentTime:a,areas:o(this,J),_privateFlag:!0}))},1e3/this.cfg.fps),p=m=>{const c=this.$canvas.getBoundingClientRect(),C=m.clientX-c.left,b=m.clientY-c.top,M=3;(C<M||C>this.$canvas.width-M||b<M||b>this.$canvas.height-M)&&(this.$canvas.removeEventListener("mousemove",f),this.$canvas.removeEventListener("mousemove",p))},l=()=>{this.$canvas.removeEventListener("mousemove",f),this.$canvas.removeEventListener("mousemove",p),document.removeEventListener("mouseup",l),W(this,V,!1),B(this,st,$t).call(this,"dragged",a)};this.$canvas.addEventListener("mousemove",f),this.$canvas.addEventListener("mousemove",p),document.addEventListener("mouseup",l)},pt=new WeakSet,Pt=function(t){t.preventDefault();const i=this.cfg.timeSpacingList.findIndex(a=>a===o(this,z));t.deltaY<0&&i>0?(W(this,z,this.cfg.timeSpacingList[i-1]),this.draw({currentTime:o(this,X),areas:o(this,J),_privateFlag:!0}),B(this,st,$t).call(this,"zoom",i-1)):t.deltaY>0&&i<this.cfg.timeSpacingList.length-1&&(W(this,z,this.cfg.timeSpacingList[i+1]),this.draw({currentTime:o(this,X),areas:o(this,J),_privateFlag:!0}),B(this,st,$t).call(this,"zoom",i+1))},Mt=new WeakSet,kt=function(t){t.preventDefault(),W(this,V,!0),W(this,tt,t.touches[0].clientX),t.touches.length===2&&W(this,Q,_t(t.touches))},Tt=new WeakSet,It=function(t){if(t.preventDefault(),!o(this,V))return;if(t.touches.length===2&&o(this,Q)!==null){const p=_t(t.touches),l=Math.abs(o(this,Q)-p)>=35;if(!l)return;let m=this.cfg.timeSpacingList.findIndex(c=>c===o(this,z));if(p<o(this,Q)?m+=1:m-=1,m<0||m>this.cfg.timeSpacingList.length-1)return;W(this,z,this.cfg.timeSpacingList[m]),l&&W(this,Q,p),this.draw({currentTime:o(this,X),areas:o(this,J),_privateFlag:!0});return}if(o(this,tt)===null)return;const i=t.touches[0],a=i.clientX-o(this,tt),f=Math.round(o(this,X)-o(this,z)/this.cfg.scaleSpacing*a);W(this,tt,i.clientX),this.draw({currentTime:f,areas:o(this,J),_privateFlag:!0})},Dt=new WeakSet,Ut=function(t){o(this,V)&&(W(this,V,!1),W(this,tt,null),t.touches.length<2&&W(this,Q,null),B(this,st,$t).call(this,"dragged",o(this,X)))},xt=new WeakSet,Xt=function(){this.$canvasParent&&(this.$canvas.width=this.$canvasParent.clientWidth,this.$canvas.height=this.$canvasParent.clientHeight,this.cfg.scaleHeight||W(this,it,{long:this.$canvas.height/3,medium:this.$canvas.height/6,short:this.$canvas.height/10}),this.draw({currentTime:o(this,X),areas:o(this,J)}))},yt=new WeakSet,jt=function(){this.ctx.clearRect(0,0,this.$canvas.width,this.$canvas.height)},St=new WeakSet,At=function(){const t=()=>o(this,z)<1e3?`${o(this,z)}ms`:o(this,z)<6e4?`${Math.round(o(this,z)/100)/10}sec`:o(this,z)<36e5?`${Math.round(o(this,z)/100/60)/10}min`:o(this,z)<864e5?`${Math.round(o(this,z)/100/60/60)/10}hours`:o(this,z)<6048e5?`${Math.round(o(this,z)/100/60/60/24)/10}days`:`${Math.round(o(this,z)/100/60/60/24/7)/10}weeks`;o(this,ft).call(this,{x:this.cfg.scaleSpacing+12,y:9,text:t(),align:"left",baseLine:"middle"}),this.ctx.beginPath(),this.ctx.moveTo(5,6),this.ctx.lineTo(5,10),this.ctx.lineTo(this.cfg.scaleSpacing+6,10),this.ctx.lineTo(this.cfg.scaleSpacing+6,6),this.ctx.strokeStyle=this.cfg.scaleColor,this.ctx.lineWidth=1.5,this.ctx.stroke()},Yt=new WeakMap,ft=new WeakMap,ht=new WeakMap,st=new WeakSet,$t=function(...t){o(this,ot).emit(...t)},x.default=Qt,x.format=gt,Object.defineProperties(x,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
