export type ReadOnlyStyleObject<Keys extends string> = {
  readonly [key in Keys]: string;
};
