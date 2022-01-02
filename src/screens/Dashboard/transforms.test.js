import {
    MULTIPLE_FAVORITE_DATA_RESPONSE,
    SAMPLE_METEOR_DATA_RESPONSE,
    SINGLE_FAVORITE_DATA_RESPONSE,
} from './constants';
import { addFavoriteMeteorsToRawData } from './transforms';

describe('Meteor Transforms', () => {
    it('addFavoriteMeteorsToRawData handles empty favorites array', () => {
        const emptyFavoritesResponse = addFavoriteMeteorsToRawData(
            [],
            SAMPLE_METEOR_DATA_RESPONSE,
        );
        expect(emptyFavoritesResponse).toStrictEqual(
            SAMPLE_METEOR_DATA_RESPONSE,
        );
    });
    it('addFavoriteMeteorsToRawData handles single value in favorites array', () => {
        const singleFavoritesResponse = addFavoriteMeteorsToRawData(
            ['1'],
            SAMPLE_METEOR_DATA_RESPONSE,
        );
        expect(singleFavoritesResponse).toStrictEqual(
            SINGLE_FAVORITE_DATA_RESPONSE,
        );
    });
    it('addFavoriteMeteorsToRawData handles multiple value in favorites array', () => {
        const multipleFavoritesResponse = addFavoriteMeteorsToRawData(
            ['1', '2', '10'],
            SAMPLE_METEOR_DATA_RESPONSE,
        );
        expect(multipleFavoritesResponse).toStrictEqual(
            MULTIPLE_FAVORITE_DATA_RESPONSE,
        );
    });
});
