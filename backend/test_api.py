import requests
import json
from datetime import datetime

# Replace with your actual Railway URL
BASE_URL = "https://tinywins.up.railway.app"  # Update this with your actual URL

def test_health_check():
    print("\nTesting health check endpoint...")
    print(f"Testing URL: {BASE_URL}/api/health")
    try:
        response = requests.get(f"{BASE_URL}/api/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print(f"Response Headers: {response.headers}")
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")

def test_user_registration():
    print("\nTesting user registration...")
    print(f"Testing URL: {BASE_URL}/api/auth/register")
    data = {
        "username": f"testuser_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
        "email": f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}@example.com",
        "password": "testpassword123"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print(f"Response Headers: {response.headers}")
        return response.json().get('token') if response.status_code == 201 else None
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None

def test_user_login():
    print("\nTesting user login...")
    print(f"Testing URL: {BASE_URL}/api/auth/login")
    data = {
        "email": "test@example.com",
        "password": "testpassword123"
    }
    try:
        response = requests.post(f"{BASE_URL}/api/auth/login", json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print(f"Response Headers: {response.headers}")
        return response.json().get('token') if response.status_code == 200 else None
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")
        return None

def test_protected_endpoint(token):
    print("\nTesting protected endpoint...")
    print(f"Testing URL: {BASE_URL}/api/users/me")
    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(f"{BASE_URL}/api/users/me", headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        print(f"Response Headers: {response.headers}")
    except requests.exceptions.RequestException as e:
        print(f"Error making request: {e}")

def main():
    print("Starting API tests...")
    print(f"Base URL: {BASE_URL}")
    
    # Test health check
    test_health_check()
    
    # Test registration
    token = test_user_registration()
    
    # If registration fails, try login
    if not token:
        print("\nRegistration failed, trying login...")
        token = test_user_login()
    
    # Test protected endpoint if we have a token
    if token:
        test_protected_endpoint(token)
    else:
        print("\nFailed to get authentication token")

if __name__ == "__main__":
    main() 
