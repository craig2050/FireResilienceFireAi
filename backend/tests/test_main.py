from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "FireAI Backend is running!"}

def test_generate_text():
    response = client.post(
        "/generate",
        json={"prompt": "Test prompt"}
    )
    assert response.status_code == 200
    assert "response" in response.json()
