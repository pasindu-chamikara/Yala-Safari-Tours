import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { Role } from "@/types";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Fetch the requester's role
    const requesterDoc = await adminDb.collection("users").doc(decodedToken.uid).get();
    if (!requesterDoc.exists) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const requesterRole = requesterDoc.data()?.role as Role;
    
    const body = await req.json();
    const { email, password, name, role } = body;
    
    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // RBAC validation
    if (requesterRole !== "SUPER_ADMIN") {
      if (requesterRole === "ADMIN") {
        if (role === "SUPER_ADMIN" || role === "ADMIN") {
          return NextResponse.json({ error: "Admins cannot create users with Admin or Super Admin roles." }, { status: 403 });
        }
      } else {
        return NextResponse.json({ error: "Forbidden. You do not have permission to create users." }, { status: 403 });
      }
    }

    // Create user in Firebase Auth
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
    });

    // Create user doc in Firestore
    await adminDb.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      email,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, uid: userRecord.uid });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
