webpackJsonp([0],{146:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}Object.defineProperty(b,"__esModule",{value:!0}),b.FEED_DB=b.ARTICLE_DB=void 0,c(226);var e=c(428),f=c(434),g=c(198),h=d(g),i=c(509),j=c(200),k=d(j),l=c(573),m=d(l),n=c(574),o=c(575),p=c(576),q=d(p),r=c(579),s=c(581),t=d(s),u=c(583),v=d(u),w=b.ARTICLE_DB="article-db",x=b.FEED_DB="feed-db";k.default.use(m.default),"serviceWorker"in navigator&&window.addEventListener("load",function(){return v.default.register({scope:"./"})}),(0,e.run)((0,q.default)(i.main),{DOM:(0,f.makeDOMDriver)("#root"),IDB:(0,h.default)("cycle-reader",1,function(a){switch(a.oldVersion){case 0:a.createObjectStore(w,{keyPath:"link",autoIncrement:!0}),a.createObjectStore(x,{keyPath:"href",autoIncrement:!0});}}),FETCH:function(){return window.Worker?(console.info("Fetch Driver: Web Worker"),(0,o.makeSelectableDriver)((0,n.makeWebWorkerDriver)((0,t.default)()))):(console.info("Fetch Driver: Fetch"),(0,r.makeFetchDriver)())}()})},225:function(a,b,c){c(146),a.exports=c(584)},509:function(a,b,c){"use strict";(function(a){function d(a){return a&&a.__esModule?a:{default:a}}function e(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];return j.default.merge.apply(null,b).map(function(a){return h({},a,{url:(0,q.proxied)(a.uri),options:{mode:"cors"}})})}function f(b,c,d){return j.default.combine(b,c,d).map(function(b){var c=g(b,3),d=c[0],e=c[1],f=c[2];return a.createElement("div",null,a.createElement("div",{className:"uk-flex uk-flex-middle uk-padding-small uk-padding-remove-top uk-padding-remove-bottom"},e,d),f)})}Object.defineProperty(b,"__esModule",{value:!0});var g=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),h=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.main=function(a){var b=(0,l.default)(n.default,"new-feed")(a),c=(0,s.FetchIndicator)(a),d=(0,l.default)(p.default,"feed-list")(a),g=(0,r.FeedRepository)(a);return{DOM:f(c.DOM,b.DOM,d.DOM),FETCH:e(c.FETCH),IDB:g.IDB,onion:j.default.merge(b.onion,d.onion,c.onion,g.onion)}};var i=c(5),j=d(i),k=c(73),l=d(k),m=c(511),n=d(m),o=c(514),p=d(o),q=c(520),r=c(521),s=c(522)}).call(b,c(55))},511:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.select(".uk-search").events("submit",{preventDefault:!0}),c=a.select(".uk-search-input").events("input"),d=b.compose((0,o.default)(c)).map(function(a){var b=k(a,2),c=b[0],d=b[1];return d.target.value});return{addFeed$:d}}function f(a){var b=m.default.of(h),c=a.addFeed$.filter(q.isUrl).map(i);return m.default.merge(b,c)}function g(a){return a.map(p.Search)}function h(a){return a||{uri:"",articles:[]}}function i(a){return function(b){return j({},b,{uri:a})}}Object.defineProperty(b,"__esModule",{value:!0});var j=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},k=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.default=function(a){var b=e(a.DOM),c=f(b),d=g(a.onion.state$);return{DOM:d,onion:c}};var l=c(5),m=d(l),n=c(133),o=d(n),p=c(512),q=c(513)},512:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Search=function(){return a.createElement("form",{className:"uk-search uk-search-large uk-width-1-1"},a.createElement("span",{attrs:{"uk-search-icon":!0}}),a.createElement("input",{className:"uk-search-input",type:"search",placeholder:"Search",value:"http://"}))}}).call(b,c(55))},513:function(a,b){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.isUrl=function(a){var b=/^(https?):\/\/[^\s\/$.?#].[^\s]*$/i;return b.test(a)}},514:function(a,b,c){"use strict";(function(a){function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.select(".uk-card").events("click").map(function(a){return a.currentTarget}).map(function(a){return a.attributes.getNamedItem("href").value});return{request$:b}}function f(a){var b=o.default.of(k),c=a.request$.map(l);return o.default.merge(b,c)}function g(a){return a.filter(h).map(i).map(r.Feed).startWith("")}function h(a){var b=a.articles;return b&&0<b.length}function i(a){var b=a.articles;return b.sort(j)}function j(c,a){return a.index-c.index}function k(a){return a||{viewing:"",articles:[]}}function l(a){return function(b){return m({},b,{viewing:a})}}Object.defineProperty(b,"__esModule",{value:!0});var m=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.default=function(b){var c=e(b.DOM),d=f(c),h=(0,q.default)(s.ArticleViewer,"article")(m({},b)),i=g(b.onion.state$);return{DOM:o.default.combine(i,h.DOM).map(function(b){return a.createElement("div",null,b)}),onion:d}};var n=c(5),o=d(n),p=c(73),q=d(p),r=c(515),s=c(517)}).call(b,c(55))},515:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Feed=function(b){return a.createElement("div",{className:"uk-padding"},b.map(d.Article))};var d=c(516)}).call(b,c(55))},516:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Article=function(b){var c=b.source,d=b.title,e=b.isoDate,f=b.description,g=b.thumbnail,h=b.link;return a.createElement("div",{className:"uk-card uk-card-default uk-grid-collapse uk-margin-medium uk-padding-small",attrs:{"uk-grid":!0,href:h}},a.createElement("div",{className:"uk-card-media-left uk-cover-container uk-width-1-3@m"},a.createElement("span",{attrs:{"uk-cover":!0}},a.createElement("img",{src:g}))),a.createElement("div",{className:"uk-card-body uk-width-expand@m"},a.createElement("div",{className:"uk-card-badge uk-label"},c),a.createElement("h3",{className:"uk-card-title"},d),a.createElement("p",{className:"uk-text-meta"},e),a.createElement("p",null,f)))}}).call(b,c(55))},517:function(a,b,c){"use strict";function d(a){var b=a.startWith("");return{showArticle$:b}}function e(a){return a.map(h.ArticleModal)}Object.defineProperty(b,"__esModule",{value:!0}),b.ArticleViewer=function(a){var b=d(a.onion.state$),c=e(b.showArticle$);return b.showArticle$.drop(1).addListener({next:function(){return g.modal("[uk-modal]").show()}}),{DOM:c}};var f=c(200),g=function(a){if(a&&a.__esModule)return a;var b={};if(null!=a)for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&(b[c]=a[c]);return b.default=a,b}(f),h=c(519)},519:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.ArticleModal=function(b){return a.createElement("div",{attrs:{"uk-modal":!0}},a.createElement("div",{className:"uk-modal-dialog uk-modal-body"},a.createElement("h2",{className:"uk-modal-title"}),a.createElement("button",{className:"uk-modal-close",type:"button"}),a.createElement("div",{innerHTML:b.body})))}}).call(b,c(55))},520:function(a,b){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.proxied=function(a){return c+a};var c="http://localhost:8080/"},521:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.onion.state$,c=b.map(function(a){var b=a.articles;return b}),d=b.map(function(a){var b=a.uri;return b}),e=c.compose(g.bind(null,a.IDB)).compose(h.bind(null,d));return{persist$:e}}function f(a){var b=n.default.of(i),c=a.IDB.store(t.ARTICLE_DB).getAll().map(j);return n.default.merge(b,c)}function g(a,b){return b.filter(function(a){return a.length}).compose((0,r.default)(a.store(t.ARTICLE_DB).getAllKeys())).map(function(a){var b=l(a,2),c=b[0],d=b[1];return c.filter(function(a){return 0>d.indexOf(a.link)})})}function h(a,b){return b.compose((0,r.default)(a)).map(function(a){var b=l(a,2),c=b[0],d=b[1];return c.map(function(a){return(0,s.$put)(t.ARTICLE_DB,a)}).concat((0,s.$put)(t.FEED_DB,{href:d}))}).map(n.default.fromArray).flatten()}function i(a){return a||{viewing:"",articles:[]}}function j(a){return function(b){return k({},b,{"feed-list":{viewing:"",articles:a}})}}Object.defineProperty(b,"__esModule",{value:!0});var k=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},l=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();b.FeedRepository=function(a){var b=(0,p.default)(e,"new-feed")(a),c=f(a);return{IDB:b.persist$,onion:c}};var m=c(5),n=d(m),o=c(73),p=d(o),q=c(133),r=d(q),s=c(198),t=c(146)},522:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=(0,l.default)((0,o.FetchClient)(p),"uri")(a),c=function(a){return a.map(n.unmarshal).flatten().map(function(a){return function(b){return h({},b,{articles:a})}})}(b.response);return{FETCH:b.FETCH,onion:c}}function f(a){var b=(0,l.default)((0,o.FetchClient)(q),"viewing")(a),c=function(a){return a.map(function(a){return function(b){return h({},b,{article:a})}})}(b.response);return{FETCH:b.FETCH,onion:c}}function g(a,b){var c=j.default.merge(a.map(function(){return!0}),b.map(function(){return!1}));return c.map(m.Spinner).startWith("")}Object.defineProperty(b,"__esModule",{value:!0});var h=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.FetchIndicator=function(a){var b=(0,l.default)(e,"new-feed")(a),c=(0,l.default)(f,"feed-list")(a),d=j.default.merge(b.FETCH,c.FETCH),h=j.default.merge(a.FETCH.select(p),a.FETCH.select(q)),i=g(d,h);return{DOM:i,FETCH:d,onion:j.default.merge(b.onion,c.onion)}};var i=c(5),j=d(i),k=c(73),l=d(k),m=c(523),n=c(524),o=c(572),p="fetch-feed",q="view-article"},523:function(a,b,c){"use strict";(function(a){Object.defineProperty(b,"__esModule",{value:!0}),b.Spinner=function(b){return a.createElement("span",{attrs:{"uk-spinner":!!b&&"ratio: 1.5"}})}}).call(b,c(55))},524:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=a.title;return a.items.map(function(a){return k({source:b},a,{thumbnail:f(a["content:encoded"],a.content),description:h(a.content),index:new Date(a.pubDate).getTime()})})}function f(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var d=b.filter(function(a){return a})[0],e=d.match(/<img .*?>/);return e?g(e[0]):""}function g(a){var b=a.match(/src="(.*?)"/);return 1<b.length?b[1]:""}function h(a){return[i,j].reduce(function(a,b){return b(a)},a)}function i(a){var b=new DOMParser().parseFromString(a,"text/html");return b.body.textContent||""}function j(a){return a.replace(/Read More.../i,"")}Object.defineProperty(b,"__esModule",{value:!0});var k=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};b.unmarshal=function(a){return o.default.fromPromise(new m.default().parseString(a.body)).map(e)};var l=c(525),m=d(l),n=c(5),o=d(n)},532:function(){},534:function(){},555:function(){},557:function(){},572:function(a,b){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.FetchClient=function(a){function b(b,c){var d=b.filter(function(a){return!!a}).map(function(b){return{uri:b,category:a}}),e=c.select(a).flatten();return{request$:d,response$:e}}return function(a){var c=b(a.onion.state$,a.FETCH);return{FETCH:c.request$,response:c.response$}}}},575:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a,b){var c=a.filter(f.bind(null,b)).map(i.default.of);return(0,j.adapt)(c)}function f(a,b){return!a||b.request&&b.request.category===a}function g(a,b){return a.url===b.url}Object.defineProperty(b,"__esModule",{value:!0}),b.makeSelectableDriver=function(a){return function(b){var c=a(b.compose((0,l.default)(g)));return{select:e.bind(null,c)}}};var h=c(5),i=d(h),j=c(25),k=c(72),l=d(k)},579:function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{default:a}}function e(a){var b=(0,l.adapt)(f(a).remember());return Object.defineProperty(b,"request",{value:a,writable:!1}),b}function f(a){var b=a.url,c=a.options;return k.default.create({start:function(a){fetch(b,c).then(function(a){return a.json()}).then(function(b){return a.next(b)}).catch(a.error)},stop:function(){}})}function g(a,b){var c=a.filter(h.bind(null,b));return(0,l.adapt)(c)}function h(a,b){return!a||b.request&&b.request.category===a}function i(a,b){return a.url===b.url}Object.defineProperty(b,"__esModule",{value:!0}),b.makeFetchDriver=function(){return function(a){var b=a.compose((0,n.default)(i)).map(e);return{select:g.bind(null,b)}}};var j=c(5),k=d(j);c(580);var l=c(25),m=c(72),n=d(m)},581:function(a,b,c){"use strict";a.exports=function(){return c(582)("(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=0)})([function(a,b,c){'use strict';c(1),onmessage=function(a){return fetch(a.data.url,a.data.options).then(function(a){return a.text()}).then(function(b){return{body:b,request:a.data}}).then(postMessage)}},function(){(function(a){'use strict';function b(a){if('string'!=typeof a&&(a+=''),/[^a-z0-9\\-#$%&'*+.\\^_`|~]/i.test(a))throw new TypeError('Invalid character in header field name');return a.toLowerCase()}function c(a){return'string'!=typeof a&&(a+=''),a}function d(a){var b={next:function(){var b=a.shift();return{done:void 0===b,value:b}}};return r.iterable&&(b[Symbol.iterator]=function(){return b}),b}function e(a){this.map={},a instanceof e?a.forEach(function(a,b){this.append(b,a)},this):Array.isArray(a)?a.forEach(function(a){this.append(a[0],a[1])},this):a&&Object.getOwnPropertyNames(a).forEach(function(b){this.append(b,a[b])},this)}function f(a){return a.bodyUsed?Promise.reject(new TypeError('Already read')):void(a.bodyUsed=!0)}function g(a){return new Promise(function(b,c){a.onload=function(){b(a.result)},a.onerror=function(){c(a.error)}})}function h(a){var b=new FileReader,c=g(b);return b.readAsArrayBuffer(a),c}function i(a){var b=new FileReader,c=g(b);return b.readAsText(a),c}function j(a){for(var b=new Uint8Array(a),c=Array(b.length),d=0;d<b.length;d++)c[d]=String.fromCharCode(b[d]);return c.join('')}function k(a){if(a.slice)return a.slice(0);var b=new Uint8Array(a.byteLength);return b.set(new Uint8Array(a)),b.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(a){if(this._bodyInit=a,!a)this._bodyText='';else if('string'==typeof a)this._bodyText=a;else if(r.blob&&Blob.prototype.isPrototypeOf(a))this._bodyBlob=a;else if(r.formData&&FormData.prototype.isPrototypeOf(a))this._bodyFormData=a;else if(r.searchParams&&URLSearchParams.prototype.isPrototypeOf(a))this._bodyText=a.toString();else if(r.arrayBuffer&&r.blob&&t(a))this._bodyArrayBuffer=k(a.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else if(r.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(a)||u(a)))this._bodyArrayBuffer=k(a);else throw new Error('unsupported BodyInit type');this.headers.get('content-type')||('string'==typeof a?this.headers.set('content-type','text/plain;charset=UTF-8'):this._bodyBlob&&this._bodyBlob.type?this.headers.set('content-type',this._bodyBlob.type):r.searchParams&&URLSearchParams.prototype.isPrototypeOf(a)&&this.headers.set('content-type','application/x-www-form-urlencoded;charset=UTF-8'))},r.blob&&(this.blob=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error('could not read FormData body as blob');else return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?f(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(h)}),this.text=function(){var a=f(this);if(a)return a;if(this._bodyBlob)return i(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(j(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error('could not read FormData body as text');else return Promise.resolve(this._bodyText)},r.formData&&(this.formData=function(){return this.text().then(o)}),this.json=function(){return this.text().then(JSON.parse)},this}function m(a){var b=a.toUpperCase();return-1<v.indexOf(b)?b:a}function n(a,b){b=b||{};var c=b.body;if(a instanceof n){if(a.bodyUsed)throw new TypeError('Already read');this.url=a.url,this.credentials=a.credentials,b.headers||(this.headers=new e(a.headers)),this.method=a.method,this.mode=a.mode,c||null==a._bodyInit||(c=a._bodyInit,a.bodyUsed=!0)}else this.url=a+'';if(this.credentials=b.credentials||this.credentials||'omit',(b.headers||!this.headers)&&(this.headers=new e(b.headers)),this.method=m(b.method||this.method||'GET'),this.mode=b.mode||this.mode||null,this.referrer=null,('GET'===this.method||'HEAD'===this.method)&&c)throw new TypeError('Body not allowed for GET or HEAD requests');this._initBody(c)}function o(a){var b=new FormData;return a.trim().split('&').forEach(function(a){if(a){var c=a.split('='),d=c.shift().replace(/\\+/g,' '),e=c.join('=').replace(/\\+/g,' ');b.append(decodeURIComponent(d),decodeURIComponent(e))}}),b}function p(a){var b=new e,c=a.replace(/\\r?\\n[\\t ]+/g,' ');return c.split(/\\r?\\n/).forEach(function(a){var c=a.split(':'),d=c.shift().trim();if(d){var e=c.join(':').trim();b.append(d,e)}}),b}function q(a,b){b||(b={}),this.type='default',this.status=b.status===void 0?200:b.status,this.ok=200<=this.status&&300>this.status,this.statusText='statusText'in b?b.statusText:'OK',this.headers=new e(b.headers),this.url=b.url||'',this._initBody(a)}if(!a.fetch){var r={searchParams:'URLSearchParams'in a,iterable:'Symbol'in a&&'iterator'in Symbol,blob:'FileReader'in a&&'Blob'in a&&function(){try{return new Blob,!0}catch(a){return!1}}(),formData:'FormData'in a,arrayBuffer:'ArrayBuffer'in a};if(r.arrayBuffer)var s=['[object Int8Array]','[object Uint8Array]','[object Uint8ClampedArray]','[object Int16Array]','[object Uint16Array]','[object Int32Array]','[object Uint32Array]','[object Float32Array]','[object Float64Array]'],t=function(a){return a&&DataView.prototype.isPrototypeOf(a)},u=ArrayBuffer.isView||function(a){return a&&-1<s.indexOf(Object.prototype.toString.call(a))};e.prototype.append=function(a,d){a=b(a),d=c(d);var e=this.map[a];this.map[a]=e?e+','+d:d},e.prototype['delete']=function(a){delete this.map[b(a)]},e.prototype.get=function(a){return a=b(a),this.has(a)?this.map[a]:null},e.prototype.has=function(a){return this.map.hasOwnProperty(b(a))},e.prototype.set=function(a,d){this.map[b(a)]=c(d)},e.prototype.forEach=function(a,b){for(var c in this.map)this.map.hasOwnProperty(c)&&a.call(b,this.map[c],c,this)},e.prototype.keys=function(){var a=[];return this.forEach(function(b,c){a.push(c)}),d(a)},e.prototype.values=function(){var a=[];return this.forEach(function(b){a.push(b)}),d(a)},e.prototype.entries=function(){var a=[];return this.forEach(function(b,c){a.push([c,b])}),d(a)},r.iterable&&(e.prototype[Symbol.iterator]=e.prototype.entries);var v=['DELETE','GET','HEAD','OPTIONS','POST','PUT'];n.prototype.clone=function(){return new n(this,{body:this._bodyInit})},l.call(n.prototype),l.call(q.prototype),q.prototype.clone=function(){return new q(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new e(this.headers),url:this.url})},q.error=function(){var a=new q(null,{status:0,statusText:''});return a.type='error',a};var w=[301,302,303,307,308];q.redirect=function(a,b){if(-1===w.indexOf(b))throw new RangeError('Invalid status code');return new q(null,{status:b,headers:{location:a}})},a.Headers=e,a.Request=n,a.Response=q,a.fetch=function(a,b){return new Promise(function(c,d){var e=new n(a,b),f=new XMLHttpRequest;f.onload=function(){var a={status:f.status,statusText:f.statusText,headers:p(f.getAllResponseHeaders()||'')};a.url='responseURL'in f?f.responseURL:a.headers.get('X-Request-URL');var b='response'in f?f.response:f.responseText;c(new q(b,a))},f.onerror=function(){d(new TypeError('Network request failed'))},f.ontimeout=function(){d(new TypeError('Network request failed'))},f.open(e.method,e.url,!0),'include'===e.credentials?f.withCredentials=!0:'omit'===e.credentials&&(f.withCredentials=!1),'responseType'in f&&r.blob&&(f.responseType='blob'),e.headers.forEach(function(a,b){f.setRequestHeader(b,a)}),f.send('undefined'==typeof e._bodyInit?null:e._bodyInit)})},a.fetch.polyfill=!0}})('undefined'==typeof self?this:self)}]);\n//# sourceMappingURL=bundle.js.map",c.p+"afd1ff0756a9e23927cc.worker.js")}},584:function(){}},[225]);
//# sourceMappingURL=bundle.js.map