function getImgUrl(name) {
    return new URL(`../assets/clothes/${name}`, import.meta.url)
}

export { getImgUrl }