from fastapi import FastAPI, HTTPException
from supabase import create_client, Client
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import bcrypt
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow only your frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

load_dotenv()  
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)


class Volunteer(BaseModel):
    name: str
    email: str
    password: str
    skills: str = None  # Optional for employers
    phone: str = None   # Optional for users

class Opportunity(BaseModel):
    title: str
    description: str
    employer_id: str

class Application(BaseModel):
    user_id: str
    opportunity_id: str

class UserLogin(BaseModel):
    email: str
    password: str

class EmployerLogin(BaseModel):
    email: str
    password: str


@app.get("/")
async def read_root():
    return {"message": "Welcome to the API!"}


@app.post("/login/volunteer/")
async def login_volunteer(user: UserLogin):
    # Fetch user data based on email
    response = supabase.table("volunteers_table").select("*").eq("email", user.email).execute()
    user_data = response.data
    
    if not user_data:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_user = user_data[0]
    stored_password_hash = stored_user['password']  # Assume this is the hashed password stored in your database

    # Verify the password
    if not bcrypt.checkpw(user.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "User login successful", "user": stored_user}

@app.post("/login/employer/")
async def login_employer(employer: EmployerLogin):
    # Fetch employer data based on email
    response = supabase.table("employers_table").select("*").eq("email", employer.email).execute()
    employer_data = response.data
    
    if not employer_data:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_employer = employer_data[0]
    stored_password_hash = stored_employer['password']  # Assume this is the hashed password stored in your database

    # Verify the password
    if not bcrypt.checkpw(employer.password.encode('utf-8'), stored_password_hash.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {"message": "Employer login successful", "employer": stored_employer}

@app.post("/signup/")
async def sign_up(user: Volunteer):
    # Hash the password
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    # Insert user into the appropriate table based on user type
    if user.phone:  # This indicates that it's an employer
        employer_data = {
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "phone": user.phone,
            # Additional fields as necessary
        }
        response = supabase.table("employers_table").insert(employer_data).execute()

    else:  # This indicates that it's a user
        volunteer_data = {
            "name": user.name,
            "email": user.email,
            "password": hashed_password,
            "skills": user.skills,
            # Additional fields as necessary
        }

        response = supabase.table("volunteers_table").insert(volunteer_data).execute()

    return {"message": "Signup successful", "user": response.data}

@app.post("/opportunities/")
async def create_opportunity(opportunity: Opportunity):
    response = supabase.table("opportunities_table").insert(opportunity.dict()).execute()
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.data)
    return response.data

@app.get("/opportunities/")
async def get_opportunities():
    response = supabase.table("opportunities_table").select("*").execute()
    return response.data

@app.post("/applications/")
async def create_application(application: Application):
    response = supabase.table("applications_table").insert(application.dict()).execute()
    if response.status_code != 201:
        raise HTTPException(status_code=response.status_code, detail=response.data)
    return response.data

@app.get("/applications/{user_id}")
async def get_user_applications(user_id: str):
    response = supabase.table("applications_table").select("*").eq("user_id", user_id).execute()
    return response.data


@app.get("/volunteers/")
async def get_volunteers():
    response = supabase.table("volunteers_table").select("*").execute()
    return response.data

