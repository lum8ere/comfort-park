CREATE TABLE services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE dicts_materials (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name text, 
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE dicts_building_category (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    code TEXT UNIQUE NOT NULL,
    name text, 
    is_active BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE buildings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    category_code TEXT REFERENCES dicts_building_category(code) ON DELETE CASCADE, -- категория дома
    material_code TEXT REFERENCES dicts_materials(code) ON DELETE CASCADE, -- материал дома
    name TEXT, -- название
    size TEXT, -- размер 6х5
    floors INT NOT NULL DEFAULT 1, -- количество этажей
    area DECIMAL(10,2) NULL, -- площадь
    description TEXT NULL, -- описание
    is_active BOOLEAN NOT NULL DEFAULT true -- активно или нет
);