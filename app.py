from flask import Flask, request, redirect, make_response, jsonify
from flask_cors import CORS
from neomodel import UniqueProperty, DeflateError, DoesNotExist

from models import Cliente

app = Flask(__name__)
CORS(app)


@app.route("/clientes", methods=['GET', 'POST', 'DELETE' ,'PUT'])
def clients():
    if request.method == 'POST':
        return create_client()
    elif request.method == 'DELETE':
        return delete_client()
    elif request.method == 'GET':
        return retrieve_client()
    return f"<p>{request.args['id_']}</p>"


def retrieve_client():
    id_ = request.args.get('id')
    cl = Cliente.nodes.get(id_=id_)

    data = {
        "id": cl.id_,
        "first_name":cl.first_name,
        "last_name": cl.last_name
    }

    return jsonify(data)


def create_client():
    id_ = request.form.get('id')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    try:
        Cliente(id_=id_, first_name=first_name, last_name=last_name).save()
    except UniqueProperty:
        return make_response("DUPLICADO", 400)
    except DeflateError:
        return make_response("ERROR_PARAMS", 400)
    except Exception:
        return make_response("DESCONOCIDO", 500)
    return make_response("CREADO", 200)


def delete_client():
    id_ = request.form.get('id')
    try:
        Cliente.nodes.get(id_=id_).delete()
    except DoesNotExist:
        return make_response("NO_EXISTE", 400)
    except DeflateError:
        return make_response("ERROR_PARAMS", 400)
    except Exception:
        return make_response("DESCONOCIDO", 500)
    return make_response("ELIMINADO", 200)
