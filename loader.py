import csv
from pathlib import Path

from models import Marca, Producto, Cliente, Compra

BASE_DIR = Path(__file__).resolve().parent


def process_file(file, callback):
    with open(BASE_DIR / 'data' / file, mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        print(f"======================================Processing {file}======================================")
        for row in csv_reader:
            print(f"Inserting {row}")
            callback(row)


def clients(row):
    Cliente(id_=row["id"], first_name=row["first_name"], last_name=row["last_name"]).save()


def brands(row):
    Marca(id_=row["id"], nombre=row["nombre"], pais=row["pais"]).save()


def products(row):
    prod = Producto(id_=row["id"], nombre=row["nombre"], precio=row["precio"]).save()
    marca = Marca.nodes.get(nombre=row["marca"])
    prod.marca.connect(marca)


def shopping(row):
    com = Compra(cantidad=row["cantidad"]).save()
    cliente = Cliente.nodes.get(id_=row["idCliente"])
    prod = Producto.nodes.get(id_=row["idProducto"])
    com.idCliente.connect(cliente)
    com.idProducto.connect(prod)


if __name__ == '__main__':
    process_file("Clientes.csv", clients)
    process_file("Marcas.csv", brands)
    process_file("Productos.csv", products)
    process_file("Compras.csv", shopping)
