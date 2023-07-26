export type WithRequired<T, K extends keyof T> = T & {[P in K]-?: T[P]}

export type MergeWithOverride<T, U> = U extends infer O
  ? O extends object
    ? T & Omit<O, keyof T>
    : never
  : never
