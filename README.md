Camunda 8 Node Worker
Este projeto implementa um worker para o Camunda 8, utilizando Node.js para processar tarefas automatizadas em um fluxo de trabalho.

📌 Requisitos
Antes de iniciar, certifique-se de ter os seguintes requisitos instalados:

Node.js (versão 18 ou superior)
npm ou yarn

🚀 Configuração
1️⃣ Clone o repositório
sh
Copiar
Editar
git clone https://github.com/alvarobarrosjunior/camunda-8-node-worker.git
cd camunda-8-node-worker
2️⃣ Instale as dependências
Se estiver usando npm:

sh
Copiar
Editar
npm install
Se estiver usando yarn:

sh
Copiar
Editar
yarn install
🔑 Configuração das variáveis de ambiente
Para conectar o worker ao Camunda 8, crie um arquivo .env na raiz do projeto com as seguintes informações:

ini
Copiar
Editar
# Modo de operação
CAMUNDA_CLIENT_MODE=saas

# Credenciais de autenticação (substitua pelos valores reais)
CAMUNDA_CLIENT_ID=SEU_CLIENT_ID
CAMUNDA_CLIENT_SECRET=SEU_CLIENT_SECRET

# Configuração do cluster
CAMUNDA_CLUSTER_ID=SEU_CLUSTER_ID
CAMUNDA_REGION=SEU_REGION
CAMUNDA_ZEEBE_ADDRESS=SEU_CLUSTER_ID.SEUREGION.zeebe.camunda.io:443

# URL de autenticação do Zeebe
CAMUNDA_OAUTH_URL=https://login.cloud.camunda.io/oauth/token
CAMUNDA_ZEEBE_TOKEN_AUDIENCE=zeebe.camunda.io

▶️ Como rodar o projeto
Após configurar o .env, execute o worker com o seguinte comando:

sh
Copiar
Editar
npm start
Ou com yarn:

sh
Copiar
Editar
yarn start
Se quiser rodar em modo de desenvolvimento com nodemon (caso instalado):

sh
Copiar
Editar
npm run dev
🛠 Tecnologias utilizadas
Node.js
TypeScript
Camunda 8
Zeebe Client
dotenv (para gerenciamento de variáveis de ambiente)
