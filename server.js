require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_NUMBER_ID;

app.post("/enviar-mensaje", async (req, res) => {

    const { telefono, template, variables } = req.body;

    try {

        const response = await axios.post(
            `https://graph.facebook.com/v22.0/${PHONE_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: telefono,
                type: "template",
                template: {
                    name: template,
                    language: { code: "es_AR" },
                    components: [
                        {
                            type: "body",
                            parameters: variables.map(v => ({
                                type: "text",
                                text: v
                            }))
                        }
                    ]
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ success: true, data: response.data });

    } catch (error) {

        console.log(error.response?.data || error.message);
        res.status(500).json({ success: false });

    }

});

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));