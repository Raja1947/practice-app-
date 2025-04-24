
import { authenticate, MONTHLY_PLAN } from "../shopify.server";

export const loader = async ({ request }) => {
  const { billing } = await authenticate.admin(request);
  await billing.require({
    plans: [MONTHLY_PLAN],
    isTest: true,
    returnUrl:
    // onFailure: async () => billing.request({ plan: MONTHLY_PLAN }),
  });

  // App logic
};