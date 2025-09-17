// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function DELETE(
//     request: Request,
//     { params }: { params: { id: string } }
// ) {
//     const { id } = await params;

//     try {
//         const user = await prisma.user.findUnique({
//             where: { id },
//             include: {
//                 cart: true,
//                 orders: true,
//                 // reviews: true
//             }
//         });
//         if (!user) {
//             return NextResponse.json({ error: "User not found" }, { status: 404 });
//         }

//         // Delete related cart
//         if (user.cart) {
//             await prisma.cart.delete({
//                 where: { id: user.cart.id }
//             });
//         }

//         // Delete related orders
//         if (user.orders.length > 0) {
//             await prisma.order.deleteMany({
//                 where: { userId: id }
//             });
//         }

//         // Delete related reviews
//         // if (user.reviews.length > 0) {
//         //   await prisma.review.deleteMany({
//         //     where: { userId: id }
//         //   });
//         // }

//         // Finally, delete user
//         await prisma.user.delete({
//             where: { id }
//         });

//         return NextResponse.json(
//             { message: "User and related data deleted successfully" },
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return NextResponse.json(
//             { error: "Failed to delete user" },
//             { status: 500 }
//         );
//     }
// }


import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        cart: true,
        orders: true,
        // reviews: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete related cart
    if (user.cart) {
      await prisma.cart.delete({ where: { id: user.cart.id } });
    }

    // Delete related orders
    if (user.orders.length > 0) {
      await prisma.order.deleteMany({ where: { userId: id } });
    }

    // Delete related reviews if needed
    // if (user.reviews.length > 0) {
    //   await prisma.review.deleteMany({ where: { userId: id } });
    // }

    // Finally delete user
    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { message: "User and related data deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
