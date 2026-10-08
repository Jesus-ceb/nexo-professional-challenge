// Plural labels for the seeded categories; unknown ones fall back to name + "s".
const CATEGORY_PLURALS = {
    Hotel: 'Hoteles',
    Hostal: 'Hostales',
    Apartamento: 'Apartamentos',
    Casa: 'Casas',
    Glamping: 'Glampings',
}

export const pluralizeCategory = (name) => CATEGORY_PLURALS[name] ?? `${name}s`

// Number of products per category id, e.g. { 1: 8, 2: 3 }.
export const countByCategory = (products) =>
    products.reduce((counts, product) => {
        const id = product.category?.id
        if (id != null) counts[id] = (counts[id] ?? 0) + 1
        return counts
    }, {})

// URL of a random image among the products of a category, or null if none has images.
export const getRandomCategoryImage = (products, categoryId) => {
    const withImages = products.filter(
        (product) => product.category?.id === categoryId && product.images?.length > 0
    )
    if (withImages.length === 0) return null

    const { images } = withImages[Math.floor(Math.random() * withImages.length)]
    return images[Math.floor(Math.random() * images.length)].url
}
