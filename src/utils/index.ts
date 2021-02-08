const DEFAULT_DURATION = 600000; // 10 Minutes

// Pokemon ID Generator
export const pokemon_id_generator = (id: number) => {
    const id_string = `${id}`

    const filler = "000";

    return filler.substring(0, filler.length - id_string.length) + id_string
}

// Memoization
export const isCached = (key: string) => {
    if (localStorage && localStorage.getItem(key)) {
        console.log('Checking Cache ...');

        const value: string | null = localStorage.getItem(key);

        if (typeof value === "string") {
            const data: any = JSON.parse(value);

            const cachedUntil: any = data.expiry;

            const currentTime: any = Date.now();

            // noinspection PointlessBooleanExpressionJS,UnnecessaryLocalVariableJS
            const cached = !!(cachedUntil > currentTime);

            return cached;
        }
    }
};

export const getCached = (key: string) => {
    if (localStorage && localStorage.getItem(key)) {
        console.log('Getting Cache ...');

        const value: string | null = localStorage.getItem(key);

        // noinspection UnnecessaryLocalVariableJS
        if (typeof value === "string") {

            return JSON.parse(value)

        }
    }
};

export const setCache = (key: string, data: any, duration: number = DEFAULT_DURATION) => {
    if (localStorage) {
        console.log('Setting Cache ...');

        const cacheUntil = Date.now() + duration;


        const value = {
            data: data,
            expiry: cacheUntil
        };

        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const clearCache = (key: string) => {
    console.log('Clearing %s Cache ...', key);
    if (localStorage && localStorage.getItem(key)) {
        localStorage.removeItem(key)
    }
}
