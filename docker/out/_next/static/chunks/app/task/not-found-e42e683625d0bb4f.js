(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[118],{82002:function(e,t,s){Promise.resolve().then(s.t.bind(s,231,23))},59195:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var s in t)Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}(t,{getSortedRoutes:function(){return i.getSortedRoutes},isDynamicRoute:function(){return n.isDynamicRoute}});let i=s(49089),n=s(28083)},28083:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicRoute",{enumerable:!0,get:function(){return r}});let i=s(82269),n=/\/\[[^/]+?\](?=\/|$)/;function r(e){return(0,i.isInterceptionRouteAppPath)(e)&&(e=(0,i.extractInterceptionRouteInformation)(e).interceptedRoute),n.test(e)}},49089:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSortedRoutes",{enumerable:!0,get:function(){return i}});class s{insert(e){this._insert(e.split("/").filter(Boolean),[],!1)}smoosh(){return this._smoosh()}_smoosh(e){void 0===e&&(e="/");let t=[...this.children.keys()].sort();null!==this.slugName&&t.splice(t.indexOf("[]"),1),null!==this.restSlugName&&t.splice(t.indexOf("[...]"),1),null!==this.optionalRestSlugName&&t.splice(t.indexOf("[[...]]"),1);let s=t.map(t=>this.children.get(t)._smoosh(""+e+t+"/")).reduce((e,t)=>[...e,...t],[]);if(null!==this.slugName&&s.push(...this.children.get("[]")._smoosh(e+"["+this.slugName+"]/")),!this.placeholder){let t="/"===e?"/":e.slice(0,-1);if(null!=this.optionalRestSlugName)throw Error('You cannot define a route with the same specificity as a optional catch-all route ("'+t+'" and "'+t+"[[..."+this.optionalRestSlugName+']]").');s.unshift(t)}return null!==this.restSlugName&&s.push(...this.children.get("[...]")._smoosh(e+"[..."+this.restSlugName+"]/")),null!==this.optionalRestSlugName&&s.push(...this.children.get("[[...]]")._smoosh(e+"[[..."+this.optionalRestSlugName+"]]/")),s}_insert(e,t,i){if(0===e.length){this.placeholder=!1;return}if(i)throw Error("Catch-all must be the last part of the URL.");let n=e[0];if(n.startsWith("[")&&n.endsWith("]")){let s=n.slice(1,-1),o=!1;if(s.startsWith("[")&&s.endsWith("]")&&(s=s.slice(1,-1),o=!0),s.startsWith("...")&&(s=s.substring(3),i=!0),s.startsWith("[")||s.endsWith("]"))throw Error("Segment names may not start or end with extra brackets ('"+s+"').");if(s.startsWith("."))throw Error("Segment names may not start with erroneous periods ('"+s+"').");function r(e,s){if(null!==e&&e!==s)throw Error("You cannot use different slug names for the same dynamic path ('"+e+"' !== '"+s+"').");t.forEach(e=>{if(e===s)throw Error('You cannot have the same slug name "'+s+'" repeat within a single dynamic path');if(e.replace(/\W/g,"")===n.replace(/\W/g,""))throw Error('You cannot have the slug names "'+e+'" and "'+s+'" differ only by non-word symbols within a single dynamic path')}),t.push(s)}if(i){if(o){if(null!=this.restSlugName)throw Error('You cannot use both an required and optional catch-all route at the same level ("[...'+this.restSlugName+']" and "'+e[0]+'" ).');r(this.optionalRestSlugName,s),this.optionalRestSlugName=s,n="[[...]]"}else{if(null!=this.optionalRestSlugName)throw Error('You cannot use both an optional and required catch-all route at the same level ("[[...'+this.optionalRestSlugName+']]" and "'+e[0]+'").');r(this.restSlugName,s),this.restSlugName=s,n="[...]"}}else{if(o)throw Error('Optional route parameters are not yet supported ("'+e[0]+'").');r(this.slugName,s),this.slugName=s,n="[]"}}this.children.has(n)||this.children.set(n,new s),this.children.get(n)._insert(e.slice(1),t,i)}constructor(){this.placeholder=!0,this.children=new Map,this.slugName=null,this.restSlugName=null,this.optionalRestSlugName=null}}function i(e){let t=new s;return e.forEach(e=>t.insert(e)),t.smoosh()}}},function(e){e.O(0,[231,971,23,744],function(){return e(e.s=82002)}),_N_E=e.O()}]);