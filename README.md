# CV

Technology stack: AngularJS, Bower, Grunt

### Demo: http://cv-app.herokuapp.com

To run:

```shell
$ git clone https://github.com/mbrnwsk/CV.git CV
$ cd CV
$ npm install
$ bower install
$ grunt serve
```

### UPDATE

I received information that there are problems with installing dependencies, so I uploaded distributed (but not minified) version of app that can run on any HTTP server. To run:

```shell
$ cd dist
$ ruby -run -e httpd . -p 9000 #ruby
$ python -m SimpleHTTPServer 9000 #python
```
