import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i}from"./assets/vendor-A92OCY9B.js";const s={form:document.querySelector(".form"),input:document.querySelector("input[name='delay']"),inputFulfilled:document.querySelector("input[value='fulfilled']"),inputRejected:document.querySelector("input[value='rejected']"),button:document.querySelector("button[type='submit']")},{form:u,input:a,inputFulfilled:c,inputRejected:d,button:v}=s;let r=0;a.addEventListener("input",e=>{r=Number(e.currentTarget.value)});let o="";c.addEventListener("change",e=>{o=e.currentTarget.getAttribute("value")});d.addEventListener("change",e=>{o=e.currentTarget.getAttribute("value")});const m=()=>{const e=r,t=o;return new Promise((n,l)=>{setTimeout(()=>{t==="fulfilled"?n(`${e}`):l(`${e}`)},r)})},f=e=>{e.preventDefault(),m().then(t=>i.success({title:"OK",message:`Fulfilled promise in ${t}ms`,messageColor:"#fff",titleSize:"16px",backgroundColor:"#59a10d",position:"topRight",titleColor:"#fff",theme:"dark"})).catch(t=>i.error({title:"Error",message:`Rejected promise in ${t}ms`,messageColor:"#fff",titleSize:"16px",backgroundColor:"#ef4040",position:"topRight",titleColor:"#fff",theme:"dark"})),u.reset()};u.addEventListener("submit",f);
//# sourceMappingURL=2-snackbar.js.map
