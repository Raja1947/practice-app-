import { json } from "@remix-run/node";
import prisma from "../db.server";

// GET request
export async function loader({ request }) {
  console.log("Request method:", request.method);
  if (request.method == "OPTIONS") {
    return new Response(null, {
      status: 204,
      "Access-Control-Allow-Origin": request.origin,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, referer-path",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      ...request.headers,
    });
  }

  console.log("rrrrrr");
  const url = new URL(request.url);
  const customerID = url.searchParams.get("customerId");
  const productID = url.searchParams.get("productId");

  if (!customerID || !productID) {
    return new Response(
      JSON.stringify({ message: "Customer ID and Product ID are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  const wishList = await prisma.wishList.findMany({
    where: { customerId: customerID, productId: productID },
  });

  return new Response(
    JSON.stringify({ message: "done", method: "GET", wishList }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

// POST/OPTIONS
export async function action({ request }) {
  console.log("Request method:", request.method);

  console.log("raddfdf");
  if (request.method == "OPTIONS") {
    return new Response(null, {
      status: 204,
      "Access-Control-Allow-Origin": request.origin,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, referer-path",
      "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
      ...request.headers,
    });
  }

  const form = await request.formData();
  const customerId = form.get("customerId");
  const productId = form.get("productId");
  const action = form.get("action");

  if (!customerId || !productId) {
    return new Response(
      JSON.stringify({ message: "Customer ID and Product ID are required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  if (action === "CREATE") {
    try {
      const wishList = await prisma.Wishlist.create({
        data: {
          customerId: customerId ,  
          productId: productId,
        },
      });
  
      return new Response(
        JSON.stringify({ message: "Settings done", method: "CREATE", wishList }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (err) {
      console.error("CREATE error:", err);
      return new Response(JSON.stringify({ message: "Create failed", error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }
  

  if (action === "DELETE") {
    await prisma.wishList.deleteMany({
      where: { customerId, productId },
    });

    return new Response(
      JSON.stringify({ message: "Settings done", method: "DELETE" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 404,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
