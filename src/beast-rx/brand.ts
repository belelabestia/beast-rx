export type Branded<Type> = Type & { type: string };

export const brand = <A, B extends A>(value: A): B => value as B;

export interface Validator<Unsafe, Safe> {
  (text: Unsafe): Safe | null;
}
