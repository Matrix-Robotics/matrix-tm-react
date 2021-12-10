(this["webpackJsonpmatrix-tm-react"]=this["webpackJsonpmatrix-tm-react"]||[]).push([[0],{467:function(e,t,n){},482:function(e,t){},483:function(e,t){},491:function(e,t){},494:function(e,t){},495:function(e,t){},496:function(e,t){},583:function(e,t){},587:function(e,t,n){"use strict";n.r(t);var a=n(3),r=n.n(a),c=n(60),i=n.n(c),s=(n(467),n(22)),o=n(230),l=n(4),u=n.n(l),d=n(13),j=n(7),f=n(17),b=n(669),p=n(657),h=n(658),m=n(649),O=n(665),x=n(652),g=n(656),v=n(662),C=n(653),y=n(663),w=n(441),S=n.n(w),I=n(445),k=n(668),E=n(671),L=n(670),N=n(667),z=n(232),R=n(660),T=n(661),F=n(672),D=n(659),P=n(439),B=n.n(P),W=n(440),M=n.n(W),A=n(444),U=n.n(A),G=n(335),H=n.n(G),V=n(442),_=n.n(V),J=n(443),Y=n.n(J),K=n(589),Z=n(438),q=n.n(Z),Q=n(647),X=n(645),$=n(664),ee=n(403),te=n.n(ee),ne=n(666),ae=n(412),re=n.n(ae),ce=n(650),ie=n(651),se=n(411),oe=n.n(se),le=n(410),ue=n.n(le),de=n(409),je=n.n(de),fe=n(407),be=n.n(fe),pe=n(408),he=n.n(pe),me=n(446),Oe=n(24),xe=Object(X.a)((function(e){return{buttons:{display:"flex",justifyContent:"space-between",width:"100%"}}}));function ge(e){var t=xe(),n=r.a.useRef(null),a=r.a.useRef();return Object(Oe.jsx)(Q.a,{item:!0,xs:6,children:Object(Oe.jsxs)(Q.a,{container:!0,ref:n,direction:"column",justifyContent:"space-between",alignItems:"stretch",children:[Object(Oe.jsx)(me.a,{ref:a,hideGrid:!0,brushColor:"#1F1F1F",brushRadius:5,lazyRadius:0,canvasWidth:"100%",canvasHeight:function(e){var t=r.a.useState(),n=Object(j.a)(t,2),a=n[0],c=n[1];return r.a.useEffect((function(){var t=getComputedStyle(e.current);function n(){c(e.current.clientWidth-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight))}return window.addEventListener("resize",n),n(),function(){return window.removeEventListener("resize",n)}})),a}(n),style:{border:"1px solid black",aspectRatio:1}}),Object(Oe.jsxs)("div",{className:t.buttons,children:[Object(Oe.jsx)(K.a,{"aria-label":"delete",onClick:function(){a.current.clear()},children:Object(Oe.jsx)(be.a,{})}),Object(Oe.jsx)(K.a,{onClick:function(){a.current.undo()},children:Object(Oe.jsx)(he.a,{})}),Object(Oe.jsx)(K.a,{color:"primary",onMouseDown:function(){var t;t=a.current.canvasContainer.children[1].toDataURL(),e.onChange(t),a.current.clear()},children:Object(Oe.jsx)(je.a,{})})]})]})})}var ve=Object(X.a)((function(e){return{root:{width:"100%"},imageList:{maxHeight:"300px",overflowY:"auto",transform:"translateZ(0)"},image:{height:"100%",maxWidth:"100%"}}})),Ce={width:224,height:224,facingMode:"user"};function ye(e){var t=r.a.useRef(null),n=r.a.useState(1),a=Object(j.a)(n,2),c=a[0],i=a[1],s=function(){clearTimeout(c)},o=function(n){var a=null;t.current&&(a=t.current.getScreenshot()),a&&function(t,n){e.onChange(t,n)}(n,a)};return Object(Oe.jsx)(Q.a,{item:!0,xs:6,children:Object(Oe.jsxs)(Q.a,{container:!0,direction:"column",justifyContent:"space-between",alignItems:"stretch",children:[Object(Oe.jsx)(te.a,{audio:!1,ref:t,id:"webcam",screenshotFormat:"image/jpeg",forceScreenshotSourceSize:"true",style:{width:"100%"},videoConstraints:Ce}),Object(Oe.jsx)(m.a,{variant:"contained",color:"primary",size:"medium",onMouseDown:function e(t){i(setTimeout(o,10,t)),c&&i(setTimeout(e,50,t))},onMouseUp:s,onMouseLeave:s,children:"Capture Photo"})]})})}function we(e){var t=ve(),n=r.a.useRef(),a=r.a.useState([]),c=Object(j.a)(a,2),i=c[0],s=c[1],o=r.a.useState(!1),l=Object(j.a)(o,2),b=l[0],p=l[1],h=r.a.useState(!1),x=Object(j.a)(h,2),g=x[0],v=x[1],C=r.a.useState(!1),y=Object(j.a)(C,2),w=y[0],S=y[1],I=r.a.useCallback((function(){e.onChange(i),s(e.imageList)}),[e,i]),k=r.a.useCallback((function(){p(!1)}),[]);return r.a.useEffect((function(){e.captureEl&&(e.captureEl.current=[I,k])}),[e.captureEl,I,k]),r.a.useEffect((function(){e.imageList&&s(e.imageList)}),[e.imageList]),r.a.useEffect((function(){n.current&&(n.current.scrollTop=n.current.scrollHeight)})),Object(Oe.jsxs)(O.a,{className:t.root,children:[Object(Oe.jsxs)(Q.a,{container:!0,spacing:2,direction:"row",justifyContent:"space-between",alignItems:"flex-start",children:[b&&Object(Oe.jsx)(ye,{onChange:function(e,t){s((function(e){return e.concat(t)}))}}),g&&Object(Oe.jsx)(ge,{onChange:function(e){s((function(t){return t.concat(e)}))}}),Object(Oe.jsxs)(Q.a,{item:!0,xs:6,overflow:"visible",children:[Object(Oe.jsx)(z.a,{children:"Add Image Samples:"}),Object(Oe.jsx)(ce.a,{className:t.imageList,ref:n,rowHeight:"auto",cols:4,children:i.map((function(e,n){return Object(Oe.jsx)(ie.a,{cols:e.cols||1,children:Object(Oe.jsx)("img",{className:t.image,src:e,alt:e.title},n)},n)}))})]})]}),Object(Oe.jsxs)(O.a,{display:"flex",pt:2,children:[Object(Oe.jsx)(O.a,{p:.5,children:Object(Oe.jsx)(m.a,{variant:"outlined",size:"large",color:"primary",onClick:function(){if(b)p((function(e){return!e}));else{function t(){return n.apply(this,arguments)}function n(){return(n=Object(f.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.enumerateDevices();case 2:return t=e.sent,e.abrupt("return",Object(d.a)(t).some((function(e){return""!==e.label})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.onCameraOn(),t().then((function(e){e?(S(!1),v(!1),p((function(e){return!e}))):S(!0)}))}},startIcon:Object(Oe.jsx)(ue.a,{}),children:"Webcam"})}),Object(Oe.jsx)(O.a,{p:.5,children:Object(Oe.jsx)(m.a,{variant:"outlined",size:"large",color:"primary",onClick:function(){p(!1),v((function(e){return!e}))},startIcon:Object(Oe.jsx)(oe.a,{}),children:"Draw"})}),Object(Oe.jsxs)(O.a,{p:.5,children:[Object(Oe.jsx)("input",{id:e.cardId,accept:"image/*",type:"file",multiple:!0,hidden:!0,onChange:function(e){if(null!==e.target){var t=Array.from(e.target.files).map((function(e){return URL.createObjectURL(e)}));s((function(e){return e.concat(t)})),Array.from(e.target.files).map((function(e){return URL.revokeObjectURL(e)}))}}}),Object(Oe.jsx)("label",{htmlFor:e.cardId,children:Object(Oe.jsx)(m.a,{variant:"outlined",size:"large",color:"primary",component:"span",startIcon:Object(Oe.jsx)(re.a,{}),children:"Upload"})})]})]}),w?Object(Oe.jsx)("div",{children:Object(Oe.jsx)(ne.a,{onClose:function(){S(!1)},severity:"error",children:"You must grant this site to access your camera. Please check your privacy setting and try again."})}):null]},e.cardId)}var Se,Ie,ke=n(139),Ee=n(434),Le=n(305),Ne=Object(X.a)((function(e){return{classGrid:{minHeight:"100vh"},classTitle:{fontSize:"1.4rem"},cardClass:{display:"flex",flexDirection:"column",marginBottom:e.spacing(4)},cardButton:{padding:e.spacing(2)},cardAction:{alignSelf:"center"},cardGrid:{paddingTop:e.spacing(8),paddingBottom:e.spacing(8)},cardCenter:{position:"fixed",top:"50vh",transform:"translate(0, -50%)"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},form:{display:"flex",flexDirection:"column",gap:e.spacing(2)},footer:{backgroundColor:e.palette.background.paper,padding:e.spacing(6)},grid:{padding:e.spacing(8)},progressColorPrimary:{backgroundColor:"#DEDEDE"},progressBarActive:{backgroundColor:"#00A1E9"},progressBarDisable:{backgroundColor:"#6D6D6D"}}})),ze={version:2,checkpointUrl:null,alpha:1,trainingLayer:"out_relu"},Re={tfjsVersion:"1.3.1",tmVersion:"2.4.4",packageVersion:"0.1.0",packageName:"matrix-tm-react",modelName:"MobileNet-cp13r",timeStamp:"11-19-2021",labels:[],userMetadata:{},grayscale:!1,imageSize:224},Te=Le.TrainingParameters={denseUnits:100,epochs:50,learningRate:.001,batchSize:16};function Fe(){return(Fe=Object(f.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Le.createTeachable(Re,ze);case 2:Se=e.sent;case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function De(){return(De=Object(f.a)(u.a.mark((function e(t){var n,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=["acc","val_acc","loss","val_loss"],a={tab:"Training Process",name:"",styles:{height:"80%"}},r=Ee.show.fitCallbacks(a,n),t.forEach((function(e,t){var n=e.imageList;"undefined"!==typeof n&&n.length>0&&(Se.setLabel(t,e.title),Se.prepareDataset(),n.forEach((function(e){var n=new Image(224,224);n.src=e,Se.addExample(t,n)})))})),e.next=6,Se.train(Te,r);case 6:return console.log(Se),e.abrupt("return",!0);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Pe(){return(Pe=Object(f.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Se){e.next=6;break}return!1,e.next=4,Se.predict(Ie.canvas,false);case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Be(){var e=Ne(),t=r.a.useRef(null),n=r.a.useRef([]),a=r.a.useRef(null),c=r.a.useRef(null),i=r.a.useState(!1),l=Object(j.a)(i,2),w=l[0],P=l[1],W=r.a.useState(!1),A=Object(j.a)(W,2),G=A[0],V=A[1],J=r.a.useState([{cardId:1,title:"Class 1",imageList:[]},{cardId:2,title:"Class 2",imageList:[]}]),Z=Object(j.a)(J,2),X=Z[0],ee=Z[1];function te(e){var t=r.a.useState(),n=Object(j.a)(t,2),a=n[0],c=n[1];return r.a.useEffect((function(){var t=getComputedStyle(e.parentNode.current);function n(){c(e.parentNode.current.clientWidth-parseFloat(t.paddingLeft)-parseFloat(t.paddingRight))}return window.addEventListener("resize",n),n(),function(){return window.removeEventListener("resize",n)}})),a}function ne(){var t=function(e){ee(e)};return Object(Oe.jsxs)(r.a.Fragment,{children:[X.map((function(e,n){return Object(Oe.jsx)(ae,{cardId:e.cardId,cards:X,title:e.title,imageList:e.imageList,onChange:t},e.cardId)})),Object(Oe.jsx)(Q.a,{item:!0,xs:12,children:Object(Oe.jsx)(x.a,{className:e.cardClass,children:Object(Oe.jsx)(m.a,{size:"large",color:"primary",onClick:function(){n.current.forEach((function(e){return e.current[0]()}));var e=Object(d.a)(X);if(e.length){var t=e.at(-1).cardId+1,a={cardId:t,title:"Class "+t,imageList:[]};ee([].concat(Object(d.a)(e),[a]))}else ee([{cardId:1,title:"Class 1",imageList:[]}])},startIcon:Object(Oe.jsx)(q.a,{}),children:"Add New Class"})})})]})}function ae(t){var a=r.a.useState(),c=Object(j.a)(a,2),i=c[0],s=c[1],o=r.a.useState(!1),l=Object(j.a)(o,2),u=l[0],f=l[1],b=r.a.useRef();r.a.useEffect((function(){t.title&&s(t.title)}),[t.title]);var p=r.a.useState(null),h=Object(j.a)(p,2),m=h[0],O=h[1],v=Boolean(m),y=function(e){t.onChange(e)};return Object(Oe.jsx)(r.a.Fragment,{children:Object(Oe.jsx)(Q.a,{item:!0,xs:12,children:Object(Oe.jsxs)(x.a,{className:e.cardClass,children:[Object(Oe.jsx)(C.a,{action:Object(Oe.jsxs)("div",{children:[Object(Oe.jsx)(K.a,{"aria-label":"settings",onClick:function(e){O(e.currentTarget)},children:Object(Oe.jsx)(B.a,{})}),Object(Oe.jsx)(I.a,{id:"long-menu",anchorEl:m,getContentAnchorEl:null,keepMounted:!0,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},open:v,onClose:function(){O(null)},PaperProps:{style:{maxHeight:360,width:"auto"}},children:["Delete Class","Disable Class","Remove All Samples"].map((function(e,a){return Object(Oe.jsx)(L.a,{onClick:function(){return function(e){var a=Object(d.a)(X);if("Delete Class"===e){n.current.forEach((function(e){return e.current[0]()}));var r=a.map((function(e){return e.cardId})).indexOf(t.cardId);a.splice(r,1),y(a)}}(e)},children:e},a)}))})]}),title:u?Object(Oe.jsx)(N.a,{autoFocus:!0,inputProps:{className:e.classTitle},inputRef:b,value:i,onBlur:function(e){return function(e){var a=Object(d.a)(X),r=a.map((function(e){return e.cardId})).indexOf(t.cardId);a[r].title=e.currentTarget.value,y(a),f(!1),n.current.forEach((function(e){return e.current[0]()}))}(e)},onChange:function(e){return s(e.currentTarget.value)},onKeyDown:function(e){"Enter"===e.key&&(b.current.blur(),s(b.current.value))}}):Object(Oe.jsxs)(z.a,{className:e.classTitle,onClick:function(){f(!0)},children:[i,Object(Oe.jsx)(K.a,{"aria-label":"settings",onClick:function(){f(!0)},children:Object(Oe.jsx)(M.a,{})})]})}),Object(Oe.jsx)(g.a,{className:e.cardButton,children:Object(Oe.jsx)(we,{cardId:t.cardId,imageList:t.imageList,captureEl:n.current[X.map((function(e){return e.cardId})).indexOf(t.cardId)],onChange:function(e){var n=Object(d.a)(X),a=n.map((function(e){return e.cardId})).indexOf(t.cardId);n[a].imageList=Object(d.a)(e),y(n)},onCameraOn:function(){n.current.forEach((function(e){return e.current[1]()}))}},t.cardId)})]})})})}function re(t){var n=te(t),a=r.a.useState(!1),c=Object(j.a)(a,2),i=c[0],s=c[1],o=r.a.useState(!1),l=Object(j.a)(o,2),d=l[0],O=l[1],v=r.a.useState(.9),y=Object(j.a)(v,2),I=y[0],R=y[1],T=r.a.useState(50),F=Object(j.a)(T,2),D=F[0],B=F[1],W=r.a.useState(16),M=Object(j.a)(W,2),A=M[0],U=M[1],J=r.a.useState(.001),K=Object(j.a)(J,2),Z=K[0],q=K[1],Q=r.a.useState(!0),$=Object(j.a)(Q,2),ee=($[0],$[1],function(){Te.epochs=Number(D),Te.learningRate=Number(Z),Te.batchSize=Number(A),t.captureEl.current.forEach((function(e){return e.current.forEach((function(e){return e()}))})),X.map((function(e){return e.imageList})).flat(1).length>0&&(P((function(e){return!e})),function(e){return De.apply(this,arguments)}(X).then((function(e){V(e)})))});function ne(){return ae.apply(this,arguments)}function ae(){return(ae=Object(f.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=document.getElementById("json-upload"),n=document.getElementById("weights-upload"),0!==t.files.length&&s(!0),0!==n.files.length&&O(!0),1===t.files.length&1===n.files.length&&ke.loadLayersModel(ke.io.browserFiles([t.files[t.files.length-1],n.files[n.files.length-1]])).then((function(e){Se.model=e,V(!0)})).catch((function(e){console.error(e)}));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(Oe.jsx)(r.a.Fragment,{children:Object(Oe.jsxs)(x.a,{style:{width:n},className:e.cardCenter,children:[Object(Oe.jsx)(C.a,{title:"Train"}),Object(Oe.jsx)(g.a,{className:e.cardButton,children:G?Object(Oe.jsx)(m.a,{variant:"contained",size:"medium",fullWidth:!0,onClick:function(){ee()},disableElevation:!0,disabled:G,children:"Trained"}):Object(Oe.jsx)(m.a,{variant:"contained",size:"medium",fullWidth:!0,onClick:function(){ee()},disableElevation:!0,disabled:w,children:w?"Training":"Train Model"})}),Object(Oe.jsxs)(g.a,{className:e.cardButton,children:[Object(Oe.jsxs)(m.a,{variant:"contained",size:"large",fullWidth:!0,disabled:i,component:"label",startIcon:Object(Oe.jsx)(H.a,{}),onChange:ne,children:[Object(Oe.jsx)("input",{id:"json-upload",type:"file",accept:"*,.json",hidden:!0}),"Upload Json"]}),Object(Oe.jsxs)(m.a,{variant:"contained",size:"large",fullWidth:!0,disabled:d,component:"label",startIcon:Object(Oe.jsx)(H.a,{}),onChange:ne,children:[Object(Oe.jsx)("input",{id:"weights-upload",type:"file",accept:"*,.bin",hidden:!0}),"Upload Weights"]})]}),Object(Oe.jsxs)(b.a,{children:[Object(Oe.jsx)(p.a,{expandIcon:Object(Oe.jsx)(S.a,{}),"aria-controls":"panel1a-content",id:"panel1a-header",children:Object(Oe.jsx)(z.a,{children:"Advanced"})}),Object(Oe.jsx)(h.a,{children:Object(Oe.jsxs)("form",{className:e.form,children:[Object(Oe.jsxs)("div",{children:[Object(Oe.jsx)(z.a,{children:"Train/Test-split:"}),Object(Oe.jsx)(E.a,{id:"train-test-split",defaultValue:.9,valueLabelDisplay:"auto",step:.1,marks:!0,min:0,max:1,value:I,onChange:function(e,t){R(t)}})]}),Object(Oe.jsxs)("div",{children:[Object(Oe.jsx)(z.a,{children:"Epochs:"}),Object(Oe.jsx)(N.a,{id:"epochs",InputProps:{inputProps:{min:1,max:200}},value:D,type:"number",variant:"outlined",size:"small",onChange:function(e){return B(e.target.value)}})]}),Object(Oe.jsxs)("div",{children:[Object(Oe.jsx)(z.a,{children:"Batch Size:"}),Object(Oe.jsxs)(k.a,{id:"batch-size",value:A,onChange:function(e){return U(e.target.value)},displayEmpty:!0,inputProps:{"aria-label":"Without label"},children:[Object(Oe.jsx)(L.a,{value:16,children:"16"}),Object(Oe.jsx)(L.a,{value:32,children:"32"}),Object(Oe.jsx)(L.a,{value:64,children:"64"}),Object(Oe.jsx)(L.a,{value:128,children:"128"}),Object(Oe.jsx)(L.a,{value:256,children:"256"}),Object(Oe.jsx)(L.a,{value:512,children:"512"})]})]}),Object(Oe.jsxs)("div",{children:[Object(Oe.jsx)(z.a,{children:"Learning Rate:"}),Object(Oe.jsx)(N.a,{id:"learning_rate",type:"number",InputProps:{maxLength:13,step:"1"},value:Z,variant:"outlined",size:"small",inputProps:{min:0,max:1,step:.001},onChange:function(e){return q(parseFloat(e.target.value).toFixed(3))}})]}),Object(Oe.jsx)(m.a,{onClick:function(){R(.9),B(50),U(16),q(.001)},size:"small",color:"primary",endIcon:Object(Oe.jsx)(_.a,{}),disableElevation:!0,children:"Reset Default"}),Object(Oe.jsx)(m.a,{size:"small",color:"primary",endIcon:Object(Oe.jsx)(Y.a,{}),onClick:function(){},children:"Graph"})]})})]})]})})}function ce(e){return Object(Oe.jsx)(r.a.Fragment,{children:Object.entries(e.predictClasses).map((function(t,n){return Object(Oe.jsxs)(O.a,{display:"flex",alignItems:"center",children:[Object(Oe.jsx)(O.a,{minWidth:"15%",children:Object(Oe.jsx)(z.a,{variant:"body2",color:"textSecondary",children:t[1].className})}),Object(Oe.jsx)(O.a,{minWidth:"75%",mr:1,children:Object(Oe.jsx)(D.a,{classes:e.color,variant:"determinate",value:100*t[1].probability})}),Object(Oe.jsx)(O.a,{minWidth:"10%",children:Object(Oe.jsx)(z.a,{variant:"body2",color:"textSecondary",children:"".concat(Math.round(100*t[1].probability),"%")})})]},n)}))})}function ie(n){var a=r.a.useState(1),c=Object(j.a)(a,2),i=c[0],l=c[1],d=r.a.useState({inputSrc:!1,predictClasses:{}}),b=Object(j.a)(d,2),p=b[0],h=b[1];function m(){return(m=Object(f.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Ie=new Le.Webcam(224,224,!1),e.next=3,Ie.setup();case 3:Ie.play();case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var x=r.a.useCallback((function(){Ie.update();var e=function(){return Pe.apply(this,arguments)}();console.log(e),e.then((function(e){if(console.log(e),""!==e.label){var t=e;console.log(t),h((function(e){return Object(o.a)(Object(o.a)({},e),{},{predictClasses:t})}))}})),p.inputSrc&&l(setTimeout(x,100))}),[p.inputSrc]);return r.a.useEffect((function(){if(G){var e=function(){return m.apply(this,arguments)}();e.then((function(){p.inputSrc?(t.current.appendChild(Ie.canvas),x()):t.current.innerHTML=""}))}return function(){}}),[x,p.inputSrc]),Object(Oe.jsxs)(Q.a,{container:!0,direction:"column",justifyContent:"space-between",alignItems:"stretch",children:[G?Object(Oe.jsxs)(g.a,{className:e.cardButton,children:[Object(Oe.jsx)("dev",{ref:t}),Object(Oe.jsxs)(R.a,{row:!0,children:[Object(Oe.jsx)(O.a,{children:Object(Oe.jsx)(z.a,{children:p.inputSrc?"Input ON":"Input OFF"})}),Object(Oe.jsx)(O.a,{children:Object(Oe.jsx)(T.a,{control:Object(Oe.jsx)(F.a,{checked:p.inputSrc,onChange:function(e){h(Object(o.a)(Object(o.a)({},p),{},Object(s.a)({},e.target.name,e.target.checked))),clearTimeout(i)},name:"inputSrc",color:"primary"}),label:p.inputSrc})})]})]}):Object(Oe.jsx)(z.a,{children:"You can preview the prediction here after training a model on the left."}),p.inputSrc?Object(Oe.jsx)(ce,{predictClasses:p.predictClasses,color:{bar:e.progressBarActive,colorPrimary:e.progressColorPrimary}}):Object(Oe.jsx)(ce,{predictClasses:p.predictClasses,color:{bar:e.progressBarDisable,colorPrimary:e.progressColorPrimary}})]})}function se(t){var n=te(t);function a(){return(a=Object(f.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!Se){e.next=4;break}return t={trainableOnly:!1,includeOptimizer:!0},e.next=4,Se.save("downloads://image-model",t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(Oe.jsx)(r.a.Fragment,{children:Object(Oe.jsxs)(x.a,{style:{width:n},className:e.cardCenter,children:[Object(Oe.jsx)(C.a,{title:"Preview",action:Object(Oe.jsx)(m.a,{variant:"contained",size:"large",fullWidth:!0,onClick:function(){return a.apply(this,arguments)},startIcon:Object(Oe.jsx)(U.a,{}),disableElevation:!0,children:"Export Model"})}),Object(Oe.jsx)(v.a,{className:e.cardContent,children:Object(Oe.jsx)(ie,{})})]})})}return r.a.useEffect((function(){!function(){Fe.apply(this,arguments)}()}),[]),r.a.useEffect((function(){n.current.length!==X.length&&(n.current=Array(X.length).fill().map((function(e,t){return n.current[t]||r.a.createRef()})))}),[n,X.length]),Object(Oe.jsxs)(r.a.Fragment,{children:[Object(Oe.jsx)(y.a,{}),Object(Oe.jsx)("main",{children:Object(Oe.jsx)($.a,{className:e.cardGrid,maxWidth:"xl",children:Object(Oe.jsxs)(Q.a,{container:!0,spacing:8,children:[Object(Oe.jsx)(Q.a,{container:!0,item:!0,className:e.classGrid,xs:12,sm:6,md:6,alignContent:"center",children:Object(Oe.jsx)(ne,{})},1),Object(Oe.jsx)(Q.a,{item:!0,ref:a,xs:12,sm:6,md:2,children:Object(Oe.jsx)(re,{captureEl:n,parentNode:a})},2),Object(Oe.jsx)(Q.a,{item:!0,ref:c,xs:12,sm:6,md:4,children:Object(Oe.jsx)(se,{parentNode:c})},3)]})})})]})}var We=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,676)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};i.a.render(Object(Oe.jsx)(r.a.StrictMode,{children:Object(Oe.jsx)(Be,{})}),document.getElementById("root")),We()}},[[587,1,2]]]);
//# sourceMappingURL=main.ece4bf45.chunk.js.map