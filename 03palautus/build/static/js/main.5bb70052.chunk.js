(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var o=t(15),c=t.n(o),r=t(6),i=t(3),u=t(1),a=t(0),l=function(e){var n=e.onFilterChange,t=e.filter;return Object(a.jsxs)("div",{children:["filter shown with:",Object(a.jsx)("input",{onChange:n,value:t})]})},s=function(e){var n=e.person,t=e.onRemove;return Object(a.jsxs)("div",{children:[n.name,"   ",n.number," ",Object(a.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},d=function(e){var n=e.persons,t=e.filter,o=e.onRemove,c=n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())}));return console.log(c),Object(a.jsx)("div",{children:c.map((function(e){return Object(a.jsx)(s,{person:e,onRemove:o},e.name)}))})},f=t(4),j=t.n(f),b="/api/persons",h=function(){return j.a.get(b).then((function(e){return e.data}))},m=function(e){return j.a.post(b,e).then((function(e){return e.data}))},O=function(e){return j.a.put("".concat(b,"/").concat(e.id),e).then((function(e){return e.data}))},g=function(e){return j.a.delete("".concat(b,"/").concat(e.id)).then((function(e){return e.data}))},v=function(e){var n=e.message,t=e.error;return null===n?null:t?Object(a.jsx)("div",{style:{color:"red",background:"lightgrey",fontSize:20},children:n}):t?void 0:Object(a.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20},children:n})},p=function(){var e=Object(u.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(u.useState)(""),s=Object(i.a)(c,2),f=s[0],j=s[1],b=Object(u.useState)(""),p=Object(i.a)(b,2),x=p[0],w=p[1],y=Object(u.useState)(""),S=Object(i.a)(y,2),k=S[0],C=S[1],T=Object(u.useState)(),R=Object(i.a)(T,2),E=R[0],z=R[1],F=Object(u.useState)(!1),J=Object(i.a)(F,2),L=J[0],P=J[1];Object(u.useEffect)((function(){console.log("effect"),h().then((function(e){o(e)}))}),[]),console.log("render",t.length,"persons",typeof t);return Object(a.jsxs)("div",{children:[Object(a.jsx)(v,{message:E,error:L}),Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)("form",{onSubmit:C,children:Object(a.jsx)("div",{children:Object(a.jsx)(l,{onFilterChange:function(e){console.log(e.target.value),C(e.target.value)},filter:k})})}),Object(a.jsx)("h2",{children:"add a new"}),Object(a.jsxs)("form",{onSubmit:function(e){if(e.preventDefault(),console.log("button clicked",e.target),console.log(f),console.log(x),t.find((function(e){return e.name===f}))){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===f}));return function(e){O(e).then((function(e){o(t.map((function(n){return n.id!==e.id?n:e}))),j(""),w(""),P(!1),z("Changed number for ".concat(f)),setTimeout((function(){z(null)}),5e3)})).catch((function(n){P(!0),console.log(n),z("".concat(e.name," removed already")),setTimeout((function(){z(null)}),5e3)})).finally((function(){o(t.map((function(n){return n.id!==e.id?n:e})))}))}(Object(r.a)(Object(r.a)({},n),{},{number:x}))}}else m({name:f,number:x}).then((function(e){o(t.concat(e)),j(""),w(""),P(!1),z("Added ".concat(f)),setTimeout((function(){z(null)}),5e3)})).catch((function(e){console.log(e.response.data),P(!0),z("Error: ".concat(e.response.data.error)),setTimeout((function(){z(null)}),5e3)}))},children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:f,onChange:function(e){console.log(e.target.value),j(e.target.value)}})]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:x,onChange:function(e){console.log(e.target.value),w(e.target.value)}})]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",children:"add"})})]}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)("div",{children:Object(a.jsx)(d,{persons:t,filter:k,onRemove:function(e){window.confirm("Poistetaanko ".concat(e.name))&&g(e).then((function(){var n=t.filter((function(n){return n.id!==e.id}));o(n),P(!1),console.log(L),z("Removed ".concat(e.name)),setTimeout((function(){z(null)}),5e3)})).catch((function(n){P(!0),console.log(n),z("".concat(e.name," removed already")),setTimeout((function(){z(null)}),5e3)})).finally((function(){var n=t.filter((function(n){return n.id!==e.id}));o(n)}))}})})]})};c.a.render(Object(a.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.5bb70052.chunk.js.map