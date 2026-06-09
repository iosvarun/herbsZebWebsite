import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getDb } from "@/lib/mongodb";

const dbPath = path.join(process.cwd(), "src/data/orders_db.json");

// Helper to read local database
async function readLocalDb() {
  try {
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    const data = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

// Helper to write local database
async function writeLocalDb(data: any) {
  await fs.mkdir(path.dirname(dbPath), { recursive: true });
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET() {
  try {
    const mongoDb = await getDb();
    
    if (mongoDb) {
      const orders = await mongoDb.collection("orders")
        .find()
        .sort({ createdAt: -1 })
        .toArray();
      
      const formattedOrders = orders.map((order) => ({
        ...order,
        _id: order._id.toString()
      }));

      return NextResponse.json({ 
        success: true, 
        dbMode: "mongodb", 
        data: formattedOrders 
      });
    }

    // Fallback
    const localDb = await readLocalDb();
    return NextResponse.json({ 
      success: true, 
      dbMode: "local", 
      data: localDb 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, name, mobile, email, address, landmark, pincode, state, city, paymentMethod, amount, items } = body;

    if (!orderId || !name || !mobile || !email || !address || !pincode || !paymentMethod || !amount || !items) {
      return NextResponse.json(
        { success: false, error: "Missing required order fields" },
        { status: 400 }
      );
    }

    // Create new order record
    const newOrder: any = {
      orderId,
      name,
      mobile,
      email,
      address,
      landmark: landmark || "",
      pincode,
      state,
      city,
      paymentMethod,
      amount,
      items,
      createdAt: new Date().toISOString(),
      status: "Processing"
    };

    const mongoDb = await getDb();
    let dbMode = "local";

    if (mongoDb) {
      dbMode = "mongodb";
      await mongoDb.collection("orders").insertOne(newOrder);
    } else {
      const localDb = await readLocalDb();
      localDb.unshift(newOrder);
      await writeLocalDb(localDb);
    }

    return NextResponse.json({ 
      success: true, 
      dbMode, 
      data: newOrder 
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

