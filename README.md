## MovieDatabase

Project in angular.
The application receives data from __[api themoviedb](https://www.themoviedb.org/documentation/api)__, the received pages are stored in the service, and therefore, when switching to a page that has already been loaded, it is not loaded again, but is taken from the data array. In the application, you can view a list of films (when you hover over a film, its rating and title are displayed), switch pages, view detailed information about the film, add/remove to favorites (which is stored in local storage, and therefore they remain when the page is reloaded).

There are 3 pages:
* my-favorite-list-page;
* movies-detailed-page;
* movies-list-page.

Features:
* Rosponsive/Adaptive design;
* Handling Error Routes;
* Reactive approach through RxJS;
* Lazy-Loading components.

Screenshots:

![movie-database-1](https://user-images.githubusercontent.com/82032813/211028455-188b01aa-a22a-4710-9a8c-906c1c984300.png)
![movie-database-2](https://user-images.githubusercontent.com/82032813/211028461-7b3742e9-970a-43db-a68e-72b5dc74fb0a.png)
![movie-database-3](https://user-images.githubusercontent.com/82032813/211028468-23edc647-b166-46a1-8da9-ef8e365a8e0f.png)
![movie-database-4](https://user-images.githubusercontent.com/82032813/211028473-9465eb9c-688a-4845-9005-0f883702851c.png)

<img src="https://user-images.githubusercontent.com/82032813/211028483-a57a384d-2e8e-4e88-b367-ecbe02f48538.png" alt="movie-database-5" max-width="50%"/> <img src="https://user-images.githubusercontent.com/82032813/211028494-0dd13d24-89b9-40ed-94d9-668b141d6382.png" alt="movie-database-6" max-width="50%"/> <img src="https://user-images.githubusercontent.com/82032813/211028508-c6abceb1-b832-4bad-b937-f5eef8b1e040.png" alt="movie-database-7" max-width="50%"/> <img src="https://user-images.githubusercontent.com/82032813/211028521-299464cc-e39e-4af2-83e9-b8d2d95dee7f.png" alt="movie-database-8" max-width="50%"/>
