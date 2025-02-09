import { HTMLElement } from "node-html-parser"
import Tesseract from "node-tesseract-ocr"

export type ExtractTextFromImageOptions = Partial<Tesseract.Config> & {
    transformImageSource?: (src: string) => string
}

const extractTextFromImage = ({
    transformImageSource,
    tesseractOptions
}: ExtractTextFromImageOptions) => {
    return async (element: HTMLElement) => {
        const isImage = element.tagName.toLowerCase() === "img"
    
        if (!isImage) {
            throw new Error(`This element is not an image: ${element}`)
        }
    
        const rawImageSource = element.attrs.src
        const transofrmedImageSource = transformImageSource ? transformImageSource(rawImageSource) : rawImageSource
    
        const text = await Tesseract.recognize(
            transofrmedImageSource,
            tesseractOptions
        )
    
        return text
    }
}

export {
    extractTextFromImage
}