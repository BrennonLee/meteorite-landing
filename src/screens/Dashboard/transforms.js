/**
 *
 * @param {array} favoriteIds Array of string favorite meteorite IDs that have been selected
 * @param {array} meteorData The raw JSON meteorite data retrieved from our store
 * @returns {*}
 */
export const addFavoriteMeteorsToRawData = (favoriteIds, meteorData) => {
    let meteorDataWithFavorites = meteorData;
    if (favoriteIds && favoriteIds.length) {
        meteorDataWithFavorites = meteorData.map(({ id, ...rest }) => {
            if (favoriteIds.includes(id)) {
                return {
                    id,
                    ...rest,
                    favorite: true,
                };
            } else {
                return {
                    id,
                    ...rest,
                };
            }
        });
    }
    return meteorDataWithFavorites;
};
