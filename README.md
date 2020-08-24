# Piti - API

RESTful API dla aplikacji treningowej Piti, napisane z pomocą Node.js, Express, a także GraphQL. 

# Historia 

Początkowo backend aplikacji powstał przy użyciu Strapi - Headless CMS. Było to jednak zbyt "grube" rozwiązanie, ze względu na to, że wszystkie dane aplikacji mogą być dodawane, modyfikowane oraz usuwane z jej poziomu. Niepotrzebny był więc panel administracyjny udostepniamy przez Strapi, wystaeczyło samo API.

Napisałem więc API samodzielnie. Dane pobierane są za pośrednictwem ścieżki udostępnianej przez GraphQL. O ich kształcie i sposobach pobierania, modyfikowania oraz usuwania decydują schemas i resolvers. Nowopowstałe API jest odwzorowaniem tego, które zostało utworzone podczas korzystania ze Strapi. 

## Local testing

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:1337
$ npm run develop