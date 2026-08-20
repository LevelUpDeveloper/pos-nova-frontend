# PosNovaFrontend

Frontend del sistema de Punto de Venta (POS) **POS Nova**, desarrollado con Angular 21.2.11.

El frontend consume la API REST de POS Nova, desarrollada con .NET 8 y Clean Architecture.

---

##  Arquitectura general

El sistema está compuesto por tres partes principales:

```text
┌─────────────────────────┐
│                         │
│      Angular 21         │
│       Frontend          │
│                         │
└────────────┬────────────┘
             │
             │ HTTP / REST API
             ▼
┌─────────────────────────┐
│                         │
│       .NET 8 API        │
│    POS_Nova.Api         │
│                         │
└────────────┬────────────┘
             │
             │ Entity Framework Core
             ▼
┌─────────────────────────┐
│                         │
│       SQL Server        │
│        Database         │
│                         │
└─────────────────────────┘

