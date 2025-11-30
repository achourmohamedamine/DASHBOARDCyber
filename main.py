from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from models import flows_meta

DATABASE_URL = "postgresql://postgres:achour@localhost:5432/ips"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/attacks")
def get_attacks():
    db = next(get_db())
    query = select(flows_meta.c.srcip, flows_meta.c.dstip, flows_meta.c.prediction)
    result = db.execute(query).fetchall()
    
    # Return only attacks (prediction == 1), and only unique src/dst/prediction combinations
    unique_attacks = {
        (row.srcip, row.dstip, row.prediction): {"src_ip": row.srcip, "dst_ip": row.dstip, "prediction": row.prediction}
        for row in result if row.prediction == 1
    }
    return list(unique_attacks.values())
