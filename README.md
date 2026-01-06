# Healthcare Microservices (SCD Q1) 
This project runs a microservices-based backend for doctor appointments using Node.js services:

- API Gateway (single entry point)
- Auth Service
- Patient Service
- Doctor Service
- Appointment Service
- Notification Service

All services run in Docker containers on a private Docker network and are accessed externally only through the API Gateway.

---

## 1) Prerequisites

Install:
- Docker Desktop (with Docker Compose v2 enabled)
- Node.js
- Git

---

## 2) Code Update Required (API Gateway must not use localhost)

Inside Docker, `localhost` points to the same container, not other containers.  
So the API Gateway must proxy to **service names** (Docker DNS):

Update `api-gateway/server.js`:

```js
app.use("/auth", proxy("http://auth-service:4001"));
app.use("/users", proxy("http://patient-service:4002"));
app.use("/doctors", proxy("http://doctor-service:4003"));
app.use("/appointments", proxy("http://appointment-service:4004"));
```

## Commands
`docker-compose up --build`


## 4. API Testing (Through API Gateway)
All requests must use http://localhost:4000
PowerShell Commands 
`PowerShellInvoke-RestMethod http://localhost:4000/health`
→ Confirms API Gateway is reachable.
`PowerShellInvoke-RestMethod -Method Post -Uri "http://localhost:4000/auth/register" -ContentType "application/json" -Body '{"email":"test@demo.com","password":"123","role":"patient"}'`
→ Registers a user via Gateway → Auth Service.
`PowerShellInvoke-RestMethod -Method Post -Uri "http://localhost:4000/auth/login" -ContentType "application/json" -Body '{"email":"test@demo.com","password":"123"}'`
→ Logs in and returns JWT.
`PowerShellInvoke-RestMethod http://localhost:4000/doctors`
→ Fetches doctor list via Gateway → Doctor Service.
`PowerShellInvoke-RestMethod http://localhost:4000/users`
→ Fetches patient list via Gateway → Patient Service.
`PowerShellInvoke-RestMethod -Method Post -Uri "http://localhost:4000/appointments" -ContentType "application/json" -Body '{"userId":1,"doctorId":1,"date":"2026-01-10"}'`
→ Books an appointment and triggers Notification Service.
`PowerShelldocker compose logs notification-service`
→ Shows Notification: Appointment Booked → proves internal service-to-service communication.
