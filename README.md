# NestJS + TypeORM Shablon Loyiha

🚀 Bu loyiha **NestJS** va **TypeORM** asosida yangi backend loyihalarni tez va samarali boshlash uchun shablon sifatida yaratilgan. Struktura **modullarga bo‘lingan** va amaliyotda qo‘llaniladigan **eng yaxshi tajribalar** asosida tuzilgan.

---

## 📂 Loyihaning Fayl Strukturasi
```bash
src/
│── common/                # Umumiy utilitlar (interceptor, filter, decorator va h.k.)
│── config/                # Konfiguratsiya fayllari (DB, env, swagger va h.k.)
│── database/              # Ma’lumotlar bazasi moduli (entity, migration, seeder)
│── modules/               # Asosiy modullar
│   ├── users/             # Foydalanuvchilar moduli (controller, service, entity, dto)
│   ├── auth/              # Autentifikatsiya moduli (JWT, guard, strategy)
│── app.module.ts          # Root modul
│── main.ts                # Kirish nuqtasi (entry point)
```

### 📌 Modul Tuzilishi
```bash
modules/
└── users/
    ├── dto/               # Data Transfer Object (so‘rov/jo‘natish uchun)
    ├── entities/          # TypeORM entity fayllari
    ├── users.controller.ts
    ├── users.service.ts
    ├── users.module.ts
```