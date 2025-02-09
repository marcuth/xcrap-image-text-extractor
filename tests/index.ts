import { AxiosClient } from "xcrap/clients"
import fs from "fs"

import { extractTextFromImage } from "../src"
import { extractAttribute } from "xcrap/parsing"


;(async () => {
    const client = new AxiosClient()

    const pageParser = await client.get("https://tesseract.projectnaptha.com/")

    const x = await pageParser.parseItem({
        model: {
            imageTexts: {
                query: "img",
                extractor: extractTextFromImage({
                    transformImageSource: (src) => {
                        return `https://tesseract.projectnaptha.com/${src}`
                    },
                    lang: "eng",
                }),
                fieldType: "multiple"
            }
        }
    })

    console.log(x)
})();