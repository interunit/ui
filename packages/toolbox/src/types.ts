export type WithRequired<T, K extends keyof T> = T & {[P in K]-?: T[P]}

export type MergeWithOverride<T, U> = U extends infer O
  ? O extends object
    ? T & Omit<O, keyof T>
    : never
  : never

// For props merging
// TODO: Clean this up
type IsObject<T> = T extends object ? (T extends any[] ? false : true) : false

type Merge2<T, U> = IsObject<T> & IsObject<U> extends true
  ? {
      [K in keyof T]: K extends keyof U ? Merge2<T[K], U[K]> : T[K]
    } & U
  : U

export type Merge<T extends unknown[]> = {
  0: T[0]
  1: T extends [infer Car, ...infer Cdr] ? Merge2<Car, Merge<Cdr>> : T
}[T extends [unknown, unknown, ...unknown[]] ? 1 : 0]
