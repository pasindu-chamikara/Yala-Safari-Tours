import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";
import { Role } from "@/types";

export async function DELETE(req: Request) {
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
    
    const { searchParams } = new URL(req.url);
    const targetUid = searchParams.get("uid");
    
    if (!targetUid) {
      return NextResponse.json({ error: "Missing target UID" }, { status: 400 });
    }

    // Fetch target user's role
    const targetDoc = await adminDb.collection("users").doc(targetUid).get();
    if (!targetDoc.exists) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 });
    }
    
    const targetRole = targetDoc.data()?.role as Role;

    // RBAC validation
    if (requesterRole !== "SUPER_ADMIN") {
      if (requesterRole === "ADMIN") {
        if (targetRole === "SUPER_ADMIN" || targetRole === "ADMIN") {
          return NextResponse.json({ error: "Admins cannot delete users with Admin or Super Admin roles." }, { status: 403 });
        }
      } else {
        return NextResponse.json({ error: "Forbidden. You do not have permission to delete users." }, { status: 403 });
      }
    }

    // Prevent self-deletion
    if (decodedToken.uid === targetUid) {
      return NextResponse.json({ error: "You cannot delete your own account." }, { status: 400 });
    }

    // Delete user in Firebase Auth
    await adminAuth.deleteUser(targetUid);

    // Delete user doc in Firestore
    await adminDb.collection("users").doc(targetUid).delete();

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
