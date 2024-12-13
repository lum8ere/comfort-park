export const parsePhotos = (photosStr: string): string[] => {
    if (!photosStr) return [];

    // Удаляем фигурные скобки
    let cleanedStr = photosStr.trim();

    if (cleanedStr.startsWith('{') && cleanedStr.endsWith('}')) {
        cleanedStr = cleanedStr.slice(1, -1);
    }

    // Разделяем по запятой
    const photosArray = cleanedStr.split(',');

    // Удаляем лишние пробелы и кавычки
    return photosArray.map(photo => photo.trim().replace(/^"|"$/g, ''));
};