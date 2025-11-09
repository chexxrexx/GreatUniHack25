from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import io
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Load model
processor = AutoImageProcessor.from_pretrained("mmgyorke/vit-world-landmarks")
model = AutoModelForImageClassification.from_pretrained("mmgyorke/vit-world-landmarks")

# Landmarks mapping (simplified)
LANDMARKS = {
    "eiffel_tower": "Paris",
    "tokyo_tower": "Tokyo",
    "statue_of_liberty": "New York",
    "sydney_opera_house": "Sydney"
}

@app.post("/scan")
async def scan_landmark(file: UploadFile = File(...)):
    img = Image.open(io.BytesIO(await file.read())).convert("RGB")
    inputs = processor(images=img, return_tensors="pt")
    outputs = model(**inputs)
    probs = outputs.logits.softmax(dim=1)
    predicted_id = probs.argmax().item()
    label = model.config.id2label[predicted_id]  # Hugging Face label
    return {"landmark": LANDMARKS.get(label, "unknown")}
