CREATE TABLE services (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE dicts_materials (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name text, 
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE dicts_building_category (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name text, 
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE buildings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    category_code TEXT REFERENCES dicts_building_category(code) ON DELETE CASCADE, -- категория дома
    material_code TEXT REFERENCES dicts_materials(code) ON DELETE CASCADE, -- материал дома
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
    is_gallery BOOLEAN NOT NULL DEFAULT FALSE, -- Флаг для галереи
    created_at TIMESTAMP DEFAULT NOW()
);