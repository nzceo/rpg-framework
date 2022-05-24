export function addCapital(arg: string) {
  return arg.replace(/^\w/, function (c) {
    return c.toUpperCase();
  });
}
