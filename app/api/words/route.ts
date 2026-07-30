import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.NOTION_TOKEN;
  let databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    return NextResponse.json([]);
  }

  databaseId = databaseId.replace(/-/g, "");

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        cache: "no-store",
      },
    );

    if (!res.ok) return NextResponse.json([]);

    const data = await res.json();

    const items = (data.results || []).map((page: any) => {
      const props = page.properties || {};

      let wordText = "";
      for (const key in props) {
        if (props[key]?.type === "title") {
          const titleArray = props[key]?.title || [];
          if (titleArray.length > 0) {
            wordText = titleArray.map((t: any) => t.plain_text).join("");
          }
        }
      }

      let dateText = "";
      for (const key in props) {
        if (props[key]?.type === "date" && props[key]?.date?.start) {
          dateText = props[key].date.start;
        }
      }

      let categoryText = "Log";
      for (const key in props) {
        if (props[key]?.type === "select" && props[key]?.select?.name) {
          categoryText = props[key].select.name;
        }
      }

      return {
        id: page.id,
        word: wordText,
        date: dateText,
        category: categoryText,
      };
    });

    const filtered = items.filter((item: any) => item.word.trim() !== "");
    return NextResponse.json(filtered);
  } catch (error) {
    console.error("Error fetching Notion data:", error);
    return NextResponse.json([]);
  }
}
