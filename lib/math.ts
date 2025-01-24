export class KWB_Maths {

    static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    static lerp(a: number, b: number, alpha: number): number {
        return a + alpha * (b - a);
    }

    static getRandomIntInclusive(min: number, max: number): number {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }
}