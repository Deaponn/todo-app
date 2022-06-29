const size = {
    smartphoneSmall: '320px',
    smartphoneBig: '400px',
    tablet: "768px",
    laptop: '1024px',
    desktop: '2160px'
}

export const device = {
    smartphoneSmall: `(min-width: ${size.smartphoneSmall})`,
    smartphoneBig: `(min-width: ${size.smartphoneBig})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    desktop: `(min-width: ${size.desktop})`,
}
