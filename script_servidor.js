async function encripta(){const o="SELECT senha, nome FROM contas",e=await pool.query(o);if(0===e.rows.length)throw new Error("Nenhuma senha encontrada no banco.");const r=e.rows[0].senha,a=e.rows[0].nome;let s=r,n=s.match(/.{1,4}/g),t=n.length-1;n.length;for(var c=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],l=["324l","ulle","eer4","jkd3","3rtd","errt","kkll","retr","erty","klkl","9990","tyty","rtyu","trtr","3456","rers","erxt","4r4r","etet","xxxx","errr","rett","reft","fggf","bfgf","hhjh"],d=[1,2,3,4,5,6,7,8,9,0],p=["@@lw","@£§€","er=3","-+23","olu3","res@","!!22","{{@@","ilo!","909$","@340"],i=l.length,u=c.length,h=p.length,m=d.length,g="";t>=0;){for(;i>=0||h>=0;)n[t]==l[i]?g+=c[i]:n[t]==p[h]&&(g+=d[h]),i-=1,h-=1;i=u,h=m,t-=1}var f={nome:a,senha:g};return f}var express=require("express"),cors=require("cors");const fs=require("fs"),{Pool:Pool}=require("pg");var app=express();app.use(express.json()),app.use(cors());const helmet=require("helmet");app.use(helmet.noSniff()),app.use(helmet.xssFilter()),app.use(helmet.crossOriginEmbedderPolicy()),app.use(helmet.ieNoOpen()),app.use(helmet.hsts({maxAge:31536e3,includeSubDomains:!0,preload:!0})),app.use(helmet.contentSecurityPolicy({directives:{defaultSrc:["'self'"],scriptSrc:["'self'"],styleSrc:["'self'"],imgSrc:["*"],connectSrc:["*"],fontSrc:["'self'"],objectSrc:["'none'"],upgradeInsecureRequests:[]}})),app.use(helmet.frameguard({action:"deny"}));const pool=new Pool({host:"ep-shy-haze-a5fn30na-pooler.us-east-2.aws.neon.tech",user:"neondb_owner",password:"8XJOeoMIWr0U",database:"neondb",port:5432,ssl:{rejectUnauthorized:!1}});pool.connect().then(()=>{console.log("Conexão ao banco de dados estabelecida com sucesso!")}).catch(o=>{console.error("Erro ao conectar ao banco de dados:",o)}),app.post("/info",async(o,e)=>{try{const r=o.body,a=await encripta(),s=a.senha,n=a.nome;console.log(s,n),r.senha===s&&r.nome==n?e.json({confirma:"w"}):e.status(401).json({error:"Senha inválida."})}catch(o){console.error(o),e.status(500).json({error:"Erro interno do servidor."})}}),app.post("/dados_gerentes",async(o,e)=>{var r=o.body,a=r.comando;console.log(`${a}`),console.log("dados apnhados",r);try{const o=await pool.query(`${a}`);if(0===o.rows.length)return console.log("Nenhum dado encontrado na tabela cantina_mira."),e.json([])}catch(o){console.error("Erro ao executar a consulta:",o),e.status(500).json({error:"Erro ao obter dados",details:o.message})}}),app.post("/dados_novidades",async(o,e)=>{var r=o.body,a=r.comando;console.log(`${a}`),console.log("dados apnhados",r);try{const o=await pool.query(`${a}`);if(0===o.rows.length)return console.log("Nenhum dado encontrado na tabela cantina_mira."),e.json([])}catch(o){console.error("Erro ao executar a consulta:",o),e.status(500).json({error:"Erro ao obter dados",details:o.message})}}),app.get("/dados_transfiridos",async(o,e)=>{try{const o="select novidade,imagem_nome,titulo,preco from novidades",a=await pool.query(`${o}`);if(0===a.rows.length)return console.log("Nenhum dado encontrado na tabela cantina_mira."),e.json([]);console.log("Dados pegos:",a.rows);var r=JSON.stringify(a.rows);e.json(r)}catch(o){console.error("Erro ao executar a consulta:",o),e.status(500).json({error:"Erro ao obter dados",details:o.message})}});const porta=9002;app.listen(porta,o=>{o?console.error("Tivemos um pequeno erro: "+o):console.log("Servidor conectado na porta "+porta)});