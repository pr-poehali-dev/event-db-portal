"""
Business: Проверка пароля админ-панели и выдача токена для работников ДК.
Args: event с httpMethod POST и body {"password": "..."}
Returns: {"token": "..."} при успехе или 401 при неверном пароле
"""

import json
import os


def _cors_headers():
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }


def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': _cors_headers(), 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': _cors_headers(),
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    body = json.loads(event.get('body') or '{}')
    password = body.get('password', '')
    expected = os.environ.get('ADMIN_PASSWORD', '')

    if not expected or password != expected:
        return {
            'statusCode': 401,
            'headers': _cors_headers(),
            'body': json.dumps({'error': 'Неверный пароль'}),
        }

    return {
        'statusCode': 200,
        'headers': _cors_headers(),
        'body': json.dumps({'token': expected, 'ok': True}),
    }