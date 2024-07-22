import { db } from "@/utils/db";
import { put } from "@vercel/blob";

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get("image") as File;

  if (!file.name) {
    return Response.json(
      { message: "Выберите файл для загрузки!" },
      { status: 404 }
    );
  }

  const upload = await put(file.name, file, { access: "public" });

  const image = await db.image.create({
    data: {
      link: upload.url,
      altTxt: upload.pathname,
    },
  });

  return Response.json({ message: "Успешно добавленно!", image });
}
