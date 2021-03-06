export const HTTP_STATUS_OK = 200;
const METEOR_LANDING_URL = 'https://data.nasa.gov/resource/y77d-th95.json';

/**
 * Performs the actual GET request to the METEOR_LANDING_URL above and returns the response.
 * @returns {Promise<Response>}
 */
export async function requestMeteorData() {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        method: 'GET',
    };
    return fetch(METEOR_LANDING_URL, options);
}

// Simple no operation util function
export const noop = () => {};
