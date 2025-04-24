import { useEffect } from "react";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import prisma from "../db.server";
import {
  Page,
  

} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { useAppBridge } from "@shopify/app-bridge-react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  const wishListData = await prisma.wishlist.findMany();
  return json(wishListData);
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const formData = await request.formData();
  const customerId = formData.get("customerId");
  const productId = formData.get("productId");

  // Delete the wishlist entry
  await prisma.wishlist.deleteMany({
    where: {
      customerId,
      productId,
    },
  });

  // Create a product
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;

  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
  };
};

export default function Index() {
  const wishListData = useLoaderData();
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  // const isLoading =
  //   ["loading", "submitting"].includes(fetcher.state) &&
  //   fetcher.formMethod === "POST";

  // const productId = fetcher.data?.product?.id?.replace(
  //   "gid://shopify/Product/",
  //   "",
  // );

  // useEffect(() => {
  //   if (productId) {
  //     shopify.toast.show("Product created");
  //   }
  // }, [productId, shopify]);

  // const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page>
      {/* <TitleBar title="Remix app template">
        <button variant="primary" onClick={generateProduct}>
          Generate a product
        </button>
      </TitleBar> */}

      <div>
        <h2 style={{ textAlign: 'center', fontSize: '25px', marginBottom: '20px' }}>
          Wish List Data
        </h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ border: '1px solid #ddd', padding: '6px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '6px' }}>Customer ID</th>
              <th style={{ border: '1px solid #ddd', padding: '6px' }}>Product ID</th>
              <th style={{ border: '1px solid #ddd', padding: '6px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {wishListData.map((item, index) => (
              <tr key={index} style={{ textAlign: 'center' }}>
                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{item.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{item.customerId}</td>
                <td style={{ border: '1px solid #ddd', padding: '6px' }}>{item.productId}</td>
                <td style={{ border: '1px solid #ddd', padding: '6px' }}>
                  <fetcher.Form method="post">
                    <input type="hidden" name="customerId" value={item.customerId} />
                    <input type="hidden" name="productId" value={item.productId} />
                    <button type="submit">Remove</button>
                  </fetcher.Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
