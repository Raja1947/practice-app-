import {json} from "@remix-run/node";

export async function loader() {
  return json({
    message: "Hello ",
  });
}

export async function action({ request }) {
  const method = request.method;
  switch (method) {
    case "POST":
      return json({ message: "Settings done", method: "POST" });

    case "PATCH":
      return json({ message: "Settings done", method: "PATCH" });

    default:
      return json({ message: "Method not allowed" }, { status: 404 });
  }
}
