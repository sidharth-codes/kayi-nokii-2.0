import { Client } from "@gradio/client";
async function test() {
  try {
    const client = await Client.connect("ai4bharat/IndicF5");
    console.log("Connected");
  } catch (e) {
    console.error(e.message);
  }
}
test();
