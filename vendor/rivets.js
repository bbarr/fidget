// Rivets.js
// version: 0.6.5
// author: Michael Richards
// license: MIT
(function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}},c=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1},d=[].slice,e={}.hasOwnProperty,f=function(a,b){function c(){this.constructor=a}for(var d in b)e.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};a={binders:{},components:{},formatters:{},adapters:{},config:{prefix:"rv",templateDelimiters:["{","}"],rootInterface:".",preloadData:!0,handler:function(a,b,c){return this.call(a,b,c.view.models)}}},a.Util={bindEvent:function(a,b,c){return null!=window.jQuery?(a=jQuery(a),null!=a.on?a.on(b,c):a.bind(b,c)):null!=window.addEventListener?a.addEventListener(b,c,!1):(b="on"+b,a.attachEvent(b,c))},unbindEvent:function(a,b,c){return null!=window.jQuery?(a=jQuery(a),null!=a.off?a.off(b,c):a.unbind(b,c)):null!=window.removeEventListener?a.removeEventListener(b,c,!1):(b="on"+b,a.detachEvent(b,c))},getInputValue:function(a){var b,c,d,e;if(null!=window.jQuery)switch(a=jQuery(a),a[0].type){case"checkbox":return a.is(":checked");default:return a.val()}else switch(a.type){case"checkbox":return a.checked;case"select-multiple":for(e=[],c=0,d=a.length;d>c;c++)b=a[c],b.selected&&e.push(b.value);return e;default:return a.value}}},a.View=function(){function d(c,d,e){var f,g,h,i,j,k,l,m,n;for(this.els=c,this.models=d,this.options=null!=e?e:{},this.update=b(this.update,this),this.publish=b(this.publish,this),this.sync=b(this.sync,this),this.unbind=b(this.unbind,this),this.bind=b(this.bind,this),this.select=b(this.select,this),this.build=b(this.build,this),this.componentRegExp=b(this.componentRegExp,this),this.bindingRegExp=b(this.bindingRegExp,this),this.els.jquery||this.els instanceof Array||(this.els=[this.els]),l=["config","binders","formatters","adapters"],j=0,k=l.length;k>j;j++){if(g=l[j],this[g]={},this.options[g]){m=this.options[g];for(f in m)h=m[f],this[g][f]=h}n=a[g];for(f in n)h=n[f],null==(i=this[g])[f]&&(i[f]=h)}this.build()}return d.prototype.bindingRegExp=function(){return new RegExp("^"+this.config.prefix+"-")},d.prototype.componentRegExp=function(){return new RegExp("^"+this.config.prefix.toUpperCase()+"-")},d.prototype.build=function(){var b,d,e,f,g,h,i,j,k,l=this;for(this.bindings=[],h=[],b=this.bindingRegExp(),e=this.componentRegExp(),d=function(b,c,d,e){var f,g,h,i,j,k,m;return j={},m=function(){var a,b,c,d;for(c=e.split("|"),d=[],a=0,b=c.length;b>a;a++)k=c[a],d.push(k.trim());return d}(),f=function(){var a,b,c,d;for(c=m.shift().split("<"),d=[],a=0,b=c.length;b>a;a++)g=c[a],d.push(g.trim());return d}(),i=f.shift(),j.formatters=m,(h=f.shift())&&(j.dependencies=h.split(/\s+/)),l.bindings.push(new a[b](l,c,d,i,j))},g=function(f){var i,j,k,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M;if(c.call(h,f)<0){if(3===f.nodeType){if(q=a.TextTemplateParser,(n=l.config.templateDelimiters)&&(u=q.parse(f.data,n)).length&&(1!==u.length||u[0].type!==q.types.text)){for(x=0,B=u.length;B>x;x++)t=u[x],s=document.createTextNode(t.value),f.parentNode.insertBefore(s,f),1===t.type&&d("TextBinding",s,null,t.value);f.parentNode.removeChild(f)}}else if(e.test(f.tagName))v=f.tagName.replace(e,"").toLowerCase(),l.bindings.push(new a.ComponentBinding(l,f,v));else if(null!=f.attributes){for(H=f.attributes,y=0,C=H.length;C>y;y++)if(i=H[y],b.test(i.name)){if(v=i.name.replace(b,""),!(k=l.binders[v])){I=l.binders;for(o in I)w=I[o],"*"!==o&&-1!==o.indexOf("*")&&(r=new RegExp("^"+o.replace("*",".+")+"$"),r.test(v)&&(k=w))}if(k||(k=l.binders["*"]),k.block){for(J=f.childNodes,z=0,D=J.length;D>z;z++)p=J[z],h.push(p);j=[i]}}for(K=j||f.attributes,A=0,E=K.length;E>A;A++)i=K[A],b.test(i.name)&&(v=i.name.replace(b,""),d("Binding",f,v,i.value))}for(L=function(){var a,b,c,d;for(c=f.childNodes,d=[],b=0,a=c.length;a>b;b++)p=c[b],d.push(p);return d}(),M=[],G=0,F=L.length;F>G;G++)m=L[G],M.push(g(m));return M}},k=this.els,i=0,j=k.length;j>i;i++)f=k[i],g(f)},d.prototype.select=function(a){var b,c,d,e,f;for(e=this.bindings,f=[],c=0,d=e.length;d>c;c++)b=e[c],a(b)&&f.push(b);return f},d.prototype.bind=function(){var a,b,c,d,e;for(d=this.bindings,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.bind());return e},d.prototype.unbind=function(){var a,b,c,d,e;for(d=this.bindings,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.unbind());return e},d.prototype.sync=function(){var a,b,c,d,e;for(d=this.bindings,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.sync());return e},d.prototype.publish=function(){var a,b,c,d,e;for(d=this.select(function(a){return a.binder.publishes}),e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.publish());return e},d.prototype.update=function(a){var b,c,d,e,f,g,h;null==a&&(a={});for(c in a)d=a[c],this.models[c]=d;for(g=this.bindings,h=[],e=0,f=g.length;f>e;e++)b=g[e],h.push(b.update(a));return h},d}(),a.Binding=function(){function c(a,c,d,e,f){this.view=a,this.el=c,this.type=d,this.keypath=e,this.options=null!=f?f:{},this.update=b(this.update,this),this.unbind=b(this.unbind,this),this.bind=b(this.bind,this),this.publish=b(this.publish,this),this.sync=b(this.sync,this),this.set=b(this.set,this),this.eventHandler=b(this.eventHandler,this),this.formattedValue=b(this.formattedValue,this),this.setObserver=b(this.setObserver,this),this.setBinder=b(this.setBinder,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.setBinder(),this.setObserver()}return c.prototype.setBinder=function(){var a,b,c,d;if(!(this.binder=this.view.binders[this.type])){d=this.view.binders;for(a in d)c=d[a],"*"!==a&&-1!==a.indexOf("*")&&(b=new RegExp("^"+a.replace("*",".+")+"$"),b.test(this.type)&&(this.binder=c,this.args=new RegExp("^"+a.replace("*","(.+)")+"$").exec(this.type),this.args.shift()))}return this.binder||(this.binder=this.view.binders["*"]),this.binder instanceof Function?this.binder={routine:this.binder}:void 0},c.prototype.setObserver=function(){var b=this;return this.observer=new a.KeypathObserver(this.view,this.view.models,this.keypath,function(a){return b.key&&b.unbind(!0),b.model=a.target,b.key&&b.bind(!0),b.sync()}),this.key=this.observer.key,this.model=this.observer.target},c.prototype.formattedValue=function(a){var b,c,e,f,g,h;for(h=this.formatters,f=0,g=h.length;g>f;f++)c=h[f],b=c.split(/\s+/),e=b.shift(),c=this.view.formatters[e],(null!=c?c.read:void 0)instanceof Function?a=c.read.apply(c,[a].concat(d.call(b))):c instanceof Function&&(a=c.apply(null,[a].concat(d.call(b))));return a},c.prototype.eventHandler=function(a){var b,c;return c=(b=this).view.config.handler,function(d){return c.call(a,this,d,b)}},c.prototype.set=function(a){var b;return a=a instanceof Function&&!this.binder["function"]?this.formattedValue(a.call(this.model)):this.formattedValue(a),null!=(b=this.binder.routine)?b.call(this,this.el,a):void 0},c.prototype.sync=function(){return this.set(this.key?this.view.adapters[this.key["interface"]].read(this.model,this.key.path):this.model)},c.prototype.publish=function(){var b,c,e,f,g,h,i,j,k;for(f=a.Util.getInputValue(this.el),i=this.formatters.slice(0).reverse(),g=0,h=i.length;h>g;g++)c=i[g],b=c.split(/\s+/),e=b.shift(),(null!=(j=this.view.formatters[e])?j.publish:void 0)&&(f=(k=this.view.formatters[e]).publish.apply(k,[f].concat(d.call(b))));return this.view.adapters[this.key["interface"]].publish(this.model,this.key.path,f)},c.prototype.bind=function(b){var c,d,e,f,g,h,i,j,k,l=this;if(null==b&&(b=!1),b||null!=(h=this.binder.bind)&&h.call(this,this.el),this.key&&this.view.adapters[this.key["interface"]].subscribe(this.model,this.key.path,this.sync),(b?void 0:this.view.config.preloadData)&&this.sync(),null!=(i=this.options.dependencies)?i.length:void 0){for(j=this.options.dependencies,k=[],f=0,g=j.length;g>f;f++)c=j[f],e=new a.KeypathObserver(this.view,this.model,c,function(a,b){var c;return c=a.key,l.view.adapters[c["interface"]].unsubscribe(b,c.path,l.sync),l.view.adapters[c["interface"]].subscribe(a.target,c.path,l.sync),l.sync()}),d=e.key,this.view.adapters[d["interface"]].subscribe(e.target,d.path,this.sync),k.push(this.dependencies.push(e));return k}},c.prototype.unbind=function(a){var b,c,d,e,f,g;if(null==a&&(a=!1),a||(null!=(f=this.binder.unbind)&&f.call(this,this.el),this.observer.unobserve()),this.key&&this.view.adapters[this.key["interface"]].unsubscribe(this.model,this.key.path,this.sync),this.dependencies.length){for(g=this.dependencies,d=0,e=g.length;e>d;d++)c=g[d],b=c.key,this.view.adapters[b["interface"]].unsubscribe(c.target,b.path,this.sync);return this.dependencies=[]}},c.prototype.update=function(a){var b;return null==a&&(a={}),null!=(b=this.binder.update)?b.call(this,a):void 0},c}(),a.ComponentBinding=function(d){function e(d,e,f){var g,h,i,j,k;for(this.view=d,this.el=e,this.type=f,this.unbind=b(this.unbind,this),this.bind=b(this.bind,this),this.update=b(this.update,this),this.locals=b(this.locals,this),this.component=a.components[this.type],this.attributes={},this.inflections={},j=this.el.attributes||[],h=0,i=j.length;i>h;h++)g=j[h],k=g.name,c.call(this.component.attributes,k)>=0?this.attributes[g.name]=g.value:this.inflections[g.name]=g.value}return f(e,d),e.prototype.sync=function(){},e.prototype.locals=function(a){var b,c,d,e,f,g,h,i,j;null==a&&(a=this.view.models),f={},i=this.inflections;for(c in i)for(b=i[c],j=b.split("."),g=0,h=j.length;h>g;g++)e=j[g],f[c]=(f[c]||a)[e];for(c in a)d=a[c],null==f[c]&&(f[c]=d);return f},e.prototype.update=function(a){var b;return null!=(b=this.componentView)?b.update(this.locals(a)):void 0},e.prototype.bind=function(){var b,c;return null!=this.componentView?null!=(c=this.componentView)?c.bind():void 0:(b=this.component.build.call(this.attributes),(this.componentView=new a.View(b,this.locals(),this.view.options)).bind(),this.el.parentNode.replaceChild(b,this.el))},e.prototype.unbind=function(){var a;return null!=(a=this.componentView)?a.unbind():void 0},e}(a.Binding),a.TextBinding=function(a){function c(a,c,d,e,f){this.view=a,this.el=c,this.type=d,this.keypath=e,this.options=null!=f?f:{},this.sync=b(this.sync,this),this.formatters=this.options.formatters||[],this.dependencies=[],this.setObserver()}return f(c,a),c.prototype.binder={routine:function(a,b){return a.data=null!=b?b:""}},c.prototype.sync=function(){return c.__super__.sync.apply(this,arguments)},c}(a.Binding),a.KeypathParser=function(){function a(){}return a.parse=function(a,b,d){var e,f,g,h,i;for(g=[],f={"interface":d,path:""},h=0,i=a.length;i>h;h++)e=a[h],c.call(b,e)>=0?(g.push(f),f={"interface":e,path:""}):f.path+=e;return g.push(f),g},a}(),a.TextTemplateParser=function(){function a(){}return a.types={text:0,binding:1},a.parse=function(a,b){var c,d,e,f,g,h,i;for(h=[],f=a.length,c=0,d=0;f>d;){if(c=a.indexOf(b[0],d),0>c){h.push({type:this.types.text,value:a.slice(d)});break}if(c>0&&c>d&&h.push({type:this.types.text,value:a.slice(d,c)}),d=c+b[0].length,c=a.indexOf(b[1],d),0>c){g=a.slice(d-b[1].length),e=h[h.length-1],(null!=e?e.type:void 0)===this.types.text?e.value+=g:h.push({type:this.types.text,value:g});break}i=a.slice(d,c).trim(),h.push({type:this.types.binding,value:i}),d=c+b[1].length}return h},a}(),a.KeypathObserver=function(){function d(a,c,d,e){this.view=a,this.model=c,this.keypath=d,this.callback=e,this.unobserve=b(this.unobserve,this),this.realize=b(this.realize,this),this.update=b(this.update,this),this.parse=b(this.parse,this),this.parse(),this.objectPath=[],this.target=this.realize()}return d.prototype.parse=function(){var b,d,e,f,g,h;return b=function(){var a,b;a=this.view.adapters,b=[];for(d in a)g=a[d],b.push(d);return b}.call(this),h=this.keypath[0],c.call(b,h)>=0?(f=this.keypath[0],e=this.keypath.substr(1)):(f=this.view.config.rootInterface,e=this.keypath),this.tokens=a.KeypathParser.parse(e,b,f),this.key=this.tokens.pop()},d.prototype.update=function(){var a,b;return(a=this.realize())!==this.target?(b=this.target,this.target=a,this.callback(this,b)):void 0},d.prototype.realize=function(){var a,b,c,d,e,f,g;for(a=this.model,g=this.tokens,b=e=0,f=g.length;f>e;b=++e)d=g[b],null!=this.objectPath[b]?a!==(c=this.objectPath[b])&&(this.view.adapters[d["interface"]].unsubscribe(c,d.path,this.update),this.view.adapters[d["interface"]].subscribe(a,d.path,this.update),this.objectPath[b]=a):(this.view.adapters[d["interface"]].subscribe(a,d.path,this.update),this.objectPath[b]=a),a=this.view.adapters[d["interface"]].read(a,d.path);return a},d.prototype.unobserve=function(){var a,b,c,d,e,f,g;for(f=this.tokens,g=[],a=d=0,e=f.length;e>d;a=++d)c=f[a],(b=this.objectPath[a])?g.push(this.view.adapters[c["interface"]].unsubscribe(b,c.path,this.update)):g.push(void 0);return g},d}(),a.binders.text=function(a,b){return null!=a.textContent?a.textContent=null!=b?b:"":a.innerText=null!=b?b:""},a.binders.html=function(a,b){return a.innerHTML=null!=b?b:""},a.binders.show=function(a,b){return a.style.display=b?"":"none"},a.binders.hide=function(a,b){return a.style.display=b?"none":""},a.binders.enabled=function(a,b){return a.disabled=!b},a.binders.disabled=function(a,b){return a.disabled=!!b},a.binders.checked={publishes:!0,bind:function(b){return a.Util.bindEvent(b,"change",this.publish)},unbind:function(b){return a.Util.unbindEvent(b,"change",this.publish)},routine:function(a,b){var c;return a.checked="radio"===a.type?(null!=(c=a.value)?c.toString():void 0)===(null!=b?b.toString():void 0):!!b}},a.binders.unchecked={publishes:!0,bind:function(b){return a.Util.bindEvent(b,"change",this.publish)},unbind:function(b){return a.Util.unbindEvent(b,"change",this.publish)},routine:function(a,b){var c;return a.checked="radio"===a.type?(null!=(c=a.value)?c.toString():void 0)!==(null!=b?b.toString():void 0):!b}},a.binders.value={publishes:!0,bind:function(b){return a.Util.bindEvent(b,"change",this.publish)},unbind:function(b){return a.Util.unbindEvent(b,"change",this.publish)},routine:function(a,b){var d,e,f,g,h,i,j;if(null!=window.jQuery){if(a=jQuery(a),(null!=b?b.toString():void 0)!==(null!=(g=a.val())?g.toString():void 0))return a.val(null!=b?b:"")}else if("select-multiple"===a.type){if(null!=b){for(j=[],e=0,f=a.length;f>e;e++)d=a[e],j.push(d.selected=(h=d.value,c.call(b,h)>=0));return j}}else if((null!=b?b.toString():void 0)!==(null!=(i=a.value)?i.toString():void 0))return a.value=null!=b?b:""}},a.binders["if"]={block:!0,bind:function(a){var b,c;return null==this.marker?(b=[this.view.config.prefix,this.type].join("-").replace("--","-"),c=a.getAttribute(b),this.marker=document.createComment(" rivets: "+this.type+" "+c+" "),a.removeAttribute(b),a.parentNode.insertBefore(this.marker,a),a.parentNode.removeChild(a)):void 0},unbind:function(){var a;return null!=(a=this.nested)?a.unbind():void 0},routine:function(b,c){var d,e,f,g,h;if(!!c==(null==this.nested)){if(c){f={},h=this.view.models;for(d in h)e=h[d],f[d]=e;return g={binders:this.view.options.binders,formatters:this.view.options.formatters,adapters:this.view.options.adapters,config:this.view.options.config},(this.nested=new a.View(b,f,g)).bind(),this.marker.parentNode.insertBefore(b,this.marker.nextSibling)}return b.parentNode.removeChild(b),this.nested.unbind(),delete this.nested}},update:function(a){var b;return null!=(b=this.nested)?b.update(a):void 0}},a.binders.unless={block:!0,bind:function(b){return a.binders["if"].bind.call(this,b)},unbind:function(){return a.binders["if"].unbind.call(this)},routine:function(b,c){return a.binders["if"].routine.call(this,b,!c)},update:function(b){return a.binders["if"].update.call(this,b)}},a.binders["on-*"]={"function":!0,unbind:function(b){return this.handler?a.Util.unbindEvent(b,this.args[0],this.handler):void 0},routine:function(b,c){return this.handler&&a.Util.unbindEvent(b,this.args[0],this.handler),a.Util.bindEvent(b,this.args[0],this.handler=this.eventHandler(c))}},a.binders["each-*"]={block:!0,bind:function(a){var b;return null==this.marker?(b=[this.view.config.prefix,this.type].join("-").replace("--","-"),this.marker=document.createComment(" rivets: "+this.type+" "),this.iterated=[],a.removeAttribute(b),a.parentNode.insertBefore(this.marker,a),a.parentNode.removeChild(a)):void 0},unbind:function(){var a,b,c,d,e;if(null!=this.iterated){for(d=this.iterated,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push(a.unbind());return e}},routine:function(b,c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;if(k=this.args[0],c=c||[],this.iterated.length>c.length)for(w=Array(this.iterated.length-c.length),q=0,t=w.length;t>q;q++)f=w[q],p=this.iterated.pop(),p.unbind(),this.marker.parentNode.removeChild(p.els[0]);for(g=r=0,u=c.length;u>r;g=++r)if(j=c[g],e={},e[k]=j,null==this.iterated[g]){x=this.view.models;for(i in x)j=x[i],null==e[i]&&(e[i]=j);m=this.iterated.length?this.iterated[this.iterated.length-1].els[0]:this.marker,l={binders:this.view.options.binders,formatters:this.view.options.formatters,adapters:this.view.options.adapters,config:{}},y=this.view.options.config;for(h in y)o=y[h],l.config[h]=o;l.config.preloadData=!0,n=b.cloneNode(!0),p=new a.View(n,e,l),p.bind(),this.iterated.push(p),this.marker.parentNode.insertBefore(n,m.nextSibling)}else this.iterated[g].models[k]!==j&&this.iterated[g].update(e);if("OPTION"===b.nodeName){for(z=this.view.bindings,A=[],s=0,v=z.length;v>s;s++)d=z[s],d.el===this.marker.parentNode&&"value"===d.type?A.push(d.sync()):A.push(void 0);return A}},update:function(a){var b,c,d,e,f,g,h,i;b={};for(c in a)d=a[c],c!==this.args[0]&&(b[c]=d);for(h=this.iterated,i=[],f=0,g=h.length;g>f;f++)e=h[f],i.push(e.update(b));return i}},a.binders["class-*"]=function(a,b){var c;return c=" "+a.className+" ",!b==(-1!==c.indexOf(" "+this.args[0]+" "))?a.className=b?""+a.className+" "+this.args[0]:c.replace(" "+this.args[0]+" "," ").trim():void 0},a.binders["*"]=function(a,b){return b?a.setAttribute(this.type,b):a.removeAttribute(this.type)},a.adapters["."]={id:"_rv",counter:0,weakmap:{},weakReference:function(a){var b;return null==a[this.id]&&(b=this.counter++,this.weakmap[b]={callbacks:{}},Object.defineProperty(a,this.id,{value:b})),this.weakmap[a[this.id]]},stubFunction:function(a,b){var c,d,e;return d=a[b],c=this.weakReference(a),e=this.weakmap,a[b]=function(){var b,f,g,h,i,j,k,l,m,n;h=d.apply(a,arguments),k=c.pointers;for(g in k)for(f=k[g],n=null!=(l=null!=(m=e[g])?m.callbacks[f]:void 0)?l:[],i=0,j=n.length;j>i;i++)b=n[i],b();return h}},observeMutations:function(a,b,d){var e,f,g,h,i,j;if(Array.isArray(a)){if(g=this.weakReference(a),null==g.pointers)for(g.pointers={},f=["push","pop","shift","unshift","sort","reverse","splice"],i=0,j=f.length;j>i;i++)e=f[i],this.stubFunction(a,e);if(null==(h=g.pointers)[b]&&(h[b]=[]),c.call(g.pointers[b],d)<0)return g.pointers[b].push(d)}},unobserveMutations:function(a,b,c){var d,e;return Array.isArray(a&&null!=a[this.id])&&(d=null!=(e=this.weakReference(a).pointers)?e[b]:void 0)?d.splice(d.indexOf(c),1):void 0},subscribe:function(a,b,d){var e,f,g=this;return e=this.weakReference(a).callbacks,null==e[b]&&(e[b]=[],f=a[b],Object.defineProperty(a,b,{get:function(){return f},set:function(c){var h,i,j;if(c!==f){for(f=c,j=e[b],h=0,i=j.length;i>h;h++)d=j[h],d();return g.observeMutations(c,a[g.id],b)}}})),c.call(e[b],d)<0&&e[b].push(d),this.observeMutations(a[b],a[this.id],b)},unsubscribe:function(a,b,c){var d;return d=this.weakmap[a[this.id]].callbacks[b],d.splice(d.indexOf(c),1),this.unobserveMutations(a[b],a[this.id],b)},read:function(a,b){return a[b]},publish:function(a,b,c){return a[b]=c}},a.factory=function(b){return b._=a,b.binders=a.binders,b.components=a.components,b.formatters=a.formatters,b.adapters=a.adapters,b.config=a.config,b.configure=function(b){var c,d;null==b&&(b={});for(c in b)d=b[c],a.config[c]=d},b.bind=function(b,c,d){var e;return null==c&&(c={}),null==d&&(d={}),e=new a.View(b,c,d),e.bind(),e}},"object"==typeof exports?a.factory(exports):"function"==typeof define&&define.amd?define(["exports"],function(b){return a.factory(this.rivets=b),b}):a.factory(this.rivets={})}).call(this);