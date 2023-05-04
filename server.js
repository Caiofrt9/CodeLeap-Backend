import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import axios from "axios";

const app = express()

app.use(bodyParser.json()) // Configura o middleware body-parser para analisar o corpo da solicitação JSON
app.use(cors()) // Configura o middleware do CORS para permitir solicitações de qualquer origem

app.post("/api/v1/post", async function(req, res) {
    const postPayload = req.body;
    const reqPayload = {
        "id": postPayload.id,
        "username": postPayload.username,
        "created_datetime": postPayload.created_datetime,
        "title": postPayload.title,
        "content": postPayload.content
    }

    if (!postPayload) {
        return res.status(400).json({ success: false, message: "No post payload" });
    }

    try {
        const postRequest = await axios ({
            url: "https://dev.codeleap.co.uk/careers/",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            data: reqPayload,
        });

        console.log({ success: true, message: postRequest.data });
        return res.status(200).json({ success: true, message: postRequest.data });
    } catch (error) {
        console.log("error on post request", error)

        return res.status(500).json({
            success: false,
            message: error
        })
    }
})

app.listen(9001,() => {
    console.log("server iniciatilized")
})