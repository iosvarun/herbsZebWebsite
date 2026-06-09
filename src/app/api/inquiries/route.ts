import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getDb } from "@/lib/mongodb";

const dbPath = path.join(process.cwd(), "src/data/inquiries_db.json");

export async function GET() {
  try {
    const mongoDb = await getDb();

    if (mongoDb) {
      const inquiries = await mongoDb.collection("inquiries")
        .find()
        .sort({ createdAt: -1 })
        .toArray();

      const formattedInquiries = inquiries.map((inq) => ({
        ...inq,
        _id: inq._id.toString()
      }));

      return NextResponse.json({ 
        success: true, 
        dbMode: "mongodb", 
        data: formattedInquiries 
      });
    }

    // Fallback
    let localData = [];
    try {
      const fileContent = await fs.readFile(dbPath, "utf-8");
      localData = JSON.parse(fileContent);
    } catch (e) {
      localData = [];
    }

    return NextResponse.json({ 
      success: true, 
      dbMode: "local", 
      data: localData 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

