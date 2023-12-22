import { Model } from "mongoose";

export async function paginationFind(
  model: Model<any>,
  pageNum: number,
  pageSize: number,
  filers?: Record<string, string>,
) {
  const startIndex = (pageNum - 1) * pageSize;

  const total = await model.countDocuments().exec();
  const pages = Math.ceil(total / pageSize);

  const list = await model.find(filers).limit(pageSize).skip(startIndex).exec();
  return {
    pageNum,
    total,
    pages,
    pageSize,
    list,
  };
}
