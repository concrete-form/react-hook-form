(this.webpackJsonpdemo=this.webpackJsonpdemo||[]).push([[0],{22:function(e,t,r){"use strict";r.r(t);var n=r(0),o=r.n(n),i=r(14),c=r.n(i),a=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,23)).then((function(t){var r=t.getCLS,n=t.getFID,o=t.getFCP,i=t.getLCP,c=t.getTTFB;r(e),n(e),o(e),i(e),c(e)})).catch(console.error)},s=r(2),u=r.n(s),l=r(3),d=r(11),b=r(1),f=r(9),j=r(5),m=r(7),h=r(8),p=function(){function e(t){Object(m.a)(this,e),this.reactHookFormContext=t}return Object(h.a)(e,[{key:"getFormState",value:function(){var e=this.reactHookFormContext.formState;return{isValid:!!e.isValid,isSubmitting:!!e.isSubmitting,wasSubmitted:!!e.isSubmitted}}},{key:"getControlProps",value:function(e,t){return this.reactHookFormContext.register(e,t)}},{key:"getControlState",value:function(e){var t=this.reactHookFormContext.formState;return{value:this.reactHookFormContext.getValues(e),errors:this.formatFieldErrors(t.errors[e]),isTouched:!!t.touchedFields[e]}}},{key:"setFieldValue",value:function(e,t,r,n){this.reactHookFormContext.setValue(e,t,{shouldValidate:r,shouldTouch:n})}},{key:"formatFieldErrors",value:function(e){return Object.entries((null===e||void 0===e?void 0:e.types)||{}).map((function(e){var t=Object(j.a)(e,2),r=t[0],n=t[1];return"string"===typeof n?n:r}))||[]}}]),e}(),O=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r},v=function(e){var t=e.form,r=e.onSubmit,n=e.formProps,o=e.noValidate,i=e.children,c=O(e,["form","onSubmit","formProps","noValidate","children"]);return Object(b.jsx)(f.a,Object.assign({formHandler:new p(t),config:c},{children:Object(b.jsx)(d.a,Object.assign({},t,{children:Object(b.jsx)("form",Object.assign({onSubmit:t.handleSubmit(r),noValidate:o},n,{children:i}),void 0)}),void 0)}),void 0)},g=r(12),x=r(15),y=["name","fieldProps"],S=function(e){var t,r,n=e.name,o=e.fieldProps,i=Object(x.a)(e,y),c=Object(f.d)().isSubmitting,a=Object(f.b)(n,o),s=Object(f.c)(n).errors,u=null!==(t=null!==(r=i.disabled)&&void 0!==r?r:a.disabled)&&void 0!==t?t:c;return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("input",Object(g.a)(Object(g.a)(Object(g.a)({},i),a),{},{disabled:u})),s.map((function(e){return Object(b.jsx)("div",{style:{color:"#f00"},children:e},e)})),Object(b.jsx)("br",{})]})},F=function(){var e=Object(l.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return setTimeout(e,t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(d.b)({defaultValues:{foo:"Foo"},mode:"onTouched",criteriaMode:"all"}),t=function(){var e=Object(l.a)(u.a.mark((function e(){var t,r,n,o=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,F(2e3);case 2:for(t=o.length,r=new Array(t),n=0;n<t;n++)r[n]=o[n];console.log(r);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("h1",{children:"Demo"}),Object(b.jsxs)(v,{form:e,onSubmit:t,formProps:{style:{background:"#ececec",padding:15}},noValidate:!0,children:[Object(b.jsx)(S,{name:"foo",fieldProps:{required:"This field is required",pattern:{value:/^[a-z]+$/i,message:"This field only accept letters"}}}),Object(b.jsx)(S,{name:"bar",fieldProps:{required:!0}}),Object(b.jsx)("br",{}),Object(b.jsx)("button",{type:"submit",children:"Send"})]})]})};c.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(k,{})}),document.getElementById("root")),a()}},[[22,1,2]]]);
//# sourceMappingURL=main.7cdf84bc.chunk.js.map