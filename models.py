from neomodel import *

config.DATABASE_URL = 'bolt://neo4j:n3o4j@localhost:7687'


class Cliente(StructuredNode):
    id_ = IntegerProperty(unique_index=True, required=True)
    first_name = StringProperty(required=True)
    last_name = StringProperty(required=True)


class Marca(StructuredNode):
    id_ = IntegerProperty(unique_index=True, required=True)
    nombre = StringProperty(required=True)
    pais = StringProperty(required=True)


class Producto(StructuredNode):
    id_ = IntegerProperty(unique_index=True, required=True)
    nombre = StringProperty(required=True)
    marca = RelationshipFrom(Marca, 'FABRICA', cardinality=One)
    precio = IntegerProperty()


class Compra(StructuredNode):
    idCliente = RelationshipFrom(Cliente, 'REALIZA', cardinality=One)
    idProducto = RelationshipFrom(Producto, 'AGREGA', cardinality=One)
    cantidad = IntegerProperty(required=True)



