document.getElementById("btn").addEventListener("click",async function(){let e=["","",""],n=0,t=["i_nome","i_senha","i_conf"];for(;n<3;)e[n]=document.getElementById(`${t[n]}`),n+=1;var a=e[0].value,o=e[1].value,i=e[2].value,c={nome:a,senha:o,senha_2:i},l=await fetch("https://cantina-gerente.vercel.app/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}),m=await l.json(),r="w"===m.confirma&&o==i?"w":"v";"w"===r?window.open("main.html","_blank"):alert("Senha ou nome incorreto!!"),console.log(r)});