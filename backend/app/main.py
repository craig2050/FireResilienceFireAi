from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import pipeline
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI model
generator = pipeline("text-generation", model="gpt2")

class PromptRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"message": "FireAI Backend is running!"}

@app.post("/generate")
def generate_text(request: PromptRequest):
    try:
        response = generator(request.prompt, max_length=50)
        return {"response": response[0]["generated_text"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
