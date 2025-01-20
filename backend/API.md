# Bob's Corn API Documentation

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Purchase Corn

Make a purchase request for corn.

```http
POST /purchase
```

#### Headers

| Name        | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| x-client-id | string | Required. Unique identifier for the client |

#### Responses

##### Success Response (200 OK)

```json
{
  "success": true,
  "message": "🌽 Corn purchased successfully!",
  "purchaseId": "uuid-string"
}
```

##### Rate Limit Exceeded (429 Too Many Requests)

```json
{
  "success": false,
  "message": "Rate limit exceeded. Try again after 2024-01-19T12:00:00.000Z"
}
```

##### Bad Request (400)

```json
{
  "success": false,
  "message": "Client ID is required"
}
```

### Get Purchase Count

Get the total number of successful purchases for a client.

```http
GET /purchases
```

#### Headers

| Name        | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| x-client-id | string | Required. Unique identifier for the client |

#### Responses

##### Success Response (200 OK)

```json
{
  "success": true,
  "purchaseCount": 5
}
```

##### Bad Request (400)

```json
{
  "success": false,
  "message": "Client ID is required"
}
```

## Rate Limiting

- Maximum 1 purchase per minute per client
- Rate limit is tracked using the client ID
- The system uses PostgreSQL to ensure accurate rate limiting

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```
