import {json} from "@remix-run/node";
import prisma from "../db.server";

export async function loader() {
  return json({
    message: "Hello ",
  });
}

export async function action({ request }) {


  let wishData= await request.formData();
wishData=Object.fromEntries(wishData);
const customerId=wishData.customerId;
const productId=wishData.productId;
const action=wishData.action

if(!customerId || !productId){
  return json({message:"Customer ID and Product ID are required"}, {status:400}, )
}
  switch (action) {
    case "CREATE":
      const wishList  = await prisma.wishList.create({
        data:{
          customerId:customerId,
          productId:productId
        }
      });

      return json({ message: "Settings done", method: "CREATE", wishList });

   case "DELETE":
    await prisma.wishlist.deleteMany({
      where:{
        customerId:customerId,
        productId:productId
      }
    })
    return json({ message: "Settings done", method: "DELETE" });

    default:
      return json({ message: "Method not allowed" }, { status: 404 });
  }
}
