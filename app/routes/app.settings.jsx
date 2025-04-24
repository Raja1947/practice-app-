import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  TextField,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import prisma from "../db.server";

// import db from prisma

export async function loader() {
  //get data from the database
  let settings = await prisma.settings.findFirst();

  return json(settings);
}
export async function action({ request }) {
  // return json({message:"Settings done"})
  let settings = await request.formData();
  settings = Object.fromEntries(settings);

  //update db
  await prisma.settings.upsert({
    where: {
      id: "1",
    },
    update: {
      id: "1",
      name: settings.name,
      description: settings.description,
    },
    create: {
      id: "1",
      name: settings.name,
      description: settings.description,
    },
  });
  return json(settings);
}

export default function SettingsPage() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <TitleBar title="Settings page" />
      <Form method="POST">
        <TextField
          label="Name"
          name="name"
          value={formState?.name}
          onChange={(value) => setFormState({ ...formState, name: value })}
        />
        <TextField
          label="Description"
          name="description"
          value={formState?.description}
          onChange={(value) =>
            setFormState({ ...formState, description: value })
          }
        />
        <Button submit={true}>Submit</Button>
      </Form>
    </Page>
  );
}
