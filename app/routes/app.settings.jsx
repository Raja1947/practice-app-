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
import {json } from "@remix-run/node"



export async function loader(){
//get data from the database
let settings={
  name:"My App",
  description:"This is my app"
}
return json(settings)
}
export async function action({request}){
  // return json({message:"Settings done"})
  let settings=await request.formData();
  settings=Object.fromEntries(settings);
  return json(settings)


}

export default function SettingsPage() {
  const settings=useLoaderData()
const [formState, setFormState]=useState(settings)

  return (
    <Page>
      <TitleBar title="Settings page" />
     <Form method="POST" >
      <TextField label="Name" name="name" value={formState?.name} onChange={(value)=>setFormState({...formState, name:value})}/>
      <TextField label="Description" name="description" value={formState?.description} onChange={(value)=>setFormState({...formState, description:value})}/>
      <Button submit={true}>Submit</Button>
     </Form>
    </Page>
  );
}


