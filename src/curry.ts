type Curried<A, R> = A extends []
    ? () => R
    : A extends [infer ARG]
    ? (param: ARG) => R
    : A extends [infer ARG, ...infer REST]
    ? (param: ARG) => Curried<REST, R>
    : never;

declare function curry<A extends any[], R>(
    fn: (...args: A) => R
): Curried<A, R>;

function sum(a: string, b: number) {
    return 1123;
}

const currySum = curry(sum);
