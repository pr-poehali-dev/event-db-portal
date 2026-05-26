"""
Business: CRUD-операции для мероприятий Дворца культуры — список, создание, редактирование, удаление.
Args: event с httpMethod (GET/POST/PUT/DELETE), headers (X-Auth-Token для модификаций), body, queryStringParameters
Returns: HTTP response с JSON списком событий или результатом операции
"""

import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor


def _cors_headers():
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }


def _check_auth(event):
    headers = event.get('headers') or {}
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token') or ''
    expected = os.environ.get('ADMIN_PASSWORD', '')
    return bool(expected) and token == expected


def _escape(value):
    if value is None:
        return 'NULL'
    if isinstance(value, bool):
        return 'TRUE' if value else 'FALSE'
    if isinstance(value, (int, float)):
        return str(value)
    text = str(value).replace("'", "''")
    return f"'{text}'"


def handler(event: dict, context) -> dict:
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': _cors_headers(), 'body': ''}

    dsn = os.environ['DATABASE_URL']
    conn = psycopg2.connect(dsn)
    conn.autocommit = True

    try:
        if method == 'GET':
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    "SELECT id, event_date, event_time, title, place, resp, count, age, paid, sort_order "
                    "FROM events ORDER BY sort_order ASC, id ASC"
                )
                rows = cur.fetchall()
                items = [
                    {
                        'id': r['id'],
                        'date': r['event_date'],
                        'time': r['event_time'],
                        'title': r['title'],
                        'place': r['place'],
                        'resp': r['resp'],
                        'count': r['count'],
                        'age': r['age'],
                        'paid': r['paid'],
                        'sort_order': r['sort_order'],
                    }
                    for r in rows
                ]
                return {
                    'statusCode': 200,
                    'headers': _cors_headers(),
                    'body': json.dumps({'events': items}, ensure_ascii=False),
                }

        if not _check_auth(event):
            return {
                'statusCode': 401,
                'headers': _cors_headers(),
                'body': json.dumps({'error': 'Unauthorized'}),
            }

        body = json.loads(event.get('body') or '{}')

        if method == 'POST':
            fields = ('event_date', 'event_time', 'title', 'place', 'resp', 'count', 'age', 'paid', 'sort_order')
            values = (
                body.get('date', ''),
                body.get('time', ''),
                body.get('title', ''),
                body.get('place', ''),
                body.get('resp', ''),
                int(body.get('count') or 0),
                body.get('age', ''),
                bool(body.get('paid', False)),
                int(body.get('sort_order') or 0),
            )
            cols = ', '.join(fields)
            vals = ', '.join(_escape(v) for v in values)
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(f"INSERT INTO events ({cols}) VALUES ({vals}) RETURNING id")
                new_id = cur.fetchone()['id']
            return {
                'statusCode': 200,
                'headers': _cors_headers(),
                'body': json.dumps({'ok': True, 'id': new_id}),
            }

        if method == 'PUT':
            event_id = int(body.get('id') or 0)
            if not event_id:
                return {'statusCode': 400, 'headers': _cors_headers(), 'body': json.dumps({'error': 'id required'})}
            updates = {
                'event_date': body.get('date', ''),
                'event_time': body.get('time', ''),
                'title': body.get('title', ''),
                'place': body.get('place', ''),
                'resp': body.get('resp', ''),
                'count': int(body.get('count') or 0),
                'age': body.get('age', ''),
                'paid': bool(body.get('paid', False)),
                'sort_order': int(body.get('sort_order') or 0),
            }
            set_clause = ', '.join(f"{k} = {_escape(v)}" for k, v in updates.items())
            set_clause += ", updated_at = CURRENT_TIMESTAMP"
            with conn.cursor() as cur:
                cur.execute(f"UPDATE events SET {set_clause} WHERE id = {event_id}")
            return {'statusCode': 200, 'headers': _cors_headers(), 'body': json.dumps({'ok': True})}

        if method == 'DELETE':
            params = event.get('queryStringParameters') or {}
            event_id = int(params.get('id') or body.get('id') or 0)
            if not event_id:
                return {'statusCode': 400, 'headers': _cors_headers(), 'body': json.dumps({'error': 'id required'})}
            with conn.cursor() as cur:
                cur.execute(f"DELETE FROM events WHERE id = {event_id}")
            return {'statusCode': 200, 'headers': _cors_headers(), 'body': json.dumps({'ok': True})}

        return {'statusCode': 405, 'headers': _cors_headers(), 'body': json.dumps({'error': 'Method not allowed'})}
    finally:
        conn.close()
