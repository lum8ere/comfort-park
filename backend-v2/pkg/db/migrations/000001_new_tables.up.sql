CREATE TABLE buildings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name TEXT, -- название
    size TEXT, -- размер 6х5
    floors INT NOT NULL DEFAULT 1, -- количество этажей
    area DECIMAL(10,2) NULL, -- площадь
    description TEXT NULL, -- описание
    bange TEXT NULL, -- возможность добавлять ХИТ ПРОДАЖ или что-то другое
    price INT NULL, -- цена
    created_at TIMESTAMP DEFAULT NOW(), -- дата создания
    is_active BOOLEAN NOT NULL DEFAULT true -- активно или нет
);

CREATE TABLE photos (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    url TEXT NOT NULL, -- URL объекта MinIO
    building_id TEXT REFERENCES buildings(id) ON DELETE CASCADE,   -- ID дома (nullable, если не привязан к дому)
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name TEXT, -- название
    description TEXT NULL, -- описание
    created_at TIMESTAMP DEFAULT NOW(), -- дата создания
)

CREATE TABLE project_photos (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    root_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
    url TEXT NOT NULL, -- URL объекта MinIO
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project_reviews (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    root_id TEXT REFERENCES projects(id) ON DELETE CASCADE,
    first_name TEXT,
    Last_name TEXT,
    comment TEXT,
    photos []TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE services (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);