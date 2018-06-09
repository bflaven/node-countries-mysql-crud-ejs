








## Node, Express & MySQL: Simple Add, Edit, Delete, View (CRUD)
Here is a SPA (Single Page Application) based on the previous API presented in the previous post. The idea is to introduce the EJS Templating Engine to expose data to the user. This is a simple and basic CRUD application (Create, Read, Update, Delete) using Node.js, Express, MySQL & EJS Templating Engine. It has also test included made with Cheerio and Documentation (Apidoc).

**The article is available at @ [http://flaven.fr/2018/06/node-express-mysql-crud-create-a-single-page-application-with-node-ejs-and-mysql/](http://flaven.fr/2018/06/node-express-mysql-crud-create-a-single-page-application-with-node-ejs-and-mysql/)**


**Creating database and table**
You must create a database named **node_countries** and insert some records in the table *t_countries*. There is a dump of this table in the application directory **dump_sql**

```
create database node_countries;
use node_countries;

DROP TABLE IF EXISTS `t_countries`;

CREATE TABLE `t_countries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `tld` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `cca2` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `capital` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT '',
  `callingCode` int(3) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `node_countries` (`id`, `name`, `tld`, `cca2`, `capital`, `callingCode`)
VALUES
	(NULL,'Afghanistan','.af','AF','Kabul',93),
	(NULL,'Italy','.it','IT','Rome',39),
	(NULL,'France','.fr','FR','Rome',33),
  	(NULL,'Malaysia','.my','MY','Kuala Lumpur',60),
  	(NULL,'Mauritania','.mr','MR','Nouakchott',222),
  	(NULL,'Tunisia','.tn','TN','Tunis',216),
  	(NULL,'Tanzania','.tz','TZ','Dodoma',255),
  	(NULL,'Seychelles','.sc','SC','Victoria',248),
  	(NULL,'Norway','.no','NO','Oslo',47),
  	(NULL,'Nepal','.np','NP','Kathmandu',977);
```


### Requirements

If Homebrew, Node are not installed. Here the shortest procedure to install all requirements on a Mac. Very brief but you got the essentials, if you have already installed these tools, you can jump to the point 1.


**Install Homebrew**<br />
[Check the website brew.sh](https://brew.sh/) or launch in the console the following command.

```
$ /usr/bin/ruby -e "$(curl -k -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**Install Node and NPM**<br />

```
$ brew update
$ brew doctor
$ export PATH="/usr/local/bin:$PATH"
$ brew install node
```
Source: <a href="https://changelog.com/posts/install-node-js-with-homebrew-on-os-x" target="_blank">https://changelog.com/posts/install-node-js-with-homebrew-on-os-x</a>


### Quick Presentation

You can read the article or not. Here is a quick presentation of the files contained in the repository and their usage.

**1. The directory tree**<br />
Here is the tree of the application that is contains in the directory **node-countries-mysql-crud-ejs** 

```
node-countries-mysql-crud-ejs/
|-- _views/
    |-- index.ejs
    |-- _layouts
        |-- header.ejs
        |-- footer.ejs
    |-- _countries/
        |-- header.ejs
        |-- footer.ejs
        |-- header.ejs
|-- _test/
    |-- test_webpage_1.js
|-- _routes/
    |-- index.js
    |-- countries.js
|-- _dump_sql/
    |-- node_countries.sql
|-- _public/
    |-- css/
        |-- style.css
    |-- _apidoc
        |-- apidoc.txt
|-- _node_modules/
        |-- ...    
config.js
package.json  
app.js
apidoc.json
README.md
```

**2. Quick files presentation**<br />
Here is quick presentation of the directories.


Directory  | Description |
------------- | ------------- |
_test/ | This directory contains the test made on the screens application with the help of cheerios |
_views/ | This directory contains all the templates required by the application |
_public/ | This directory contains the CSS for the screens |
__dump_sql/ | This directory contains the Dump of the MySQL Database used by the application |


**3. More information**<br />
For those, who are looking for more information, a full article is available with additional resources is available @ [flaven.fr](http://flaven.fr/2018/06/node-express-mysql-crud-create-a-single-page-application-with-node-ejs-and-mysql/)


### Clone this repository

For those, you want to get the code directly, you can use the following command.

```
$ git clone https://github.com/bflaven/node-countries-mysql-crud-ejs.git
$ cd node-countries-mysql-crud-ejs
$ npm install
```















