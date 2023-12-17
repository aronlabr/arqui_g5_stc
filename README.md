# Sistema de Trabajo de Campo con microservicios

### Stack de Tecnologias

 - **Gateway** : Nginx reverse proxy

 - **Microservices**
  
  |          | Auth    | Visitas | Notificaciones | Incidentes | Tecnicos  | Reportes |
  | -------- | ------- | ------- | -------------- | ---------- | --------- | -------- |
  | Language | JS      | JS      | JS             | JS         | JS        | To-Do    |
  | Server   | Fastify | Express | Express        | Express    | Express   | To-Do    |
  | Database | MySQL   | MySQL   | MySQL          | MySQL      | MySQL     | To-Do    |
  | ORM      | No      | No      | No             | No         | Sequilize | To-Do    |
  | GraphQL  | No      | Apollo  | No             | No         | No        | To-Do    |
  | API docs | No      | Swagger | No             | No         | No        | To-Do    |

  - **Web** : Next.js 13, React-Bootstrap, React-Chart.js, Graphql-request

### Ejecutar proyecto
**Microservicios**

 - **Requisitos** : Tener Docker instalado
 - Pasos:
   - Ubicarse en la carpeta de `backend-microservicios/docker`
   - Duplicar `docker.env` renombrar a `.env`
   - Definir las variables de entorno de puertos y la DB
   - Ejecutar el comando `docker compose up`