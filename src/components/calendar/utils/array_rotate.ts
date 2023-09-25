export default function arrayRotate<T>(targetArray: T[], count: number): T[] {
  const arr = [...targetArray];
  const len = arr.length;
  arr.push(...arr.splice(0, ((count % len) + len) % len));
  return arr;
}
