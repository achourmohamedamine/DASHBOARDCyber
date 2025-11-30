from sqlalchemy import Table, Column, Integer, String, MetaData


metadata = MetaData()

flows_meta=Table("flows_meta",metadata,
    Column("id",Integer,primary_key=True),
    Column("srcip",String),
    Column("dstip",String),
    Column("csv_path",String),
    Column("parquet_file",String),
    Column("prediction",Integer),)