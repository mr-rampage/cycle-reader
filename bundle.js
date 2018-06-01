webpackJsonp([0],{111:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(){return window.Worker?(console.info("Fetch Driver: Web Worker"),(0,p.makeSelectableDriver)((0,o.makeWebWorkerDriver)((0,v.default)()))):(console.info("Fetch Driver: Fetch"),(0,t.makeFetchDriver)())}Object.defineProperty(b,"__esModule",{value:!0}),b.SETTINGS_DB=b.FEED_DB=b.ARTICLE_DB=void 0,c(236);var f=c(438),g=c(444),h=c(95),i=d(h),j=c(519),k=c(596),l=d(k),m=c(597),n=d(m),o=c(598),p=c(599),q=c(600),r=c(608),s=d(r),t=c(611),u=c(613),v=d(u),w=c(615),x=d(w),y=c(616),z=c(619),A=d(z),B=b.ARTICLE_DB="article-db",C=b.FEED_DB="feed-db",D=b.SETTINGS_DB="settings-db";l.default.use(n.default),"serviceWorker"in navigator&&window.addEventListener("load",function(){return x.default.register()}),(0,f.run)(function(){return(0,y.routerify)((0,s.default)(j.main),A.default)}(),function(){return{DOM:(0,g.makeDOMDriver)("#root"),IDB:(0,i.default)("cycle-reader",1,function(a){switch(a.oldVersion){case 0:a.createObjectStore(B,{keyPath:"link",autoIncrement:!0}),a.createObjectStore(C,{keyPath:"href",autoIncrement:!0}),a.createObjectStore(D,{keyPath:"profile"});}}),FETCH:e(),history:(0,q.makeHashHistoryDriver)({hashType:"hashbang"})}}())},205:function(a,b){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.FetchClient=function(a){function b(b,c){var d=b.filter(function(a){return!!a}).map(function(b){return{uri:b,category:a}}),e=c.select(a).flatten();return{request$:d,response$:e}}return function(a){var c=b(a.onion.state$,a.FETCH);return{FETCH:c.request$,response:c.response$}}}},206:function(a,b,c){"use strict";(function(a){function d(a){return a&&a.__esModule?a:{default:a}}function e(){for(var b=arguments.length,c=Array(b),d=0;d<b;d++)c[d]=arguments[d];return i.default.combine.apply(null,c).map(function(b){var c=f(b,3),d=c[0],e=c[1],g=c[2];return a.createElement("div",null,a.createElement("div",{className:"uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom"},d,e),a.createElement("div",null,g))})}Object.defineProperty(b,"__esModule",{value:!0});var f=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),g=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=(0,k.default)(m.default,"new-feed")(a),c=(0,k.default)(o.default,"fetching")(a),d=(0,k.default)(q.default,"feeds")(a),f=(0,k.default)(r.fetchFeed,"new-feed")(a),h=(0,k.default)(s.storeFeed,"new-feed")(a);return g({},h,{DOM:e(b.DOM,c.DOM,d.DOM),FETCH:f.FETCH,IDB:h.IDB,onion:i.default.merge(b.onion,f.onion)})};var h=c(2),i=d(h),j=c(33),k=d(j),l=c(535),m=d(l),n=c(538),o=d(n),p=c(540),q=d(p),r=c(541),s=c(591)}).call(b,c(34))},235:function(a,b,c){c(111),a.exports=c(621)},519:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){return function(b){return b.compose((0,i.default)(a.map(function(a){var b=a.settings;return b}))).map(j.ProxyRequest)}}Object.defineProperty(b,"__esModule",{value:!0}),b.main=function(a){var b=(0,p.default)(a),c=(0,l.default)(a),d=(0,n.default)(a);return{DOM:b.DOM,FETCH:g.default.merge(b.FETCH,c.FETCH).compose(e(a.onion.state$)),IDB:d.IDB,onion:g.default.merge(b.onion,c.onion,d.onion),router:b.router}};var f=c(2),g=d(f),h=c(74),i=d(h),j=c(520),k=c(521),l=d(k),m=c(523),n=d(m),o=c(526),p=d(o)},520:function(a,b){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var c=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},d=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.ProxyRequest=function(a){var b=d(a,2),e=b[0],f=b[1];return c({},e,{url:""+f.proxy+e.uri,options:{mode:"cors",headers:{ACCEPT:"text/xml"}}})}},521:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,"__esModule",{value:!0});var e=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=(0,g.default)(i.default,"feed-list")(a);return e({},b)};var f=c(33),g=d(f),h=c(522),i=d(h)},522:function(a,b,c){"use strict";function d(a){var b=a.map(e);return b}function e(a){return function(b){return f({},b,{article:a})}}Object.defineProperty(b,"__esModule",{value:!0});var f=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=(0,h.default)((0,i.FetchClient)(j),"viewing")(a),c=d(b.response);return{response:b.response,FETCH:b.FETCH,onion:c}};var g=c(33),h=function(a){return a&&a.__esModule?a:{default:a}}(g),i=c(205),j="view-article"},523:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a){var b=(0,h.default)(l.default,"settings")(a),c=(0,j.default)(a);return{IDB:f.default.merge(c.IDB,b.IDB),onion:f.default.merge(c.onion,b.onion)}};var e=c(2),f=d(e),g=c(33),h=d(g),i=c(524),j=d(i),k=c(525),l=d(k)},524:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.onion.state$,c=b.map(function(a){var b=a.articles;return b}),d=b.map(function(a){var b=a.uri;return b}),e=c.compose(g.bind(null,a.IDB)).compose(h.bind(null,d));return{persist$:e}}function f(a){var b=o.default.of(i),c=a.IDB.store(u.ARTICLE_DB).getAll().map(j),d=a.IDB.store(u.FEED_DB).getAll().map(k);return o.default.merge(b,c,d)}function g(a,b){return b.filter(function(a){return a&&a.length}).compose((0,s.default)(a.store(u.ARTICLE_DB).getAllKeys())).map(function(a){var b=m(a,2),c=b[0],d=b[1];return c.filter(function(a){return 0>d.indexOf(a.link)})})}function h(a,b){return b.compose((0,s.default)(a)).map(function(a){var b=m(a,2),c=b[0],d=b[1];return c.map(function(a){return(0,t.$put)(u.ARTICLE_DB,a)}).concat((0,t.$put)(u.FEED_DB,{href:d}))}).map(o.default.fromArray).flatten()}function i(a){return a||{"feed-list":{viewing:"",articles:[]},feeds:[]}}function j(a){return function(b){return l({},b,{"feed-list":{viewing:"",articles:a}})}}function k(a){return function(b){return l({},b,{feeds:a})}}Object.defineProperty(b,"__esModule",{value:!0});var l=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},m=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.default=function(a){var b=(0,q.default)(e,"new-feed")(a),c=f(a);return{IDB:b.persist$,onion:c}};var n=c(2),o=d(n),p=c(33),q=d(p),r=c(74),s=d(r),t=c(95),u=c(111)},525:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.drop(1).compose((0,m.default)()).map(function(a){return(0,n.$put)(o.SETTINGS_DB,a)});return{persist$:b}}function f(a){var b=k.default.of(g),c=a.IDB.store(o.SETTINGS_DB).get("default").take(1).map(h);return k.default.merge(b,c)}function g(a){return a||{profile:"default",proxy:""}}function h(a){return function(b){return i({},b,a)}}Object.defineProperty(b,"__esModule",{value:!0});var i=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=e(a.onion.state$),c=f(a);return{IDB:b.persist$,onion:c}};var j=c(2),k=d(j),l=c(57),m=d(l),n=c(95),o=c(111)},526:function(a,b,c){"use strict";(function(a){function d(a){return a&&a.__esModule?a:{default:a}}function e(b){return b.map(function(b){return a.createElement("div",null,a.createElement("div",null,(0,t.NavBar)()),a.createElement("div",null,b))})}function f(a){return a.DOM.select(".uk-navbar-nav a").events("click",{preventDefault:!0}).map(function(a){return a.target.pathname})}function g(a){return a.onion.state$.filter(function(a){return a["feed-list"]&&a["feed-list"].article}).map(function(a){return a["feed-list"].article}).compose((0,m.default)()).filter(function(a){return a}).map(function(){return"/article"})}function h(a,b){return b[a]||k.default.never()}Object.defineProperty(b,"__esModule",{value:!0});var i=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=a.router.define({"/":o.default,"/settings":q.default,"/subscriptions":s.default,"/article":v.default}),c=b.map(function(b){var c=b.path,d=b.value;return d(i({},a,{router:a.router.path(c)}))}),d=k.default.merge(f(a),g(a));return{DOM:e(c.map(h.bind(null,"DOM")).flatten()),router:d,FETCH:c.map(h.bind(null,"FETCH")).flatten(),IDB:c.map(h.bind(null,"IDB")).flatten(),onion:c.map(h.bind(null,"onion")).flatten()}};var j=c(2),k=d(j),l=c(57),m=d(l),n=c(528),o=d(n),p=c(532),q=d(p),r=c(206),s=d(r),t=c(592),u=c(593),v=d(u)}).call(b,c(34))},528:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a){var b=(0,f.default)(h.default,"feed-list")(a);return{DOM:b.DOM,onion:b.onion}};var e=c(33),f=d(e),g=c(529),h=d(g)},529:function(a,b,c){"use strict";function d(a){var b=a.select(".uk-card").events("click").map(function(a){return a.currentTarget}).map(function(a){return a.attributes.getNamedItem("href").value});return{request$:b}}function e(a){var b=n.default.of(j),c=a.request$.map(k);return n.default.merge(b,c)}function f(a){return a.filter(g).map(h).map(o.Feed).startWith("")}function g(a){var b=a.articles;return b&&0<b.length}function h(a){var b=a.articles;return b.sort(i)}function i(c,a){return a.index-c.index}function j(a){return l({viewing:"",articles:[]},a)}function k(a){return function(b){return l({},b,{viewing:a})}}Object.defineProperty(b,"__esModule",{value:!0});var l=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=d(a.DOM),c=e(b),g=f(a.onion.state$);return{DOM:g,onion:c}};var m=c(2),n=function(a){return a&&a.__esModule?a:{default:a}}(m),o=c(530)},530:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Feed=function(b){return a.createElement("div",{className:"uk-padding"},b.map(d.Article))};var d=c(531)}).call(b,c(34))},531:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Article=function(b){var c=b.source,d=b.title,e=b.isoDate,f=b.description,g=b.thumbnail,h=b.link;return a.createElement("div",{className:"uk-card uk-card-default uk-grid-collapse uk-margin-medium uk-padding-small",attrs:{"uk-grid":!0,href:h}},a.createElement("div",{className:"uk-card-media-left uk-cover-container uk-width-1-3@m",attrs:{hidden:!g}},a.createElement("img",{src:g,attrs:{"uk-cover":!0}}),a.createElement("canvas",{width:"200",height:"300"})),a.createElement("div",{className:"uk-card-body uk-width-expand@s"},a.createElement("div",{className:"uk-card-badge uk-label"},c),a.createElement("h3",{className:"uk-card-title"},d),a.createElement("p",{className:"uk-text-meta"},e),a.createElement("p",null,f)))}}).call(b,c(34))},532:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,"__esModule",{value:!0});var e=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=(0,g.default)(i.default,"settings")(a);return e({},b)};var f=c(33),g=d(f),h=c(533),i=d(h)},533:function(a,b,c){"use strict";function d(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function e(a){var b=a.select(".uk-input").events("change"),c=b.map(function(a){return d({},a.target.name,a.target.value)});return{updateSetting$:c}}function f(a){var b=l.default.of(h),c=a.updateSetting$.map(i);return l.default.merge(b,c)}function g(a){return a.map(m.SettingsMenu)}function h(a){return j({proxy:""},a)}function i(a){return function(b){return j({},b,a)}}Object.defineProperty(b,"__esModule",{value:!0});var j=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(a){var b=e(a.DOM),c=f(b),d=g(a.onion.state$);return{DOM:d,onion:c}};var k=c(2),l=function(a){return a&&a.__esModule?a:{default:a}}(k),m=c(534)},534:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.SettingsMenu=function(b){return a.createElement("form",null,a.createElement("div",{className:"uk-margin"},a.createElement("input",{className:"uk-input",type:"text",placeholder:"profile",name:"profile",value:b.profile}),a.createElement("input",{className:"uk-input",type:"text",placeholder:"proxy",name:"proxy",value:b.proxy})))}}).call(b,c(34))},535:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.select(".uk-search").events("submit",{preventDefault:!0}),c=a.select(".uk-search-input").events("input"),d=b.compose((0,o.default)(c)).map(function(a){var b=k(a,2),c=b[0],d=b[1];return d.target.value}).filter(q.isUrl);return{addFeed$:d}}function f(a){var b=m.default.of(h),c=a.addFeed$.map(i);return m.default.merge(b,c)}function g(a){return a.map(p.Search)}function h(a){return a||{uri:"",articles:[]}}function i(a){return function(b){return j({},b,{uri:a})}}Object.defineProperty(b,"__esModule",{value:!0});var j=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},k=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.default=function(a){var b=e(a.DOM),c=f(b),d=g(a.onion.state$);return{DOM:d,onion:c}};var l=c(2),m=d(l),n=c(74),o=d(n),p=c(536),q=c(537)},536:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Search=function(){return a.createElement("form",{className:"uk-search uk-search-default uk-width-1-1"},a.createElement("span",{attrs:{"uk-search-icon":!0}}),a.createElement("input",{className:"uk-search-input",type:"search",placeholder:"Search",value:"http://"}))}}).call(b,c(34))},537:function(a,b){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.isUrl=function(a){var b=/^(https?):\/\/[^\s\/$.?#].[^\s]*$/i;return b.test(a)}},538:function(a,b,c){"use strict";function d(a){return a.map(e.Spinner).startWith("")}Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a){var b=d(a.onion.state$);return{DOM:b}};var e=c(539)},539:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Spinner=function(b){return a.createElement("span",{attrs:{"uk-spinner":!!b&&"ratio: 1.5"}})}}).call(b,c(34))},540:function(a,b,c){"use strict";(function(a){function c(b){return b.map(function(b){return a.createElement("ul",null,b.map(function(b){return a.createElement("li",null,b.href)}))})}Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a){var b=c(a.onion.state$);return{DOM:b}}}).call(b,c(34))},541:function(a,b,c){"use strict";function d(a){var b=a.map(h.unmarshal).flatten().map(function(a){return function(b){return e({},b,{articles:a})}});return b}Object.defineProperty(b,"__esModule",{value:!0});var e=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.fetchFeed=function(a){var b=(0,g.default)((0,i.FetchClient)(j),"uri")(a),c=d(b.response);return{response:b.response,FETCH:b.FETCH,onion:c}};var f=c(33),g=function(a){return a&&a.__esModule?a:{default:a}}(f),h=c(542),i=c(205),j="fetch-feed"},542:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.title;return a.items.map(function(a){return k({source:b},a,{thumbnail:f(a["content:encoded"],a.content),description:h(a.content),index:new Date(a.pubDate).getTime()})})}function f(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var d=b.filter(function(a){return a})[0],e=d.match(/<img .*?>/);return e?g(e[0]):""}function g(a){var b=a.match(/src="(.*?)"/);return 1<b.length?b[1]:""}function h(a){return[i,j].reduce(function(a,b){return b(a)},a)}function i(a){var b=new DOMParser().parseFromString(a,"text/html");return b.body.textContent||""}function j(a){return a.replace(/Read More.../i,"")}Object.defineProperty(b,"__esModule",{value:!0});var k=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.unmarshal=function(a){return o.default.fromPromise(new m.default().parseString(a.body)).map(e)};var l=c(543),m=d(l),n=c(2),o=d(n)},550:function(){},552:function(){},574:function(){},576:function(){},591:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.onion.state$,c=b.map(function(a){var b=a.articles;return b}),d=b.map(function(a){var b=a.uri;return b}),e=c.compose(f.bind(null,a.IDB)).compose(g.bind(null,d));return{persist$:e}}function f(a,b){return b.filter(h).compose((0,o.default)(a.store(q.ARTICLE_DB).getAllKeys())).map(i)}function g(a,b){return b.compose((0,o.default)(a)).map(j).map(m.default.fromArray).flatten()}function h(a){return a&&a.length}function i(a){var b=k(a,2),c=b[0],d=b[1];return c.filter(function(a){return 0<d.indexOf(a.link)})}function j(a){var b=k(a,2),c=b[0],d=b[1];return c.map(function(a){return(0,p.$put)(q.ARTICLE_DB,a)}).concat((0,p.$put)(q.FEED_DB,d))}Object.defineProperty(b,"__esModule",{value:!0});var k=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.storeFeed=function(a){var b=e(a);return{IDB:b.persist$}};var l=c(2),m=d(l),n=c(74),o=d(n),p=c(95),q=c(206)},592:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.NavBar=function(){return a.createElement("nav",{className:"uk-navbar-container","uk-navbar":!0},a.createElement("div",{className:"uk-navbar-left"},a.createElement("ul",{className:"uk-navbar-nav"},a.createElement("li",null,a.createElement("a",{href:"/"},"Articles")),a.createElement("li",null,a.createElement("a",{href:"/settings"},"Settings")),a.createElement("li",null,a.createElement("a",{href:"/subscriptions"},"Subscriptions")))))}}).call(b,c(34))},593:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.default=function(a){var b=(0,e.default)(f.ArticleView,"feed-list")(a);return{DOM:b.DOM,onion:b.onion}};var d=c(33),e=function(a){return a&&a.__esModule?a:{default:a}}(d),f=c(594)},594:function(a,b,c){"use strict";(function(a){function d(a){return a.map(function(a){return a.article}).map(function(a){return new DOMParser().parseFromString(a.body,"text/html")}).map(function(a){return(0,f.extractContent)(a)}).map(e).startWith("")}function e(b){return a.createElement("div",{className:"uk-animation-slide-bottom",innerHTML:b.outerHTML})}Object.defineProperty(b,"__esModule",{value:!0}),b.ArticleView=function(a){return{DOM:d(a.onion.state$)}};var f=c(595)}).call(b,c(34))},595:function(a,b){"use strict";function c(a,b,c){var d=q(b,2),e=d[0],g=d[1],h=f(c,a);return h>g?[c,h]:[e,g]}function d(a){for(var b=a.cloneNode(!0),c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];return b.querySelectorAll(d.join(", ")).forEach(function(a){return a.remove()}),b}function e(a){for(var b=arguments.length,c=Array(1<b?b-1:0),d=1;d<b;d++)c[d-1]=arguments[d];return a.querySelectorAll(c.join(", "))}function f(a,b){return h(a)+i(a,b)}function g(a){return a.reduce(function(a,b){var c=q(b,2),d=c[0],e=c[1];return a+(d()?e:0)},0)}function h(a){return g(k(a))+Math.round(10*(j(a)/100))}function i(a,b){return Array.from(a.children).filter(function(a){return 20<a.textContent.length}).map(function(a){return g(l(b,a))}).reduce(function(a,b){return a+b},0)}function j(a){return Array.from(a.children).reduce(function(a,b){return a-b.textContent.length},a.textContent.length)}function k(a){var b=/(^(body|content|h?entry|main|page|post|text|blog|story|haupt))|arti(cle|kel)|instapaper_body/i,c=/com(bx|ment|munity)|dis(qus|cuss)|e(xtra|[-]?mail)|foot|header|menu|re(mark|ply)|rss|sh(are|outbox)|social|twitter|facebook|sponsora(d|ll|gegate|rchive|ttachment)|(pag(er|ination))|popup|print|login|si(debar|gn|ngle)|hinweis|expla(in|nation)?|metablock/i,d=/nav($|igation)|user|com(ment|bx)|(^com-)|contact|foot|masthead|(me(dia|ta))|outbrain|promo|related|scroll|(sho(utbox|pping))|sidebar|sponsor|tags|tool|widget|player|disclaimer|toc|infobox|vcard|ad-/i;return[[function(){return b.test(a.className)},35],[function(){return b.test(a.id)},40],[function(){return c.test(a.className)},-20],[function(){return c.test(a.id)},-20],[function(){return d.test(a.className)},-50],[function(){return d.test(a.id)},-50],[o.bind(null,a),200],[p.bind(null,a),-50],[m.bind(null,a),30],[n.bind(null,a),20*a.querySelectorAll("h1, h2, h3, h4, h5, h6").length]]}function l(a,b){return[[function(){return!!a&&-1<b.textContent.indexOf(a)},100],[function(){return 200<j(b)},Math.max(50,j(b)/10)],[function(){return /h1|h2/i.test(b.tagName)},30],[function(){return /div|p/i.test(b.tagName)},j(b)/25]]}function m(a){return null!==a.querySelector(".caption")}function n(a){var b=Array.from(a.querySelectorAll("p")).filter(function(a){return 50<a.textContent.length});return 2<=b.length}function o(a){return a.attributes.articleBody!==void 0}function p(a){var b=a.style;return /hidden/.test(b.visibility)||/none/.test(b.display)||/small/.test(b["font-size"])}Object.defineProperty(b,"__esModule",{value:!0});var q=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.extractContent=function(a,b){if(null===a)throw new Error("missing document");var f=d(a,"select","option","script","noscript","style"),g=e(f,"p","div","td","h1","h2","article","section");return Array.from(g).reduce(c.bind(null,b),[null,0])[0]}},599:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){var c=a.filter(f.bind(null,b)).map(i.default.of);return(0,j.adapt)(c)}function f(a,b){return!a||b.request&&b.request.category===a}function g(a,b){return a.url===b.url}Object.defineProperty(b,"__esModule",{value:!0}),b.makeSelectableDriver=function(a){return function(b){var c=a(b.compose((0,l.default)(g)));return{select:e.bind(null,c)}}};var h=c(2),i=d(h),j=c(17),k=c(57),l=d(k)},611:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=(0,l.adapt)(f(a).remember());return Object.defineProperty(b,"request",{value:a,writable:!1}),b}function f(a){var b=a.url,c=a.options;return k.default.create({start:function(a){fetch(b,c).then(function(a){return a.json()}).then(function(b){return a.next(b)}).catch(a.error)},stop:function(){}})}function g(a,b){var c=a.filter(h.bind(null,b));return(0,l.adapt)(c)}function h(a,b){return!a||b.request&&b.request.category===a}function i(a,b){return a.url===b.url}Object.defineProperty(b,"__esModule",{value:!0}),b.makeFetchDriver=function(){return function(a){var b=a.compose((0,n.default)(i)).map(e);return{select:g.bind(null,b)}}};var j=c(2),k=d(j);c(612);var l=c(17),m=c(57),n=d(m)},613:function(a,b,c){"use strict";a.exports=function(){return c(614)("(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)})([function(a,b,c){'use strict';function d(a){var b=a.headers.get('content-type');return /application\\/json/.test(b)?a.json():a.text()}function f(a,b){return{body:b.body||b,request:a}}c(1),onmessage=function(a){return fetch(a.data.url,a.data.options).then(d).then(f.bind(null,a.data)).then(postMessage)}},function(){(function(a){'use strict';function b(a){if('string'!=typeof a&&(a+=''),/[^a-z0-9\\-#$%&'*+.\\^_`|~]/i.test(a))throw new TypeError('Invalid character in header field name');return a.toLowerCase()}function c(a){return'string'!=typeof a&&(a+=''),a}function d(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};return r.iterable&&(b[Symbol.iterator]=function(){return b}),b}function e(a){this.map={},a instanceof e?a.forEach(function(a,b){this.append(b,a)},this):Array.isArray(a)?a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function f(a){return a.bodyUsed?Promise.reject(new TypeError('Already read')):void(a.bodyUsed=!0)}function g(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function h(a){var b=new FileReader,c=g(b);return b.readAsArrayBuffer(a),c}function i(a){var b=new FileReader,c=g(b);return b.readAsText(a),c}function j(a){for(var b=new Uint8Array(a),c=Array(b.length),d=0;d<b.length;d++)c[d]=String.fromCharCode(b[d]);return c.join('')}function k(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);return b.set(new Uint8Array(a)),b.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(a){if(this._bodyInit=a,!a)this._bodyText='';else if('string'==typeof a)this._bodyText=a;else if(r.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(r.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(r.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(r.arrayBuffer&&r.blob&&t(a))this._bodyArrayBuffer=k(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(r.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||u(a)))this._bodyArrayBuffer=k(a);else throw new Error('unsupported BodyInit type');this.headers.get('content-type')||('string'==typeof a?this.headers.set('content-type','text/plain;charset=UTF-8'):this._bodyBlob&&this._bodyBlob.type?this.headers.set('content-type',this._bodyBlob.type):r.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8'))},r.blob&&(this.blob=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error('could not read FormData body as blob');else return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)}),this.text=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(j(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error('could not read FormData body as text');else return Promise.resolve(this._bodyText)},r.formData&&(this.formData=function(){return this.text().then(o)}),this.json=function(){return this.text().then(JSON.parse)},this}function m(a){var b=a.toUpperCase();return-1<v.indexOf(b)?b:a}function n(a,b){b=b||{};var c=b.body;if(a instanceof n){if(a.bodyUsed)throw new TypeError('Already read');this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new e(a.headers)),this.method=a.method,this.mode=a.mode,c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=a+'';if(this.credentials=b.credentials||this.credentials||'omit',(b.headers||!this.headers)&&(this.headers=new e(b.headers)),this.method=m(b.method||this.method||'GET'),this.mode=b.mode||this.mode||null,this.referrer=null,('GET'===this.method||'HEAD'===this.method)&&c)throw new TypeError('Body not allowed for GET or HEAD requests');this._initBody(c)}function o(a){var b=new FormData;return a.trim().split('&').forEach(function(a){if(a){var c=a.split('='),d=c.shift().replace(/\\+/g,' '),e=c.join('=').replace(/\\+/g,' ');b.append(decodeURIComponent(d),decodeURIComponent(e))}}),b}function p(a){var b=new e,c=a.replace(/\\r?\\n[\\t ]+/g,' ');return c.split(/\\r?\\n/).forEach(function(a){var c=a.split(':'),d=c.shift().trim();if(d){var e=c.join(':').trim();b.append(d,e)}}),b}function q(a,b){b||(b={}),this.type='default',this.status=b.status===void 0?200:b.status,this.ok=200<=this.status&&300>this.status,this.statusText='statusText'in b?b.statusText:'OK',this.headers=new e(b.headers),this.url=b.url||'',this._initBody(a)}if(!a.fetch){var r={searchParams:'URLSearchParams'in a,iterable:'Symbol'in a&&'iterator'in Symbol,blob:'FileReader'in a&&'Blob'in a&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:'FormData'in a,arrayBuffer:'ArrayBuffer'in a};if(r.arrayBuffer)var s=['[object Int8Array]','[object Uint8Array]','[object Uint8ClampedArray]','[object Int16Array]','[object Uint16Array]','[object Int32Array]','[object Uint32Array]','[object Float32Array]','[object Float64Array]'],t=function(a){return a&&DataView.prototype.isPrototypeOf(a)},u=ArrayBuffer.isView||function(a){return a&&-1<s.indexOf(Object.prototype.toString.call(a))};e.prototype.append=function(a,d){a=b(a),d=c(d);var e=this.map[a];this.map[a]=e?e+','+d:d},e.prototype['delete']=function(a){delete this.map[b(a)]},e.prototype.get=function(a){return a=b(a),this.has(a)?this.map[a]:null},e.prototype.has=function(a){return this.map.hasOwnProperty(b(a))},e.prototype.set=function(a,d){this.map[b(a)]=c(d)},e.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)},e.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c)}),d(a)},e.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b)}),d(a)},e.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b])}),d(a)},r.iterable&&(e.prototype[Symbol.iterator]=e.prototype.entries);var v=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];n.prototype.clone=function(){return new n(this,{body:this._bodyInit})},l.call(n.prototype),l.call(q.prototype),q.prototype.clone=function(){return new q(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new e(this.headers),url:this.url})},q.error=function(){var a=new q(null,{status:0,statusText:''});return a.type='error',a};var w=[301,302,303,307,308];q.redirect=function(a,b){if(-1===w.indexOf(b))throw new RangeError('Invalid status code');return new q(null,{status:b,headers:{location:a}})},a.Headers=e,a.Request=n,a.Response=q,a.fetch=function(a,b){return new Promise(function(c,d){var e=new n(a,b),f=new XMLHttpRequest;f.onload=function(){var a={status:f.status,statusText:f.statusText,headers:p(f.getAllResponseHeaders()||'')};a.url='responseURL'in f?f.responseURL:a.headers.get('X-Request-URL');var b='response'in f?f.response:f.responseText;c(new q(b,a))},f.onerror=function(){d(new TypeError('Network request failed'))},f.ontimeout=function(){d(new TypeError('Network request failed'))},f.open(e.method,e.url,!0),'include'===e.credentials?f.withCredentials=!0:'omit'===e.credentials&&(f.withCredentials=!1),'responseType'in f&&r.blob&&(f.responseType='blob'),e.headers.forEach(function(a,b){f.setRequestHeader(b,a)}),f.send('undefined'==typeof e._bodyInit?null:e._bodyInit)})},a.fetch.polyfill=!0}})('undefined'==typeof self?this:self)}]);\n//# sourceMappingURL=bundle.js.map",c.p+"2e1b31556adddc965c9e.worker.js")}},621:function(){}},[235]);
//# sourceMappingURL=bundle.js.map