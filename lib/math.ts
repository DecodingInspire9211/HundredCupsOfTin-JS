export class KWB_Maths {

    static clamp( value, min, max ) {
        return Math.max( min, Math.min( max, value ) );
    }

    function lerp( a, b, alpha ) {
        return a + alpha * ( b — a );
    }
}