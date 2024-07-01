# Desafio Digiboard - Controle de Estoque

Este projeto foi desenvolvido como parte da prova prática para a posição de Desenvolvedor Full Stack na Digiboard Eletrônica da Amazônia. A aplicação é um sistema de controle de estoque, implementado com NestJS no backend e Angular no frontend, utilizando Docker para contêinerização e Prisma para ORM.

## Tecnologias Utilizadas

### Backend
- **NestJS**
- **TypeScript**
- **Prisma**
- **PostgreSQL**
- **Docker**

### Frontend
- **Angular 16**
- **PrimeNG 16**

## Funcionalidades

### Backend (NestJS)
1. **Cadastro de Usuários:** Menu para o cadastro de usuários.
2. **Cadastro de Produtos:** Menu para cadastro de produtos, contendo código do produto, descrição, data de entrada e data de validade.
3. **Pagamento de Produtos:** Menu para listar os produtos pagos aos usuários com informações sobre nome do produto, quantidade paga, data de entrega e nome do usuário. O sistema permite o pagamento do material a um usuário apenas se o produto estiver dentro da validade, realizando a baixa do estoque.

### Frontend (Angular)
1. **Validação de Campos:** Implementação de validação dos campos para garantir que sejam preenchidos corretamente.
2. **Requisição HTTP POST:** Utilização de um serviço para realizar requisições HTTP POST ao backend.
3. **Listagem de Produtos:** Funcionalidade para visualização da lista de produtos cadastrados.

## Como Executar o Projeto

### Pré-requisitos
- **Docker**
- **Node.js**
- **npm ou yarn**

### Passos para Executar

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/desafio-digiboard.git](https://github.com/victorlucass/desafio-full-digiboard)
   cd desafio-digiboard
   ```

2. **Backend:**
   - Navegue até o diretório do backend:
     ```bash
     cd backend
     ```
   - Copie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente:
     ```bash
     cp .env.example .env
     ```
   - Inicie os contêineres Docker:
     ```bash
     docker-compose up -d
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Execute as migrações do Prisma:
     ```bash
     npx prisma migrate dev
     ```
 - Inicie o servidor de desenvolvimento:
     ```bash
     npm start:dev
     ```

3. **Frontend:**
   - Navegue até o diretório do frontend:
     ```bash
     cd frontend
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Inicie o servidor de desenvolvimento:
     ```bash
     npm start
     ```

### Endpoints
- A API estará disponível em: `http://localhost:3000`
- O frontend estará disponível em: `http://localhost:4200`

## Estrutura do Projeto

```bash
desafio-digiboard/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── .env.example
│   ├── docker-compose.yml
│   └── ...
└── frontend/
    ├── src/
    ├── angular.json
    ├── package.json
    └── ...
```

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`).
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`).
4. Faça o push para a branch (`git push origin feature/MinhaFeature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- **Nome:** Victor Lucas Andrade de Oliveira  
- **Email:** victorlucas.ao@gmail.com  
- **LinkedIn:** [[victorlucas-am]](https://www.linkedin.com/in/victorlucas-am/)
