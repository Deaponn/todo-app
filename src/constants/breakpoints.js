const size = {
    smartphoneSmall: '320px',
    smartphoneBig: '400px',
    tablet: "768px",
    laptop: '1024px',
    desktop: '2160px'
}

export const device = {
    smartphoneSmall: `(max-width: ${size.smartphoneSmall})`,
    smartphoneBig: `(max-width: ${size.smartphoneBig})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop})`,
}
