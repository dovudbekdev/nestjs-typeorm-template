export function toSkipTake(page?: number) {
  const limit = Number(process.env.PAGINATION_LIMIT); // limit .env dan keladi

  if (!page) {
    return { take: undefined, skip: undefined };
  }

  const take = Math.min(Math.max(limit, 1), 100);
  const skip = (Math.max(page, 1) - 1) * take;

  return { take, skip };
}
