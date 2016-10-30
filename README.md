# angular-1-training-class-api

Angular 1 Training Class API serving heroes data - nodejs express cors-enabled API

The API is read-only to allow several people to access it at the same time without messing up the data for others.

We fake handle create and update of data by giving you the appropriate response, but without actually modifying any data on the server.

## Endpoints

### /heroes

* GET will return an array of objects, all of the heroes
* POST would typically be used for creating a new object by sending JSON in the body of the request.  We fake the creation of the object, returning the body and a 201 status code as the response.  No hero is actually added.

### /heroes/:id

* GET will return a single object, a single hero
* PUT would normally update the existing object, in our case we fake it, returning a 204 status code without actually modifying anything on the server.

If the id given in the request for either one of these Verbs is incorrect, the server will respond with a 404.

## Objects

### Hero

A Hero object looks like:

```json
{
  "id": 0,
  "name": "Luke Skywalker",
  "imageUrl": "https://angular-1-training-class-api.herokuapp.com/images/luke.png",
  "power": 9000,
  "affiliations": ["Jedi", "Rebel"],
  "light": true
}
```